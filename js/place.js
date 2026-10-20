// 地點頁：place.html?id=chuxuepo
(function () {
  const QQ = window.QQ;

  function render(p) {
    const region = QQ.region(p.region);
    const parent = p.parent ? QQ.place(p.parent) : null;
    const view = QQ.placeView(p);
    const images = QQ.placeImages(p);
    const hero = images.find((im) => QQ.isRead(QQ.imageLevel(im))); // 第一張讀者讀過的圖
    const chapters = QQ.chaptersAt(p.id);
    const children = QQ.places.filter((x) => x.parent === p.id);
    let html = '';

    html += `<p class="breadcrumb"><a href="index.html?place=${encodeURIComponent(p.id)}">青丘地圖</a> ／ ${QQ.esc(region.name)}`;
    if (parent) html += ` ／ <a href="${QQ.placeHref(parent.id)}">${QQ.esc(parent.name)}</a>`;
    html += ` ／ ${QQ.esc(p.name)}</p>`;

    html += '<div class="place-hero"><div>';
    html += `<span class="tag tag--region">${QQ.icon(region.icon)}${QQ.esc(region.name)}</span>`;
    html += `<h1>${QQ.esc(p.name)}</h1>`;
    if (view.where) html += `<p class="where">${QQ.esc(view.where)}</p>`;
    html += `<p class="tagline">${QQ.esc(view.tagline)}</p>`;
    if (p.mapNote) html += `<p class="note">${QQ.esc(p.mapNote)}</p>`;
    if ((p.body || []).length) html += `<div class="prose">${QQ.paras(p.body)}</div>`;
    html += (p.quotes || []).map(QQ.quoteHtml).join('');
    html += '</div>';
    if (hero) {
      const cap = QQ.esc(hero.caption) + (hero.ch != null ? `・${QQ.chapterLabel(hero.ch)}` : '');
      html += `<figure><img src="${QQ.esc(hero.src)}" data-full="${QQ.esc(hero.full || hero.src)}" data-caption="${cap}" alt="${QQ.esc(hero.caption)}"><figcaption>${cap}</figcaption></figure>`;
    }
    html += '</div>';

    // 初雪坡：師門圖（點木牌會跳到下面的小地方）
    if (p.id === 'chuxuepo') {
      html += `<section class="section"><h2>師門圖</h2>${QQ.miniMapHtml('shimen', { spotsOf: p })}</section>`;
    }
    // 人間的地方：人間地圖，這個地方會標亮
    if (p.region === 'renjian') {
      html += `<section class="section"><h2>人間地圖</h2>${QQ.miniMapHtml('renjian', { active: p.id })}</section>`;
    }

    if ((p.spots || []).length || children.length) {
      html += '<section class="section"><h2>這裡的小地方</h2><div class="spots-grid">';
      (p.spots || []).forEach((s, i) => {
        const detail = `<p>${QQ.esc(s.text)}</p>${(s.ch || []).length ? `<div class="chips">${s.ch.map((no) => QQ.chapterChip(no, true)).join('')}</div>` : ''}`;
        html += `<div class="spot-box" id="spot-${i}"><h3>${QQ.esc(s.name)}</h3>${QQ.guard(QQ.maxCh(s.ch), detail)}</div>`;
      });
      children.forEach((c) => {
        html += `<div class="spot-box"><h3><a href="${QQ.placeHref(c.id)}">${QQ.esc(c.name)} →</a></h3><p>${QQ.esc(QQ.placeView(c).tagline)}</p></div>`;
      });
      html += '</div></section>';
    }

    if (images.length > 1 || (images.length && !hero)) {
      html += `<section class="section"><h2>插畫</h2><div class="gallery">${images.map((im) => QQ.figureHtml(im)).join('')}</div></section>`;
    }

    const items = (QQ.items || []).filter((it) => (it.places || []).includes(p.id) && QQ.isRead(QQ.itemFirst(it)));
    if (items.length) {
      html += `<section class="section"><h2>在這裡的東西</h2><div class="chips">${items.map((it) =>
        `<a class="chip" href="items.html#${it.id}">${QQ.icon(it.icon)}${QQ.esc(it.name)}</a>`).join('')}</div></section>`;
    }

    const people = (p.characters || []).filter((id) => QQ.isRead(QQ.charFirst(id)));
    if (people.length) {
      html += `<section class="section"><h2>在這裡出現的角色</h2><div class="chips">${people.map(QQ.charChip).join('')}</div></section>`;
    }

    if (chapters.length) {
      const li = ({ ch, hits }) => `<li><div class="t-head"><a href="${QQ.chapterHref(ch.no)}">${QQ.chapterLabel(ch.no)}</a>
          <span class="t-title">〈${QQ.esc(ch.title)}〉</span>${QQ.lineTag(ch.line)}</div>
          ${hits.map((h) => `<p class="t-what">${h.spot ? `<strong>${QQ.esc(h.spot)}</strong>：` : ''}${QQ.esc(h.what)}</p>`).join('')}</li>`;
      const seen = chapters.filter((x) => QQ.isRead(x.ch.no));
      const later = chapters.filter((x) => !QQ.isRead(x.ch.no));
      html += '<section class="section"><h2>在這裡發生的章節</h2>';
      if (seen.length) html += `<ol class="timeline">${seen.map(li).join('')}</ol>`;
      if (later.length) {
        html += QQ.guard(later[0].ch.no, `<ol class="timeline">${later.map(li).join('')}</ol>`, 'block',
          `你還沒讀到的 ${later.length} 章（${QQ.chapterLabel(later[0].ch.no)}起）`);
      }
      html += '</section>';
    }

    if ((p.near || []).length) {
      html += `<section class="section"><h2>附近</h2><div class="chips">${p.near.map(QQ.placeChip).join('')}</div></section>`;
    }

    // 讀者還沒讀到這個地方第一次出現的章節：除了名字，全部先藏起來
    const first = QQ.placeFirst(p.id);
    if (!QQ.isRead(first)) {
      return `<div class="spoiler-page">${QQ.guard(first, html, 'block', `「${p.name}」在${QQ.chapterLabel(first)}才出現`)}</div>`;
    }
    return html;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('place');
    const p = QQ.place(QQ.param('id'));
    if (!p) {
      main.innerHTML = `<div class="not-found">${QQ.icon('nuomi_what', 'icon--title')}<h1>找不到這個地方</h1><p><a href="index.html">回青丘地圖</a></p></div>`;
      return;
    }
    document.title = `${p.name}｜墨染櫻雪・青丘地圖`;
    main.innerHTML = render(p);
    // 從師門圖點進來（#spot-3）：捲到那個小地方
    if (location.hash) {
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) t.scrollIntoView();
    }
  });
})();
