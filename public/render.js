// TAMPILAN DASHBOARD — satu kode untuk halaman Vercel (public/index.html) dan HTML offline (tools/hitung_ulang.mjs menyematkan file ini). Warna, panda, dan animasi berasal dari Dashboard_Jihan.html.
// Input: { bt: ringkasan backtest, fw: forwardFromLogs(...), gap: hasil pencocokan (opsional), sumber, status, latihan, kurva: [[tanggal, ekuitas], ...], pnl: [return trade backtest dalam %] }
const NAV = [['sec-home', '🏠', 'Beranda'], ['kpis', '📊', 'Performa KPI'], ['sec-today', '🎯', 'Sinyal Terbaru'], ['sec-eq', '📈', 'Kurva Ekuitas'], ['profit', '🏆', 'Per Pasangan'], ['sec-sig', '🔔', 'Posisi & Sinyal'], ['status', '🛡️', 'Status Bot'], ['sec-table', '📋', 'Backtest vs Forward']];
const $ = s => document.querySelector(s);
const INK='#2a2f38';
function head(o){o=o||{};
  const eyes=o.sleep?`<path d="M32 57q7 7 14 0M74 57q7 7 14 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`:
   `<g class="eye"><circle cx="39" cy="56" r="6" fill="#fff"/><circle class="pupil" cx="40" cy="57" r="3" fill="${INK}"/><circle cx="41.3" cy="55.6" r="1.1" fill="#fff"/></g><g class="eye"><circle cx="81" cy="56" r="6" fill="#fff"/><circle class="pupil" cx="80" cy="57" r="3" fill="${INK}"/><circle cx="81.3" cy="55.6" r="1.1" fill="#fff"/></g>`;
  const mouth=o.full?`<path class="mh" d="M51 80q9 9 18 0" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path class="ms" d="M52 87q8-8 16 0" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path class="tear" d="M34 65q-5 8 0 11q5-3 0-11z" fill="#8fc1e8"/>`:
   `<path d="M51 80q9 9 18 0" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  return `<circle cx="26" cy="26" r="17" fill="${INK}" stroke="#6b7380" stroke-width="1.2"/><circle cx="94" cy="26" r="17" fill="${INK}" stroke="#6b7380" stroke-width="1.2"/><circle cx="26" cy="27" r="7" fill="#5a616d"/><circle cx="94" cy="27" r="7" fill="#5a616d"/><ellipse cx="60" cy="62" rx="46" ry="42" fill="#fff" stroke="#cfd4db" stroke-width="2"/><ellipse cx="38" cy="58" rx="12" ry="16" transform="rotate(25 38 58)" fill="${INK}"/><ellipse cx="82" cy="58" rx="12" ry="16" transform="rotate(-25 82 58)" fill="${INK}"/>${eyes}<ellipse cx="60" cy="71" rx="7" ry="5" fill="${INK}"/><circle cx="58" cy="69.5" r="1.4" fill="#6b7380"/>${mouth}<circle cx="26" cy="76" r="6" fill="#f4b6bc" opacity=".65"/><circle cx="94" cy="76" r="6" fill="#f4b6bc" opacity=".65"/>`}
let qi = 0, Q = [];
function say() { const b = $('#bubble'); if (!b || !Q.length) return; b.classList.remove('pop'); void b.offsetWidth; b.textContent = Q[qi % Q.length]; b.classList.add('pop'); }
function paw(c) { return `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="9" ry="8" fill="${c}"/><ellipse cx="8" cy="15" rx="4" ry="5.5" fill="${c}"/><ellipse cx="16" cy="8" rx="4" ry="5.5" fill="${c}"/><ellipse cx="24" cy="8" rx="4" ry="5.5" fill="${c}"/><ellipse cx="32" cy="15" rx="4" ry="5.5" fill="${c}"/></svg>`; }
function hearts() { const w = $('#stagePanda'), sad = $('#sp').classList.contains('sad'), set = sad ? ['💧', '☁️', '🥲'] : ['♥', '🎋', '✨', '🐾', '💚', '🌿']; for (let i = 0; i < 14; i++) { const h = document.createElement('span'); h.className = 'heart'; h.textContent = set[i % set.length]; h.style.cssText = `left:${30 + Math.random() * 65}%;top:${5 + Math.random() * 35}%;color:#ef8f9c;animation-delay:${(i * .06).toFixed(2)}s;--dx:${(Math.random() * 120 - 60) | 0}px`; w.appendChild(h); setTimeout(() => h.remove(), 1800); } }

export const SHELL = keterangan => `<svg id="sprite" width="0" height="0" style="position:absolute" aria-hidden="true"></svg>
<div id="splash"><div><div class="sr"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div><b>jiiaaannn</b><small>panda lagi siapin bambu</small></div></div>
<div class="aurora"><i></i><i></i><i></i><i></i></div><div id="spot"></div>
<div id="prog"><div id="progBar"></div><svg id="progPanda" viewBox="0 0 120 110"><use href="#ph"/></svg></div>
<div id="leaves"></div>
<div class="corner l"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div><div class="corner r"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div>
<nav class="side" aria-label="Menu utama"><div class="side-logo"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div>${NAV.map(([id, ic, tx]) => `<a data-s="${id}" href="#${id}"><span class="ic">${ic}</span><span class="tx">${tx}</span></a>`).join('')}</nav>
<div class="wrap"><header><div class="brand"><div class="logo-p"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div><div><h1 class="wavetxt">${[...'jiiaaannn'].map((c, i) => `<span style="--d:${(i * .12).toFixed(2)}s">${c}</span>`).join('')}</h1><p>Trend Following MA 20 · Bot Dry Run Indodax · Jihan Anifa · NIM 25110200009</p></div></div>
<div class="actions"><span class="badge" id="srcBadge"><span class="dot"></span><span id="srcTxt">Memuat…</span></span><button class="btn primary" id="refresh" type="button">↻ Perbarui</button><button class="btn icon" id="themeBtn" type="button" aria-label="Ganti tema" title="Ganti tema">◐</button></div></header>
<div class="ticker"><div class="track" id="tkTrack"></div></div><div class="note">${keterangan}</div>
<section class="card stage" id="sec-home"><span class="cloud" style="top:20px;left:34%"></span><span class="cloud" style="top:82px;left:60%;width:64px;animation-duration:17s;animation-delay:-6s"></span><span class="spark" style="left:4%;top:14%">✦</span><span class="spark" style="left:30%;top:68%;color:var(--blush);animation-delay:-.8s">✦</span><span class="spark" style="left:46%;top:12%;animation-delay:-1.4s">✧</span><span class="spark" style="left:72%;top:60%;color:var(--blush);animation-delay:-.3s">✦</span><span class="spark" style="left:84%;top:16%;animation-delay:-1.9s">✧</span>
<div class="baby"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div><div class="baby b2"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div><div class="sp-wrap" id="stagePanda" title="Klik aku, panda!"></div><div class="sp-text"><div class="bubble" id="bubble"></div><div class="chips" id="schips"></div><div class="hint">👆 klik pandanya untuk ngobrol · matanya ngikutin kursor lho</div></div>
<svg class="stalks" viewBox="0 0 110 210" aria-hidden="true"><g><rect x="26" y="44" width="12" height="170" rx="5" fill="#a9c9a4"/><path d="M26 90h12M26 140h12M26 186h12" stroke="#7fa77c" stroke-width="2.5"/><path class="lf" d="M38 56q26-16 34-2q-18 10-34 2z" fill="#b9d6b4"/><path class="lf" d="M26 78q-20-12-28-2q14 8 28 2z" fill="#9cc197"/></g><g><rect x="56" y="10" width="12" height="200" rx="5" fill="#b7d3b2"/><path d="M56 60h12M56 112h12M56 164h12" stroke="#86ad82" stroke-width="2.5"/><path class="lf" d="M68 24q24-18 34-4q-18 12-34 4z" fill="#a9c9a4"/><path class="lf" d="M56 46q-22-12-30-2q16 8 30 2z" fill="#b9d6b4"/></g><g><rect x="86" y="76" width="12" height="134" rx="5" fill="#a9c9a4"/><path d="M86 120h12M86 164h12" stroke="#7fa77c" stroke-width="2.5"/><path class="lf" d="M86 92q-18-10-26 0q12 8 26 0z" fill="#9cc197"/></g></svg></section>
<div id="o"><div class="empty"><svg class="sleepy" viewBox="0 0 120 110"><use href="#ph-sleep"/></svg><br>Panda lagi ambil log bot…</div></div>
<div class="rollway"><div class="roller"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div><div class="roller r2"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div><div class="roller r3"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div></div>
<footer>jiiaaannn · Jihan Anifa · NIM 25110200009 · UAS Algoritma Trading<br>Hasil dry run tanpa uang sungguhan, hanya untuk analisis dan edukasi, bukan rekomendasi investasi.</footer></div>`;

export function pasangMenu(doc) {
  $('#sprite').innerHTML = `<symbol id="ph" viewBox="0 0 120 110">${head()}</symbol><symbol id="ph-sleep" viewBox="0 0 120 110">${head({ sleep: 1 })}</symbol>`;
  $('#stagePanda').innerHTML = `<svg viewBox="0 0 260 232" id="sp"><defs><linearGradient id="bgrad" x1="0" x2="1"><stop offset="0" stop-color="#b3d1ae"/><stop offset="1" stop-color="#86ad82"/></linearGradient></defs><ellipse class="sh" cx="122" cy="222" rx="78" ry="8" fill="rgba(120,128,140,.2)"/><g><rect x="188" y="28" width="14" height="188" rx="5" fill="url(#bgrad)"/><path d="M188 80h14M188 130h14M188 180h14" stroke="#6c9569" stroke-width="2.5"/><path class="lf2" d="M202 40q34-22 44-4q-24 14-44 4z" fill="#a9c9a4"/><path class="lf2" d="M188 64q-30-16-40-2q22 10 40 2z" fill="#93bb8f"/></g><ellipse cx="82" cy="200" rx="27" ry="20" fill="${INK}"/><ellipse cx="162" cy="200" rx="27" ry="20" fill="${INK}"/><ellipse cx="122" cy="154" rx="60" ry="56" fill="#fff" stroke="#cfd4db" stroke-width="2"/><g class="armL"><ellipse cx="70" cy="152" rx="15" ry="31" transform="rotate(18 70 152)" fill="${INK}"/></g><g transform="translate(62 4)"><g class="headbob">${head({ full: 1 })}</g></g><ellipse cx="176" cy="134" rx="14" ry="31" transform="rotate(34 176 134)" fill="${INK}"/></svg>`;
  const lv = $('#leaves');
  for (let i = 0; i < 14; i++) { const s = doc.createElement('span'); s.style.cssText = `left:${(Math.random() * 100).toFixed(1)}%;animation-duration:${(10 + Math.random() * 14).toFixed(1)}s;animation-delay:${(-Math.random() * 20).toFixed(1)}s;--s:${(.6 + Math.random() * .9).toFixed(2)};--dx:${(Math.random() * 200 - 100) | 0}px`; s.innerHTML = '<svg viewBox="0 0 40 20"><path d="M2 10Q20-6 38 10Q20 26 2 10z" fill="#b6d9ab"/><path d="M2 10H38" stroke="#86b97d" stroke-width="1.5"/></svg>'; lv.appendChild(s); }
  for (let i = 0; i < 9; i++) { const s = doc.createElement('span'); s.className = 'pawr'; s.style.cssText = `left:${(4 + i * 11 + Math.random() * 6).toFixed(1)}%;animation-delay:${(-Math.random() * 16).toFixed(1)}s;animation-duration:${(14 + Math.random() * 10).toFixed(1)}s`; s.innerHTML = paw('#2a2f38'); lv.appendChild(s); }
  $('#stagePanda').onclick = () => { qi++; say(); hearts(); const s = $('#sp'); s.classList.remove('jump'); void s.getBoundingClientRect(); s.classList.add('jump'); };
  $('#themeBtn').onclick = () => { const r = doc.documentElement, cur = r.dataset.theme || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'); r.dataset.theme = cur === 'dark' ? 'light' : 'dark'; };
  const refresh = $('#refresh'); if (location.protocol === 'file:') refresh.remove(); else refresh.onclick = () => location.reload();
  let last = 0; const spot = $('#spot');
  doc.addEventListener('mousemove', e => { const w = $('#stagePanda'), r = w.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * .3, dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 300)) * 2.4, dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 300)) * 2; w.querySelectorAll('.pupil').forEach(p => { p.style.transform = `translate(${dx}px,${dy}px)`; });
    spot.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    const c = e.target.closest?.('.card'); if (c) { const b = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - b.left) + 'px'); c.style.setProperty('--my', (e.clientY - b.top) + 'px'); }
    const t = performance.now(); if (t - last < 110 || matchMedia('(prefers-reduced-motion:reduce)').matches) return; last = t; const s = doc.createElement('span'); s.className = 'trail'; s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px'; s.style.setProperty('--r', ((Math.random() * 60 - 30) | 0) + 'deg'); s.innerHTML = paw('#6aac66'); doc.body.appendChild(s); setTimeout(() => s.remove(), 1250); });
  const b = $('#progBar'), p = $('#progPanda'), links = [...doc.querySelectorAll('.side a[data-s]')];
  const gulir = () => { const h = doc.documentElement, k = h.scrollHeight > innerHeight ? h.scrollTop / (h.scrollHeight - innerHeight) : 0; b.style.width = (k * 100).toFixed(1) + '%'; p.style.left = (k * 100).toFixed(1) + '%'; let akt = links[0]; for (const a of links) { const s = doc.getElementById(a.dataset.s); if (s && s.getBoundingClientRect().top < innerHeight * .35) akt = a; } links.forEach(a => a.classList.toggle('on', a === akt)); };
  addEventListener('scroll', gulir, { passive: true }); gulir();
  setInterval(() => { if (doc.hidden || !Q.length) return; qi++; say(); const s = $('#sp'); s.classList.remove('jump'); void s.getBoundingClientRect(); s.classList.add('jump'); }, 8000);
}

