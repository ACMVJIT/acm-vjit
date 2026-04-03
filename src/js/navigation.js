// ─── NAVIGATION ───
function scrollToSection(id, e) {
  if (e) e.preventDefault();
  document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  // Close mobile menu if open
  const nl = document.getElementById('navLinks');
  if (nl.classList.contains('mobile-open')) {
    nl.classList.remove('mobile-open');
    nl.removeAttribute('style');
  }
}
function updateNavActive() {
  document.getElementById('scrollTop')?.classList.toggle('visible', window.scrollY > 400);
  const navSections = ['about','events','team','projects','blog','gallery','contact'];
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  const scrollPos = window.scrollY + 100;
  for(let i = 0; i < navSections.length; i++) {
    const id = navSections[i];
    const el = document.getElementById(id);
    if (!el) continue;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const nextId = navSections[i + 1];
    let nextTop = Infinity;
    if (nextId) {
      const nextEl = document.getElementById(nextId);
      nextTop = nextEl ? nextEl.getBoundingClientRect().top + window.scrollY : Infinity;
    }
    if (scrollPos >= sectionTop && scrollPos < nextTop) {
      current = id;
      break;
    }
  }
  links.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('onclick')?.includes(current)) {
      a.classList.add('active');
    }
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateNavActive();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Initial call
updateNavActive();

function toggleMobileMenu() {
  const nl = document.getElementById('navLinks');
  const isOpen = nl.classList.contains('mobile-open');
  if (isOpen) {
    nl.classList.remove('mobile-open');
    nl.removeAttribute('style');
  } else {
    nl.classList.add('mobile-open');
    nl.style.display = 'flex';
    nl.style.flexDirection = 'column';
    nl.style.position = 'fixed';
    nl.style.top = '64px';
    nl.style.left = '0';
    nl.style.right = '0';
    nl.style.background = 'var(--bg)';
    nl.style.padding = '20px';
    nl.style.borderBottom = '1px solid var(--border)';
    nl.style.zIndex = '999';
  }
}