// 章節頁
(function () {
  const QQ = window.QQ;

  function chapterHtml(ch) {
    const todo = !ch.written;
    let html = `<li class="ch${todo ? ' ch--todo' : ''}" id="ch-${ch.no}" data-line="${ch.line}">`;
    html += `<div class="ch-no">${QQ.chapterLabel(ch.no)}</div><div>`;
    let detail = '';
    if (ch.image) {
      detail += `<img class="ch-thumb" src="${QQ.esc(ch.image.src)}" data-full="${QQ.esc(ch.image.src)}" data-caption="${QQ.esc(ch.image.caption)}" alt="${QQ.esc(ch.image.caption)}" loading="lazy">`;
    }
    html += `<p class="ch-title">〈${QQ.esc(ch.title)}〉${QQ.lineTag(ch.line)}${todo ? `<span class="tag tag--todo">${QQ.icon('nuomi_sleepy')}還沒寫</span>` : ''}</p>`;
    detail += `<p class="ch-summary">${QQ.esc(ch.summary)}</p>`;
    const placeIds = [...new Set((ch.places || []).map((p) => p.id))];
    if (placeIds.length) detail += `<div class="chips">${placeIds.map(QQ.placeChip).join('')}</div>`;
    // 還沒讀到的章節：章名留著，重點和地點先藏起來
    html += QQ.guard(ch.no, detail, 'block', todo ? '還沒寫的章節大綱' : '你還沒讀到這一章');
    html += '</div></li>';
    return html;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('volumes');
    box.innerHTML = QQ.volumes.map((v) => {
      const list = QQ.chapters.filter((ch) => ch.vol === v.id);
      return `<section class="volume"><div class="volume-head"><h2>${QQ.esc(v.name)}</h2>
        <span class="tone">${QQ.esc(v.tone || '')}</span></div>
        <ol class="ch-list">${list.map(chapterHtml).join('')}</ol></section>`;
    }).join('');

    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach((b) => b.addEventListener('click', () => {
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const want = b.dataset.line;
      box.querySelectorAll('.ch').forEach((li) => {
        const line = li.dataset.line;
        li.hidden = want !== 'all' && line !== want && line !== 'both';
      });
    }));

    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
  });
})();
