// ─── STAR FIELD (INTRO) ───
const sc = document.getElementById('star-canvas');
const sctx = sc.getContext('2d');
function resizeStar() { sc.width = window.innerWidth; sc.height = window.innerHeight; }
resizeStar(); window.addEventListener('resize', resizeStar);
const STARS = Array.from({length:180}, () => ({ x:Math.random(), y:Math.random(), r:Math.random()*1.4, speed:Math.random()*0.0003+0.0001, op:Math.random()*0.7+0.1, tp:Math.random()*Math.PI*2, ts:Math.random()*0.02+0.005 }));
(function drawStar() {
  sctx.clearRect(0,0,sc.width,sc.height);
  STARS.forEach(s => {
    s.tp+=s.ts;
    const a = s.op*(0.5+0.5*Math.sin(s.tp));
    sctx.beginPath(); sctx.arc(s.x*sc.width, s.y*sc.height, s.r, 0, Math.PI*2);
    sctx.fillStyle=`rgba(160,210,255,${a})`; sctx.fill();
    s.y-=s.speed; if(s.y<0){s.y=1;s.x=Math.random();}
  });
  requestAnimationFrame(drawStar);
})();

// ─── HERO CANVAS (particle field) ───
let hc = null;
let hctx = null;
function resizeHero() { if (!hc) return; hc.width = hc.parentElement.offsetWidth; hc.height = hc.parentElement.offsetHeight; }
window.addEventListener('resize', resizeHero);
let HPARTS = null;
function drawHero() {
  if(!hc || !hctx || !HPARTS || HPARTS.length === 0) {
    requestAnimationFrame(drawHero);
    return;
  }
  hctx.clearRect(0,0,hc.width,hc.height);
  // Draw connections
  HPARTS.forEach((p,i) => {
    HPARTS.slice(i+1).forEach(q => {
      const dx=(p.x-q.x)*hc.width, dy=(p.y-q.y)*hc.height;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){ hctx.beginPath(); hctx.moveTo(p.x*hc.width,p.y*hc.height); hctx.lineTo(q.x*hc.width,q.y*hc.height); hctx.strokeStyle=`rgba(15,143,255,${0.08*(1-d/120)})`; hctx.stroke(); }
    });
  });
  HPARTS.forEach(p => {
    hctx.beginPath(); hctx.arc(p.x*hc.width, p.y*hc.height, p.r, 0, Math.PI*2);
    hctx.fillStyle=`rgba(64,196,255,${p.op})`; hctx.fill();
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=1; if(p.x>1)p.x=0; if(p.y<0)p.y=1; if(p.y>1)p.y=0;
  });
  requestAnimationFrame(drawHero);
}
drawHero();