// 名句集頁
(function () {
  const QQ = window.QQ;

  function cardHtml(q, i) {
    const c = QQ.character(q.who);
    const ch = QQ.chapter(q.ch) || {};
    const inner = `<p class="qcard__text">「${QQ.esc(q.text)}」</p>
      <p class="qcard__note">${QQ.esc(q.note || '')}</p>
      <div class="qcard__foot">
        <a class="qcard__who" href="${QQ.charHref(c.id)}">${QQ.avatarHtml(c, 'sm')}${QQ.esc(q.as || c.name)}</a>
        <a class="chip" href="${QQ.chapterHref(q.ch)}">${QQ.chapterLabel(q.ch)}〈${QQ.esc(ch.title || '')}〉</a>
      </div>`;
    return `<article class="qcard" id="q-${i}" data-who="${q.who}" style="--c:${c.color}">${QQ.guard(q.ch, inner, 'block', `${QQ.chapterLabel(q.ch)}的一句話`)}</article>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('quotes');
    grid.innerHTML = QQ.quotes.map(cardHtml).join('');
    // 從搜尋點進來（quotes.html#q-3）：捲到那一句
    if (location.hash) document.getElementById(QQ.hashId())?.scrollIntoView({ block: 'center' });

    // 照說話的人篩選（只列有句子的人）
    const who = [...new Set(QQ.quotes.map((q) => q.who))].map(QQ.character);
    const box = document.getElementById('quote-filter');
    box.innerHTML = '<button type="button" data-who="all" aria-pressed="true">全部</button>'
      + who.map((c) => `<button type="button" data-who="${c.id}" aria-pressed="false">${QQ.avatarHtml(c, 'sm')}${QQ.esc(c.name)}</button>`).join('');
    box.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      box.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      grid.querySelectorAll('.qcard').forEach((el) => { el.hidden = b.dataset.who !== 'all' && el.dataset.who !== b.dataset.who; });
    });

    const read = QQ.quotes.filter((q) => QQ.isRead(q.ch)).length;
    document.getElementById('quote-count').textContent = read === QQ.quotes.length
      ? `一共 ${QQ.quotes.length} 句。`
      : `一共 ${QQ.quotes.length} 句，你讀到的有 ${read} 句；其他的先藏起來了。`;
  });
})();
