// 插畫總覽：從各份資料自動收集圖片（同一張只放一次），不用另外維護清單
(function () {
  const QQ = window.QQ;

  const CATS = [
    { id: 'scene', name: '章節插畫', icon: 'book_open' },
    { id: 'place', name: '地點風景', icon: 'map' },
    { id: 'map', name: '地圖', icon: 'location' },
    { id: 'char', name: '角色', icon: 'name_tag' },
    { id: 'merch', name: '周邊設計', icon: 'hearts' },
    { id: 'au', name: '番外・現代校園', icon: 'study' },
  ];

  function collect() {
    const list = [];
    const seen = new Map();
    // level：圖裡畫到第幾章的劇情；同一張圖出現在好幾個地方時，取最晚的那一章（比較安全）
    const add = (cat, src, full, caption, level) => {
      const key = full || src;
      if (seen.has(key)) {
        const it = seen.get(key);
        it.level = Math.max(it.level, level || 0);
        return;
      }
      const it = { cat, src, full: full || src, caption, level: level || 0 };
      seen.set(key, it);
      list.push(it);
    };
    const lv = (im) => QQ.imageLevel(im);

    (QQ.chapters || []).forEach((ch) => {
      if (ch.image) add('scene', ch.image.src, null, `${ch.image.caption}・${QQ.chapterLabel(ch.no)}`, ch.written ? ch.no : 99);
    });
    (QQ.places || []).forEach((p) => {
      if (p.art) add('place', p.art.src, null, p.name, Math.max(p.art.spoiler || 0, QQ.placeFirst(p.id)));
      (p.images || []).forEach((im) => add('scene', im.src, im.full, `${im.caption}${im.ch != null ? `・${QQ.chapterLabel(im.ch)}` : ''}`, lv(im)));
    });
    if (QQ.map) add('map', QQ.map.image, null, '青丘地圖', 0);
    Object.values(QQ.subMaps || {}).forEach((m) => add('map', m.image, null, m.title, 0));
    (QQ.characters || []).forEach((c) => {
      const first = QQ.charFirst(c.id);
      if (c.banner) add('char', c.banner.src, null, `${c.name}・橫幅`, first);
      if (c.portrait) add('char', c.portrait.src, c.portrait.full, c.name, Math.max(first, c.portraitBefore ? c.portraitBefore.level : 0));
      if (c.portraitBefore) add('char', c.portraitBefore.src, null, c.portraitBefore.caption, first);
      if (c.sheet) add('char', c.sheet.src, null, `${c.name}・角色設定圖`, Math.max(first, c.sheet.spoiler || 0));
      (c.images || []).forEach((im) => {
        const isScene = /images\/scenes\//.test(im.full || im.src);
        add(isScene ? 'scene' : 'char', im.src, im.full, im.caption, Math.max(first, lv(im)));
      });
    });
    if (QQ.merch) {
      add('merch', QQ.merch.hero.src, null, QQ.merch.hero.caption, 0);
      QQ.merch.items.forEach((m) => {
        const c = QQ.character(m.char);
        const t = QQ.merchTypes.find((x) => x.id === m.type);
        add('merch', m.src, null, `${c.name}・${t.name}`, m.spoiler || 0);
      });
    }
    (QQ.au ? QQ.au.items : []).forEach((it) => add('au', it.src, null, `番外・${it.title}`, 0));
    return list;
  }

  function figHtml(it) {
    // 用原圖，完整顯示不裁切
    const img = `<img src="${QQ.esc(it.full)}" data-full="${QQ.esc(it.full)}" data-caption="${QQ.esc(it.caption)}" alt="${QQ.esc(it.caption)}" loading="lazy">`;
    return `<figure class="gal-item" data-cat="${it.cat}">${QQ.guard(it.level, img, 'fig')}<figcaption>${QQ.esc(it.caption)}</figcaption></figure>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const items = collect();
    const box = document.getElementById('gallery');
    box.innerHTML = items.map(figHtml).join('');
    const read = items.filter((it) => QQ.isRead(it.level)).length;
    document.getElementById('gallery-count').textContent = read === items.length
      ? `一共 ${items.length} 張圖。點圖可以看大圖。`
      : `一共 ${items.length} 張圖，你讀到的有 ${read} 張；其他的先藏起來了。`;

    const counts = Object.fromEntries(CATS.map((c) => [c.id, items.filter((it) => it.cat === c.id).length]));
    const filter = document.getElementById('gallery-filter');
    filter.innerHTML = `<button type="button" data-cat="all" aria-pressed="true">全部 ${items.length}</button>`
      + CATS.filter((c) => counts[c.id]).map((c) => `<button type="button" data-cat="${c.id}" aria-pressed="false">${QQ.icon(c.icon)}${c.name} ${counts[c.id]}</button>`).join('');
    filter.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      filter.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      box.querySelectorAll('.gal-item').forEach((el) => { el.hidden = b.dataset.cat !== 'all' && el.dataset.cat !== b.dataset.cat; });
    });
    const want = QQ.param('cat');
    if (want) filter.querySelector(`[data-cat="${CSS.escape(want)}"]`)?.click();
  });
})();
