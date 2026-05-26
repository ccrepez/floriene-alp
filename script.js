// ── Min date = hari ini ──
const tglEl = document.getElementById('f-tgl');
if (tglEl) tglEl.min = new Date().toISOString().split('T')[0];

// ── Active nav link saat scroll ──
const sections = ['home', 'produk', 'keunggulan', 'loyalty', 'testimoni', 'pesan'];
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Navbar shadow
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);

  // Highlight link aktif
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── Klik "Pesan" dari kartu produk → auto-select & scroll ke form ──
function pilihProduk(nama) {
  const sel = document.getElementById('f-produk');
  for (let opt of sel.options) {
    if (opt.value.toLowerCase().startsWith(nama.toLowerCase())) {
      opt.selected = true;
      break;
    }
  }
  document.getElementById('pesan').scrollIntoView({ behavior: 'smooth' });
}

// ── Submit form → simpan ke localStorage ──
function submitOrder() {
  const nama    = document.getElementById('f-nama').value.trim();
  const hp      = document.getElementById('f-hp').value.trim();
  const produk  = document.getElementById('f-produk').value;
  const qty     = document.getElementById('f-qty').value || '1';
  const tanggal = document.getElementById('f-tgl').value;
  const catatan = document.getElementById('f-catatan').value.trim();

  if (!nama)   { alert('Mohon isi nama lengkapmu. 🌸'); return; }
  if (!hp)     { alert('Nomor WhatsApp wajib diisi. 📱'); return; }
  if (!produk) { alert('Pilih produk yang ingin dipesan. 🌷'); return; }

  const order = {
    id:        'FLR-' + Date.now(),
    timestamp: new Date().toISOString(),
    nama, hp, produk, qty,
    tanggal:   tanggal || '-',
    catatan:   catatan || '-',
    status:    'pending'
  };

  const all = JSON.parse(localStorage.getItem('floriene_orders') || '[]');
  all.push(order);
  localStorage.setItem('floriene_orders', JSON.stringify(all));
  console.log('✅ Pesanan tersimpan:', order);

  // Tampilkan state sukses
  document.getElementById('order-form').style.display = 'none';
  document.getElementById('ok-name').textContent = nama;
  document.getElementById('form-ok').style.display = 'block';
}
