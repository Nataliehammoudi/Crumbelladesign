(function () {
  'use strict';

  /* ---------- Data (edit names, copy and prices here) ---------- */
  var FLAVORS = [
    { id: 'choc', name: 'Choc Chips', tag: 'Classic', color: 'f-purple', price: 4.5,
      desc: 'The all American original. Soft middle, golden edges, loaded with real chocolate chips.' },
    { id: 'brookie', name: 'Brookies', tag: 'Fan favorite', color: 'f-magenta', price: 5.0,
      desc: 'Fudgy brownie meets chewy chocolate chip cookie in one chunky bite.' },
    { id: 'smores', name: 'Smores', tag: 'New', color: 'f-blue', price: 5.0,
      desc: 'Toasted marshmallow, melted chocolate and a buttery cookie base. Campfire, minus the smoke.' },
    { id: 'mm', name: 'Double Chocolate M&M', tag: 'Limited', color: 'f-olive', price: 5.5,
      desc: 'Rich double chocolate dough packed with colorful candy pieces.' }
  ];
  var CURRENCY = 'JD ';

  /* ---------- Seeded random so art is stable ---------- */
  function rng(seed) {
    var s = seed;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }

  var uid = 0;
  function cookieSVG(type, seed) {
    var r = rng(seed || 7), id = 'g' + (++uid), out = '';
    var base, edge, chip = '#4a2412';
    if (type === 'brookie' || type === 'mm') { base = '#4b2a1e'; edge = '#2f170f'; }
    else { base = '#e0a864'; edge = '#b9803f'; }

    if (type === 'smores') return smoresSVG(id, r);

    out += '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cookie">';
    out += '<defs><radialGradient id="' + id + '" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="' + base + '"/><stop offset="1" stop-color="' + edge + '"/></radialGradient></defs>';
    out += '<path d="M100 8c42 0 86 30 90 82 4 52-34 100-92 102C44 194 8 150 10 98 12 44 54 8 100 8z" fill="url(#' + id + ')"/>';
    out += '<path d="M100 8c42 0 86 30 90 82 4 52-34 100-92 102" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="5"/>';

    if (type === 'brookie') {
      out += '<path d="M100 8c42 0 86 30 90 82 4 52-34 100-92 102-8-60-6-120 2-184z" fill="#d9a15f"/>';
      out += '<path d="M104 14c-6 60-8 118-4 176" fill="none" stroke="#2f170f" stroke-width="5" stroke-linecap="round"/>';
    }

    var count = type === 'mm' ? 16 : 20, i, a, d, x, y, s;
    if (type === 'mm') {
      var cols = ['#e53935', '#fdd835', '#1e88e5', '#43a047', '#fb8c00', '#6d4c41'];
      for (i = 0; i < count; i++) {
        a = r() * 6.283; d = Math.sqrt(r()) * 74; x = 100 + Math.cos(a) * d; y = 100 + Math.sin(a) * d; s = 8 + r() * 4;
        out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + s.toFixed(1) + '" fill="' + cols[i % cols.length] + '"/>';
        out += '<ellipse cx="' + (x - s * .3).toFixed(1) + '" cy="' + (y - s * .35).toFixed(1) + '" rx="' + (s * .4).toFixed(1) + '" ry="' + (s * .22).toFixed(1) + '" fill="rgba(255,255,255,.45)"/>';
      }
    } else {
      for (i = 0; i < count; i++) {
        a = r() * 6.283; d = Math.sqrt(r()) * 76; x = 100 + Math.cos(a) * d; y = 100 + Math.sin(a) * d; s = 9 + r() * 6;
        var rot = (r() * 360).toFixed(0);
        out += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot + ')">' +
          '<path d="M0 ' + (-s) + ' L' + s * .95 + ' ' + s * .7 + ' L' + (-s * .85) + ' ' + s * .8 + 'Z" fill="' + chip + '" stroke="#2a1208" stroke-width="1" stroke-linejoin="round"/>' +
          '<path d="M0 ' + (-s * .7) + ' L' + s * .3 + ' 0" stroke="rgba(255,255,255,.28)" stroke-width="2" stroke-linecap="round"/></g>';
      }
    }
    out += '</svg>';
    return out;
  }

  function smoresSVG(id, r) {
    var o = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Smores cookie">';
    o += '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3b072"/><stop offset="1" stop-color="#b9803f"/></linearGradient></defs>';
    o += '<ellipse cx="100" cy="146" rx="84" ry="30" fill="url(#' + id + ')"/>';
    o += '<path d="M18 128c0 30 36 50 82 50s82-20 82-50" fill="#b9803f"/>';
    o += '<path d="M20 112c10 16 40 24 80 24s70-8 80-24c4 10-4 20-14 24-20 8-48 10-66 10s-46-2-66-10c-10-4-18-14-14-24z" fill="#4a2412"/>';
    o += '<path d="M24 100c8 18 38 28 76 28s68-10 76-28c2 10-4 18-14 22-20 8-46 10-62 10s-42-2-62-10c-10-4-16-12-14-22z" fill="#fff7ea"/>';
    o += '<ellipse cx="100" cy="86" rx="82" ry="32" fill="#d9a15f"/>';
    o += '<ellipse cx="100" cy="80" rx="76" ry="26" fill="#e3b072"/>';
    var spots = [[70, 70, 22], [112, 66, 24], [92, 88, 20], [134, 84, 18], [56, 90, 15]];
    spots.forEach(function (p) {
      o += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + p[2] + '" ry="' + (p[2] * .72) + '" fill="#fff7ea"/>';
      o += '<ellipse cx="' + (p[0] + 2) + '" cy="' + (p[1] - 2) + '" rx="' + (p[2] * .7) + '" ry="' + (p[2] * .45) + '" fill="#c98a45" opacity=".75"/>';
    });
    o += '<path d="M60 74c14-6 28-4 40 0" stroke="#4a2412" stroke-width="5" stroke-linecap="round" fill="none" opacity=".8"/>';
    o += '</svg>';
    return o;
  }

  /* Render art, and swap in real photos if the file exists in /images */
  function paint(el, type, seed) {
    el.innerHTML = cookieSVG(type, seed);
    var src = el.getAttribute('data-img');
    if (!src) return;
    var img = new Image();
    img.alt = '';
    img.onload = function () { el.innerHTML = ''; el.appendChild(img); };
    img.src = src;
  }

  /* ---------- Flavor cards ---------- */
  var grid = document.getElementById('flavorGrid');
  FLAVORS.forEach(function (f, i) {
    var card = document.createElement('article');
    card.className = 'flavor reveal ' + f.color;
    card.style.transitionDelay = (i * 80) + 'ms';
    card.innerHTML =
      '<span class="tag">' + f.tag + '</span>' +
      '<div class="pic" data-cookie="' + f.id + '" data-img="images/' + f.id + '.png"></div>' +
      '<h3>' + f.name + '</h3><p>' + f.desc + '</p>' +
      '<div class="row"><span class="price">' + CURRENCY + f.price.toFixed(3) + '</span>' +
      '<button class="add" data-id="' + f.id + '">Add to box</button></div>';
    grid.appendChild(card);
  });

  document.querySelectorAll('[data-cookie]').forEach(function (el, i) {
    paint(el, el.getAttribute('data-cookie'), 11 + i * 5);
  });

  /* ---------- Cart ---------- */
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem('crumbella_cart') || '{}') || {}; } catch (e) { cart = {}; }

  function byId(id) { return FLAVORS.filter(function (f) { return f.id === id; })[0]; }
  function save() { try { localStorage.setItem('crumbella_cart', JSON.stringify(cart)); } catch (e) {} }
  function money(n) { return CURRENCY + n.toFixed(3); }

  function lineHTML(id, withControls) {
    var f = byId(id), q = cart[id];
    return '<li><span>' + f.name + ' x ' + q + '</span><span class="qty">' +
      (withControls ? '<button data-act="dec" data-id="' + id + '" aria-label="Remove one">&minus;</button><button data-act="inc" data-id="' + id + '" aria-label="Add one">+</button>' : '') +
      '<strong>' + money(f.price * q) + '</strong></span></li>';
  }

  function render() {
    var ids = Object.keys(cart).filter(function (k) { return cart[k] > 0 && byId(k); });
    var count = 0, total = 0;
    ids.forEach(function (k) { count += cart[k]; total += cart[k] * byId(k).price; });
    document.getElementById('cartCount').textContent = count;
    document.getElementById('orderTotal').textContent = money(total);
    document.getElementById('drawerTotal').textContent = money(total);
    var empty = '<li class="empty">Your box is empty. Add a mix from the flavors above.</li>';
    document.getElementById('orderList').innerHTML = ids.length ? ids.map(function (k) { return lineHTML(k, true); }).join('') : empty;
    document.getElementById('drawerList').innerHTML = ids.length ? ids.map(function (k) { return lineHTML(k, true); }).join('') : empty;
  }

  function change(id, delta) {
    cart[id] = Math.max(0, (cart[id] || 0) + delta);
    if (!cart[id]) delete cart[id];
    save(); render();
  }

  document.addEventListener('click', function (e) {
    var add = e.target.closest('.add');
    if (add) {
      change(add.getAttribute('data-id'), 1);
      var b = document.getElementById('cartBtn');
      b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
      add.textContent = 'Added';
      setTimeout(function () { add.textContent = 'Add to box'; }, 900);
      return;
    }
    var q = e.target.closest('[data-act]');
    if (q) change(q.getAttribute('data-id'), q.getAttribute('data-act') === 'inc' ? 1 : -1);
  });

  /* Drawer */
  var drawer = document.getElementById('drawer'), scrim = document.getElementById('scrim');
  function openDrawer(o) {
    drawer.classList.toggle('open', o); scrim.classList.toggle('show', o);
    drawer.setAttribute('aria-hidden', String(!o));
  }
  document.getElementById('cartBtn').addEventListener('click', function () { openDrawer(true); });
  document.getElementById('drawerClose').addEventListener('click', function () { openDrawer(false); });
  document.getElementById('drawerCheckout').addEventListener('click', function () { openDrawer(false); });
  scrim.addEventListener('click', function () { openDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') openDrawer(false); });

  /* Mobile menu */
  var links = document.getElementById('navLinks');
  document.getElementById('menuBtn').addEventListener('click', function () { links.classList.toggle('open'); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') links.classList.remove('open'); });

  /* Order form (front end only, wire to your backend or WhatsApp later) */
  var form = document.getElementById('orderForm'), note = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ids = Object.keys(cart);
    if (!ids.length) { note.textContent = 'Add at least one mix to your box first.'; return; }
    if (!form.name.value.trim() || !form.phone.value.trim()) { note.textContent = 'Please add your name and phone number.'; return; }
    note.textContent = 'Thank you ' + form.name.value.trim().split(' ')[0] + '. We will message you shortly to confirm.';
    cart = {}; save(); render(); form.reset();
  });

  /* Scroll reveal */
  document.querySelectorAll('.step,.promise,.order-card,.gift-copy,.story-grid,.section-head').forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  render();
})();
