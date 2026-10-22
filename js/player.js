// 邊逛邊聽：每一頁左下角的小播放器，播 js/data/music.js 裡的曲子（播完一首接下一首）。
// 音樂在播的時候換頁不會斷（見下面的「換頁不中斷」）。重新整理時記得播到哪裡（sessionStorage，關掉分頁就忘記），從同一個地方接著播；
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

    // 這一頁是放在「邊聽邊逛」外框裡的內容（見下面的 enterShell）：
    // 不用自己的播放器，外框左下角那個一直在播；這一頁有別的播放器開始播（例如音樂頁的），就請外框先停
    let inShell = false;
    try { inShell = window.top !== window && window.top.document.body.classList.contains('qq-shell'); } catch (e) { inShell = false; }
    if (inShell) {
      document.addEventListener('play', () => {
        try { window.top.QQ.player.pause(); } catch (e) { /* 外框不在了就算了 */ }
      }, true);
      return;
    }

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
        // 同一頁裡別的播放器（例如音樂頁的）先停下來；外框裡的那一頁也是
        document.querySelectorAll('audio').forEach((a) => { if (a !== audio) a.pause(); });
        try { if (shell) shell.contentDocument.querySelectorAll('audio').forEach((a) => a.pause()); } catch (e) { /* 沒關係 */ }
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
    QQ.player = { pause, play, isPlaying: () => !audio.paused };

    // ---------- 換頁不中斷 ----------
    // 音樂在播的時候點網站裡的連結：不讓整頁重新載入（那樣音樂會斷），
    // 改成把新的一頁放進一個蓋滿畫面的外框（iframe）裡，左下角的播放器留在原地繼續播。
    // 之後在外框裡怎麼換頁都不會斷；網址列、分頁標題跟著外框裡的那一頁走，上一頁也照常。
    let shell = null;
    const canShell = /^https?:$/.test(location.protocol); // 直接雙擊打開檔案時不用

    function syncFromShell() {
      try {
        const w = shell.contentWindow;
        history.replaceState(null, '', w.location.href);
        document.title = w.document.title;
      } catch (e) { /* 拿不到就算了 */ }
    }

    function enterShell(target) {
      shell = document.createElement('iframe');
      shell.className = 'shell-frame';
      shell.title = '網站內容';
      shell.style.visibility = 'hidden';
      // 先在外框裡打開「現在這一頁」，再換到要去的那一頁，按上一頁才回得來
      shell.src = location.href;
      let first = true;
      shell.addEventListener('load', () => {
        if (first) {
          first = false;
          shell.contentWindow.location.href = target;
          return;
        }
        if (shell.style.visibility === 'hidden') {
          shell.style.visibility = '';
          document.body.classList.add('qq-shell-ready');
        }
        // 鍵盤（上下鍵、空白鍵）直接捲動新的一頁
        try { shell.contentWindow.focus(); } catch (e) { /* 沒關係 */ }
        syncFromShell();
        try { shell.contentWindow.addEventListener('hashchange', syncFromShell); } catch (e) { /* 沒關係 */ }
      });
      document.body.classList.add('qq-shell');
      document.body.appendChild(shell);
    }

    function goTo(href) {
      if (shell) shell.contentWindow.location.href = href;
      else enterShell(href);
    }

    document.addEventListener('click', (e) => {
      if (!canShell || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (!/(\.html|\/)$/.test(url.pathname)) return;
      // 同一頁裡的 #錨點：照原本的方式捲過去
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      // 已經在外框裡（只剩播放器的「歌詞」連結在外面）：一律在外框裡打開
      if (shell) { e.preventDefault(); goTo(url.href); return; }
      // 音樂沒在播：照原本的方式換頁
      if (audio.paused) return;
      e.preventDefault();
      goTo(url.href);
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
