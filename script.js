const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.main-nav');
const year = document.getElementById('year');
const form = document.querySelector('.contact-form');
const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'gritta-theme';
const darkSchemeMql = window.matchMedia('(prefers-color-scheme: dark)');

function logSystemTheme() {
  console.log('System theme:', darkSchemeMql.matches ? 'dark' : 'light');
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function effectiveThemeIsLight() {
  const t = document.documentElement.dataset.theme;
  if (t === 'light') return true;
  if (t === 'dark') return false;
  return !darkSchemeMql.matches;
}

function updateThemeToggleUI() {
  if (!themeToggle) return;
  const isLight = effectiveThemeIsLight();
  themeToggle.dataset.appearance = isLight ? 'light' : 'dark';
  if (isLight) {
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    themeToggle.title = 'Dark mode';
  } else {
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
    themeToggle.title = 'Light mode';
  }
}

function applyUserTheme(mode) {
  const next = mode === 'light' || mode === 'dark' ? mode : 'dark';
  const root = document.documentElement;
  root.dataset.theme = next;
  try {
    sessionStorage.setItem(THEME_KEY, next);
  } catch (e) {}
  updateThemeToggleUI();
}

function onThemeToggleClick() {
  applyUserTheme(effectiveThemeIsLight() ? 'dark' : 'light');
}

function onColorSchemeMediaChange() {
  logSystemTheme();
  updateThemeToggleUI();
}

if (themeToggle) {
  updateThemeToggleUI();
  themeToggle.addEventListener('click', onThemeToggleClick);
}

logSystemTheme();

if (typeof darkSchemeMql.addEventListener === 'function') {
  darkSchemeMql.addEventListener('change', onColorSchemeMediaChange);
} else if (typeof darkSchemeMql.addListener === 'function') {
  darkSchemeMql.addListener(onColorSchemeMediaChange);
}

function scrollToPageTop() {
  const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const home = document.getElementById('home');
  if (home) {
    home.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' });
  }
  history.replaceState(null, '', '#home');
}

document.querySelectorAll('a[href="#home"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToPageTop();
  });
});

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
