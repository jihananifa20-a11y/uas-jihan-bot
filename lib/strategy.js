// STRATEGI TREND FOLLOWING MA 20 (AFL "Trend Following MA 20", saham Kompas100 harian) diadaptasi ke kripto IDR Indodax 4 jam — SATU fungsi sinyal dipakai backtest DAN bot.
// Input hanya candle 4 jam yang SUDAH TERTUTUP. Keputusan di close bar t, dieksekusi sesudahnya (bot: order book live; backtest: open bar t+1 ± biaya terukur).
// BUY  : Cross(C, MA) AND MA > Ref(MA,-1) → close memotong ke atas MA dan MA sedang naik.
// SELL : Cross(MA, C) AND MA < Ref(MA,-1) → close memotong ke bawah MA dan MA sedang turun.
// MA 20 hari = 120 candle 4 jam. Long only, satu posisi per pasangan, tanpa stop-loss dan tanpa target (sama dengan AFL asli).
import { PAIRS } from './indodax.js';

export const PARAMS = Object.freeze({
  tf: 240,                  // menit per candle
  ma: 120,                  // MA 20 hari × 6 candle per hari
  slot: 0.125, maxPos: 8,   // bobot sama 1/8 per pasangan, mengikuti portofolio equal-weight di dashboard asli
  maxPosValue: 0.125,       // ukuran maksimum satu posisi (porsi ekuitas)
  dailyLoss: 0.05,          // ekuitas ≤ 95% ekuitas awal hari WIB → tidak membuka posisi baru sampai 00.00 WIB berikutnya
  warmup: 122,              // MA bar ini dan MA bar sebelumnya + close bar sebelumnya
  window: 180,              // jendela waktu (dalam bar) candle tertutup yang diberikan ke decide() — dipotong menurut WAKTU, sama di bot & backtest
});

export const sma = (a, n, i) => { if (i < n - 1) return NaN; let s = 0; for (let k = i - n + 1; k <= i; k++) s += a[k]; return s / n; };

// bars: { PAIR: [{t,o,h,l,c,v}, ...] } candle tertutup, urut waktu, bar terakhir = bar keputusan
// positions: [{pair}] ; blocked = daily loss limit / kill switch ; noEntry = Set pasangan yang datanya tidak valid untuk entry
// → { exits: [{pair, reason, signalPrice}], entries: [{pair, reason, signalPrice, weight}], rejected, info }
// Bila kandidat beli > slot kosong, urutan = peringkat likuiditas universe (PAIRS), bukan dipilih dengan melihat hasil.
export function decide(bars, positions, { blocked = false, noEntry = new Set() } = {}) {
  const P = PARAMS, out = { exits: [], entries: [], rejected: [], info: {} };
  const held = new Set(positions.map(p => p.pair));
  const state = pair => { const b = bars[pair]; if (!b || b.length < P.warmup) return null; const c = b.map(x => x.c), i = c.length - 1, m = sma(c, P.ma, i), m1 = sma(c, P.ma, i - 1); return { c: c[i], c1: c[i - 1], m, m1 }; };
  // ---- exit posisi terbuka
  for (const p of positions) { const s = state(p.pair); if (!s) continue;
    if (s.c < s.m && s.c1 >= s.m1 && s.m < s.m1) out.exits.push({ pair: p.pair, reason: 'CROSS_TURUN_MA20', signalPrice: s.c }); }
  out.info = { t: Object.values(bars).find(b => b?.length)?.at(-1)?.t ?? null, kandidat: [] };
  if (blocked) return out;   // daily loss / kill switch: sinyal beli tidak dihitung
  // ---- entry
  const cand = [];
  for (const pair of PAIRS) { if (held.has(pair)) continue; const s = state(pair); if (!s) continue;
    if (!(s.c > s.m && s.c1 <= s.m1 && s.m > s.m1)) continue;
    const x = { pair, reason: 'CROSS_NAIK_MA20', signalPrice: s.c, weight: Math.min(P.slot, P.maxPosValue) };
    if (noEntry.has(pair)) out.rejected.push({ ...x, reason: 'CROSS_NAIK_MA20_DATA_TIDAK_VALID' }); else cand.push(x); }
  out.entries.push(...cand.slice(0, Math.max(0, P.maxPos - held.size)));
  out.info.kandidat = cand.map(x => x.pair);
  return out;
}
