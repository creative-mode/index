(function () {
  var header = document.querySelector('.top');
  var bar = document.querySelector('.bar');
  var hero = document.getElementById('topo');
  var contact = document.getElementById('contacto');

  // o cabeçalho fica por cima da forma de abertura e só ganha fundo branco
  // quando a forma acaba (ou quando um menu está aberto)
  var opening = document.querySelector('.shape-hero');
  // o cabeçalho fica transparente sobre a abertura e passa a branco assim que
  // chega perto do título, antes de se cruzar com ele
  var title = opening && opening.querySelector('h1');
  function onScroll() {
    var h = header.offsetHeight;
    var past = !opening || (title ? title.getBoundingClientRect().top - 24 : opening.getBoundingClientRect().bottom) <= h;
    var open = document.body.classList.contains('nav-open') || !!header.querySelector('.nav-item[aria-expanded="true"]');
    header.classList.toggle('solid', past || open);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  if ('MutationObserver' in window) {
    new MutationObserver(onScroll).observe(header, { subtree: true, attributes: true, attributeFilter: ['aria-expanded'] });
    new MutationObserver(onScroll).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
  onScroll();

  // primary nav: dropdown panels and the phone menu
  var nav = document.getElementById('nav');
  var menuBtn = document.querySelector('.menu-btn');
  var triggers = Array.prototype.slice.call(document.querySelectorAll('.has-menu > .nav-item'));
  var phone = window.matchMedia('(max-width: 760px)');
  var hover = window.matchMedia('(hover: hover) and (pointer: fine)');

  var hoveredAt = 0;
  function closeMenus(except) {
    triggers.forEach(function (t) { if (t !== except) t.setAttribute('aria-expanded', 'false'); });
  }
  function setPhoneMenu(open) {
    if (!nav || !menuBtn) return;
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('nav-open', open);
    if (!open) closeMenus();
  }

  triggers.forEach(function (t) {
    t.addEventListener('click', function () {
      // a hover just opened it: the click confirms instead of closing
      if (Date.now() - hoveredAt < 400) return;
      var open = t.getAttribute('aria-expanded') !== 'true';
      closeMenus(t);
      t.setAttribute('aria-expanded', String(open));
    });
    var li = t.parentNode, timer;
    li.addEventListener('mouseenter', function () {
      if (!hover.matches || phone.matches) return;
      clearTimeout(timer); closeMenus(t);
      if (t.getAttribute('aria-expanded') !== 'true') { t.setAttribute('aria-expanded', 'true'); hoveredAt = Date.now(); }
    });
    li.addEventListener('mouseleave', function () {
      if (!hover.matches || phone.matches) return;
      timer = setTimeout(function () { t.setAttribute('aria-expanded', 'false'); }, 160);
    });
  });

  if (menuBtn) menuBtn.addEventListener('click', function () { setPhoneMenu(!nav.classList.contains('open')); });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = triggers.filter(function (t) { return t.getAttribute('aria-expanded') === 'true'; })[0];
    if (open) { closeMenus(); open.focus(); }
    else if (nav && nav.classList.contains('open')) { setPhoneMenu(false); menuBtn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.top')) { closeMenus(); }
  });
  if (nav) nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { closeMenus(); setPhoneMenu(false); }
  });
  phone.addEventListener && phone.addEventListener('change', function () { setPhoneMenu(false); });

  // phone CTA bar: appears after the hero, hides at the contact block
  if ('IntersectionObserver' in window && bar && hero && contact) {
    var pastHero = false, atContact = false;
    var update = function () { bar.classList.toggle('show', pastHero && !atContact); };
    new IntersectionObserver(function (es) { pastHero = !es[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (es) { atContact = es[0].isIntersecting; update(); }).observe(contact);
  }
})();
