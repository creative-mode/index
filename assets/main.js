(function () {
  var header = document.querySelector('.top');
  var bar = document.querySelector('.bar');
  var hero = document.getElementById('topo');
  var contact = document.getElementById('contacto');

  // header border once the page moves
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // phone CTA bar: appears after the hero, hides at the contact block
  if ('IntersectionObserver' in window && bar && hero && contact) {
    var pastHero = false, atContact = false;
    var update = function () { bar.classList.toggle('show', pastHero && !atContact); };
    new IntersectionObserver(function (es) { pastHero = !es[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (es) { atContact = es[0].isIntersecting; update(); }).observe(contact);
  }
})();
