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