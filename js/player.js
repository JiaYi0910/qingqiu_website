// 邊逛邊聽：每一頁左下角的小播放器，播 js/data/music.js 裡的曲子（播完一首接下一首）。
// 換頁時記住播到哪裡（sessionStorage，關掉分頁就忘記），新的一頁從同一個地方接著播。
// 瀏覽器不讓自動出聲的時候（例如 iPhone），會亮起「點一下繼續」。不會在第一次來的時候自己開始播。
(function () {
  const QQ = window.QQ;
  const KEY = 'qq-player';
  const songs = () => (QQ.music && QQ.music.songs) || [];
  const fmt = (s) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00');

  const store = {
    get() {
      try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
    },
    set(v) {
      try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* 存不了就算了 */ }
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    const list = songs();
    if (!list.length) return;
    const saved = store.get();
    const state = { i: Math.min(saved.i || 0, list.length - 1), t: saved.t || 0, on: !!saved.on, open: !!saved.open, started: !!saved.started };

    const audio = new Audio();
    audio.preload = 'none';
    const root = document.createElement('div');
    root.className = 'player';
    root.innerHTML = `
      <div class="player__panel" id="player-panel" hidden>
        <div class="player__info">
          <img class="player__cover" alt="" width="52" height="52">
          <div class="player__text"><strong class="player__title"></strong><span class="player__kind"></span></div>
          <button type="button" class="player__close" aria-label="收起播放器">×</button>
        </div>
        <input class="player__bar" type="range" min="0" max="1000" value="0" aria-label="播放進度">
        <div class="player__row">
          <span class="player__time">0:00 / 0:00</span>
          <span class="player__btns">
            <button type="button" class="player__prev" aria-label="上一首">⏮</button>
            <button type="button" class="player__play" aria-label="播放">▶</button>
            <button type="button" class="player__next" aria-label="下一首">⏭</button>
          </span>
          <a class="player__lyrics" href="music.html">歌詞</a>
        </div>
      </div>
      <button type="button" class="player__pill" aria-controls="player-panel" aria-expanded="false">
        ${QQ.icon('wind_chime')}<span class="player__eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="player__label"></span>
      </button>`;
    document.body.appendChild(root);
    const $ = (s) => root.querySelector(s);
    const panel = $('.player__panel');
    const pill = $('.player__pill');
    const bar = $('.player__bar');
    let blocked = false;
    let seeking = false;

    const song = () => list[state.i];
    function save() {
      store.set({ i: state.i, t: audio.currentTime || state.t, on: state.on, open: state.open, started: state.started });
    }

    function render() {
      const s = song();
      $('.player__cover').src = s.cover;
      $('.player__title').textContent = `〈${s.title}〉`;
      $('.player__kind').textContent = `${s.kind}・昭昭⋆.˚✮`;
      const lyr = $('.player__lyrics');
      lyr.hidden = !s.lyrics;
      lyr.href = `music.html#${s.id}`;
      const playing = !audio.paused;
      $('.player__play').textContent = playing ? '❚❚' : '▶';
      $('.player__play').setAttribute('aria-label', playing ? '暫停' : '播放');
      root.classList.toggle('is-playing', playing);
      root.classList.toggle('is-blocked', blocked);
      $('.player__label').textContent = blocked ? `點一下繼續〈${s.title}〉`
        : playing ? `〈${s.title}〉` : state.started ? `〈${s.title}〉暫停中` : '邊逛邊聽';
      panel.hidden = !state.open;
      pill.setAttribute('aria-expanded', String(state.open));
      pill.setAttribute('aria-label', state.open ? '收起音樂播放器' : '打開音樂播放器');
      tick();
    }

    function tick() {
      const d = audio.duration || song().duration;
      // 還沒開始載入的時候，顯示上次停在哪裡
      const t = audio.src ? (audio.currentTime || 0) : (state.t || 0);
      $('.player__time').textContent = `${fmt(t)} / ${fmt(d)}`;
      if (!seeking) bar.value = d ? Math.round((t / d) * 1000) : 0;
    }

    function load(i, t) {
      state.i = (i + list.length) % list.length;
      state.t = t || 0;
      // #t=秒數：從那個時間點開始（換頁接著播用的）
      audio.src = song().src + (state.t > 1 ? `#t=${Math.floor(state.t)}` : '');
      if ('mediaSession' in navigator && window.MediaMetadata) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song().title, artist: '昭昭⋆.˚✮', album: '墨染櫻雪',
          artwork: [{ src: new URL(song().cover, location.href).href, sizes: '600x600', type: 'image/webp' }],
        });
      }
    }

    function play() {
      state.started = true;
      if (!audio.src) load(state.i, state.t);
      return audio.play().then(() => {
        blocked = false;
        state.on = true;
        // 同一頁裡別的播放器（例如音樂頁的）先停下來
        document.querySelectorAll('audio').forEach((a) => { if (a !== audio) a.pause(); });
      }).catch(() => {
        // 瀏覽器不讓自動出聲：等使用者點一下
        blocked = state.on;
      }).finally(() => { save(); render(); });
    }

    function pause() {
      audio.pause();
      state.on = false;
      blocked = false;
      save();
      render();
    }

    pill.addEventListener('click', () => {
      if (!state.started || blocked) {
        state.open = true;
        play();
        return;
      }
      state.open = !state.open;
      save();
      render();
    });
    $('.player__close').addEventListener('click', () => { state.open = false; save(); render(); pill.focus(); });
    $('.player__play').addEventListener('click', () => (audio.paused ? play() : pause()));
    $('.player__next').addEventListener('click', () => { load(state.i + 1, 0); play(); });
    $('.player__prev').addEventListener('click', () => {
      if (audio.currentTime > 3) audio.currentTime = 0;
      else { load(state.i - 1, 0); }
      play();
    });
    bar.addEventListener('input', () => { seeking = true; const d = audio.duration || song().duration; $('.player__time').textContent = `${fmt((bar.value / 1000) * d)} / ${fmt(d)}`; });
    bar.addEventListener('change', () => {
      const d = audio.duration || song().duration;
      if (!audio.src) load(state.i, 0);
      audio.currentTime = (bar.value / 1000) * d;
      seeking = false;
      save();
    });

    audio.addEventListener('timeupdate', () => {
      tick();
      // 大約每秒記一次播到哪裡
      if (Math.floor(audio.currentTime) !== Math.floor(state.t)) { state.t = audio.currentTime; save(); }
    });
    audio.addEventListener('play', render);
    audio.addEventListener('pause', render);
    audio.addEventListener('loadedmetadata', tick);
    audio.addEventListener('ended', () => { load(state.i + 1, 0); play(); });
    window.addEventListener('pagehide', save);

    // 同一頁裡別的播放器開始播（例如音樂頁的），這個就先停
    document.addEventListener('play', (e) => {
      if (e.target !== audio && !audio.paused) pause();
    }, true);

    if ('mediaSession' in navigator) {
      const ms = navigator.mediaSession;
      ms.setActionHandler('play', play);
      ms.setActionHandler('pause', pause);
      ms.setActionHandler('nexttrack', () => { load(state.i + 1, 0); play(); });
      ms.setActionHandler('previoustrack', () => { load(state.i - 1, 0); play(); });
    }

    render();
    // 上一頁正在播：從同一個地方接著播
    if (state.on) {
      load(state.i, state.t);
      play();
    }
  });
})();
