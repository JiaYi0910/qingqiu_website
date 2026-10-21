// 信物頁
(function () {
  const QQ = window.QQ;

  function imgHtml(it) {
    if (!it.image) return '';
    return `<img class="item__img" src="${QQ.esc(it.image.src)}" data-full="${QQ.esc(it.image.full || it.image.src)}" data-caption="" alt="${QQ.esc(it.image.caption)}" loading="lazy">`;
  }

  // 後來的章節又寫到它：more 裡的段落各自照章節上鎖；「現在在哪」用讀者讀到的最新一段
  function nowOf(it) {
    const later = (it.more || []).filter((m) => m.now && QQ.isRead(m.level));
    return later.length ? later[later.length - 1].now : it.now;
  }

  function chaptersOf(it) {
    return [...new Set([...(it.ch || []), ...(it.more || []).map((m) => m.level)])].sort((a, b) => a - b);
  }

  function detailHtml(it) {
    let html = `<dl class="facts item__facts"><dt>從哪裡來</dt><dd>${QQ.esc(it.from)}</dd><dt>給了誰</dt><dd>${QQ.esc(it.to)}</dd><dt>現在在哪</dt><dd>${QQ.esc(nowOf(it))}</dd></dl>`;
    html += `<p>${QQ.esc(it.text)}</p>`;
    html += QQ.paras((it.more || []).map((m) => ({ level: m.level, text: m.text })));
    if (it.quote) {
      const ch = QQ.chapter(it.quote.ch) || {};
      html += `<blockquote class="quote">「${QQ.esc(it.quote.text)}」<cite>${QQ.chapterLabel(it.quote.ch)}〈${QQ.esc(ch.title || '')}〉</cite></blockquote>`;
    }
    html += `<div class="chips">${(it.people || []).map(QQ.charChip).join('')}${(it.places || []).map(QQ.placeChip).join('')}</div>`;
    html += `<p class="item__chapters">出現在：${chaptersOf(it).map((no) =>`<a href="${QQ.chapterHref(no)}">${QQ.chapterLabel(no)}</a>`).join('、')}</p>`;
    return html;
  }

  function itemHtml(it) {
    const first = QQ.itemFirst(it);
    const last = QQ.itemLast(it);
    const title = `<h2>${QQ.icon(it.icon, 'icon--big')}${QQ.esc(it.name)}</h2>`;
    const full = `${imgHtml(it)}<div class="item__body">${title}${detailHtml(it)}</div>`;
    // 讀完它的整個故事：全部顯示
    if (QQ.isRead(last)) return `<article class="item" id="${it.id}">${full}</article>`;
    // 還沒讀到它第一次出現：連名字都先藏起來
    if (!QQ.isRead(first)) {
      return `<article class="item" id="${it.id}">${QQ.guard(first, full, 'block', `一樣${QQ.chapterLabel(first)}才出現的東西`)}</article>`;
    }
    // 讀到一半：留名字，故事先藏起來
    const rest = `${it.image ? `<div class="item__inline-img">${imgHtml(it)}</div>` : ''}${detailHtml(it)}`;
    return `<article class="item" id="${it.id}"><div class="item__body">${title}${QQ.guard(last, rest, 'block', `這樣東西的故事寫到${QQ.chapterLabel(last)}`)}</div></article>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const known = QQ.items.filter((it) => QQ.isRead(QQ.itemFirst(it)));
    const unknown = QQ.items.length - known.length;
    document.getElementById('item-index').innerHTML = known.map((it) =>
      `<a class="chip" href="#${it.id}">${QQ.icon(it.icon)}${QQ.esc(it.name)}</a>`).join('')
      + (unknown ? `<span class="chip chip--muted">${QQ.icon('lock')}還有 ${unknown} 樣你還沒讀到</span>` : '');
    document.getElementById('items').innerHTML = QQ.items.map(itemHtml).join('');
    if (location.hash) {
      const t = document.getElementById(QQ.hashId());
      if (t) t.scrollIntoView();
    }
  });
})();