export function renderDashboard(el, { bt, fw, gap = null, sumber = '', status = null, latihan = null, kurva = null, pnl = null }) {
  const nf = (x, d = 2) => x.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });
  const pct = (x, d = 2) => x == null || !isFinite(x) ? '–' : nf(x * 100, d) + '%', num = (x, d = 2) => x == null ? '–' : x === Infinity ? '∞' : nf(x, d), rp = x => x == null ? '–' : 'Rp' + Math.round(x).toLocaleString('id-ID');
  const spct = (x, d = 2) => x == null || !isFinite(x) ? '–' : (x > 0 ? '+' : x < 0 ? '−' : '') + pct(Math.abs(x), d);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cls = x => x == null || !isFinite(x) || x === 0 ? '' : x > 0 ? 'pos' : 'neg';
  const wib = t => t ? new Date(Date.parse(t.length === 16 ? t + ':00Z' : t) + 7 * 3600e3).toISOString().slice(0, 16).replace('T', ' ') + ' WIB' : '–';
  const tbl = (head_, rows) => '<div class="tw"><table class="mt"><thead><tr>' + head_.map(h => `<th class="l">${h}</th>`).join('') + '</tr></thead><tbody>' + (rows.length ? rows.map(r => '<tr>' + r.map(c => `<td class="l">${c}</td>`).join('') + '</tr>').join('') : `<tr><td colspan="${head_.length}" class="empty">Belum ada data.</td></tr>`) + '</tbody></table></div>';
  const kartu = (id, judul, sub, isi, panda = false) => `<section class="card" id="${id}" style="margin-bottom:16px"><div class="hd"><h3>${judul}</h3>${panda ? '<svg class="mini" viewBox="0 0 120 110"><use href="#ph"/></svg>' : ''}<span>${sub}</span></div>${isi}</section>`;
  const tidur = t => `<div class="tdempty"><svg class="sleepy" viewBox="0 0 120 110"><use href="#ph-sleep"/></svg>${t}</div>`;
  const tag = s => `<span class="tag ${s === 'BELI' ? 'buy' : 'sell'}">${esc(s)}</span>`;
  const T = fw.trade, B = bt.trade, op = fw.operasional, E = fw.ekuitas, belumFreeze = !!status && (!status.freeze || status.freeze >= '2099');
  const kpi = (k, v, s, c, kelas) => `<div class="card kpi ${kelas}"><svg class="kp" viewBox="0 0 120 110"><use href="#ph"/></svg><small><i></i>${k}</small><div class="v mono ${c}">${v}</div><div class="s">${s}</div></div>`;
  const eqNow = status?.ekuitas ?? E.akhir ?? 100e6, pakai = status?.ekuitas > 0 && status.kas != null ? Math.max(0, Math.min(1, (status.ekuitas - status.kas) / status.ekuitas)) : 0, posisi = status?.posisi || [];

  let h = `<section class="hero"><div class="card strategy"><h2>Algoritma · AFL "Trend Following MA 20"</h2><div class="sub">Long only · satu posisi per pasangan · MA 20 hari = 120 candle 4 jam · dieksekusi sesudah candle tutup</div><div class="rules"><div class="rule"><b><span class="chip chip-b">BUY</span></b>Close memotong ke atas MA dan MA sedang naik.<br><code>Cross(C, MA) AND MA &gt; Ref(MA,-1)</code></div><div class="rule"><b><span class="chip chip-s">SELL</span></b>Close memotong ke bawah MA dan MA sedang turun.<br><code>Cross(MA, C) AND MA &lt; Ref(MA,-1)</code></div></div></div>
<div class="card"><div class="meta"><div class="m"><small>Universe</small><span>8 pasangan</span></div><div class="m"><small>Candle terakhir</small><span style="font-size:15px">${status ? wib(status.candle_terakhir_diproses) : esc(fw.jendela.akhir.slice(0, 10))}</span></div><div class="m"><small>Nilai akun</small><span style="font-size:17px">${rp(eqNow)}</span></div><div class="m"><small>Posisi aktif</small><span>${posisi.length} / 8</span></div></div></div></section>`;
  h += '<section class="kpis" id="kpis">' + kpi('Return Forward', spct(E.return_total), 'dari modal Rp100 juta', cls(E.return_total), E.return_total > 0 ? 'good' : E.return_total < 0 ? 'bad' : '')
    + kpi('CAGR Backtest', spct(bt.ekuitas.cagr), `${esc(bt.mulai.slice(0, 10))} → ${esc(bt.akhir.slice(0, 10))}, sudah termasuk biaya`, cls(bt.ekuitas.cagr), bt.ekuitas.cagr > 0 ? 'good' : 'bad')
    + kpi('Profit Factor', num(B.profit_factor), 'Gross win ÷ gross loss', '', B.profit_factor > 1 ? 'good' : 'bad') + kpi('Winning Ratio', pct(B.win_rate, 1), 'Trade untung ÷ total trade', '', '') + kpi('Average Win', spct(B.rata_untung), 'Rata-rata trade untung', 'pos', 'good') + kpi('Average Loss', spct(B.rata_rugi), 'Rata-rata trade rugi', 'neg', 'bad')
    + kpi('Max Drawdown', '−' + pct(bt.ekuitas.mdd), 'Dari kurva ekuitas backtest', 'neg', 'bad') + kpi('Total Trade', B.jumlah, `Porsi biaya ${pct(B.porsi_biaya, 1)}`, '', '') + kpi('Uptime Forward', pct(op.uptime, 1), `${op.candle_tepat_waktu} dari ${op.candle_terjadwal} candle tepat waktu`, '', '') + '</section>';

  // ---- sinyal terbaru
  const cTerakhir = status?.candle_terakhir_diproses, sigBaru = (fw.sinyal || []).filter(s => s.candle === cTerakhir), beli = sigBaru.filter(s => s.sisi === 'BELI'), jual = sigBaru.filter(s => s.sisi === 'JUAL');
  const baris = a => a.length ? a.map(s => `<div class="rw"><b>${esc(s.pair)}</b><span class="mono">${esc(s.alasan)} · ${num(s.harga_sinyal, 2)}</span></div>`).join('') : '<div class="empty" style="padding:14px">Tidak ada.</div>';
  h += `<section class="card today" id="sec-today" style="margin-bottom:16px"><div class="hd"><h3>Sinyal Terbaru</h3><svg class="mini" viewBox="0 0 120 110"><use href="#ph"/></svg><span>${status ? 'candle ' + wib(cTerakhir) : 'salinan offline'}</span></div><div class="tdsum"><span class="cp2 up">Beli <b>${beli.length}</b></span><span class="cp2 dn">Jual <b>${jual.length}</b></span><span class="cp2 wt">Posisi <b>${posisi.length}</b></span></div>${sigBaru.length ? '' : tidur('Belum ada sinyal pada candle terakhir. Panda tidur dulu, sabar ya.')}<div class="tdcols"><div><h4>▲ Sinyal beli</h4>${baris(beli)}</div><div><h4>▼ Sinyal jual</h4>${baris(jual)}</div></div><div class="tdnote">Bot memeriksa aturan di setiap candle 4 jam yang sudah tutup, lalu mengeksekusi simulasi di order book Indodax. Ini dry run tanpa uang sungguhan dan bukan rekomendasi investasi.</div></section>`;

  // ---- kurva + donut + histogram
  const r0 = 52, C0 = 2 * Math.PI * r0, edges = []; for (let e = -25; e <= 50; e += 5) edges.push(e); const bins = new Array(edges.length).fill(0); (pnl || []).forEach(x => { const j = Math.floor((Math.max(-25, Math.min(50, x)) + 25) / 5); bins[Math.min(j, bins.length - 1)]++; });
  const HW = 360, HH = 120, mx = Math.max(...bins, 1), bw = HW / bins.length;
  h += `<section class="row" id="sec-eq"><div class="card"><div class="hd"><h3>Kurva Ekuitas Backtest</h3><span>Modal Rp100 juta, arahkan kursor untuk melihat nilai</span></div><div class="chart" id="eqChart"></div><details style="margin-top:10px;font-size:12.5px;color:var(--muted)"><summary style="cursor:pointer">Lihat nilai akhir tiap bulan</summary>${tbl(['Bulan', 'Ekuitas'], (kurva || []).filter((x, i, a) => i === a.length - 1 || a[i + 1][0].slice(0, 7) !== x[0].slice(0, 7)).map(x => [x[0].slice(0, 7), rp(x[1])]))}</details></div>
<div class="card"><div class="hd"><h3>Status Modal</h3><svg class="mini" viewBox="0 0 120 110"><use href="#ph"/></svg></div><div class="donut"><div id="donut"><svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label="Modal terpakai ${pct(pakai, 0)}"><circle cx="70" cy="70" r="${r0}" fill="none" style="stroke:var(--line)" stroke-width="16"/>${pakai > 0 ? `<circle cx="70" cy="70" r="${r0}" fill="none" style="stroke:var(--pos)" stroke-width="16" stroke-linecap="round" stroke-dasharray="${Math.max(1, pakai * C0 - 4).toFixed(1)} ${C0}" transform="rotate(-90 70 70)"/>` : ''}<text x="70" y="68" text-anchor="middle" font-size="26" font-weight="800" style="fill:var(--text)">${Math.round(pakai * 100)}%</text><text x="70" y="88" text-anchor="middle" font-size="10.5" style="fill:var(--muted)">terpakai</text></svg></div><div class="legend"><div><span><i class="sw" style="background:var(--pos)"></i>Terpakai</span><em>${pct(pakai, 0)}</em></div><div><span><i class="sw" style="background:var(--line2)"></i>Kas</span><em>${pct(1 - pakai, 0)}</em></div></div></div><div style="margin-top:16px" class="hd"><h3 style="font-size:13px">Distribusi PnL per Trade Backtest</h3></div><div id="hist"><svg viewBox="0 0 ${HW} ${HH + 16}" width="100%" role="img" aria-label="Histogram return trade backtest">${bins.map((b, i) => { const t = b / mx * (HH - 8); return `<rect x="${i * bw + 2}" y="${HH - t}" width="${bw - 4}" height="${t}" rx="3" style="fill:var(${edges[i] >= 0 ? '--pos' : '--neg'})" opacity=".85"><title>${edges[i]}% s/d ${edges[i] + 5}%: ${b} trade</title></rect>`; }).join('')}<text x="0" y="${HH + 12}" font-size="9.5" style="fill:var(--muted)">≤ -25%</text><text x="${HW / 2}" y="${HH + 12}" text-anchor="middle" font-size="9.5" style="fill:var(--muted)">0%</text><text x="${HW}" y="${HH + 12}" text-anchor="end" font-size="9.5" style="fill:var(--muted)">≥ +50%</text></svg></div></div></section>`;

  // ---- per pasangan
  const PP = Object.entries(bt.per_pasangan || {}), pod = PP.filter(([, s]) => s.jumlah && s.laba_bersih > 0).sort((a, b) => b[1].laba_bersih - a[1].laba_bersih).slice(0, 3), med = ['🥇', '🥈', '🥉'];
  h += kartu('profit', 'Hasil Backtest per Pasangan', 'pasangan tanpa trade tetap ditampilkan', `<div class="podium">${pod.map(([k, s], i) => `<div class="pd r${i + 1}" style="cursor:default"><svg class="bp" viewBox="0 0 120 110"><use href="#ph"/></svg><div class="md">${med[i]}</div><b class="pdk">${esc(k)}</b><div class="pdc pos">${rp(s.laba_bersih)}</div><div class="pdm">${s.jumlah} trade · PF ${num(s.profit_factor)} · WR ${pct(s.win_rate, 1)}</div></div>`).join('')}</div>` + tbl(['Pasangan', 'Trade', 'Win rate', 'Profit factor', 'Laba bersih'], PP.map(([k, s]) => [`<b>${esc(k)}</b>`, s.jumlah, pct(s.win_rate, 1), num(s.profit_factor), `<span class="${cls(s.laba_bersih)}">${rp(s.laba_bersih)}</span>`])), true);

  // ---- posisi, trade, sinyal
  const kartuPosisi = posisi.length ? `<div class="sgrid" style="margin-bottom:14px">${posisi.map(p => `<div class="sig" style="cursor:default"><div class="t">${esc(p)}<span class="tag on">AKTIF</span></div><div class="p"><span>Posisi terbuka di akun dry run</span></div></div>`).join('')}</div>` : tidur('Belum ada posisi terbuka.');
  h += kartu('sec-sig', 'Posisi & Sinyal Forward', 'langsung dari log bot', kartuPosisi + '<div class="hd" style="margin-top:14px"><h3 style="font-size:13px">Trade forward yang sudah ditutup</h3></div>' + tbl(['Pasangan', 'Masuk', 'Keluar', 'Hasil', 'Return', 'Biaya', 'Alasan'], fw.trades.map(t => [`<b>${esc(t.pair)}</b>`, esc(t.masuk), esc(t.keluar), `<span class="${cls(t.pnl)}">${rp(t.pnl)}</span>`, `<span class="${cls(t.ret)}">${pct(t.ret)}</span>`, rp(t.biaya), esc(t.alasan)])) + '<div class="hd" style="margin-top:14px"><h3 style="font-size:13px">Semua sinyal forward</h3></div>' + tbl(['Candle', 'Pasangan', 'Sisi', 'Alasan', 'Harga sinyal', 'Data valid'], fw.sinyal.map(s => [esc(s.candle), `<b>${esc(s.pair)}</b>`, tag(s.sisi), esc(s.alasan), num(s.harga_sinyal, 4), s.valid === false ? 'tidak: ' + esc((s.alasan_tidak_valid || []).join(', ')) : 'ya'])));

  // ---- status & operasional
  let st = '';
  if (status) { const L = status.terakhir, fase = belumFreeze ? 'Freeze belum ditentukan. Trade yang muncul sekarang hanya latihan dan direset saat freeze.' : { sebelum_freeze: `Persiapan: forward test mulai ${wib(status.freeze)}. Trade sebelum itu hanya latihan dan direset saat freeze.`, forward: `Forward test berjalan sampai ${wib(status.akhir)}.`, selesai: 'Forward test selesai.' }[status.fase];
    st += `<div class="tdnote" style="margin:0 0 12px">${esc(fase)}</div>` + tbl(['Panggilan terakhir', 'Pemanggil', 'Hasil', 'Candle terakhir diproses', 'Total panggilan', 'Panggilan error', 'Ekuitas', 'Posisi'], [[wib(L?.t), esc(L?.sumber), esc(L?.hasil) + (L?.error ? ` (${L.error} error)` : ''), wib(status.candle_terakhir_diproses), status.panggilan_total, status.panggilan_error, rp(status.ekuitas), esc(posisi.join(', ') || '–')]]);
    if (latihan && status.fase === 'sebelum_freeze' && !belumFreeze) { const o = latihan.operasional; st += '<div class="hd" style="margin-top:14px"><h3 style="font-size:13px">Uji coba sebelum freeze (tidak masuk hasil UAS)</h3></div>' + tbl(['Candle terjadwal', 'Tepat waktu', 'Uptime', 'Panggilan', 'Panggilan error', 'Error API', 'Kill switch', 'Trade latihan', 'Return latihan'], [[o.candle_terjadwal, o.candle_tepat_waktu, pct(o.uptime, 1), o.panggilan, o.panggilan_error, o.error_api, o.kill_switch, latihan.trade.jumlah, pct(latihan.ekuitas.return_total)]]); } }
  st += '<div class="hd" style="margin-top:14px"><h3 style="font-size:13px">Operasional forward test</h3></div>' + tbl(['Candle terjadwal', 'Tepat waktu', 'Uptime', 'Panggilan', 'Panggilan error', 'Error API (setelah retry dicatat)', 'Kill switch'], [[op.candle_terjadwal, op.candle_tepat_waktu, pct(op.uptime, 1), op.panggilan, op.panggilan_error, op.error_api, op.kill_switch]]) + (op.candle_terlewat?.length ? `<div class="vnote">Candle terlewat: ${op.candle_terlewat.map(esc).join(', ')}</div>` : '');
  h += kartu('status', 'Status Bot & Operasional', 'semua dihitung dari log mentah', st, true);

  // ---- backtest vs forward
  let cmp = tbl(['Metrik', `Backtest ${esc(bt.mulai.slice(0, 10))} → ${esc(bt.akhir.slice(0, 10))}`, 'Forward test'], [['Return total', pct(bt.ekuitas.return_total), pct(E.return_total)], ['CAGR', pct(bt.ekuitas.cagr), '— (jendela terlalu pendek)'], ['Maximum drawdown', '−' + pct(bt.ekuitas.mdd), E.mdd == null ? '–' : E.mdd === 0 ? pct(0) : '−' + pct(E.mdd)], ['Jumlah trade', B.jumlah, T.jumlah], ['Win rate', pct(B.win_rate, 1), pct(T.win_rate, 1)], ['Profit factor', num(B.profit_factor), num(T.profit_factor)], ['Rata-rata untung / rugi per trade', pct(B.rata_untung, 1) + ' / ' + pct(B.rata_rugi, 1), pct(T.rata_untung, 1) + ' / ' + pct(T.rata_rugi, 1)], ['Porsi biaya (fee + spread + slippage) ÷ laba kotor', pct(B.porsi_biaya, 1), pct(T.porsi_biaya, 1)], ['Beli & tahan BTC/IDR (periode sama)', pct(bt.beli_tahan_btc.return_total), pct(fw.beli_tahan_btc)]]);
  if (gap) { cmp += '<div class="hd" style="margin-top:14px"><h3 style="font-size:13px">Gap backtest vs forward, jendela yang sama</h3></div>' + tbl(['Sinyal bot', 'Sinyal backtest', 'Identik', 'Kecocokan', 'Return backtest jendela', 'Return forward', 'Selisih'], [[gap.sinyal.bot, gap.sinyal.backtest, gap.sinyal.identik, pct(gap.sinyal.kecocokan, 1), pct(gap.bt_jendela.return_total), pct(E.return_total), pct(E.return_total - gap.bt_jendela.return_total)]]);
    if (gap.sinyal.hanya_bot.length || gap.sinyal.hanya_backtest.length) cmp += `<div class="vnote">Hanya di bot: ${gap.sinyal.hanya_bot.map(esc).join('; ') || '–'} · hanya di backtest: ${gap.sinyal.hanya_backtest.map(esc).join('; ') || '–'}</div>`;
    cmp += '<div style="margin-top:10px">' + tbl(['Candle', 'Pasangan', 'Sisi', 'Fill bot', 'Fill backtest', 'Selisih', 'Terlambat dari tutup candle'], gap.fill.map(f => [esc(f.candle), `<b>${esc(f.pair)}</b>`, tag(f.sisi), num(f.bot, 4), num(f.backtest, 4), pct(f.selisih, 3), f.telat_menit + ' menit'])) + '</div>'; }
  cmp += `<div class="vnote">Sumber data: ${esc(sumber)} · jendela forward ${belumFreeze ? 'belum ditentukan' : esc(fw.jendela.mulai) + ' → ' + esc(fw.jendela.akhir) + ' UTC'} · semua angka dihitung dari log mentah (public/metrics.js), sama dengan skrip hitung_ulang.</div>`;
  h += `<section class="card peeker" id="sec-table" style="margin-bottom:16px"><div class="peek"><svg viewBox="0 0 120 110"><use href="#ph"/></svg></div><div class="hd"><h3>Backtest dan Forward Test</h3><span>angka backtest sudah termasuk biaya</span></div>${cmp}</section>`;
  el.innerHTML = h;

  if (kurva?.length > 1) { const g = el.querySelector('#eqChart'), W = 760, H = 280, pl = 52, pr = 10, pt = 10, pb = 26, v = kurva.map(x => x[1]), n = v.length, mn = Math.min(...v), mxv = Math.max(...v), pad = (mxv - mn) * .1 || 1, lo = mn - pad, hi = mxv + pad, X = i => pl + i / (n - 1) * (W - pl - pr), Y = y => pt + (1 - (y - lo) / (hi - lo)) * (H - pt - pb), lp = v.map((y, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(y).toFixed(1)).join('');
    let grid = ''; for (let k = 0; k <= 4; k++) { const val = lo + (hi - lo) * k / 4; grid += `<line x1="${pl}" x2="${W - pr}" y1="${Y(val)}" y2="${Y(val)}" style="stroke:var(--line)"/><text x="${pl - 8}" y="${Y(val) + 4}" text-anchor="end" font-size="10.5" style="fill:var(--muted)" font-family="JetBrains Mono,monospace">${Math.round(val / 1e6)} jt</text>`; }
    const xl = [0, .25, .5, .75, 1].map(f => { const i = Math.round(f * (n - 1)); return `<text x="${X(i)}" y="${H - 6}" text-anchor="${f === 0 ? 'start' : f === 1 ? 'end' : 'middle'}" font-size="10.5" style="fill:var(--muted)">${kurva[i][0].slice(0, 7)}</text>`; }).join('');
    g.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Kurva ekuitas backtest dari ${rp(v[0])} menjadi ${rp(v[n - 1])}"><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--bamboo);stop-opacity:.32"/><stop offset="1" style="stop-color:var(--bamboo);stop-opacity:0"/></linearGradient></defs>${grid}${xl}<line x1="${pl}" x2="${W - pr}" y1="${Y(100e6)}" y2="${Y(100e6)}" style="stroke:var(--line2)" stroke-dasharray="4 4"/><path d="${lp}L${X(n - 1)} ${H - pb}L${X(0)} ${H - pb}Z" fill="url(#ag)"/><path class="draw" pathLength="1" d="${lp}" fill="none" style="stroke:var(--bamboo)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><line id="cx" y1="${pt}" y2="${H - pb}" style="stroke:var(--line2)" opacity="0"/><circle id="cd" r="4.5" style="fill:var(--accent);stroke:var(--surface)" stroke-width="2" opacity="0"/><rect x="${pl}" y="0" width="${W - pl - pr}" height="${H}" fill="transparent" id="hit"/></svg><div class="tip" id="tip"></div>`;
    const hit = g.querySelector('#hit'), svg = hit.ownerSVGElement, cx = g.querySelector('#cx'), cd = g.querySelector('#cd'), tip = g.querySelector('#tip');
    hit.addEventListener('pointermove', e => { const r = svg.getBoundingClientRect(), sx = (e.clientX - r.left) / r.width * W, i = Math.max(0, Math.min(n - 1, Math.round((sx - pl) / (W - pl - pr) * (n - 1)))); cx.setAttribute('x1', X(i)); cx.setAttribute('x2', X(i)); cx.setAttribute('opacity', 1); cd.setAttribute('cx', X(i)); cd.setAttribute('cy', Y(v[i])); cd.setAttribute('opacity', 1); tip.style.opacity = 1; tip.style.left = (X(i) / W * r.width) + 'px'; tip.style.top = (Y(v[i]) / H * r.height) + 'px'; tip.textContent = kurva[i][0] + ' · ' + rp(v[i]); });
    hit.addEventListener('pointerleave', () => { cx.setAttribute('opacity', 0); cd.setAttribute('opacity', 0); tip.style.opacity = 0; }); }

  // ---- ticker, bubble, badge
  const it = []; for (const s of sigBaru) it.push(`<span class="ti ${s.sisi === 'BELI' ? 'up' : 'dn'}">🐼 ${esc(s.pair)} <b>${esc(s.sisi)}</b></span>`); for (const p of posisi) it.push(`<span class="ti up">🎋 ${esc(p)} <b>AKTIF</b></span>`); if (!it.length) it.push('<span class="ti">🐼 Panda lagi nunggu sinyal…</span>', '<span class="ti">🎋 Bot memeriksa setiap candle 4 jam</span>', '<span class="ti">🐾 Dry run tanpa uang sungguhan</span>');
  const tr = $('#tkTrack'); if (tr) { tr.innerHTML = it.join('') + it.join(''); tr.style.animationDuration = Math.max(30, it.length * 3.2) + 's'; }
  const ret = E.return_total, sedih = ret != null && ret < 0, sp = $('#sp'); if (sp) sp.classList.toggle('sad', sedih);
  Q = [ret == null ? 'Halo! Panda lagi jagain bot MA 20 🎋' : sedih ? `Akun lagi merah ${spct(ret)} 🥲 panda butuh lebih banyak bambu.` : `Return forward ${spct(ret)} 🎋 panda terus pantau!`, `Ada ${posisi.length} posisi aktif dan ${T.jumlah} trade forward sudah ditutup.`, `Backtest: profit factor ${num(B.profit_factor)}, winning ratio ${pct(B.win_rate, 1)}.`, `Uptime forward ${pct(op.uptime, 1)}. Bot jalan tiap candle 4 jam.`, 'Psst… ingat, ini bukan rekomendasi investasi ya 🐼'];
  qi = 0; say();
  const chips = $('#schips'); if (chips) chips.innerHTML = [['Posisi aktif', posisi.length], ['Trade forward', T.jumlah], ['Uptime', pct(op.uptime, 1)], ['Return forward', spct(ret)]].map((c, i) => `<span style="animation-delay:${i * .1}s">${c[0]}<b class="mono">${c[1]}</b></span>`).join('');
  const badge = $('#srcBadge'), txt = $('#srcTxt'); if (badge) { badge.classList.toggle('real', !!status && !status.panggilan_error); txt.textContent = !status ? 'Salinan offline' : belumFreeze ? 'Belum freeze · latihan' : status.fase === 'forward' ? 'Forward test berjalan' : status.fase === 'selesai' ? 'Forward test selesai' : 'Persiapan'; }
}

