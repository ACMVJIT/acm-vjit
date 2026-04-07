
// ─── CURSOR ───
/*
document.body.style.cursor = 'none';
const cursor     = document.getElementById('cursor');
const ring       = document.getElementById('cursor-ring');
const trailCanvas= document.getElementById('cursor-trail-canvas');
const tctx       = trailCanvas.getContext('2d');

// Size canvas
function resizeTrail() { trailCanvas.width = window.innerWidth; trailCanvas.height = window.innerHeight; }
resizeTrail(); window.addEventListener('resize', resizeTrail);

// Mouse state
let mx = -200, my = -200, rx = -200, ry = -200;

// Particle trail
const particles = [];
const COLORS = ['rgba(0,229,255,', 'rgba(15,143,255,', 'rgba(64,196,255,', 'rgba(255,255,255,'];

document.addEventListener('mousemove', e => {
  cursor.style.opacity = '1'; ring.style.opacity = '1';
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';

  // Spawn particle
  if (Math.random() > 0.35) {
    particles.push({
      x: mx, y: my,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      r:  Math.random() * 2.5 + 0.8,
      life: 1,
      decay: Math.random() * 0.04 + 0.025,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }
});

// Ring follows with lag
function animateCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';

  // Draw trail
  tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x  += p.vx; p.y  += p.vy;
    p.vy += 0.04; // gravity
    p.life -= p.decay;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    tctx.beginPath();
    tctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
    tctx.fillStyle = p.color + (p.life * 0.7) + ')';
    tctx.fill();
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover state event delegation
const hoverSelector = 'a,button,.team-card,.event-card,.project-card,.blog-card,.join-card,.gallery-item,.ftm-vip-card,.ftm-member-card,.nav-links a';

document.body.addEventListener('mouseover', (e) => {
  if (e.target.closest(hoverSelector)) {
    document.body.classList.add('cursor-hover');
  }
});

document.body.addEventListener('mouseout', (e) => {
  if (e.target.closest(hoverSelector)) {
    document.body.classList.remove('cursor-hover');
  }
});

// Click burst
document.addEventListener('mousedown', () => {
  document.body.classList.add('cursor-click');
  // Burst particles
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const speed = Math.random() * 3 + 1.5;
    particles.push({
      x: mx, y: my,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r:  Math.random() * 3 + 1,
      life: 1,
      decay: Math.random() * 0.03 + 0.025,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }
});
document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

// Hide/show on leave/enter window
document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) { cursor.style.opacity='0'; ring.style.opacity='0'; } });
document.addEventListener('mouseenter', () => { cursor.style.opacity='1'; ring.style.opacity='1'; });

document.getElementById('roadmapFrame')?.addEventListener('mouseenter', () => {
  cursor.style.opacity='0'; ring.style.opacity='0';
});
document.getElementById('pdfFrame')?.addEventListener('mouseenter', () => {
  cursor.style.opacity='0'; ring.style.opacity='0';
});
*/






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
let lastActiveSection = '';
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

  const isOverlayOpen = document.getElementById('roadmapOverlay')?.classList.contains('open') || 
                        document.getElementById('pdfModal')?.classList.contains('open');
  
  if (!isOverlayOpen) {
    if (current && current !== lastActiveSection) {
      lastActiveSection = current;
      history.replaceState(null, '', '#' + current);
    } else if (!current && lastActiveSection !== '') {
      lastActiveSection = '';
      history.replaceState(null, '', window.location.pathname);
    }
  }
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

// ─── STATS COUNTER ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if(current >= target) clearInterval(timer);
  }, 25);
}

// ─── SCROLL REVEAL + COUNTER ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.counter').forEach(animateCounter);
    }
  });
}, {threshold: 0.15});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));



// ─── EVENTS TABS ───
function switchTab(tab, btn) {
  document.getElementById('tab-upcoming').classList.toggle('hidden-tab', tab !== 'upcoming');
  document.getElementById('tab-past').classList.toggle('hidden-tab', tab !== 'past');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ─── DASHBOARD TABS ───
function switchDash(tab, el) {
  document.querySelectorAll('.dash-panel').forEach(p => p.classList.add('hidden-tab'));
  document.querySelectorAll('.dash-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('dash-'+tab).classList.remove('hidden-tab');
  el.classList.add('active');
}

// ─── OPEN GOOGLE FORM PRE-FILLED ───
function openGForm() {
  const phone   = document.getElementById('f-phone').value.trim();
  const roll    = document.getElementById('f-roll').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const branch  = document.getElementById('f-branch').value;
  const section = document.getElementById('f-section').value;
  const why     = document.getElementById('f-why').value.trim();

  // Validate required fields
  let valid = true;
  ['f-phone','f-roll','f-email','f-branch','f-section','f-why'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#f87171';
      setTimeout(() => el.style.borderColor = '', 2500);
      valid = false;
    }
  });
  if (!valid) { alert('Please fill in all required fields first.'); return; }

  // Build pre-filled Google Form URL
  // NOTE: Replace these entry IDs with the real ones from your Google Form (see instructions)
  const base = 'https://docs.google.com/forms/d/e/1FAIpQLSepx0Fz5hAmPgfyMcDFrF1Z4QwwHQ3h8jB_BEz0spTIMv3GTg/viewform';
  const name  = document.getElementById('f-name').value.trim();
  const params = new URLSearchParams();
  if (name)    params.set('usp', 'pp_url'); // keeps URL clean
  // Open the form directly — user clicks Submit there
  window.open(base + '?' + params.toString(), '_blank');
}
//dead code
function sendMessage() {
  const contactSection = document.getElementById('contact');
  const inputs = contactSection.querySelectorAll('input[type="text"], input[type="email"], textarea');
  let allFilled = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) {
      allFilled = false;
      inp.style.borderColor = '#f87171';
      setTimeout(() => inp.style.borderColor = '', 2000);
    }
  });
  if (!allFilled) { alert('Please fill in all fields before sending.'); return; }
  showModal('✉️', 'Message Sent!', "Thank you for reaching out. Our team will reply to your email within 24 hours.");
}

