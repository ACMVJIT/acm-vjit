// ─── ENTER SITE ───
function enterSite() {
  document.getElementById('intro').classList.add('hidden');
  setTimeout(() => document.getElementById('intro').style.display='none', 900);
}
window.enterSite = enterSite;
setTimeout(() => enterSite(), 4200); // auto-enter after animation