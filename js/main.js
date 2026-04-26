/* ── Nav: add .scrolled class on scroll ── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Mobile nav toggle ── */
const toggle   = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const [bar1, bar2] = toggle.querySelectorAll('span');

function openNav() {
  navLinks.classList.add('open');
  bar1.style.transform = 'rotate(45deg) translate(4px, 5px)';
  bar2.style.transform = 'rotate(-45deg) translate(4px, -5px)';
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navLinks.classList.remove('open');
  bar1.style.transform = '';
  bar2.style.transform = '';
  document.body.style.overflow = '';
}

toggle.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeNav() : openNav();
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

/* ── Scroll fade-in via IntersectionObserver ── */
const fadeEls = document.querySelectorAll('.fade-in');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => io.observe(el));

/* ── Active nav link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
