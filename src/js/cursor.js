// ─── CURSOR ───
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
const hoverSelector = 'a,button,.team-card,.event-card,.project-card,.blog-card,.join-card,.gallery-item,.ftm-vip-card,.ftm-member-card,.nav-links a,.hp-item,.snav-item,.card-head,.card-toggle';

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