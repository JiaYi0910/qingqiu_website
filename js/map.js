// 首頁：可以點的青丘地圖
(function () {
  const QQ = window.QQ;

  function hotspotHtml(h) {
    const p = QQ.place(h.place);
    if (!p) return '';
    const w = ((h.w || 110) / QQ.map.width) * 100;
    const hh = ((h.h || 38) / QQ.map.height) * 100;
    const x = (h.x / QQ.map.width) * 100;
    const y = (h.y / QQ.map.height) * 100;
    const kind = h.arrow ? 'spot--arrow' : p.kind === 'map' ? 'spot--map' : 'spot--novel';
    return `<button type="button" class="spot ${kind}" data-place="${p.id}"
      style="left:${x}%;top:${y}%;width:${w}%;height:${hh}%"
      aria-label="${QQ.esc(p.name)}"><span class="spot-dot"></span><span class="spot-tip">${QQ.esc(p.name)}</span></button>`;
  }

  function cardHtml(p) {
    const region = QQ.region(p.region);
    const view = QQ.placeView(p);
    const img = QQ.placeImages(p).find((im) => QQ.isRead(QQ.imageLevel(im))); // 第一張讀者讀過的圖
    const chapters = QQ.chaptersAt(p.id).filter((x) => QQ.isRead(x.ch.no));
    const later = QQ.chaptersAt(p.id).length - chapters.length;
    const people = (p.characters || []).filter((id) => QQ.isRead(QQ.charFirst(id)));
    let html = '';
    if (img) html += `<img class="spot-card__img" src="${QQ.esc(img.src)}" alt="${QQ.esc(img.caption)}">`;
    html += '<div class="spot-card__body">';
    html += `<span class="tag tag--region">${QQ.esc(region ? region.name : '')}</span> `;
    if (p.kind === 'map') html += '<span class="tag tag--map">小說裡沒有寫到</span>';
    html += `<h2>${QQ.esc(p.name)}</h2>`;

    // 讀者還沒讀到這個地方：只留名字
    const first = QQ.placeFirst(p.id);
    if (!QQ.isRead(first)) {
      html += `<p>${QQ.icon('lock')}這個地方在${QQ.chapterLabel(first)}才出現，先不劇透。</p>`;
      html += `<a class="cta" href="${QQ.placeHref(p.id)}">還是要看 →</a></div>`;
      return html;
    }

    if (p.mapNote) html += `<p class="note">${QQ.esc(p.mapNote)}</p>`;
    html += `<p>${QQ.esc(view.tagline)}</p>`;
    if (view.where) html += `<p style="color:var(--ink-faint);font-size:.9rem">${QQ.esc(view.where)}</p>`;

    if (chapters.length) {
      html += `<p style="margin-top:12px"><strong>相關章節 ${chapters.length} 章</strong></p><div class="chips">`;
      html += chapters.slice(0, 6).map((x) => QQ.chapterChip(x.ch.no)).join('');
      if (chapters.length > 6) html += `<span class="chip chip--muted">還有 ${chapters.length - 6} 章</span>`;
      html += '</div>';
    }
    if (later) html += `<p style="font-size:.85rem;color:var(--ink-faint)">${QQ.icon('lock')}後面還有 ${later} 章，你還沒讀到</p>`;
    if (people.length) {
      html += '<p style="margin-top:12px"><strong>會在這裡遇到</strong></p><div class="chips">';
      html += people.map(QQ.charChip).join('');
      html += '</div>';
    }
    if (p.kind !== 'map') html += `<a class="cta" href="${QQ.placeHref(p.id)}">走進${QQ.esc(p.name)} →</a>`;
    html += '</div>';
    return html;
  }

  function regionListHtml() {
    const order = ['qingqiu', 'yunye', 'renjian', 'far'];
    return order.map((rid) => {
      const r = QQ.region(rid);
      const list = QQ.places.filter((p) => p.region === rid);
      const novel = list.filter((p) => p.kind !== 'map');
      const mapOnly = list.filter((p) => p.kind === 'map');
      return `<div class="region-box">
        <h3>${QQ.icon(r.icon)}${QQ.esc(r.name)}</h3><p>${QQ.esc(r.desc)}</p>
        <div class="chips">${novel.map((p) => QQ.placeChip(p.id)).join('')}</div>
        ${mapOnly.length ? `<p style="margin:10px 0 6px;font-size:.85rem">地圖上的地名（小說裡沒有寫到）</p>
        <div class="chips">${mapOnly.map((p) => `<button type="button" class="chip chip--muted" data-open="${p.id}" style="cursor:pointer;font:inherit;font-size:.88rem">${QQ.esc(p.name)}</button>`).join('')}</div>` : ''}
      </div>`;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const frame = document.getElementById('map');
    const layer = frame.querySelector('.map-layer');
    const card = document.getElementById('spot-card');
    const cardBody = card.querySelector('.spot-card__content');

    frame.querySelector('img').src = QQ.map.image;
    layer.innerHTML = QQ.map.hotspots.map(hotspotHtml).join('');
    if (QQ.param('debug')) frame.classList.add('map-debug');

    let lastButton = null;
    function open(id, button) {
      const p = QQ.place(id);
      if (!p) return;
      layer.querySelectorAll('.spot.is-active').forEach((b) => b.classList.remove('is-active'));
      const btn = button || layer.querySelector(`[data-place="${id}"]`);
      if (btn) btn.classList.add('is-active');
      // 手機上地圖可以左右滑：把這個地點捲到中間
      if (btn && frame.scrollWidth > frame.clientWidth) frame.scrollLeft = btn.offsetLeft - frame.clientWidth / 2;
      lastButton = btn;
      cardBody.innerHTML = cardHtml(p);
      card.hidden = false;
      card.scrollTop = 0;
      card.querySelector('.spot-card__close').focus({ preventScroll: true });
    }
    function close() {
      card.hidden = true;
      layer.querySelectorAll('.spot.is-active').forEach((b) => b.classList.remove('is-active'));
      if (lastButton) lastButton.focus({ preventScroll: true });
    }

    layer.addEventListener('click', (e) => {
      const btn = e.target.closest('.spot');
      if (btn) open(btn.dataset.place, btn);
    });
    card.querySelector('.spot-card__close').addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !card.hidden) close(); });

    // 最近更新：寫到第幾章、KadoKado 上架到第幾章（自動算），加上 updates.js 的最新三筆
    const upd = document.getElementById('updates');
    if (upd) {
      const written = QQ.chapters.filter((c) => c.written);
      const latest = written[written.length - 1];
      const onKado = QQ.chapters.filter((c) => c.kado);
      const kado = onKado[onKado.length - 1];
      let html = `<h2>${QQ.icon('megaphone')}最近更新</h2><div class="updates__now">`;
      // 每一章都寫好了：改成「全書完結」
      const done = QQ.chapters.every((c) => c.written);
      if (done) html += `<a class="chip" href="chapters.html">${QQ.icon('book_open')}《墨染櫻雪》全書完結</a>`;
      else if (latest) html += `<a class="chip" href="${QQ.chapterHref(latest.no)}">${QQ.icon('book_open')}小說寫到${QQ.chapterLabel(latest.no)}〈${QQ.esc(latest.title)}〉</a>`;
      if (kado) html += `<a class="chip" href="https://www.kadokado.com.tw/chapter/${encodeURIComponent(kado.kado)}" target="_blank" rel="noopener">${QQ.icon('star')}KadoKado 上架到${QQ.chapterLabel(kado.no)} ↗</a>`;
      html += '</div>';
      html += `<ul>${(QQ.updates || []).slice(0, 3).map((u) => `<li><time datetime="${QQ.esc(u.date)}">${QQ.esc(u.date)}</time><span>${QQ.esc(u.text)}</span></li>`).join('')}</ul>`;
      upd.innerHTML = html;
    }

    // 兩張小地圖：人間、初雪坡師門（師門圖的小地方會連到初雪坡頁）
    const mini = document.getElementById('mini-maps');
    if (mini) {
      const shimen = QQ.miniMapHtml('shimen', { spotsOf: QQ.place('chuxuepo') }).replace(/href="#spot-/g, 'href="place.html?id=chuxuepo#spot-');
      mini.innerHTML = `<figure>${QQ.miniMapHtml('renjian')}<figcaption>${QQ.icon('rain')}人間：雲棲渡的霧外面</figcaption></figure>
        <figure>${shimen}<figcaption>${QQ.icon('broom')}初雪坡・師門</figcaption></figure>`;
    }

    const regions = document.getElementById('regions');
    regions.innerHTML = regionListHtml();
    regions.addEventListener('click', (e) => {
      const b = e.target.closest('[data-open]');
      if (b) open(b.dataset.open);
    });

    // 從別頁帶 ?place=xxx 回來時，直接打開那張小卡
    const want = QQ.param('place');
    if (want) open(want);

    setupRoute(frame, card);
  });

  // ---------- 在地圖上看（網址 ?ch=章號）----------
  // 地圖上只亮這一章出現的地方，號碼是這一章 places 的順序；同一個地方出現兩次就寫「1・3」。
  // 人間的地方標在下面的人間地圖，初雪坡裡的小地方標在師門圖。
  const routeChapters = () => QQ.chapters.filter((c) => c.written && (c.places || []).length);

  // 在一張地圖上找這一站的木牌：先找同一個小地方，沒有就找整個地點；同一個地方有兩個木牌時，挑名字一樣的
  function findSpot(frameEl, step) {
    const all = [...frameEl.querySelectorAll('.spot')].filter((el) => el.dataset.place === step.id);
    const exact = step.spot ? all.filter((el) => el.dataset.spot === step.spot) : [];
    const list = exact.length ? exact : all.filter((el) => !el.dataset.spot);
    const name = exact.length ? step.spot : (QQ.place(step.id) || {}).name;
    return list.find((el) => el.getAttribute('aria-label') === name) || list[0] || null;
  }

  function markRoute(frameEl, steps) {
    const nums = new Map();
    steps.forEach((s, i) => {
      const el = findSpot(frameEl, s);
      if (el) nums.set(el, [...(nums.get(el) || []), i + 1]);
    });
    nums.forEach((list, el) => {
      el.classList.add('on-route');
      el.classList.toggle('near-top', parseFloat(el.style.top) < 10);
      el.insertAdjacentHTML('beforeend', `<span class="route-no">${list.join('・')}</span>`);
    });
    frameEl.classList.toggle('is-route', nums.size > 0);
    return nums;
  }

  function clearRoute(frameEl) {
    frameEl.classList.remove('is-route');
    frameEl.querySelectorAll('.on-route').forEach((el) => el.classList.remove('on-route', 'near-top'));
    frameEl.querySelectorAll('.route-no, .route-away').forEach((el) => el.remove());
  }

  function setChParam(no) {
    try {
      const u = new URL(location.href);
      if (no == null) u.searchParams.delete('ch');
      else u.searchParams.set('ch', no);
      history.replaceState(null, '', u);
    } catch (e) { /* 直接雙擊打開檔案時，有些瀏覽器不讓改網址，沒關係 */ }
  }

  function setupRoute(frame, card) {
    const panel = document.getElementById('route');
    const stepsBox = document.getElementById('route-steps');
    const start = document.getElementById('route-start');
    const miniFrames = [...document.querySelectorAll('#mini-maps .map-frame')];
    const [renjianFrame, shimenFrame] = miniFrames;
    const revealed = new Set(); // 還沒讀到、但按了「還是要看」的章節
    let current = null;

    start.innerHTML = `<button type="button">${QQ.icon('book_open')}一章一章看，故事走過哪裡</button>`;
    start.querySelector('button').addEventListener('click', () => show(routeChapters()[0].no, true));

    // 這一站在哪張圖上：主地圖沒有的，標「人間地圖」；初雪坡裡有木牌的小地方，標「師門圖」
    function whereTag(s) {
      if (shimenFrame && s.spot && findSpot(shimenFrame, s)?.dataset.spot === s.spot) return '師門圖';
      if (!findSpot(frame, s) && renjianFrame && findSpot(renjianFrame, s)) return '人間地圖';
      return '';
    }

    function stepHtml(s, i) {
      const p = QQ.place(s.id);
      const where = whereTag(s);
      return `<li><span class="route-no">${i + 1}</span><div>
        <a class="route__place" href="${QQ.placeHref(s.id)}">${QQ.esc(p ? p.name : s.id)}</a>${s.spot ? `<span class="route__spot">・${QQ.esc(s.spot)}</span>` : ''}
        ${where ? `<span class="route__where">${where}</span>` : ''}
        ${s.what ? `<p>${QQ.esc(s.what)}</p>` : ''}</div></li>`;
    }

    function show(no, scroll) {
      const list = routeChapters();
      const ch = list.find((c) => c.no === no);
      [frame, ...miniFrames].forEach(clearRoute);
      if (!ch) { hide(); return; }
      current = ch.no;
      card.hidden = true;
      const i = list.indexOf(ch);
      const prev = list[i - 1];
      const next = list[i + 1];
      const unlocked = QQ.isRead(ch.no) || revealed.has(ch.no);

      let html = `<div class="route__head"><h2>${QQ.icon('map')}${QQ.chapterLabel(ch.no)}〈${QQ.esc(ch.title)}〉走過的地方</h2>
        <div class="route__nav">
          <button type="button" data-go="${prev ? prev.no : ''}"${prev ? '' : ' disabled'}>← 上一章</button>
          <button type="button" data-go="${next ? next.no : ''}"${next ? '' : ' disabled'}>下一章 →</button>
          <button type="button" class="route__close" data-close aria-label="關掉，回到整張地圖">×</button>
        </div></div>`;
      // 章名、上一章／下一章放在地圖上面；號碼清單放在地圖下面，打開就先看到地圖
      let steps = '';
      if (unlocked) {
        html += `<p class="route__summary">${QQ.esc(ch.summary)}</p>`;
        const onMini = ch.places.some((s) => whereTag(s));
        steps = `<ol class="route__list">${ch.places.map(stepHtml).join('')}</ol>
          <p class="route__note">號碼是這一章出現的順序。${onMini ? '標著「人間地圖」「師門圖」的地方，在<a href="#mini-title">下面的小地圖</a>上也有號碼。' : ''}
          <a href="${QQ.chapterHref(ch.no)}">去章節頁 →</a></p>`;
      } else {
        html += `<p class="route__locked">${QQ.icon('lock')}你還沒讀到${QQ.chapterLabel(ch.no)}，地點先不亮。
          <button type="button" data-reveal>還是要看</button></p>`;
      }
      panel.innerHTML = html;
      panel.hidden = false;
      stepsBox.innerHTML = steps;
      stepsBox.hidden = !steps;
      start.hidden = true;
      setChParam(ch.no);

      if (unlocked) {
        const nums = markRoute(frame, ch.places);
        miniFrames.forEach((f) => markRoute(f, ch.places));
        // 這一章全在人間：青丘地圖上沒有東西亮，放一句話帶讀者往下看人間地圖
        if (!nums.size) {
          frame.classList.add('is-route');
          frame.insertAdjacentHTML('beforeend', `<a class="route-away" href="#mini-title">${QQ.icon('rain')}這一章都在人間，地方標在下面的人間地圖 ↓</a>`);
        }
        // 手機上地圖可以左右滑：把這一章的地方捲到看得到的位置
        if (frame.scrollWidth > frame.clientWidth && nums.size) {
          const xs = [...nums.keys()].map((el) => el.offsetLeft);
          const min = Math.min(...xs);
          const max = Math.max(...xs);
          frame.scrollLeft = max - min < frame.clientWidth - 80 ? (min + max) / 2 - frame.clientWidth / 2 : min - 60;
        }
      }
      if (scroll) panel.scrollIntoView({ block: 'start' });
    }

    function hide() {
      current = null;
      [frame, ...miniFrames].forEach(clearRoute);
      panel.hidden = true;
      panel.innerHTML = '';
      stepsBox.hidden = true;
      stepsBox.innerHTML = '';
      start.hidden = false;
      setChParam(null);
    }

    panel.addEventListener('click', (e) => {
      const go = e.target.closest('[data-go]');
      if (go && go.dataset.go !== '') show(Number(go.dataset.go));
      if (e.target.closest('[data-close]')) hide();
      if (e.target.closest('[data-reveal]')) { revealed.add(current); show(current); }
    });

    const no = QQ.param('ch');
    if (no != null && no !== '') show(Number(no), true);
  }
})();
