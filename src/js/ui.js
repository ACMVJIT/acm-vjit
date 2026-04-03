// ─── MODAL ───
function showModal(title, subtitle, body) {
  const modal = document.getElementById('globalModal');
  modal.querySelector('.modal-title').textContent = title;
  modal.querySelector('.modal-subtitle').textContent = subtitle;
  modal.querySelector('.modal-body').innerHTML = body;
  modal.style.display = 'flex';
}

// Close modal
function closeModal(id) {
  document.getElementById(id || 'globalModal').style.display = 'none';
}
document.addEventListener('click', e => {
  if(e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// ─── SQUAD TOGGLE ───
function toggleSquad(btn) {
  btn.classList.toggle('active');
  const squad = btn.parentElement.querySelector('.squad-list');
  squad.style.maxHeight = btn.classList.contains('active') ? squad.scrollHeight + 'px' : '0';
}