// ─── MODAL ───
function showModal(icon, title, body) {
  document.getElementById('modal-icon').textContent = icon;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = body;
  document.getElementById('modal').style.display = 'flex';
}

// ─── REGISTRATION FORM SUBMIT ───
const REG_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSfu3wM1wOUG8s26ApHCuHGl5QBTEcIoHRABFrbeBv3djDtCOQ/formResponse";
const REG_IDS = {
  name:    "entry.2092238618",
  roll:    "entry.479301265",
  email:   "entry.1556369182",
  phone:   "entry.920355438",
  year:    "entry.555319815",
  branch:  "entry.1753222212",
  section: "entry.588393791",
};

function regValidate() {
  let ok = true;
  const setErr = (id, show, isInput=true) => {
    document.getElementById('re-'+id).classList.toggle('show', show);
    if(isInput) document.getElementById('rf-'+id).classList.toggle('reg-err', show);
  };
  const name    = document.getElementById('rf-name').value.trim();
  const roll    = document.getElementById('rf-roll').value.trim();
  const email   = document.getElementById('rf-email').value.trim();
  const phone   = document.getElementById('rf-phone').value.trim();
  const year    = document.querySelector('input[name="reg-year"]:checked');
  const branch  = document.querySelector('input[name="reg-branch"]:checked');
  const section = document.querySelector('input[name="reg-section"]:checked');
  if(!name){setErr('name',true);ok=false;}else setErr('name',false);
  if(!roll){setErr('roll',true);ok=false;}else setErr('roll',false);
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setErr('email',true);ok=false;}else setErr('email',false);
  if(!phone||!/^\+?[\d\s\-]{10,15}$/.test(phone)){setErr('phone',true);ok=false;}else setErr('phone',false);
  if(!year){setErr('year',true,false);ok=false;}else setErr('year',false,false);
  if(!branch){setErr('branch',true,false);ok=false;}else setErr('branch',false,false);
  if(!section){setErr('section',true,false);ok=false;}else setErr('section',false,false);
  return ok;
}

function handleRegSubmit() {
  if(!regValidate()) return;
  const btn = document.getElementById('regSubmitBtn');
  document.getElementById('reg-spinner').style.display = 'block';
  document.getElementById('reg-btnText').textContent = 'Submitting...';
  btn.disabled = true;
  const fd = new FormData();
  fd.append(REG_IDS.name,    document.getElementById('rf-name').value.trim());
  fd.append(REG_IDS.roll,    document.getElementById('rf-roll').value.trim());
  fd.append(REG_IDS.email,   document.getElementById('rf-email').value.trim());
  fd.append(REG_IDS.phone,   document.getElementById('rf-phone').value.trim());
  fd.append(REG_IDS.year,    document.querySelector('input[name="reg-year"]:checked').value);
  fd.append(REG_IDS.branch,  document.querySelector('input[name="reg-branch"]:checked').value);
  fd.append(REG_IDS.section, document.querySelector('input[name="reg-section"]:checked').value);
  fetch(REG_FORM_ACTION, {method:'POST', mode:'no-cors', body:fd})
    .then(() => showRegSuccess()).catch(() => showRegSuccess());
}

function showRegSuccess() {
  document.getElementById('reg-formView').style.display = 'none';
  document.getElementById('reg-successView').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}


// ─────────────────────────────────────────



const PDF_RESOURCES = {
  git:    { title: 'Git Commands Cheatsheet', filename: 'git-cheatsheet.pdf' },
  linux:  { title: 'Linux Terminal Guide', filename: 'linux-cheatsheet.pdf' },
  docker: { title: 'Docker Quick Reference', filename: 'docker-cheatsheet.pdf' },
  sql:    { title: 'SQL Query Patterns', filename: 'sql-cheatsheet.pdf' }
};

