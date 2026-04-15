const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const yearEl = document.getElementById('year');
const form = document.querySelector('.contact-form');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Thanks! We will contact you soon.';
    form.reset();
  });
}
