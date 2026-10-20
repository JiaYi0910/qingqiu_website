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
    if (p.kind === 'map') html += '<span class="tag tag--map">小說還沒寫到</span>';
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
        ${mapOnly.length ? `<p style="margin:10px 0 6px;font-size:.85rem">地圖上的地名（小說還沒寫到）</p>
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
      if (latest) html += `<a class="chip" href="${QQ.chapterHref(latest.no)}">${QQ.icon('book_open')}小說寫到${QQ.chapterLabel(latest.no)}〈${QQ.esc(latest.title)}〉</a>`;
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
  });
})();
