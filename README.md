# Bot Dry Run Indodax: Trend Following MA 20

> **Freeze terlambat:** dilakukan sesudah batas 4 Nov 2026 12.00 WIB dengan izin dosen. Forward test tetap berakhir 14 Nov 2026 12.00 WIB, jadi kurang dari 10 hari.

| | |
|---|---|
| Nama / NIM | Jihan Anifa / 25110200009 |
| Vercel | https://uas-jihan-bot.vercel.app |
| Repo | https://github.com/jihananifa20-a11y/uas-jihan-bot |
| Commit freeze | `861d7a7b0339cb066f5fcf28834146c00635af99` (2026-11-06T17:37:27+07:00) |

## Strategi
Sumber: AFL "Trend Following MA 20" di `Dashboard_Jihan.html`. Sinyal ada di `lib/strategy.js`, dan satu fungsi `decide()` dipakai bot serta backtest.

- **Beli:** close memotong ke atas MA dan MA sedang naik.
- **Jual:** close memotong ke bawah MA dan MA sedang turun.
- Long only dan satu posisi per pasangan. Tidak ada stop-loss atau target, sama dengan AFL asli.

## Perubahan dari sumber asli
| Bagian | Sumber (saham Kompas 100, harian) | Bot (kripto Indodax, 4 jam) | Alasan |
|---|---|---|---|
| Universe | 100 saham Kompas 100 | BTC ETH XRP DOGE TRX VELO ADA BNB /IDR | Pasangan likuid Oktober 2023; entry ditolak bila spread > 2% |
| MA | 20 bar harian | 120 candle 4 jam (20 hari × 6) | Rentang waktunya sama dengan aslinya |
| Eksekusi | Close bar sinyal | Harga pasar sesudah candle tutup; backtest di open candle berikutnya | Sinyal baru diketahui setelah candle tutup |
| Biaya | Tidak ada | Fee 0,20555% beli, 0,41555% jual, spread dan slippage terukur | Halaman biaya resmi, `data/sumber_biaya/` |
| Ukuran posisi | Equal-weight | 12,5% ekuitas per pasangan, maksimum 8 posisi | Bobot sama untuk 8 pasangan |
| Batas harian | Tidak ada | Tidak ada posisi baru bila ekuitas turun 5% per hari WIB | Ditambahkan untuk UAS |

## Hasil backtest
Modal Rp100 juta, long-only, keputusan di close dan eksekusi di open candle berikutnya.

| Mulai | CAGR | MDD | PF | Trade | Porsi biaya |
|---|---|---|---|---|---|
| 2023-11-01 | 11,42% | −38,94% | 1,28 | 187 | 41,64% |
| 2022-11-01 | 8,66% | −38,94% | 1,25 | 239 | 45,34% |

Per tahun sejak Nov 2023: 2023 +6,96%, 2024 +74,70%, 2025 −4,90%, 2026 −22,03%. Beli & tahan BTC/IDR pada periode yang sama +149,27%, MDD −49,43%.

MA 20 candle 4 jam tanpa penyesuaian juga diuji sebagai pembanding pada 5 Nov 2026 (`data/banding_timeframe.txt`): CAGR −9,79%, PF 0,88, 749 trade. Pilihan 120 candle dibuat sebelum melihat angka ini, untuk menjaga rentang 20 hari.

Keterbatasan: median spread memakai snapshot order book dari bot lain sampai 2026-11-04 02:40 UTC (`data/snapshots/`). Hasil bisa jauh berbeda di forward test.

## Menjalankan
```
node tools/fetch_history.mjs 240 2022-02-01
node tools/spread_stats.mjs
node tools/backtest.mjs 2023-11-01 --ringkasan public/backtest_ringkasan.json --trades data/bt_trades.csv --sinyal data/bt_sinyal.csv --ekuitas data/bt_ekuitas.csv
node tools/tes_lokal.mjs
```
Deploy: buat proyek Vercel, hubungkan Upstash Redis dan QStash, lalu isi variabel dari `.env.example`. Panggil `POST /api/jadwal` dengan `CRON_SECRET` untuk membuat jadwal QStash (menit ke-17 tiap jam).

Akhir forward test (sesudah candle terakhir tutup, 14 Nov setelah 15.00 WIB):
```
node tools/ekspor_log.mjs <URL Vercel>
node tools/fetch_history.mjs 240 2022-02-01
node tools/hitung_ulang.mjs
```
Variabel rahasia hanya di `.env` dan Vercel. Jangan di-commit.
