// 角色頁
(function () {
  const QQ = window.QQ;

  // 還沒讀到這個人第一次出場的章節：整張卡片先藏起來
  const appeared = (c) => QQ.isRead(QQ.charFirst(c.id));

  function factsHtml(c) {
    const rows = (c.facts || []).map(([k, v, lv]) =>
      `<dt>${QQ.esc(k)}</dt><dd>${QQ.guard(lv || 0, QQ.esc(v), 'inline')}</dd>`);
    // 糯米的尾巴：只列到讀者讀到的章節
    if (c.tails) {
      const known = c.tails.filter(([no]) => QQ.isRead(no));
      const more = c.tails.length - known.length;
      const text = known.map(([no, n]) => `${QQ.chapterLabel(no)}${'零一二三四五六七八九'[n]}條`).join(' → ');
      const rest = more ? QQ.guard(QQ.maxCh(c.tails.map(([no]) => no)), ` → ${c.tails.filter(([no]) => !QQ.isRead(no)).map(([no, n]) => `${QQ.chapterLabel(no)}${'零一二三四五六七八九'[n]}條`).join(' → ')}`, 'inline', '後面還有') : '';
      rows.splice(1, 0, `<dt>尾巴</dt><dd>${QQ.esc(text)}${rest}</dd>`);
    }
    return rows.length ? `<dl class="facts">${rows.join('')}</dl>` : '';
  }

  function portraitHtml(c) {
    let p = c.portrait;
    if (c.portraitBefore && !QQ.isRead(c.portraitBefore.level)) p = c.portraitBefore;
    if (!p) return `<div class="portrait portrait--blank" aria-hidden="true">${QQ.esc(c.name)}</div>`;
    // 角色設定圖：圖片下面一顆按鈕，點了看大圖
    let sheet = '';
    if (c.sheet) {
      const btn = `<button type="button" class="sheet-btn" data-full="${QQ.esc(c.sheet.src)}" data-caption="">${QQ.icon('name_tag')}角色設定圖</button>`;
      sheet = QQ.guard(c.sheet.spoiler || 0, btn, 'inline', `角色設定圖（${QQ.chapterLabel(c.sheet.spoiler || 0)}）`);
    }
    return `<div class="portrait"><img src="${QQ.esc(p.src)}" data-full="${QQ.esc(p.full || p.src)}" alt="${QQ.esc(p.caption)}" data-caption="">${sheet}</div>`;
  }

  function charHtml(c) {
    const chapters = QQ.chaptersWith(c.id);
    let inner = '';
    if (c.banner) {
      inner += `<img class="char-banner" src="${QQ.esc(c.banner.src)}" data-full="${QQ.esc(c.banner.src)}" alt="${QQ.esc(c.banner.caption)}" data-caption="">`;
    }
    inner += `<div class="char-head">${portraitHtml(c)}<div>`;
    inner += `<h2>${QQ.esc(c.name)}${QQ.icon(c.icon, 'icon--big icon--after')}</h2><p class="char-tagline">${QQ.esc(c.tagline)}</p>`;
    inner += factsHtml(c);
    inner += `<div class="prose">${QQ.paras(c.body)}</div>`;
    inner += (c.quotes || []).map(QQ.quoteHtml).join('');
    inner += '</div></div>';
    if ((c.stickers || []).length) {
      inner += `<h3>表情貼</h3><ul class="stickers">${c.stickers.map(([file, name]) =>
        `<li><img src="images/icons/${QQ.esc(file)}.gif" alt="${QQ.esc(name)}" title="${QQ.esc(name)}" loading="lazy" width="72" height="72"><span>${QQ.esc(name)}</span></li>`).join('')}</ul>`;
    }
    if ((c.images || []).length) {
      inner += `<h3>插畫</h3><div class="gallery">${c.images.map((im) => QQ.figureHtml(im, true)).join('')}</div>`;
    }
    if ((c.places || []).length) {
      inner += `<h3>常出現的地方</h3><div class="chips">${c.places.map(QQ.placeChip).join('')}</div>`;
    }
    if (chapters.length) {
      inner += `<h3>出場章節（讀到的有 ${chapters.length} 章）</h3><div class="chips">${chapters.map((ch) => QQ.chapterChip(ch.no, true)).join('')}</div>`;
    }
    const first = QQ.charFirst(c.id);
    const body = appeared(c) ? inner : QQ.guard(first, inner, 'card', `${QQ.chapterLabel(first)}登場的人`);
    return `<article class="char" id="${c.id}" style="--c:${c.color}">${body}</article>`;
  }

  // 關係圖：用 SVG 畫，頭像可以點；還沒出場的人和還沒讀到的關係不畫
  function relationsSvg() {
    const R = QQ.relations;
    if (!R) return '';
    const r = 34;
    const pos = {};
    R.nodes.forEach((n) => {
      const c = QQ.character(n.id);
      if (c && appeared(c)) pos[n.id] = n;
    });
    let defs = '';
    let lines = '';
    let labels = '';
    let nodes = '';
    R.edges.forEach((e) => {
      const a = pos[e.from];
      const b = pos[e.to];
      if (!a || !b || !QQ.isRead(e.level || 0)) return;
      lines += `<line class="rel-line${e.style === 'love' ? ' rel-line--love' : ''}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`;
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const w = [...e.label].length * 13 + 14;
      labels += `<g class="rel-label${e.style === 'love' ? ' rel-label--love' : ''}"><rect x="${mx - w / 2}" y="${my - 11}" width="${w}" height="22" rx="11"/><text x="${mx}" y="${my + 4}">${QQ.esc(e.label)}</text></g>`;
      if (e.sub && QQ.isRead(e.subLevel || 0)) labels += `<text class="rel-sub" x="${mx}" y="${my + 30}">${QQ.esc(e.sub)}</text>`;
    });
    Object.values(pos).forEach((n) => {
      const c = QQ.character(n.id);
      defs += `<clipPath id="rel-clip-${n.id}"><circle cx="${n.x}" cy="${n.y}" r="${r}"/></clipPath>`;
      const face = c.avatar
        ? `<image href="${QQ.esc(c.avatar)}" x="${n.x - r}" y="${n.y - r}" width="${r * 2}" height="${r * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#rel-clip-${n.id})"/>`
        : `<text class="rel-mark" x="${n.x}" y="${n.y + 8}">${QQ.esc(c.mark || c.name.slice(-1))}</text>`;
      nodes += `<a class="rel-node" href="#${n.id}"><title>${QQ.esc(c.name)}</title>
        <circle cx="${n.x}" cy="${n.y}" r="${r + 4}" fill="${c.color}"/>${face}
        <text class="rel-name" x="${n.x}" y="${n.y + r + 22}">${QQ.esc(c.name)}</text></a>`;
    });
    return `<svg class="rel-svg" viewBox="0 0 ${R.width} ${R.height}" role="img" aria-label="角色關係圖"><defs>${defs}</defs>${lines}${labels}${nodes}</svg>`;
  }

  // 配角：小卡片。有好幾張圖（例如石頭小時候和老了）時，一次只顯示一張，下面用按鈕切換
  function minorPics(c) {
    const pics = [c.portrait, ...(c.images || [])].filter(Boolean);
    if (!pics.length) return '';
    const img = (im) => `<img src="${QQ.esc(im.src)}" data-full="${QQ.esc(im.full || im.src)}" data-caption="${QQ.esc(im.caption)}" alt="${QQ.esc(im.caption)}" loading="lazy">`;
    if (pics.length === 1) return `<div class="minor-pics">${img(pics[0])}</div>`;
    const tabs = pics.map((im, i) => {
      const label = QQ.esc(im.caption.replace(c.name, '').replace(/的$/, '') || im.caption);
      const locked = !QQ.isRead(QQ.imageLevel(im));
      return `<button type="button" class="pic-tab" data-i="${i}" aria-pressed="${i === 0}"${locked ? ` data-locked="${QQ.esc(QQ.chapterLabel(QQ.imageLevel(im)))}"` : ''}>${locked ? QQ.icon('lock') : ''}${label}</button>`;
    }).join('');
    return `<div class="minor-pics minor-pics--tabs">${pics.map((im, i) => `<div class="pic-pane"${i ? ' hidden' : ''}>${img(im)}</div>`).join('')}
      <div class="pic-tabs" role="group" aria-label="切換圖片">${tabs}</div></div>`;
  }

  function minorHtml(c) {
    const chapters = QQ.chaptersWith(c.id);
    const first = QQ.charFirst(c.id);
    const inner = `${minorPics(c)}
      <h3 style="display:flex;align-items:center;gap:8px">${QQ.avatarHtml(c, 'sm')}${QQ.esc(c.name)}${QQ.icon(c.icon)}</h3>
      ${QQ.guard(c.level || 0, `<p>${QQ.esc(c.tagline)}</p>`)}
      <div class="chips">${(c.places || []).map(QQ.placeChip).join('')}</div>
      ${chapters.length ? `<p style="margin:8px 0 0;font-size:.85rem">出場：${chapters.map((ch) => `<a href="${QQ.chapterHref(ch.no)}">${QQ.chapterLabel(ch.no)}</a>`).join('、')}</p>` : ''}`;
    const body = appeared(c) ? inner : QQ.guard(first, inner, 'card', `${QQ.chapterLabel(first)}登場的人`);
    return `<div class="spot-box minor" id="${c.id}" style="--c:${c.color}">${body}</div>`;
  }

  function setupPicTabs(root) {
    root.addEventListener('click', (e) => {
      const tab = e.target.closest('.pic-tab');
      if (!tab) return;
      const box = tab.closest('.minor-pics--tabs');
      if (tab.dataset.locked && !confirm(`這張圖有${tab.dataset.locked}的內容，還是要看嗎？`)) return;
      delete tab.dataset.locked;
      tab.querySelector('.icon')?.remove();
      const i = Number(tab.dataset.i);
      box.querySelectorAll('.pic-pane').forEach((p, j) => { p.hidden = j !== i; });
      box.querySelectorAll('.pic-tab').forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const main = QQ.characters.filter((c) => !c.minor);
    const minor = QQ.characters.filter((c) => c.minor);
    document.getElementById('relations').innerHTML = relationsSvg();
    const picker = document.getElementById('char-picker');
    picker.innerHTML = main.filter(appeared).map((c) =>
      `<a href="#${c.id}">${QQ.avatarHtml(c)}<span>${QQ.esc(c.name)}</span></a>`).join('');
    const list = document.getElementById('char-list');
    list.innerHTML = main.map(charHtml).join('')
      + `<section class="section"><h2>其他的人</h2><div class="spots-grid">${minor.map(minorHtml).join('')}</div></section>`;
    setupPicTabs(list);
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  });
})();
