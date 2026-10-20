// 每一頁都會用到的小工具
(function () {
  const QQ = (window.QQ = window.QQ || {});

  // ---------- 文字 ----------
  const DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  function cnNumber(n) {
    if (n < 10) return DIGITS[n];
    if (n < 20) return '十' + (n % 10 ? DIGITS[n % 10] : '');
    return DIGITS[Math.floor(n / 10)] + '十' + (n % 10 ? DIGITS[n % 10] : '');
  }

  QQ.esc = function (value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);
  };

  // 章節的稱呼：0 → 序章，99 → 終章，其他 → 第N章
  QQ.chapterLabel = function (no) {
    if (no === 0) return '序章';
    if (no === 99) return '終章';
    return '第' + cnNumber(no) + '章';
  };

  QQ.param = (name) => new URLSearchParams(location.search).get(name);

  // 小圖示（images/icons/ 裡會動的圖：從糯米的表情符號資料夾複製 GIF，再轉成比較小的 WebP，一樣會動）
  QQ.icon = function (name, cls) {
    if (!name) return '';
    return `<img class="icon${cls ? ' ' + cls : ''}" src="images/icons/${name}.webp" alt="" aria-hidden="true">`;
  };

  // ---------- 找資料 ----------
  QQ.place = (id) => (QQ.places || []).find((p) => p.id === id);
  QQ.character = (id) => (QQ.characters || []).find((c) => c.id === id);
  QQ.chapter = (no) => (QQ.chapters || []).find((c) => c.no === no);
  QQ.region = (id) => (QQ.regions || {})[id];

  // ---------- 防劇透 ----------
  // 讀者選「讀到第幾章」，比那一章更後面的內容會先藏起來（可以一個一個點開看）。
  // 每段內容的「劇透章節」：章節用 ch，段落／事實用 level；沒寫就是 0（序章就知道的事）。
  // 選擇存在這台電腦的瀏覽器裡；存不了的時候改放在網址的 ?read= 上。
  const PROGRESS_KEY = 'qq-progress';
  QQ.ALL = 999; // 全部顯示
  QQ.progress = (function () {
    const fromUrl = new URLSearchParams(location.search).get('read');
    if (fromUrl !== null && fromUrl !== '' && !isNaN(Number(fromUrl))) return Number(fromUrl);
    try {
      const v = localStorage.getItem(PROGRESS_KEY);
      return v === null ? null : Number(v);
    } catch (e) {
      return null;
    }
  })();
  QQ.read = QQ.progress === null ? 0 : QQ.progress; // 還沒選：先當作只讀了序章
  QQ.isRead = (level) => (level || 0) <= QQ.read;
  QQ.setProgress = function (value) {
    let saved = false;
    try {
      localStorage.setItem(PROGRESS_KEY, String(value));
      saved = localStorage.getItem(PROGRESS_KEY) === String(value);
    } catch (e) { /* 瀏覽器不讓存 */ }
    const url = new URL(location.href);
    if (saved) url.searchParams.delete('read');
    else url.searchParams.set('read', String(value));
    location.href = url.toString();
  };

  const maxOf = (list) => (list && list.length ? Math.max(...list) : 0);
  const minOf = (list) => (list && list.length ? Math.min(...list) : 0);
  QQ.maxCh = maxOf;
  QQ.minCh = minOf;

  // 地點、角色第一次出現的章節（沒有出現過就當 0）
  QQ.placeFirst = (id) => minOf((QQ.chapters || []).filter((ch) => (ch.places || []).some((p) => p.id === id)).map((ch) => ch.no));
  QQ.charFirst = (id) => minOf((QQ.chapters || []).filter((ch) => ch.written && (ch.characters || []).includes(id)).map((ch) => ch.no));

  function lockLabel(level) {
    const ch = QQ.chapter(level);
    // 那一章還沒寫（或比最後一章還後面）才說「還沒寫」；沒載入章節資料的頁面就照章號寫
    const list = QQ.chapters || [];
    if (ch ? !ch.written : (list.length && level > QQ.maxCh(list.map((c) => c.no)))) return '還沒寫的內容';
    return `${QQ.chapterLabel(level)}的內容`;
  }

  // 還沒讀到就包成「點開看」；kind：block（段落）、inline（一行裡面）、fig（圖片）、card（整張卡片）
  QQ.guard = function (level, html, kind, label) {
    if (QQ.isRead(level)) return html;
    const text = label || lockLabel(level);
    const btn = `<button type="button" class="spoiler__btn">${QQ.icon('lock')}<span>${QQ.esc(text)}</span><small>點開看</small></button>`;
    if (kind === 'inline') return `<span class="spoiler spoiler--inline">${btn}<template>${html}</template></span>`;
    if (kind === 'fig') return `<figure class="spoiler spoiler--fig">${btn}<template>${html}</template></figure>`;
    if (kind === 'card') return `<div class="spoiler spoiler--card">${btn}<template>${html}</template></div>`;
    return `<div class="spoiler">${btn}<template>${html}</template></div>`;
  };

  // 段落：字串（序章就知道）或 { text, level }
  QQ.paras = function (list) {
    return (list || []).map((p) => (typeof p === 'string'
      ? `<p>${QQ.esc(p)}</p>`
      : QQ.guard(p.level, `<p>${QQ.esc(p.text)}</p>`))).join('');
  };

  QQ.quoteHtml = function (q) {
    const ch = QQ.chapter(q.ch) || {};
    return QQ.guard(q.ch, `<blockquote class="quote">「${QQ.esc(q.text)}」<cite>${QQ.chapterLabel(q.ch)}〈${QQ.esc(ch.title || '')}〉</cite></blockquote>`);
  };

  // 地點的一句話介紹、在哪裡：還沒讀到 safe.level 時，用 safe 裡的版本
  QQ.placeView = function (p) {
    const s = p.safe && !QQ.isRead(p.safe.level) ? p.safe : {};
    return { tagline: s.tagline || p.tagline, where: s.where || p.where };
  };

  // 信物：第一次出現、最後提到的章節
  QQ.itemFirst = (it) => minOf(it.ch);
  QQ.itemLast = (it) => maxOf(it.ch);

  // 圖片的劇透章節：spoiler（圖裡畫到的劇情）優先，再來是 ch
  QQ.imageLevel = (im) => (im.spoiler != null ? im.spoiler : (im.ch != null ? im.ch : 0));

  function progressOptions() {
    const opts = (QQ.chapters || []).filter((ch) => ch.written)
      .map((ch) => `<option value="${ch.no}"${QQ.progress === ch.no ? ' selected' : ''}>${QQ.chapterLabel(ch.no)}〈${QQ.esc(ch.title)}〉</option>`);
    opts.push(`<option value="${QQ.ALL}"${QQ.progress === QQ.ALL ? ' selected' : ''}>全部顯示</option>`);
    return opts.join('');
  }

  // 長的給電腦，短的給手機
  function progressText() {
    if (QQ.progress === null) return ['還沒選讀到哪裡', '防劇透'];
    if (QQ.progress >= QQ.ALL) return ['全部顯示', '全部'];
    return [`讀到${QQ.chapterLabel(QQ.progress)}`, QQ.chapterLabel(QQ.progress)];
  }

  function setupProgress() {
    // 頁首的「讀到哪裡」按鈕（搜尋按鈕的右邊）
    const head = document.querySelector('.site-header .wrap');
    if (head) {
      const [long, short] = progressText();
      head.insertAdjacentHTML('beforeend', `<button type="button" class="progress-btn" aria-haspopup="dialog" aria-label="防劇透：${long}">${QQ.icon('pin')}<span class="pt-long">${long}</span><span class="pt-short">${short}</span></button>`);
    }
    const dlg = document.createElement('dialog');
    dlg.className = 'progress-dlg';
    dlg.innerHTML = `<form method="dialog">
      <h2>${QQ.icon('pin')}防劇透</h2>
      <p>選你讀到的章節，比它更後面的內容會先藏起來；想看的話，可以一個一個點開。</p>
      <label>我讀到 <select name="read">${progressOptions()}</select></label>
      <div class="progress-dlg__actions">
        <button type="submit" value="cancel" class="btn btn--ghost">取消</button>
        <button type="submit" value="ok" class="btn">好了</button>
      </div>
    </form>`;
    document.body.appendChild(dlg);
    const sel = dlg.querySelector('select');
    if (QQ.progress === null) sel.value = '0';
    dlg.addEventListener('close', () => {
      if (dlg.returnValue === 'ok') QQ.setProgress(Number(sel.value));
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('.progress-btn')) dlg.showModal();
    });

    // 第一次來：頁面最上面問一次（放在 main 前面，頁面重畫 main 時才不會被蓋掉）
    const main = document.querySelector('main');
    if (QQ.progress === null && main && !('noProgress' in document.body.dataset)) {
      main.insertAdjacentHTML('beforebegin', `<section class="wrap progress-banner" aria-label="防劇透">
        ${QQ.icon('nuomi_what', 'icon--big')}
        <div class="progress-banner__text"><strong>怕被劇透嗎？</strong>選你讀到哪一章，後面的內容會先藏起來。沒選之前，只會顯示序章的內容。</div>
        <div class="progress-banner__form">
          <select aria-label="讀到哪一章">${progressOptions()}</select>
          <button type="button" class="btn" data-progress="pick">好了</button>
          <button type="button" class="btn btn--ghost" data-progress="all">全部都給我看</button>
        </div>
      </section>`);
      const banner = document.querySelector('.progress-banner');
      banner.querySelector('[data-progress="pick"]').addEventListener('click', () => QQ.setProgress(Number(banner.querySelector('select').value)));
      banner.querySelector('[data-progress="all"]').addEventListener('click', () => QQ.setProgress(QQ.ALL));
    }

    // 點開藏起來的內容
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.spoiler__btn');
      if (!btn) return;
      const box = btn.parentElement;
      const tpl = box.querySelector(':scope > template');
      if (tpl) box.replaceWith(tpl.content.cloneNode(true));
    });
  }

  // 某個地點（含它底下的小地方）出現過的章節，依章節順序
  QQ.chaptersAt = function (placeId) {
    return (QQ.chapters || [])
      .map((ch) => ({ ch, hits: (ch.places || []).filter((p) => p.id === placeId) }))
      .filter((x) => x.hits.length);
  };

  // 某個角色出現過的章節（只算已經寫好、而且讀者讀過的）
  QQ.chaptersWith = function (charId) {
    return (QQ.chapters || []).filter((ch) => ch.written && QQ.isRead(ch.no) && (ch.characters || []).includes(charId));
  };

  // ---------- 小元件（回傳 HTML 字串） ----------
  QQ.lineTag = function (line) {
    const map = { now: ['現在線', 'tag--now'], past: ['過去線', 'tag--past'], both: ['兩條線', 'tag--both'] };
    const [text, cls] = map[line] || ['', ''];
    return text ? `<span class="tag ${cls}">${text}</span>` : '';
  };

  QQ.placeHref = (id) => `place.html?id=${encodeURIComponent(id)}`;
  QQ.charHref = (id) => `characters.html#${encodeURIComponent(id)}`;
  QQ.chapterHref = (no) => `chapters.html#ch-${no}`;

  QQ.placeChip = function (id) {
    const p = QQ.place(id);
    if (!p) return '';
    if (p.kind === 'map') return `<span class="chip chip--muted">${QQ.esc(p.name)}</span>`;
    return `<a class="chip" href="${QQ.placeHref(id)}">${QQ.esc(p.name)}</a>`;
  };

  QQ.avatarHtml = function (c, size) {
    const cls = 'avatar' + (size === 'sm' ? ' avatar--sm' : '');
    if (c.avatar) return `<img class="${cls}" style="--c:${c.color}" src="${QQ.esc(c.avatar)}" alt="">`;
    return `<span class="${cls}" style="--c:${c.color}">${QQ.esc(c.mark || c.name.slice(-1))}</span>`;
  };

  QQ.charChip = function (id) {
    const c = QQ.character(id);
    if (!c) return '';
    return `<a class="chip" href="${QQ.charHref(id)}">${QQ.avatarHtml(c, 'sm')}${QQ.esc(c.name)}</a>`;
  };

  // compact = true 時只寫「第N章」，章名放在滑鼠提示裡
  QQ.chapterChip = function (no, compact) {
    const ch = QQ.chapter(no);
    const label = QQ.chapterLabel(no);
    const title = ch ? `〈${ch.title}〉` : '';
    if (compact === true) return `<a class="chip" href="${QQ.chapterHref(no)}" title="${QQ.esc(label + title)}">${label}</a>`;
    return `<a class="chip" href="${QQ.chapterHref(no)}">${label}${QQ.esc(title)}</a>`;
  };

  // ---------- 看大圖 ----------
  function setupLightbox() {
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.innerHTML = '<button type="button" aria-label="關閉">×</button><img alt=""><p></p>';
    document.body.appendChild(dlg);
    const img = dlg.querySelector('img');
    const cap = dlg.querySelector('p');
    dlg.querySelector('button').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    document.addEventListener('click', (e) => {
      const t = e.target.closest('img[data-full], button[data-full]');
      if (!t) return;
      img.src = t.dataset.full;
      img.alt = t.alt || t.textContent.trim();
      cap.textContent = t.dataset.caption ?? t.alt ?? '';
      dlg.showModal();
    });
  }

  // 圖片：{ src, caption, ch, spoiler, full }；plain = true 時圖片底下不寫字
  QQ.figureHtml = function (im, plain) {
    const chText = im.ch != null ? `・${QQ.chapterLabel(im.ch)}` : '';
    const cap = QQ.esc(im.caption) + chText;
    const full = QQ.esc(im.full || im.src); // 點開看大圖時用原圖（full 可省略）
    const html = plain === true
      ? `<figure><img src="${QQ.esc(im.src)}" data-full="${full}" data-caption="" alt="${QQ.esc(im.caption)}" loading="lazy"></figure>`
      : `<figure><img src="${QQ.esc(im.src)}" data-full="${full}" data-caption="${cap}" alt="${QQ.esc(im.caption)}" loading="lazy"><figcaption>${cap}</figcaption></figure>`;
    return QQ.guard(QQ.imageLevel(im), html, 'fig');
  };

  // ---------- 地點的風景圖 ----------
  // art 是這個地方的風景（放在最前面當大圖），後面接 images 裡的章節插畫
  QQ.placeImages = function (p) {
    const art = p.art ? [{ src: p.art.src, caption: p.name, spoiler: p.art.spoiler || 0 }] : [];
    return art.concat(p.images || []);
  };

  // ---------- 小地圖（初雪坡師門圖、人間地圖） ----------
  // spotsOf：初雪坡的小地方清單，用來把「spot」換成頁面裡的位置；active：要標亮的地點代號
  QQ.miniMapHtml = function (key, opts) {
    const m = (QQ.subMaps || {})[key];
    if (!m) return '';
    const o = opts || {};
    const spots = (o.spotsOf && o.spotsOf.spots) || [];
    const links = m.hotspots.map((h) => {
      let href = '';
      if (h.place) href = QQ.placeHref(h.place);
      else if (h.spot) { const i = spots.findIndex((s) => s.name === h.spot); href = i >= 0 ? `#spot-${i}` : ''; }
      else if (h.ch != null) href = QQ.chapterHref(h.ch);
      if (!href) return '';
      const w = ((h.w || 110) / m.width) * 100;
      const hh = ((h.h || 40) / m.height) * 100;
      const active = o.active && h.place === o.active ? ' is-active' : '';
      // data-place / data-spot：首頁「在地圖上看」用來找這一章的地方（師門圖的小地方都屬於 spotsOf 那個地點）
      const place = h.place || (h.spot && o.spotsOf ? o.spotsOf.id : '');
      const data = `${place ? ` data-place="${place}"` : ''}${h.spot ? ` data-spot="${QQ.esc(h.spot)}"` : ''}`;
      return `<a class="spot spot--novel${active}" href="${href}"${data} style="left:${(h.x / m.width) * 100}%;top:${(h.y / m.height) * 100}%;width:${w}%;height:${hh}%" aria-label="${QQ.esc(h.label)}"><span class="spot-dot"></span><span class="spot-tip">${QQ.esc(h.label)}</span></a>`;
    }).join('');
    return `<div class="map-frame map-frame--mini${QQ.param('debug') ? ' map-debug' : ''}"><div class="map-inner">
      <img src="${QQ.esc(m.image)}" alt="${QQ.esc(m.title)}" width="${m.width}" height="${m.height}" loading="lazy">
      <div class="map-layer">${links}</div></div></div>`;
  };

  // ---------- 搜尋（右上角的放大鏡） ----------
  // 每一頁只載入自己用得到的資料；打開搜尋時，再把缺的資料檔補載進來。
  const DATA_FILES = { places: 'places', characters: 'characters', chapters: 'chapters', items: 'items', lore: 'lore', quotes: 'quotes' };
  function loadData() {
    const base = document.querySelector('script[src*="js/common.js"]').getAttribute('src').replace('js/common.js', '');
    return Promise.all(Object.entries(DATA_FILES).filter(([key]) => !QQ[key]).map(([, file]) => new Promise((ok) => {
      const s = document.createElement('script');
      s.src = `${base}js/data/${file}.js`;
      s.onload = ok; s.onerror = ok;
      document.head.appendChild(s);
    })));
  }

  // 每一筆：kind 類別、title 標題、text 內容、href 連結、level 讀到第幾章才知道
  function searchIndex() {
    const out = [];
    const add = (kind, title, text, href, level) => out.push({ kind, title, text: String(text || ''), href, level: level || 0 });
    (QQ.places || []).forEach((p) => {
      const first = QQ.placeFirst(p.id);
      const href = QQ.placeHref(p.id);
      const v = QQ.placeView(p);
      add('地點', p.name, [p.name, v.tagline, v.where].join(' '), href, first);
      if (p.safe) add('地點', p.name, [p.tagline, p.where].join(' '), href, p.safe.level);
      (p.body || []).forEach((t) => (typeof t === 'string' ? add('地點', p.name, t, href, first) : add('地點', p.name, t.text, href, Math.max(first, t.level))));
      (p.spots || []).forEach((s) => {
        add('地點', `${p.name}・${s.name}`, `${s.name} ${s.text}`, href, Math.max(first, QQ.maxCh(s.ch)));
        (s.more || []).forEach((m) => add('地點', `${p.name}・${s.name}`, m.text, href, Math.max(first, m.level)));
      });
    });
    (QQ.characters || []).forEach((c) => {
      const first = QQ.charFirst(c.id);
      const href = QQ.charHref(c.id);
      add('角色', c.name, `${c.name} ${c.tagline}`, href, Math.max(first, c.level || 0));
      (c.facts || []).forEach(([k, v, lv]) => add('角色', c.name, `${k}：${v}`, href, Math.max(first, lv || 0)));
      (c.body || []).forEach((t) => (typeof t === 'string' ? add('角色', c.name, t, href, first) : add('角色', c.name, t.text, href, Math.max(first, t.level))));
    });
    (QQ.chapters || []).forEach((ch) => {
      const title = `${QQ.chapterLabel(ch.no)}〈${ch.title}〉`;
      add('章節', title, title, QQ.chapterHref(ch.no), 0);
      add('章節', title, [ch.summary, ...(ch.places || []).map((x) => x.what)].join(' '), QQ.chapterHref(ch.no), ch.written ? ch.no : 99);
    });
    (QQ.items || []).forEach((it) => {
      const href = `items.html#${it.id}`;
      add('信物', it.name, it.name, href, QQ.itemFirst(it));
      add('信物', it.name, [it.from, it.to, it.now, it.text].join(' '), href, QQ.itemLast(it));
      (it.more || []).forEach((m) => add('信物', it.name, `${m.text} ${m.now || ''}`, href, Math.max(QQ.itemLast(it), m.level)));
    });
    (QQ.quotes || []).forEach((q, i) => {
      const c = QQ.character(q.who);
      add('名句', `「${q.text}」`, `${q.text} ${q.as || (c && c.name) || ''} ${q.note || ''}`, `quotes.html#q-${i}`, q.ch);
    });
    (QQ.lore || []).forEach((s) => s.entries.forEach((e) => add('小百科', `${s.title}・${e.term}`, `${e.term} ${e.text}`, `lore.html#${s.id}`, e.level != null ? e.level : QQ.minCh(e.ch))));
    return out;
  }

  function snippet(text, terms) {
    const i = Math.max(0, text.indexOf(terms[0]));
    const start = Math.max(0, i - 24);
    let s = (start > 0 ? '…' : '') + text.slice(start, i + 60) + (i + 60 < text.length ? '…' : '');
    s = QQ.esc(s);
    terms.forEach((t) => { s = s.split(QQ.esc(t)).join(`<mark>${QQ.esc(t)}</mark>`); });
    return s;
  }

  function setupSearch() {
    const head = document.querySelector('.site-header .wrap');
    if (!head) return;
    head.insertAdjacentHTML('beforeend', `<button type="button" class="search-btn" aria-haspopup="dialog" aria-label="搜尋">${QQ.icon('magnifier')}<span class="pt-long">搜尋</span></button>`);
    const dlg = document.createElement('dialog');
    dlg.className = 'search-dlg';
    dlg.innerHTML = `<div class="search-dlg__head">${QQ.icon('magnifier')}<input type="search" placeholder="搜尋地點、章節、角色、信物、名句…（例如：簪子、寒潭、油豆腐）" aria-label="搜尋">
      <button type="button" class="search-dlg__close" aria-label="關閉">×</button></div>
      <div class="search-dlg__body"><p class="search-hint">輸入兩個字以上開始找。只會找你讀到的章節，不會劇透。</p></div>`;
    document.body.appendChild(dlg);
    const input = dlg.querySelector('input');
    const body = dlg.querySelector('.search-dlg__body');
    let index = null;

    function run() {
      const q = input.value.trim();
      if (!index) { body.innerHTML = '<p class="search-hint">載入中…</p>'; return; }
      if ([...q].length < 2) { body.innerHTML = '<p class="search-hint">輸入兩個字以上開始找。只會找你讀到的章節，不會劇透。</p>'; return; }
      const terms = q.split(/\s+/).filter(Boolean);
      const hits = index.filter((e) => terms.every((t) => e.text.includes(t) || e.title.includes(t)));
      const shown = hits.filter((e) => QQ.isRead(e.level));
      const hidden = hits.length - shown.length;
      // 同一個連結最多列兩筆
      const per = {};
      const list = shown.filter((e) => (per[e.href] = (per[e.href] || 0) + 1) <= 2).slice(0, 40);
      let html = list.length
        ? `<ul class="search-results">${list.map((e) => `<li><a href="${e.href}"><span class="search-kind">${e.kind}</span><strong>${QQ.esc(e.title)}</strong><span class="search-snip">${snippet(e.text, terms)}</span></a></li>`).join('')}</ul>`
        : `<p class="search-hint">${QQ.icon('nuomi_what')}找不到「${QQ.esc(q)}」。</p>`;
      if (hidden) html += `<p class="search-hidden">${QQ.icon('lock')}還有 ${hidden} 筆在你還沒讀到的章節裡，先不顯示。</p>`;
      body.innerHTML = html;
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('.search-btn')) {
        dlg.showModal();
        input.focus();
        if (!index) loadData().then(() => { index = searchIndex(); run(); });
      }
    });
    dlg.querySelector('.search-dlg__close').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    input.addEventListener('input', run);
    // 點了同一頁裡的結果（例如 #ch-5）：關掉搜尋再捲過去
    body.addEventListener('click', (e) => { if (e.target.closest('a')) dlg.close(); });
  }

  // ---------- 瀏覽人數（GoatCounter） ----------
  // 在 goatcounter.com 註冊後，把你的 Code 填在這裡（例如 'qingqiu'），後台是 https://qingqiu.goatcounter.com
  // 不用 cookie、不記個人資料；只在網路上的網站計數，自己電腦上打開不會算。
  QQ.goatcounter = 'jiayi';
  function setupCounter() {
    if (!QQ.goatcounter || !/github\.io$/.test(location.hostname)) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.dataset.goatcounter = `https://${QQ.goatcounter}.goatcounter.com/count`;
    document.head.appendChild(s);
  }

  // ---------- 外部連結（首頁按鈕和每一頁的頁尾都會出現） ----------
  QQ.links = [
    { label: '加入 Discord', icon: 'nuomi_hi', href: 'https://discord.gg/Cu5AFdTFCa' },
    { label: '在 KadoKado 讀《墨染櫻雪》', icon: 'book_open', href: 'https://www.kadokado.com.tw/book/92097?utm_source=kado_creator&utm_medium=book_link' },
  ];

  function linksHtml(cls) {
    return `<nav class="${cls}" aria-label="外部連結">${QQ.links.map((l) =>
      `<a href="${QQ.esc(l.href)}" target="_blank" rel="noopener">${QQ.icon(l.icon)}${QQ.esc(l.label)} ↗</a>`).join('')}</nav>`;
  }

  function renderLinks() {
    const home = document.getElementById('links');
    if (home) home.innerHTML = linksHtml('ext-links ext-links--big');
    document.querySelectorAll('.site-footer').forEach((f) => f.insertAdjacentHTML('afterbegin', linksHtml('ext-links')));
  }

  // ---------- 頁首選單（每一頁共用，要加頁面改這裡） ----------
  // group：放進同一個下拉選單（標題列才不會太長）
  QQ.navGroups = {
    story: { label: '故事', icon: 'book_open' },
    world: { label: '世界', icon: 'books' },
    art: { label: '畫廊', icon: 'palette' },
  };
  QQ.pages = [
    { id: 'map', label: '青丘地圖', icon: 'map', href: 'index.html' },
    { id: 'characters', label: '角色', icon: 'name_tag', href: 'characters.html' },
    { id: 'chapters', group: 'story', label: '章節', icon: 'book_open', href: 'chapters.html' },
    { id: 'timeline', group: 'story', label: '時間軸', icon: 'hourglass', href: 'timeline.html' },
    { id: 'quotes', group: 'story', label: '名句', icon: 'chat_bubble', href: 'quotes.html' },
    { id: 'items', group: 'world', label: '信物', icon: 'gift', href: 'items.html' },
    { id: 'lore', group: 'world', label: '小百科', icon: 'books', href: 'lore.html' },
    { id: 'au', group: 'art', label: '番外・現代校園', icon: 'study', href: 'au.html' },
    { id: 'merch', group: 'art', label: '周邊設計', icon: 'hearts', href: 'merch.html' },
  ];

  // 頁首的站名：小櫻花＋「墨染」墨色、「櫻雪」櫻粉＋「青丘地圖」印章（每一頁共用，改這裡就好）
  function renderBrand() {
    document.querySelectorAll('.site-header .brand').forEach((b) => {
      b.innerHTML = `<img class="brand-mark" src="images/icons/sakura.webp" alt="">
        <span class="brand-title"><span class="brand-ink">墨染</span><span class="brand-sakura">櫻雪</span></span>
        <span class="brand-seal" aria-label="青丘地圖"><span>青丘</span><span>地圖</span></span>`;
      b.setAttribute('aria-label', '墨染櫻雪・青丘地圖（回首頁）');
    });
  }

  function markNav() {
    renderBrand();
    const page = document.body.dataset.page;
    const link = (p) => `<a href="${p.href}"${p.id === page ? ' aria-current="page"' : ''}>${QQ.icon(p.icon)}${p.label}</a>`;
    let html = '';
    const done = new Set();
    QQ.pages.forEach((p) => {
      if (!p.group) { html += link(p); return; }
      if (done.has(p.group)) return;
      done.add(p.group);
      const g = QQ.navGroups[p.group];
      const items = QQ.pages.filter((x) => x.group === p.group);
      const here = items.some((x) => x.id === page);
      html += `<div class="nav-group">
        <button type="button" class="nav-group__btn${here ? ' is-current' : ''}" aria-expanded="false" aria-haspopup="true" aria-controls="nav-menu-${p.group}">${QQ.icon(g.icon)}${g.label}<span class="nav-caret" aria-hidden="true">▾</span></button>
      </div>`;
      // 選單本身掛在 body 最外層，不會被頁首裁掉或擋住
      document.body.insertAdjacentHTML('beforeend', `<div class="nav-menu" id="nav-menu-${p.group}" hidden>${items.map(link).join('')}</div>`);
    });
    document.querySelectorAll('.site-nav').forEach((nav) => { nav.innerHTML = html; });

    // 下拉選單：點按鈕開關，點外面或按 Esc 關掉
    const closeAll = (except) => document.querySelectorAll('.nav-group__btn').forEach((b) => {
      if (b === except) return;
      document.getElementById(b.getAttribute('aria-controls')).hidden = true;
      b.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-group__btn');
      if (!btn) { if (!e.target.closest('.nav-menu')) closeAll(); return; }
      const menu = document.getElementById(btn.getAttribute('aria-controls'));
      const open = menu.hidden;
      closeAll(btn);
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        const r = btn.getBoundingClientRect();
        menu.style.top = `${r.bottom + 6}px`;
        const w = menu.offsetWidth;
        menu.style.left = `${Math.max(12, Math.min(r.left, window.innerWidth - w - 12))}px`;
        menu.querySelector('a')?.focus({ preventScroll: true });
      }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
    window.addEventListener('scroll', () => closeAll(), { passive: true });
    window.addEventListener('resize', () => closeAll());
    // 每一頁標題上方的大圖示
    const me = QQ.pages.find((p) => p.id === page);
    const title = document.querySelector('.page-title');
    if (me && title) title.insertAdjacentHTML('afterbegin', QQ.icon(me.icon, 'icon--title'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    markNav();
    setupLightbox();
    renderLinks();
    setupSearch();
    setupProgress();
    setupCounter();
  });
})();
