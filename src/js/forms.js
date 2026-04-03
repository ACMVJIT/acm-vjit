// ─── GOOGLE FORM ───
function openGForm(formId) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  const modal = document.getElementById('gformModal');
  modal.querySelector('.modal-body').innerHTML = '';
  modal.querySelector('.modal-body').appendChild(iframe);
  modal.style.display = 'flex';
}

// ─── SEND MESSAGE ───
function sendMessage() {com/forms/d/e/${formId}/viewform?embedded=true`;
  const name = document.getElementById('msgName').value.trim();
  const email = document.getElementById('msgEmail').value.trim();
  const msg = document.getElementById('msgText').value.trim();
  if(!name || !email || !msg) { alert('Please fill all fields!'); return; }
  // Simulate send
  showModal("📧", "Message Sent!", "Thanks! We'll get back to you soon.");
  document.getElementById('msgName').value = '';
  document.getElementById('msgEmail').value = '';
  document.getElementById('msgText').value = '';
}

// ─── REG FORM ───
const REG_IDS = {
  name: 'regName',
  email: 'regEmail',
  phone: 'regPhone',
  branch: 'regBranch',
  year: 'regYear',
  submit: 'regSubmit'
};
function regValidate(id) {
  const el = document.getElementById(id);
  el.classList.remove('error');
  if(id === REG_IDS.name && el.value.length < 2) { el.classList.add('error'); return false; }
  if(id === REG_IDS.email && !el.value.includes('@')) { el.classList.add('error'); return false; }
  if(id === REG_IDS.phone && el.value.length !== 10) { el.classList.add('error'); return false; }
  return true;
}
async function handleRegSubmit() {
  let valid = true;
  Object.values(REG_IDS).slice(0,-1).forEach(regValidate);
  for(let id of Object.values(REG_IDS).slice(0,-1)) {
    if(!regValidate(id)) valid = false;
  }
  if(!valid) { showModal('❌', 'Validation Error', 'Please fix the red fields.'); return; }
  const formData = Object.fromEntries(
    Object.entries(REG_IDS).slice(0,-1).map(([k,v]) => [k, document.getElementById(v).value])
  );
  document.getElementById(REG_IDS.submit).textContent = 'Sending...';
  document.getElementById(REG_IDS.submit).disabled = true;
  // Simulate API call
  await new Promise(r => setTimeout(r, 1500));
  showRegSuccess();
}
function showRegSuccess() {
  const modal = document.getElementById('regModal');
  modal.innerHTML = `
    <div class="modal-header">
      <h3>✅ Registration Successful!</h3>
      <button class="modal-close" onclick="closeModal('regModal')">&times;</button>
    </div>
    <div class="modal-body">
      <p>Thanks for registering! Check your email for confirmation.</p>
      <div style="text-align:center;margin-top:20px">
        <button onclick="location.reload()" class="btn">Register Another</button>
      </div>
    </div>`;
}