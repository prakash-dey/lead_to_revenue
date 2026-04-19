const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.main-nav');
const year = document.getElementById('year');
const form = document.querySelector('.contact-form');

/**
 * “Response from website” — update entry IDs if you edit questions in Google Forms.
 * https://docs.google.com/forms/d/e/1FAIpQLScyzUmKHyfDfC0UFxZbtu7J6kNuqGqelFfLEkoPvLmC7ojWzw/viewform
 */
const GOOGLE_FORM_CONFIG = {
  formId: '1FAIpQLScyzUmKHyfDfC0UFxZbtu7J6kNuqGqelFfLEkoPvLmC7ojWzw',
  entries: {
    name: 'entry.1748267514',
    email: 'entry.2050201693',
    company: 'entry.424439828',
    service: 'entry.1210758095',
    message: 'entry.2068906353',
  },
};

function googleFormConfigured() {
  const { formId, entries } = GOOGLE_FORM_CONFIG;
  if (!formId || !entries) return false;
  return Object.values(entries).every((id) => typeof id === 'string' && id.length > 0);
}

async function submitToGoogleForm(fd) {
  const { formId, entries } = GOOGLE_FORM_CONFIG;
  const params = new URLSearchParams();
  params.set(entries.name, fd.get('name') || '');
  params.set(entries.email, fd.get('email') || '');
  params.set(entries.company, fd.get('company') || '');
  params.set(entries.service, fd.get('service') || '');
  params.set(entries.message, fd.get('message') || '');
  params.set('fvv', '1');
  params.set('pageHistory', '0');

  await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
}
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
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const fd = new FormData(form);

    if (googleFormConfigured()) {
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }
      try {
        await submitToGoogleForm(fd);
        if (btn) btn.textContent = 'Thanks! We will contact you shortly.';
        form.reset();
      } catch (e) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Send message';
        }
        alert('Something went wrong. Please email team@grittaai.com or try again.');
      }
      return;
    }

    if (btn) {
      btn.textContent = 'Thanks! We will contact you shortly.';
      btn.disabled = true;
    }
    form.reset();
  });
}
