# SmartFeed - Frontend

Aplikasi klien untuk SmartFeed, dibangun dengan React, Vite, dan Tailwind CSS.

## Fitur (Termasuk yang Direncanakan)
- Antarmuka pengguna untuk semua fitur backend.
- **Dashboard Pengguna**:
    - Ringkasan status pemberian pakan.
    - Peringatan stok pakan rendah.
    - Visualisasi stok pakan (misalnya, bar chart - *direncanakan*).
- **Manajemen Entitas**: Kandang, Sapi, Pakan.
- **Pelacakan Bobot Sapi**: Tampilan grafik riwayat bobot per sapi (*direncanakan*).
- **Penjadwalan & Riwayat Pakan**.
- **Dashboard Admin (*direncanakan*)**:
    - Antarmuka khusus untuk manajemen pengguna.
    - Formulir untuk menambah kandang dan jenis pakan baru.
- Navigasi antar halaman menggunakan React Router.
- Komunikasi dengan API backend menggunakan Axios.
- Styling modern dengan Tailwind CSS dan komponen shadcn/ui.
- Rute terproteksi dan tampilan UI yang disesuaikan berdasarkan peran pengguna (user/admin - *direncanakan*).

## Tech Stack
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- shadcn/ui
- Lucide React (Icons)
- Chart.js atau library grafik serupa (untuk grafik bobot & stok - *direncanakan*)

## Setup
1.  **Instal Dependensi**:
    ```bash
    pnpm install
    # Jika berencana menggunakan library grafik, tambahkan:
    # pnpm install chart.js react-chartjs-2
    ```
2.  **Variabel Lingkungan (.env)**:
    Buat file `.env` dan isi dengan URL API backend:
    ```env
    VITE_BASE_URL=http://localhost:3000/api/v1
    ```
    Pastikan port (`3000`) sesuai dengan port backend.

## Menjalankan Aplikasi Klien
```bash
pnpm run dev
```
Aplikasi akan berjalan di `http://localhost:5173` (default Vite).

## Struktur Folder Utama & Potensi Pengembangan
- `src/pages`:
  - `Home`: Dashboard pengguna.
  - `AdminDashboard`: Dashboard khusus admin (*direncanakan*).
  - `Kandang`, `Sapi`, `Pakan`: Manajemen entitas.
    - `SapiDetail`: Mungkin menampilkan grafik bobot sapi (*direncanakan*).
  - `Jadwal`, `Riwayat`, `Login`.
- `src/components`:
  - `charts`: Komponen grafik (misalnya, `WeightChart.jsx`, `StockBarChart.jsx` - *direncanakan*).
  - `admin`: Komponen khusus untuk UI admin (*direncanakan*).
- `src/hooks`, `src/services`, `src/auth` (mungkin diperbarui untuk menangani peran).
- `src/App.jsx`: Konfigurasi routing (mungkin termasuk rute admin khusus).