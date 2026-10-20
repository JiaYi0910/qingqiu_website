// 青丘小百科頁
(function () {
  const QQ = window.QQ;

  // 一條規則要讀到第幾章才知道：level 優先，沒寫就用出處裡最早的一章
  const levelOf = (e) => (e.level != null ? e.level : QQ.minCh(e.ch));

  function sectionHtml(s) {
    return `<section class="lore" id="${s.id}">
      <div class="volume-head"><h2>${QQ.icon(s.icon, 'icon--big')}${QQ.esc(s.title)}</h2><span class="tone">${QQ.esc(s.intro)}</span></div>
      <dl class="lore-list">${s.entries.map((e) => `
        <dt>${QQ.esc(e.term)}</dt>
        <dd>${QQ.guard(levelOf(e), `${QQ.esc(e.text)}<span class="lore-ch">${(e.ch || []).map((no) => QQ.chapterChip(no, true)).join('')}</span>`, 'inline')}</dd>`).join('')}
      </dl>
    </section>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lore-index').innerHTML = QQ.lore.map((s) =>
      `<a class="chip" href="#${s.id}">${QQ.icon(s.icon)}${QQ.esc(s.title)}</a>`).join('');
    document.getElementById('lore').innerHTML = QQ.lore.map(sectionHtml).join('');
    if (location.hash) {
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) t.scrollIntoView();
    }
  });
})();
