// ─── DYNAMIC SECTIONS ───
const sections = ['hero', 'about', 'events', 'team', 'projects', 'blog', 'gallery', 'join', 'contact', 'footer'];
let loadedCount = 0;
async function loadSection(id) {
  const container = document.getElementById(id + '-container');
  if (!container) {
    console.warn(`No container for ${id}`);
    return;
  }
  try {
    const res = await fetch(`sections/${id}.html`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    container.innerHTML = html;
    console.log(`Loaded ${id}`);
    // Init hero if needed
    if (id === 'hero') {
      hc = document.getElementById('hero-canvas');
      hctx = hc.getContext('2d');
      HPARTS = Array.from({length: 80}, () => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random()-0.5)*0.005, vy: (Math.random()-0.5)*0.005,
        r: Math.random()*2+1, op: Math.random()*0.8+0.2
      }));
      resizeHero();
    }
    // Scroll reveal for new fade-ins
    container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  } catch (err) {
    console.error(`Failed to load ${id}:`, err);
    container.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:2rem">Failed to load ${id} section.</p>`;
  }
  loadedCount++;
  if (loadedCount === sections.length) {
    updateNavActive();
  }
}
async function loadAllSections() {
  for (const id of sections) {
    loadSection(id);
  }
}
// Override enterSite to preload
const originalEnterSite = enterSite;
enterSite = () => {
  originalEnterSite();
  loadAllSections();
  // Show poster after splash hidden animation — removed in favor of scroll-based trigger
  /*
  setTimeout(() => {
    if (typeof openPosterModal === 'function') {
      openPosterModal();
    }
  }, 1000);
  */
};
// Preload on init
loadAllSections();