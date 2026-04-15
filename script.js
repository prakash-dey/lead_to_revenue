const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.main-nav');
const year = document.getElementById('year');
const form = document.querySelector('.contact-form');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Thanks! We will contact you shortly.';
      btn.disabled = true;
    }
    form.reset();
  });
}
