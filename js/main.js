// Portfolio: header state, scroll reveal, active nav link.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('stuck', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const revealables = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealables.forEach(el => el.classList.add('in'));
} else {
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px' });
  revealables.forEach(el => revealer.observe(el));
}

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.site-header nav a')];
if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { threshold: 0.35 });
  sections.forEach(s => spy.observe(s));
}
