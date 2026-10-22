// 音樂頁：每一首一張卡片（封面、播放器），有歌詞的放在下面；一次只播一首
(function () {
  const QQ = window.QQ;
  const time = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

  function songHtml(s) {
    const lyrics = s.lyrics
      ? `<div class="lyrics"><h3>${QQ.icon('chat_bubble')}〈${QQ.esc(s.title)}〉歌詞</h3>${s.lyrics.map((part) => `
          <section class="lyrics__part"><p class="lyrics__label">${QQ.esc(part.label)}</p>
          ${part.lines.map((l) => `<p>${QQ.esc(l)}</p>`).join('')}</section>`).join('')}</div>`
      : '';
    return `<article class="song" id="${QQ.esc(s.id)}">
      <div class="song__main">
        <img class="song__cover" src="${QQ.esc(s.cover)}" data-full="${QQ.esc(s.cover)}" data-caption="${QQ.esc(s.title)}" alt="〈${QQ.esc(s.title)}〉封面" width="600" height="600" loading="lazy">
        <div class="song__body">
          <h2>〈${QQ.esc(s.title)}〉</h2>
          <p class="song__meta"><span class="tag">${QQ.esc(s.kind)}</span>${time(s.duration)}</p>
          <audio controls preload="none" src="${QQ.esc(s.src)}">你的瀏覽器不能播放這首曲子。</audio>
        </div>
      </div>
      ${lyrics}
    </article>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('music-intro').textContent = QQ.music.intro;
    const box = document.getElementById('music-list');
    box.innerHTML = QQ.music.songs.map(songHtml).join('');
    // 一次只播一首：開始播一首，就把其他的暫停
    box.addEventListener('play', (e) => {
      box.querySelectorAll('audio').forEach((a) => { if (a !== e.target) a.pause(); });
    }, true);
  });
})();