function openCheatsheet(key) {
  const d = PDF_RESOURCES[key];
  document.getElementById('pdfModalTitle').textContent = d.title;
  document.getElementById('pdfDownloadBtn').href = './assets/docs/' + d.filename;
  document.getElementById('pdfDownloadBtn').download = d.filename;
  const frame = document.getElementById('pdfFrame');
  frame.src = './assets/docs/' + d.filename;
  document.getElementById('pdfModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  cursor.style.opacity='0'; ring.style.opacity='0';
  history.pushState({ cheatsheetOpen: true }, '', '#cheatsheet=' + key);
}

function closePdfModal() {
  document.getElementById('pdfModal').classList.remove('open');
  document.getElementById('pdfFrame').src = '';
  document.body.style.overflow = '';
  if (window.history.state && window.history.state.cheatsheetOpen) {
    history.back();
  } else if (window.location.hash.startsWith('#cheatsheet=')) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}



// ─────────────────────────────────────────



const ROADMAP_TITLES = {
  dsa:         'DSA Mastery Roadmap',
  fullstack:   'Full Stack Development',
  aiml:        'AI / ML Fundamentals',
  devops:      'DevOps & Cloud',
  competitive: 'Competitive Programming'
};


const ROADMAP_PATHS = {
  dsa:         'dsa-roadmap.html',
  fullstack:   'fullstack-roadmap.html',
  aiml:        'aiml-roadmap.html',
  devops:      'devops-cloud-roadmap.html',
  competitive: 'competitive-coding-roadmap.html'
};

function openRoadmap(key) {
  const path = ROADMAP_PATHS[key];
  document.getElementById('roadmapFrame').src = './assets/docs/roadmaps/' + path;
  document.getElementById('roadmapBarTitle').textContent = ROADMAP_TITLES[key];
  document.getElementById('roadmapOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  cursor.style.opacity='0'; ring.style.opacity='0';
  history.pushState({ roadmapOpen: true }, '', '#roadmap=' + key);
}

function openTeam() {
  document.getElementById('roadmapFrame').src = './assets/team.html';
  document.getElementById('roadmapBarTitle').textContent = 'Full Team Directory';
  document.getElementById('roadmapOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  cursor.style.opacity='0'; ring.style.opacity='0';
  history.pushState({ overlayOpen: true }, '', '#directory');
}

function openRegistration() {
  document.getElementById('roadmapFrame').src = './assets/registration.html';
  document.getElementById('roadmapBarTitle').textContent = 'Join ACM VJIT';
  document.getElementById('roadmapOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  cursor.style.opacity='0'; ring.style.opacity='0';
  history.pushState({ overlayOpen: true }, '', '#join');
}

function closeRoadmap() {
  document.getElementById('roadmapOverlay').classList.remove('open');
  document.getElementById('roadmapFrame').src = '';
  document.body.style.overflow = '';
  if (window.history.state && window.history.state.overlayOpen) {
    history.back();
  } else if (window.location.hash.startsWith('#roadmap=') || window.location.hash === '#directory' || window.location.hash === '#join') {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

window.addEventListener('popstate', (e) => {
  const hash = window.location.hash;
  if (document.getElementById('roadmapOverlay').classList.contains('open') && !hash.startsWith('#roadmap=') && hash !== '#directory' && hash !== '#join') {
    document.getElementById('roadmapOverlay').classList.remove('open');
    document.getElementById('roadmapFrame').src = '';
    document.body.style.overflow = '';
  }
  if (document.getElementById('pdfModal').classList.contains('open') && !hash.startsWith('#cheatsheet=')) {
    document.getElementById('pdfModal').classList.remove('open');
    document.getElementById('pdfFrame').src = '';
    document.body.style.overflow = '';
  }
});

// ESC key closes overlay
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeRoadmap();
});

// ─── DYNAMIC SECTIONS LOADER ───
let loadedCount = 0;
const sections = ['hero', 'about', 'events', 'team', 'projects', 'blog', 'gallery', 'contact', 'footer'];

function loadSection(id) {
  const container = document.getElementById(id + '-container');
  if (!container) {
    console.warn(`No container for ${id}`);
    return;
  }
  fetch(`sections/${id}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;
      if(id === 'hero'){
        hc = document.getElementById('hero-canvas');
        if(hc){
          hctx = hc.getContext('2d');
          resizeHero();
          HPARTS = Array.from({length:60}, () => ({ x:Math.random(), y:Math.random(), r:Math.random()*1.5+0.5, vx:(Math.random()-0.5)*0.0002, vy:(Math.random()-0.5)*0.0002, op:Math.random()*0.4+0.1 }));
        }
      }
      // Re-observe fade-in elements
      container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
      console.log(`Loaded ${id}`);
      loadedCount++;
      if (loadedCount === 10) {
        updateNavActive();
      }
    })
    .catch(err => console.error(`Failed to load ${id}:`, err));
}

function loadAllSections() {
  sections.forEach(id => loadSection(id));
}

loadAllSections();