export const CSS = `:root{
  --bg:#e9ebee;--bg2:#f2f3f5;--surface:#ffffff;--surface2:#f6f7f9;--line:#e2e5e9;--line2:#d4d8de;
  --text:#1c2027;--muted:#79818d;--accent:#2a313c;--accent-ink:#ffffff;
  --pos:#1b9a68;--neg:#d6504b;--pos-bg:#e5f5ee;--neg-bg:#fbe9e8;--warn:#b7791f;--warn-bg:#fbf1dc;
  --shadow:0 1px 2px rgba(28,32,39,.04),0 8px 24px -12px rgba(28,32,39,.10);
  --font:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --bg:#15181d;--bg2:#1a1e24;--surface:#1f242b;--surface2:#262c34;--line:#2d343d;--line2:#3a424d;
    --text:#eceef1;--muted:#8d95a1;--accent:#e9ebee;--accent-ink:#1c2027;
    --pos:#3cc590;--neg:#f0716c;--pos-bg:#183328;--neg-bg:#3a2020;--warn:#e3b05a;--warn-bg:#382d17;
    --shadow:0 1px 2px rgba(0,0,0,.3),0 8px 24px -12px rgba(0,0,0,.5);
  }
}
:root[data-theme="dark"]{
  --bg:#15181d;--bg2:#1a1e24;--surface:#1f242b;--surface2:#262c34;--line:#2d343d;--line2:#3a424d;
  --text:#eceef1;--muted:#8d95a1;--accent:#e9ebee;--accent-ink:#1c2027;
  --pos:#3cc590;--neg:#f0716c;--pos-bg:#183328;--neg-bg:#3a2020;--warn:#e3b05a;--warn-bg:#382d17;
  --shadow:0 1px 2px rgba(0,0,0,.3),0 8px 24px -12px rgba(0,0,0,.5);
}
html{scroll-padding-top:env(safe-area-inset-top,0px);height:100%}
*{box-sizing:border-box}
body{margin:0;min-height:100%;background:var(--bg);color:var(--text);font-family:var(--font);font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased;
  background-image:radial-gradient(900px 400px at 10% -10%,var(--surface) 0,transparent 70%),radial-gradient(700px 360px at 100% 0,var(--bg2) 0,transparent 70%);background-repeat:no-repeat}
.wrap{max-width:1280px;margin:0 auto;padding:22px 20px 56px;position:relative;z-index:1}
.mono{font-family:var(--mono);font-variant-numeric:tabular-nums}
.pos{color:var(--pos)}.neg{color:var(--neg)}

/* header */
header{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:22px}
.brand{display:flex;align-items:center;gap:14px}
.logo{width:46px;height:46px;border-radius:15px;background:var(--accent);color:var(--accent-ink);display:grid;place-items:center;font-weight:800;font-size:24px;letter-spacing:-1px;box-shadow:var(--shadow);position:relative;overflow:hidden}
.logo::after{content:"";position:absolute;inset:auto -8px -14px auto;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14)}
.brand h1{margin:0;font-size:28px;font-weight:800;letter-spacing:-1.2px;line-height:1}
.brand p{margin:4px 0 0;color:var(--muted);font-size:12.5px;font-weight:500}
.actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.badge{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:999px;background:var(--surface);border:1px solid var(--line);font-size:12px;font-weight:600;box-shadow:var(--shadow)}
.badge .dot{width:8px;height:8px;border-radius:50%;background:var(--warn);box-shadow:0 0 0 4px var(--warn-bg)}
.badge.real .dot{background:var(--pos);box-shadow:0 0 0 4px var(--pos-bg)}
.btn{font:inherit;font-weight:600;font-size:12.5px;border:1px solid var(--line2);background:var(--surface);color:var(--text);padding:9px 14px;border-radius:12px;cursor:pointer;transition:.18s;display:inline-flex;gap:8px;align-items:center}
.btn:hover{transform:translateY(-1px);border-color:var(--text)}
.btn.primary{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
.btn.icon{padding:9px 11px}

/* hero */
.hero{display:grid;grid-template-columns:1.5fr 1fr;gap:16px;margin-bottom:16px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadow);padding:20px;animation:rise .55s both}
@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.strategy h2{margin:0 0 4px;font-size:16px;font-weight:700;letter-spacing:-.3px}
.strategy .sub{color:var(--muted);font-size:12.5px;margin-bottom:14px}
.rules{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.rule{background:var(--surface2);border:1px solid var(--line);border-radius:14px;padding:12px 14px;font-size:12.5px}
.rule b{display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:12px;letter-spacing:.5px;text-transform:uppercase}
.rule .chip-b{background:var(--pos-bg);color:var(--pos)}.rule .chip-s{background:var(--neg-bg);color:var(--neg)}
.chip{padding:2px 8px;border-radius:7px;font-size:11px;font-weight:700}
.rule code{font-family:var(--mono);font-size:11.5px;color:var(--muted)}
.meta{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.meta .m{background:var(--surface2);border:1px solid var(--line);border-radius:14px;padding:12px 14px}
.meta .m small{display:block;color:var(--muted);font-size:11px;font-weight:600;letter-spacing:.4px;text-transform:uppercase}
.meta .m span{font-size:20px;font-weight:700;letter-spacing:-.5px}

/* kpi */
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:16px}
.kpi{padding:18px 18px 16px;position:relative;overflow:hidden}
.kpi small{color:var(--muted);font-size:11.5px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;display:flex;align-items:center;gap:8px}
.kpi small i{width:7px;height:7px;border-radius:2px;background:var(--line2);display:inline-block}
.kpi .v{font-size:32px;font-weight:800;letter-spacing:-1.4px;margin:8px 0 2px;line-height:1.1}
.kpi .s{color:var(--muted);font-size:12px}
.kpi.good small i{background:var(--pos)}.kpi.bad small i{background:var(--neg)}
.kpi::after{content:"";position:absolute;right:-30px;top:-30px;width:90px;height:90px;border-radius:50%;background:var(--surface2);z-index:0}
.kpi>*{position:relative;z-index:1}

/* grids */
.row{display:grid;grid-template-columns:1.7fr 1fr;gap:16px;margin-bottom:16px}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.card h3{margin:0;font-size:15px;font-weight:700;letter-spacing:-.3px}
.card .hd{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;gap:10px;flex-wrap:wrap}
.card .hd span{color:var(--muted);font-size:12px}
svg{display:block;max-width:100%}
.chart{position:relative}
.tip{position:absolute;pointer-events:none;background:var(--accent);color:var(--accent-ink);padding:6px 10px;border-radius:9px;font-size:11.5px;font-family:var(--mono);opacity:0;transition:opacity .12s;white-space:nowrap;transform:translate(-50%,-120%)}

/* donut */
.donut{display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.legend{display:grid;gap:10px;flex:1;min-width:140px}
.legend div{display:flex;justify-content:space-between;align-items:center;background:var(--surface2);border:1px solid var(--line);padding:10px 12px;border-radius:12px;font-weight:600;font-size:12.5px}
.legend em{font-style:normal;font-size:20px;font-weight:800;letter-spacing:-.6px}
.sw{width:9px;height:9px;border-radius:3px;display:inline-block;margin-right:8px}

/* signals */
.tabs{display:inline-flex;background:var(--surface2);border:1px solid var(--line);border-radius:13px;padding:4px;gap:2px;margin-bottom:14px;flex-wrap:wrap}
.tab{font:inherit;font-weight:600;font-size:12.5px;border:0;background:transparent;color:var(--muted);padding:8px 14px;border-radius:10px;cursor:pointer}
.tab.on{background:var(--surface);color:var(--text);box-shadow:var(--shadow)}
.tab b{font-family:var(--mono);margin-left:6px;font-size:11px;background:var(--line);padding:1px 7px;border-radius:7px;color:var(--text)}
.sgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px;max-height:420px;overflow:auto;padding:2px}
.sig{background:var(--surface2);border:1px solid var(--line);border-radius:14px;padding:12px 13px;cursor:pointer;transition:.16s;text-align:left;font:inherit;color:inherit}
.sig:hover{transform:translateY(-2px);border-color:var(--line2);background:var(--surface)}
.sig .t{display:flex;justify-content:space-between;align-items:center;font-weight:800;font-size:14px;letter-spacing:-.3px}
.sig .p{font-size:11.5px;color:var(--muted);margin-top:6px;display:grid;gap:2px}
.tag{font-size:10px;font-weight:700;padding:2px 7px;border-radius:6px;letter-spacing:.4px}
.tag.buy{background:var(--pos-bg);color:var(--pos)}.tag.sell{background:var(--neg-bg);color:var(--neg)}.tag.on{background:var(--pos-bg);color:var(--pos)}.tag.off{background:var(--line);color:var(--muted)}
.empty{color:var(--muted);padding:26px;text-align:center;font-size:13px}

/* table */
.tools{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px}
.tools input,.tools select{font:inherit;font-size:13px;padding:9px 13px;border-radius:12px;border:1px solid var(--line2);background:var(--surface2);color:var(--text);outline:none}
.tools input{flex:1;min-width:160px}
.tools input:focus{border-color:var(--text)}
.tw{overflow-x:auto;border:1px solid var(--line);border-radius:14px;max-height:560px;overflow-y:auto}
table{border-collapse:collapse;width:100%;min-width:980px;font-size:12.5px}
th{position:sticky;top:0;background:var(--surface2);text-align:right;padding:11px 12px;font-size:11px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted);cursor:pointer;white-space:nowrap;border-bottom:1px solid var(--line);user-select:none}
th:first-child,td:first-child{text-align:left}
th.l,td.l{text-align:left}
th:hover{color:var(--text)}
td{padding:10px 12px;text-align:right;border-bottom:1px solid var(--line);font-family:var(--mono);font-size:12px;white-space:nowrap}
td:first-child{font-family:var(--font);font-weight:700}
tbody tr{cursor:pointer;transition:background .12s}
tbody tr:hover{background:var(--surface2)}

/* modal */
.ov{position:fixed;inset:0;background:rgba(20,24,30,.45);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:18px;z-index:50}
.ov.show{display:flex}
.modal{background:var(--surface);border:1px solid var(--line);border-radius:24px;width:min(920px,100%);max-height:92%;overflow:auto;padding:24px;box-shadow:0 30px 80px -20px rgba(0,0,0,.4);animation:rise .3s both}
.mh{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:16px}
.mh h2{margin:0;font-size:26px;letter-spacing:-1px;font-weight:800}
.mgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:14px 0}
.mgrid div{background:var(--surface2);border:1px solid var(--line);border-radius:13px;padding:10px 12px}
.mgrid small{display:block;color:var(--muted);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.4px}
.mgrid b{font-size:17px;letter-spacing:-.4px}
.tl{max-height:220px;overflow:auto;border:1px solid var(--line);border-radius:13px;margin-top:12px}
.tl table{min-width:0}
footer{margin-top:26px;color:var(--muted);font-size:12px;text-align:center;line-height:1.7}
.note{background:var(--warn-bg);color:var(--warn);border-radius:12px;padding:10px 14px;font-size:12px;font-weight:600;margin-bottom:16px}

/* ===== PANDA WORLD ===== */
.eye{transform-box:fill-box;transform-origin:center;animation:blink 4.6s infinite}
@keyframes blink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}
#leaves{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
#leaves span{position:absolute;top:-30px;width:30px;opacity:.55;animation:fall linear infinite}
#leaves svg{width:100%;display:block}
@keyframes fall{0%{transform:translate(0,-40px) rotate(0) scale(var(--s))}50%{transform:translate(calc(var(--dx)*.4),55vh) rotate(260deg) scale(var(--s))}100%{transform:translate(var(--dx),112vh) rotate(540deg) scale(var(--s))}}
#splash{position:fixed;inset:0;z-index:100;background:var(--bg);display:grid;place-items:center;text-align:center;animation:splashOut .6s 1.6s forwards}
#splash .sr svg{width:96px;height:88px;animation:rollIn 1.5s ease-in-out both}
#splash b{display:block;margin-top:14px;font-size:30px;font-weight:800;letter-spacing:-1.2px}
#splash small{color:var(--muted);font-weight:600}
#splash small::after{content:"";animation:dots 1s steps(4) infinite}
@keyframes dots{0%{content:""}25%{content:"."}50%{content:".."}75%{content:"..."}}
@keyframes rollIn{0%{transform:translateX(-160px) rotate(-540deg);opacity:0}70%{opacity:1}100%{transform:none;opacity:1}}
@keyframes splashOut{to{opacity:0;visibility:hidden}}
.logo-p{width:62px;height:57px;animation:wobble 4s ease-in-out infinite;filter:drop-shadow(0 6px 8px rgba(28,32,39,.18))}
.logo-p svg{width:100%;height:100%}
@keyframes wobble{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(6deg) translateY(-3px)}}
.stage{display:grid;grid-template-columns:230px 1fr 110px;align-items:center;gap:20px;margin-bottom:16px;position:relative;overflow:hidden;padding:18px 24px 14px;background:linear-gradient(135deg,var(--surface) 0,var(--surface2) 100%)}
.stage::after{content:"";position:absolute;left:0;right:0;bottom:0;height:16px;background:linear-gradient(var(--surface2),var(--line));opacity:.7}
.cloud{position:absolute;width:86px;height:26px;background:var(--surface);border:1px solid var(--line);border-radius:20px;opacity:.9;animation:drift 12s ease-in-out infinite alternate}
.cloud::before,.cloud::after{content:"";position:absolute;background:inherit;border:inherit;border-radius:50%;border-bottom-color:transparent}
.cloud::before{width:34px;height:34px;left:14px;top:-18px}.cloud::after{width:26px;height:26px;left:44px;top:-12px}
@keyframes drift{from{transform:translateX(-90px)}to{transform:translateX(90px)}}
.sp-wrap{position:relative;width:230px;cursor:pointer;z-index:1;margin-bottom:-4px}
.sp-wrap svg{width:100%;display:block;overflow:visible}
.headbob{transform-box:fill-box;transform-origin:50% 100%;animation:chew 1.4s ease-in-out infinite}
@keyframes chew{0%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(2px) rotate(-2deg)}50%{transform:translateY(0) rotate(2deg)}75%{transform:translateY(2px) rotate(-1deg)}}
#sp .mh{transform-box:fill-box;transform-origin:center top;animation:mouth .7s ease-in-out infinite}
@keyframes mouth{50%{transform:scaleY(.55)}}
#sp .ms,#sp .tear{display:none}
#sp.sad .mh{display:none}#sp.sad .ms,#sp.sad .tear{display:inline}
#sp.sad .tear{animation:drip 1.8s ease-in infinite}
#sp.sad .headbob{animation-duration:3.4s}
@keyframes drip{0%{transform:translateY(0);opacity:1}100%{transform:translateY(14px);opacity:0}}
#sp .lf2{transform-box:fill-box;transform-origin:0 100%;animation:leafw 2.6s ease-in-out infinite}
@keyframes leafw{50%{transform:rotate(-8deg)}}
#sp .sh{transform-box:fill-box;transform-origin:center;animation:shadow 1.4s ease-in-out infinite}
@keyframes shadow{50%{transform:scaleX(.94)}}
#sp.jump{animation:jump .6s ease-out}
@keyframes jump{0%,100%{transform:translateY(0)}35%{transform:translateY(-26px) rotate(-4deg)}65%{transform:translateY(0) rotate(3deg)}}
.heart{position:absolute;pointer-events:none;font-size:20px;animation:heart 1.3s ease-out forwards;z-index:3}
@keyframes heart{0%{opacity:0;transform:translate(0,0) scale(.4)}20%{opacity:1}100%{opacity:0;transform:translate(var(--dx),-90px) scale(1.25)}}
.sp-text{position:relative;z-index:1}
.bubble{position:relative;display:inline-block;max-width:560px;background:var(--surface);border:1px solid var(--line2);border-radius:20px;padding:14px 20px;font-weight:700;font-size:16px;letter-spacing:-.3px;box-shadow:var(--shadow)}
.bubble::before{content:"";position:absolute;left:-8px;top:50%;width:14px;height:14px;background:var(--surface);border-left:1px solid var(--line2);border-bottom:1px solid var(--line2);transform:translateY(-50%) rotate(45deg)}
.bubble.pop{animation:pop .45s cubic-bezier(.3,1.6,.5,1)}
@keyframes pop{from{opacity:0;transform:scale(.85) translateX(-10px)}to{opacity:1;transform:none}}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.chips span{background:var(--surface);border:1px solid var(--line);padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;color:var(--muted);animation:rise .6s both}
.chips span b{color:var(--text);margin-left:4px}
.hint{font-size:11.5px;color:var(--muted);margin-top:10px;font-weight:500}
.stalks{width:110px;height:210px;transform-origin:50% 100%;animation:sway 5s ease-in-out infinite;align-self:end;position:relative;z-index:1}
.stalks .lf{transform-box:fill-box;transform-origin:0 100%;animation:leafw 3s ease-in-out infinite}
@keyframes sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(3deg)}}
.kpi>.kp{position:absolute;right:14px;top:12px;width:46px;height:42px;z-index:1;animation:bob 3.4s ease-in-out infinite}
.kpi:hover>.kp{animation:wiggle .7s ease-in-out}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-16deg) scale(1.15)}50%{transform:rotate(14deg) scale(1.15)}80%{transform:rotate(-8deg)}}
.kpi{transition:transform .25s,box-shadow .25s}.kpi:hover{transform:translateY(-4px)}
.mini{width:36px;height:33px;animation:bob 3s ease-in-out infinite}
.sleepy{width:84px;height:77px;animation:breathe 3.2s ease-in-out infinite;opacity:.9}
@keyframes breathe{50%{transform:scale(1.07) translateY(-2px)}}
.peeker{position:relative;overflow:visible}
.peek{position:absolute;right:40px;top:-33px;width:66px;height:34px;overflow:hidden;z-index:2;pointer-events:none}
.peek svg{width:66px;height:60px;display:block;animation:peek 3.8s ease-in-out infinite}
@keyframes peek{0%,15%{transform:translateY(34px)}35%,70%{transform:translateY(2px)}90%,100%{transform:translateY(34px)}}
.rollway{position:relative;height:60px;margin-top:34px;overflow:hidden;border-bottom:3px dotted var(--line2)}
.roller{position:absolute;left:0;bottom:2px;width:50px;height:46px;animation:rollAcross 16s linear infinite}
.roller svg{width:100%;height:100%}
@keyframes rollAcross{from{transform:translateX(-70px) rotate(0)}to{transform:translateX(min(100vw,1280px)) rotate(1080deg)}}
.btn,.tab,.sig{transition:transform .18s,box-shadow .18s,border-color .18s}
.btn.primary:hover{box-shadow:0 8px 20px -8px rgba(28,32,39,.5)}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important}#leaves{display:none}}
@media (max-width:900px){.stage{grid-template-columns:1fr;justify-items:center;text-align:center}.stalks{display:none}.sp-wrap{width:190px}.bubble::before{left:50%;top:-8px;transform:translateX(-50%) rotate(135deg)}.chips{justify-content:center}}
/* ===== PANDA PARTY v2: warna & animasi ===== */
:root{--bg:#e5ece3;--bg2:#f0f6ee;--surface2:#f3f7f1;--line:#d9e4d5;--line2:#c6d5c1;--text:#1e2521;--muted:#6f7f75;--accent:#242b28;--pos:#2c9a5b;--pos-bg:#e0f3e3;--neg:#d8566a;--neg-bg:#fbe6ea;--bamboo:#6aac66;--bamboo2:#a8d19e;--bamboo-bg:#e2f1dd;--blush:#f6c1c6;--blush-bg:#fdeff0}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bamboo-bg:#233a2a;--blush-bg:#35262b;--bamboo:#7fc57a;--bamboo2:#4f8a4f}}
:root[data-theme="dark"]{--bamboo-bg:#233a2a;--blush-bg:#35262b;--bamboo:#7fc57a;--bamboo2:#4f8a4f}
body{background-image:radial-gradient(700px 380px at 6% -8%,rgba(168,209,158,.38) 0,transparent 70%),radial-gradient(640px 360px at 100% 0,rgba(246,193,198,.32) 0,transparent 70%),radial-gradient(900px 500px at 50% 112%,rgba(168,209,158,.28) 0,transparent 70%);background-attachment:fixed}
.card{animation-fill-mode:backwards;transition:transform .25s,box-shadow .25s}
.card:hover{box-shadow:0 18px 36px -16px rgba(70,110,70,.30)}
.kpi:hover{transform:translateY(-5px) rotate(-.4deg)}
.wavetxt{display:flex}
.wavetxt span{display:inline-block;animation:letter 2.6s ease-in-out infinite;animation-delay:var(--d);color:var(--accent)}
.wavetxt span:nth-child(even){color:var(--bamboo)}
@keyframes letter{0%,60%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-7px) rotate(-6deg)}}
.brand p{color:var(--bamboo);font-weight:600}
.badge .dot{animation:dotp 1.6s ease-in-out infinite}
@keyframes dotp{50%{transform:scale(1.5)}}
.btn.primary{background-image:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.28) 50%,transparent 70%);background-size:220% 100%;animation:sheen 3s linear infinite}
@keyframes sheen{from{background-position:200% 0}to{background-position:-20% 0}}
.btn.primary:hover{background-color:var(--bamboo);border-color:var(--bamboo)}
.ticker{overflow:hidden;background:var(--surface);border:1px solid var(--line);border-radius:14px;margin-bottom:16px;box-shadow:var(--shadow);white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)}
.track{display:inline-block;padding:9px 0;animation:marquee 40s linear infinite}
.ticker:hover .track{animation-play-state:paused}
@keyframes marquee{to{transform:translateX(-50%)}}
.ti{display:inline-block;margin:0 10px;font-size:12.5px;font-weight:600;padding:4px 13px;border-radius:999px;background:var(--surface2);border:1px solid var(--line)}
.ti b{font-family:var(--mono);margin-left:4px}
.ti.up{background:var(--pos-bg);color:var(--pos);border-color:transparent}
.ti.dn{background:var(--neg-bg);color:var(--neg);border-color:transparent}
.stage{background:linear-gradient(135deg,var(--bamboo-bg) 0,var(--surface) 55%,var(--blush-bg) 100%)}
.stage::after{background:linear-gradient(var(--bamboo2),var(--bamboo));opacity:.55}
.bubble{border-color:var(--bamboo2)}
.bubble::before{border-left-color:var(--bamboo2);border-bottom-color:var(--bamboo2)}
.chips span{transition:transform .2s}
.chips span:hover{transform:translateY(-3px) rotate(-2deg);border-color:var(--bamboo2)}
.spark{position:absolute;color:var(--bamboo);font-size:17px;animation:twinkle 2.4s ease-in-out infinite;z-index:0;pointer-events:none}
@keyframes twinkle{0%,100%{opacity:.15;transform:scale(.6) rotate(0)}50%{opacity:1;transform:scale(1.3) rotate(40deg)}}
.baby{position:absolute;bottom:3px;left:270px;width:40px;height:37px;z-index:2;pointer-events:none;animation:babyroll 11s ease-in-out infinite alternate}
.baby.b2{width:30px;height:28px;left:310px;animation-duration:15s;animation-delay:-5s}
.baby svg{width:100%;height:100%}
@keyframes babyroll{from{transform:translateX(0) rotate(0)}to{transform:translateX(min(48vw,620px)) rotate(900deg)}}
#sp .armL{transform-box:view-box;transform-origin:70px 126px;animation:armwave 3.4s ease-in-out infinite}
@keyframes armwave{0%,62%,100%{transform:rotate(0)}68%{transform:rotate(55deg)}74%{transform:rotate(20deg)}80%{transform:rotate(55deg)}86%{transform:rotate(20deg)}92%{transform:rotate(0)}}
.kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:repeating-linear-gradient(var(--bamboo2) 0 20px,var(--bamboo) 20px 23px);z-index:1}
.kpi::after{background:var(--bamboo-bg)}
.kpi.bad::after{background:var(--neg-bg)}
.kpi.good{animation:rise .55s backwards,glow 4s 1s ease-in-out infinite}
@keyframes glow{50%{box-shadow:0 12px 30px -10px rgba(44,154,91,.38)}}
.kpi:nth-child(3n+2)>.kp{animation:tilt 2.8s ease-in-out infinite}
.kpi:nth-child(3n)>.kp{animation:breathe 2.4s ease-in-out infinite}
@keyframes tilt{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg) translateY(-3px)}}
.kpi:hover>.kp.kp{animation:wiggle .7s ease-in-out}
.card .hd h3::before{content:"";display:inline-block;width:8px;height:17px;border-radius:3px;background:linear-gradient(var(--bamboo2),var(--bamboo));margin-right:9px;vertical-align:-3px}
.meta .m:nth-child(odd){background:var(--bamboo-bg)}
.meta .m:nth-child(even){background:var(--blush-bg)}
.tab.on{background:var(--bamboo-bg);color:var(--text)}
.sig{animation:pop2 .5s cubic-bezier(.3,1.5,.5,1) both}
.sgrid .sig:nth-child(3n){animation-delay:.06s}.sgrid .sig:nth-child(3n+1){animation-delay:.12s}
@keyframes pop2{from{opacity:0;transform:scale(.8) translateY(12px)}to{opacity:1;transform:none}}
.sig:hover{border-color:var(--bamboo2);background:var(--bamboo-bg);transform:translateY(-3px) rotate(-.8deg)}
.tag.on{animation:ping 2.2s infinite}
@keyframes ping{0%{box-shadow:0 0 0 0 rgba(44,154,91,.45)}70%,100%{box-shadow:0 0 0 8px rgba(44,154,91,0)}}
th{background:var(--bamboo-bg)}
tbody tr{animation:rowin .4s both}
tbody tr:hover{background:var(--bamboo-bg)}
@keyframes rowin{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
.draw{stroke-dasharray:1 1.1;stroke-dashoffset:1.05;animation:draw 2.4s .3s ease forwards}
@keyframes draw{to{stroke-dashoffset:0}}
#donut circle:nth-of-type(2){animation:ring 1.8s .2s ease both}
@keyframes ring{from{stroke-dashoffset:330}to{stroke-dashoffset:0}}
#hist rect{transform-box:fill-box;transform-origin:bottom;animation:grow .9s cubic-bezier(.3,1.4,.5,1) both}
#hist rect:nth-child(odd){animation-delay:.12s}#hist rect:nth-child(3n){animation-delay:.24s}
@keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
#leaves span.pawr{top:auto;bottom:-40px;width:26px;opacity:.12;animation:rise2 linear infinite}
@keyframes rise2{from{transform:translateY(0) rotate(-20deg)}to{transform:translateY(-118vh) rotate(25deg)}}
.trail{position:fixed;width:18px;height:18px;margin:-9px 0 0 -9px;pointer-events:none;z-index:60;opacity:.6;animation:trail 1.2s ease-out forwards}
.trail svg{width:100%;height:100%;display:block}
@keyframes trail{0%{transform:rotate(var(--r)) scale(.6)}100%{opacity:0;transform:rotate(var(--r)) scale(1.5) translateY(-12px)}}
.corner{position:fixed;bottom:-14px;width:80px;height:72px;z-index:6;pointer-events:none;animation:cpeek 7s ease-in-out infinite}
.corner.l{left:14px;--r:-8deg}.corner.r{right:14px;--r:8deg;animation-delay:-3.5s}
.corner svg{width:100%;height:100%}
@keyframes cpeek{0%,18%{transform:translateY(60px) rotate(var(--r))}34%,62%{transform:translateY(0) rotate(var(--r))}70%{transform:translateY(-4px) rotate(calc(var(--r)*-1))}80%{transform:translateY(0) rotate(var(--r))}95%,100%{transform:translateY(60px) rotate(var(--r))}}
.roller.r2{width:34px;height:31px;animation-duration:24s;animation-delay:-9s}
.roller.r3{width:42px;height:38px;animation-duration:12s;animation-delay:-4s;animation-direction:reverse}
.pclegend{display:flex;gap:16px;flex-wrap:wrap;margin-top:10px;font-size:12px;font-weight:600;color:var(--muted)}
.pclegend i{display:inline-block;width:12px;height:4px;border-radius:2px;margin-right:6px;vertical-align:middle}
#pcChart .mk{transform-box:fill-box;transform-origin:center;animation:mkpop .6s cubic-bezier(.3,1.6,.5,1) both}
@keyframes mkpop{from{transform:scale(0)}to{transform:scale(1)}}
#pcChart .maL{stroke-dasharray:1 1.1;stroke-dashoffset:1.05;animation:draw 2s .2s ease forwards}
#pcChart .cd{transform-box:fill-box;transform-origin:bottom;animation:grow .5s both}
.today{border:1px solid var(--bamboo2);background:linear-gradient(180deg,var(--bamboo-bg),var(--surface) 40%)}
.tdsum{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
.cp2{padding:7px 14px;border-radius:999px;font-weight:700;font-size:12.5px;background:var(--surface);border:1px solid var(--line)}
.cp2 b{font-family:var(--mono);margin-left:6px;font-size:14px}
.cp2.up{background:var(--pos-bg);color:var(--pos);border-color:transparent}
.cp2.dn{background:var(--neg-bg);color:var(--neg);border-color:transparent}
.cp2.wt{background:var(--warn-bg);color:var(--warn);border-color:transparent}
.tdgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-bottom:18px}
.bc{position:relative;overflow:hidden;text-align:left;font:inherit;color:inherit;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:16px 14px 14px;cursor:pointer;box-shadow:var(--shadow);animation:pop2 .55s cubic-bezier(.3,1.5,.5,1) both;transition:transform .2s,box-shadow .2s,border-color .2s}
.bc::before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,var(--pos),var(--bamboo2))}
.bc:hover{transform:translateY(-4px) rotate(-.6deg);border-color:var(--bamboo2);box-shadow:0 16px 30px -14px rgba(44,154,91,.4)}
.bc .bt{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.bc .bt b{font-size:20px;font-weight:800;letter-spacing:-.7px}
.bc .bp{position:absolute;right:10px;top:12px;width:34px;height:31px;animation:bob 2.6s ease-in-out infinite}
.bc .spk{margin:6px 0 8px;display:block}
.bc .spd{transform-box:fill-box;transform-origin:center;animation:dotp 1.3s ease-in-out infinite}
.bc .bm{display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;font-size:11.5px}
.bc .bm small{display:block;color:var(--muted);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px}
.bc .bm span{font-family:var(--mono);font-weight:600;font-size:12.5px}
.bc .bq{margin-top:10px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:11px;color:var(--muted)}
.tdcols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.tdcols h4{margin:0 0 10px;font-size:13px;font-weight:700}
.rw{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;text-align:left;font:inherit;color:inherit;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:9px 12px;margin-bottom:6px;cursor:pointer;font-size:12.5px;animation:rowin .4s both;transition:transform .15s,border-color .15s}
.rw:hover{transform:translateX(4px);border-color:var(--bamboo2)}
.rw b{font-size:14px;letter-spacing:-.3px}
.rw .mono{font-size:11.5px;color:var(--muted)}
.tdnote{margin-top:16px;font-size:12px;color:var(--muted);background:var(--surface2);border:1px dashed var(--line2);border-radius:12px;padding:11px 14px;line-height:1.65}
.tdempty{grid-column:1/-1;text-align:center;color:var(--muted);padding:22px;font-weight:600}
.tdempty .sleepy{display:block;margin:0 auto 8px}
@media (max-width:900px){.tdcols{grid-template-columns:1fr}}
.podium{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-bottom:16px}
.pd{position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:14px 16px;cursor:pointer;box-shadow:var(--shadow);animation:pop2 .55s cubic-bezier(.3,1.5,.5,1) both;transition:transform .2s}
.pd:hover{transform:translateY(-4px) rotate(-.6deg)}
.pd.r1{background:linear-gradient(135deg,var(--warn-bg),var(--surface));border-color:var(--warn)}
.pd.r2{background:linear-gradient(135deg,var(--bamboo-bg),var(--surface))}
.pd.r3{background:linear-gradient(135deg,var(--blush-bg),var(--surface))}
.pd .bp{position:absolute;right:12px;top:12px;width:42px;height:38px;animation:bob 2.6s ease-in-out infinite}
.pd .md{font-size:26px;line-height:1}
.pd .pdk{display:block;font-size:22px;letter-spacing:-.8px;margin:4px 0 2px}
.pd .pdc{font-size:16px;font-weight:700}
.pd .pdm{font-size:11.5px;color:var(--muted);margin-top:3px}
.valid{border:1px solid var(--bamboo2)}
.vtop{display:grid;grid-template-columns:190px 1fr;gap:18px;align-items:center}
.vcheck{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px}
.vi{border-radius:14px;padding:11px 13px;border:1px solid var(--line);font-size:12.5px;animation:pop2 .5s cubic-bezier(.3,1.5,.5,1) both;margin-bottom:0}
.vi b{display:flex;gap:8px;align-items:center;font-size:13px}
.vi small{display:block;color:var(--muted);margin-top:4px;line-height:1.55;font-size:11.5px}
.vi.pass{background:var(--pos-bg);border-color:transparent}
.vi.warn{background:var(--warn-bg);border-color:transparent}
.vi.fail{background:var(--neg-bg);border-color:transparent}
.vi.pass b{color:var(--pos)}.vi.warn b{color:var(--warn)}.vi.fail b{color:var(--neg)}
.vla{display:grid;gap:8px;margin-bottom:12px}
table.mt{min-width:0}
table.mt td,table.mt th{padding:8px 10px}
.kv{display:grid;grid-template-columns:repeat(auto-fit,minmax(125px,1fr));gap:8px;margin:0 0 12px}
.kv div{background:var(--surface2);border:1px solid var(--line);border-radius:12px;padding:9px 11px}
.kv small{display:block;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.4px}
.kv b{font-family:var(--mono);font-size:15px}
.vnote{font-size:12px;color:var(--muted);line-height:1.65;margin-top:12px}
.svgrid{display:grid;grid-template-columns:1fr 1.2fr;gap:20px}
.sl{display:grid;gap:4px;margin:12px 0}
.sl label{display:flex;justify-content:space-between;font-weight:600;font-size:12.5px;gap:10px}
input[type=range]{accent-color:var(--bamboo);width:100%}
.vr{animation:ring 1.8s .2s ease both}
.gbar{transform-box:fill-box;transform-origin:bottom;animation:grow .9s cubic-bezier(.3,1.4,.5,1) both}
@media (max-width:900px){.vtop,.svgrid{grid-template-columns:1fr}}
/* ===== REDESIGN: GLASS + BENTO + AURORA ===== */
:root{--glass:rgba(255,255,255,.70);--glass-b:rgba(255,255,255,.95);--hi:rgba(255,255,255,.9)}
@media (prefers-color-scheme:dark){:root:not([data-theme='light']){--glass:rgba(31,36,43,.66);--glass-b:rgba(255,255,255,.09);--hi:rgba(255,255,255,.06)}:root:not([data-theme='light']) .aurora i{opacity:.16}}
:root[data-theme='dark']{--glass:rgba(31,36,43,.66);--glass-b:rgba(255,255,255,.09);--hi:rgba(255,255,255,.06)}
:root[data-theme='dark'] .aurora i{opacity:.16}
html{scroll-behavior:smooth}
section{scroll-margin-top:18px}
.aurora{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.aurora i{position:absolute;border-radius:50%;filter:blur(70px);opacity:.55;animation:aur 24s ease-in-out infinite alternate}
.aurora i:nth-child(1){width:540px;height:540px;left:-140px;top:-120px;background:#b9dfae}
.aurora i:nth-child(2){width:480px;height:480px;right:-110px;top:8%;background:#f9cfd4;animation-duration:30s;animation-delay:-7s}
.aurora i:nth-child(3){width:580px;height:580px;left:34%;bottom:-240px;background:#cfe6ff;animation-duration:34s;animation-delay:-13s}
.aurora i:nth-child(4){width:320px;height:320px;right:18%;bottom:8%;background:#ecf5b8;animation-duration:27s;animation-delay:-4s}
@keyframes aur{from{transform:translate(0,0) scale(1)}to{transform:translate(130px,90px) scale(1.3)}}
#spot{position:fixed;left:0;top:0;width:560px;height:560px;margin:-280px 0 0 -280px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(106,172,102,.20),transparent 62%);will-change:transform}
#prog{position:fixed;top:0;left:0;right:0;height:5px;z-index:90;pointer-events:none;background:rgba(0,0,0,.04)}
#progBar{height:100%;width:0;background:linear-gradient(90deg,var(--bamboo2),var(--bamboo),#4a7bd4,var(--blush),var(--bamboo2));background-size:200% 100%;animation:flow 4s linear infinite;border-radius:0 6px 6px 0;box-shadow:0 0 12px rgba(106,172,102,.6)}
@keyframes flow{to{background-position:200% 0}}
#progPanda{position:absolute;top:4px;left:0;width:28px;height:26px;margin-left:-14px;filter:drop-shadow(0 3px 4px rgba(0,0,0,.25))}
.card:not(.stage):not(.today){background-color:var(--glass);background-image:radial-gradient(380px circle at var(--mx,50%) var(--my,-80%),rgba(106,172,102,.17),transparent 45%);-webkit-backdrop-filter:blur(16px) saturate(1.35);backdrop-filter:blur(16px) saturate(1.35);border:1px solid var(--glass-b);box-shadow:0 1px 0 var(--hi) inset,0 16px 40px -20px rgba(40,70,40,.28)}
.stage,.today{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.card .hd h3{font-size:17px;font-weight:800;letter-spacing:-.5px}
.side{position:fixed;left:14px;top:50%;transform:translateY(-50%);z-index:60;width:68px;padding:10px;border-radius:26px;background:var(--glass);-webkit-backdrop-filter:blur(20px) saturate(1.4);backdrop-filter:blur(20px) saturate(1.4);border:1px solid var(--glass-b);box-shadow:0 20px 50px -20px rgba(40,70,40,.4);display:flex;flex-direction:column;gap:5px;overflow:hidden;transition:width .4s cubic-bezier(.3,1.25,.4,1);animation:sidein .8s .3s both cubic-bezier(.3,1.3,.4,1)}
@keyframes sidein{from{opacity:0;transform:translate(-40px,-50%)}to{opacity:1;transform:translate(0,-50%)}}
.side:hover{width:206px}
.side-logo{width:44px;height:40px;margin:2px auto 8px;animation:wobble 4s ease-in-out infinite;flex:none}
.side-logo svg{width:100%;height:100%}
.side a{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:15px;color:var(--muted);text-decoration:none;font-weight:700;font-size:13px;white-space:nowrap;transition:background .2s,color .2s}
.side a .ic{font-size:19px;width:22px;text-align:center;flex:none;transition:transform .3s cubic-bezier(.3,1.8,.5,1)}
.side a:hover{background:var(--bamboo-bg);color:var(--text)}
.side a:hover .ic{transform:scale(1.35) rotate(-10deg)}
.side a.on{background:var(--accent);color:var(--accent-ink);box-shadow:0 8px 18px -8px rgba(0,0,0,.45)}
.side a.on .ic{animation:bob 1.8s ease-in-out infinite}
@media (min-width:901px){.wrap{padding-left:104px;max-width:1400px}}
.kpis{grid-template-columns:repeat(4,1fr);grid-auto-flow:dense}
.kpi:nth-child(2),.kpi:nth-child(7),.kpi:nth-child(9){grid-column:span 2}
.kpi:nth-child(2) .v{font-size:46px;letter-spacing:-2px;background:linear-gradient(90deg,var(--text),var(--bamboo));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.kpi:nth-child(2){background-image:linear-gradient(135deg,var(--bamboo-bg),transparent 70%)!important}
.kpi .v{transition:transform .3s}
.kpi:hover .v{transform:scale(1.06) translateX(4px)}
.kpi:hover,.bc:hover,.pd:hover{transform:perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(-6px)}
.draw{filter:drop-shadow(0 5px 9px rgba(106,172,102,.5))}
th{backdrop-filter:blur(8px)}
tbody tr{position:relative}
tbody tr:hover td:first-child{box-shadow:inset 4px 0 0 var(--bamboo)}
.rv{opacity:0;transform:translateY(38px) scale(.965);animation:none!important;transition:opacity .85s ease,transform .85s cubic-bezier(.2,.8,.2,1)}
.rv.in{opacity:1;transform:none}
.seen{animation:none!important}
.caret{display:inline-block;width:2px;height:1em;background:var(--bamboo);margin-left:3px;vertical-align:-2px;animation:blinkc 1s steps(2) infinite}
@keyframes blinkc{50%{opacity:0}}
.burst{position:fixed;z-index:80;pointer-events:none;font-size:17px;margin:-9px 0 0 -9px;animation:burst .95s ease-out forwards}
@keyframes burst{from{opacity:1;transform:translate(0,0) scale(.5)}to{opacity:0;transform:translate(var(--bx),var(--by)) scale(1.5) rotate(140deg)}}
@media (max-width:900px){
  .side{top:auto;bottom:10px;left:50%;transform:translateX(-50%);flex-direction:row;width:auto;max-width:94vw;overflow-x:auto;padding:8px;border-radius:22px;animation:none}
  .side:hover{width:auto}.side-logo,.side a .tx{display:none}
  .side a{padding:9px 11px}
  .wrap{padding-bottom:96px}
  .kpis{grid-template-columns:repeat(2,1fr)}.kpi:nth-child(n){grid-column:auto}.kpi:nth-child(2){grid-column:span 2}.kpi:nth-child(2) .v{font-size:36px}
}
@media (max-width:900px){.corner{display:none}.baby{display:none}}
@media (max-width:900px){.hero,.row,.row2{grid-template-columns:1fr}.rules{grid-template-columns:1fr}.brand h1{font-size:24px}.kpi .v{font-size:28px}}
body{overflow-x:hidden}#splash{pointer-events:none}.tw{max-height:420px}table.mt td,table.mt th{white-space:nowrap}table.mt tbody tr{cursor:default}.rw{cursor:default}.rw:hover{transform:none}.podium:empty{display:none}`;
