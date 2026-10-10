(function () {
  'use strict';

  /* ---------- Data (edit names, copy and prices here) ---------- */
  var FLAVORS = [
    { id: 'choc', name: 'Choc Chips', tag: 'Classic', color: 'f-purple', price: 4.5,
      desc: 'Soft middle, golden edges, loaded with real chocolate chips.' },
    { id: 'brookie', name: 'Brookies', tag: 'Fan favorite', color: 'f-magenta', price: 5.0,
      desc: 'Fudgy brownie meets chewy chocolate chip cookie in one chunky bite.' },
    { id: 'smores', name: 'Smores', tag: 'New', color: 'f-blue', price: 5.0,
      desc: 'Toasted marshmallow and melted chocolate on a buttery cookie base.' },
    { id: 'mm', name: 'Double Chocolate M&M', tag: 'Limited', color: 'f-olive', price: 5.5,
      desc: 'Rich double chocolate dough packed with colorful candy pieces.' }
  ];
  var CURRENCY = 'JD ';

  /* ---------- Image placeholders ----------
     Every .ph box shows a labelled placeholder. If the file named in
     data-img exists in /images, it replaces the placeholder automatically. */
  var CAMERA = '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M8.5 6l1.2-2h4.6l1.2 2"/></svg>';

  function fillPlaceholder(el) {
    var label = el.getAttribute('data-label') || 'Image';
    var size = el.getAttribute('data-size') || '';
    el.innerHTML = '<div class="ph-inner">' + CAMERA + '<b>' + label + '</b>' + (size ? '<small>' + size + '</small>' : '') + '</div>';
    var src = el.getAttribute('data-img');
    if (!src) return;
    var img = new Image();
    img.alt = label;
    img.onload = function () { el.innerHTML = ''; el.appendChild(img); el.classList.add('has-img'); };
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
      '<div class="ph" data-img="images/' + f.id + '.png" data-label="' + f.name + ' cookie" data-size="1200 x 1200 PNG"></div>' +
      '<h3>' + f.name + '</h3><p>' + f.desc + '</p>' +
      '<div class="row"><span class="price">' + CURRENCY + f.price.toFixed(3) + '</span>' +
      '<button class="add" data-id="' + f.id + '">Add to box</button></div>';
    grid.appendChild(card);
  });

  document.querySelectorAll('.ph').forEach(fillPlaceholder);

  /* ---------- Cart ---------- */
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem('crumbella_cart') || '{}') || {}; } catch (e) { cart = {}; }

  function byId(id) { return FLAVORS.filter(function (f) { return f.id === id; })[0]; }
  function save() { try { localStorage.setItem('crumbella_cart', JSON.stringify(cart)); } catch (e) {} }
  function money(n) { return CURRENCY + n.toFixed(3); }

  function lineHTML(id) {
    var f = byId(id), q = cart[id];
    return '<li><span>' + f.name + ' x ' + q + '</span><span class="qty">' +
      '<button data-act="dec" data-id="' + id + '" aria-label="Remove one">&minus;</button>' +
      '<button data-act="inc" data-id="' + id + '" aria-label="Add one">+</button>' +
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
    var html = ids.length ? ids.map(lineHTML).join('') : empty;
    document.getElementById('orderList').innerHTML = html;
    document.getElementById('drawerList').innerHTML = html;
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

  /* Side menu */
  var links = document.getElementById('navLinks');
  function openMenu(o) {
    links.classList.toggle('open', o); scrim.classList.toggle('show', o);
  }
  document.getElementById('menuBtn').addEventListener('click', function () { openMenu(true); });
  document.getElementById('navClose').addEventListener('click', function () { openMenu(false); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') openMenu(false); });
  scrim.addEventListener('click', function () { openMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') openMenu(false); });

  /* Order form (front end only, connect to your backend or WhatsApp later) */
  var form = document.getElementById('orderForm'), note = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!Object.keys(cart).length) { note.textContent = 'Add at least one mix to your box first.'; return; }
    if (!form.name.value.trim() || !form.phone.value.trim()) { note.textContent = 'Please add your name and phone number.'; return; }
    note.textContent = 'Thank you ' + form.name.value.trim().split(' ')[0] + '. We will message you shortly to confirm.';
    cart = {}; save(); render(); form.reset();
  });

  /* Newsletter (front end only) */
  var nf = document.getElementById('newsForm'), nn = document.getElementById('newsNote');
  nf.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = nf.email.value.trim();
    nn.textContent = /^\S+@\S+\.\S+$/.test(v) ? 'Thank you. You are on the list.' : 'Please enter a valid email address.';
    if (/^\S+@\S+\.\S+$/.test(v)) nf.reset();
  });

  /* Scroll reveal */
  document.querySelectorAll('.step,.way,.duo-card,.order-card,.news,.band-inner').forEach(function (el) { el.classList.add('reveal'); });
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
