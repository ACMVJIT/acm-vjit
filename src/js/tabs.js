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