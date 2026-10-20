// 周邊頁
(function () {
  const QQ = window.QQ;

  function cardHtml(m) {
    const c = QQ.character(m.char);
    const t = QQ.merchTypes.find((x) => x.id === m.type);
    const name = `${c.name}・${t.name}`;
    const img = `<img class="merch-card__img" src="${QQ.esc(m.src)}" data-full="${QQ.esc(m.src)}" data-caption="${QQ.esc(name)}（設計圖）" alt="${QQ.esc(name)}" loading="lazy">`;
    return `<figure class="merch-card" data-char="${m.char}" data-type="${m.type}">
      ${QQ.guard(m.spoiler || 0, img, 'fig', `${c.name}化形以後的樣子（${QQ.chapterLabel(m.spoiler || 0)}）`)}
      <figcaption>${QQ.avatarHtml(c, 'sm')}<span>${QQ.esc(c.name)}</span><span class="merch-card__type">${QQ.icon(t.icon)}${QQ.esc(t.name)}</span></figcaption>
    </figure>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('merch-hero');
    hero.innerHTML = `<img src="${QQ.esc(QQ.merch.hero.src)}" data-full="${QQ.esc(QQ.merch.hero.src)}" data-caption="${QQ.esc(QQ.merch.hero.caption)}（設計圖）" alt="${QQ.esc(QQ.merch.hero.caption)}">
      <figcaption>${QQ.esc(QQ.merch.hero.caption)}</figcaption>`;

    // 篩選：角色、種類
    const chars = ['zhaozhao', 'moling', 'nuomi'].map(QQ.character);
    document.getElementById('merch-filter-char').innerHTML = `<button type="button" data-char="all" aria-pressed="true">全部</button>`
      + chars.map((c) => `<button type="button" data-char="${c.id}" aria-pressed="false">${QQ.avatarHtml(c, 'sm')}${QQ.esc(c.name)}</button>`).join('');
    document.getElementById('merch-filter-type').innerHTML = `<button type="button" data-type="all" aria-pressed="true">全部</button>`
      + QQ.merchTypes.map((t) => `<button type="button" data-type="${t.id}" aria-pressed="false">${QQ.icon(t.icon)}${QQ.esc(t.name)}</button>`).join('');

    const grid = document.getElementById('merch-grid');
    grid.innerHTML = QQ.merch.items.map(cardHtml).join('');

    const want = { char: 'all', type: 'all' };
    function apply() {
      grid.querySelectorAll('.merch-card').forEach((el) => {
        el.hidden = (want.char !== 'all' && el.dataset.char !== want.char) || (want.type !== 'all' && el.dataset.type !== want.type);
      });
    }
    ['char', 'type'].forEach((k) => {
      const box = document.getElementById(`merch-filter-${k}`);
      box.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        want[k] = b.dataset[k];
        box.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        apply();
      });
    });
    // 從角色卡點進來（merch.html?char=moling）：先篩好那個角色
    const pre = QQ.param('char');
    if (pre) document.querySelector(`#merch-filter-char [data-char="${CSS.escape(pre)}"]`)?.click();
  });
})();
