# SmartFeed: Intelligent Livestock Feed Management System

## Project Overview
SmartFeed adalah sistem manajemen pakan ternak berbasis web yang dirancang untuk membantu peternakan atau perusahaan agribisnis dalam mengoptimalkan operasional sehari-hari. Aplikasi ini menyediakan platform terpusat untuk mengelola data ternak (sapi), kandang, inventaris pakan, serta merencanakan dan memantau jadwal pemberian pakan secara efisien.

Tujuan utama SmartFeed adalah untuk meningkatkan produktivitas, mengurangi potensi pemborosan pakan, memastikan ternak mendapatkan nutrisi yang tepat waktu, dan menyediakan data historis untuk analisis dan pengambilan keputusan. Sistem ini juga dirancang dengan mempertimbangkan peran pengguna yang berbeda, yaitu pengguna reguler (misalnya, staf kandang) dan administrator sistem, dengan fungsionalitas yang disesuaikan untuk setiap peran.

Fitur yang direncanakan seperti pelacakan bobot sapi individu dengan visualisasi grafik dan dashboard admin yang komprehensif akan semakin meningkatkan kemampuan analitik dan kontrol manajemen.

## Key Features

**Fitur Saat Ini & Direncanakan:**

*   **Autentikasi Pengguna & Manajemen Akun (Admin)**:
    *   Login aman menggunakan JWT.
    *   Admin dapat mengelola akun pengguna (pembuatan akun untuk staf internal, tanpa registrasi publik).
*   **Dashboard Pengguna (Home)**:
    *   Ringkasan status pemberian pakan harian.
    *   Peringatan stok pakan yang menipis.
    *   Visualisasi stok pakan (misalnya, bar chart - *direncanakan*).
    *   Akses cepat ke fitur-fitur utama.
*   **Manajemen Kandang**:
    *   Operasi CRUD untuk data kandang (pembuatan kandang dikelola oleh Admin - *direncanakan*).
*   **Manajemen Sapi**:
    *   Operasi CRUD untuk data sapi, termasuk penempatan sapi ke kandang.
    *   Detail individu sapi.
    *   **Pelacakan Bobot Sapi**: Pencatatan riwayat bobot sapi dan visualisasi progres bobot dalam bentuk grafik per sapi (*direncanakan*).
*   **Manajemen Pakan**:
    *   Operasi CRUD untuk jenis pakan (penambahan jenis pakan baru dikelola oleh Admin - *direncanakan*).
    *   Pelacakan jumlah stok dan harga.
*   **Manajemen Jadwal Pakan**:
    *   Pengaturan jadwal pemberian pakan harian (pagi/sore) untuk setiap sapi.
    *   Pemantauan status pemberian pakan untuk semua sapi dalam satu kandang pada tanggal tertentu.
*   **Pencatatan Pemberian Pakan**:
    *   Fitur untuk mencatat pemberian pakan secara manual.
    *   Melihat dan memfilter riwayat pemberian pakan.
*   **Dashboard Admin (*direncanakan*)**:
    *   Panel khusus untuk administrator sistem.
    *   Manajemen pengguna.
    *   Manajemen master data (misalnya, penambahan kandang baru, jenis pakan baru).
    *   Potensi untuk ringkasan dan analitik tingkat sistem.
*   **Antarmuka Pengguna Responsif**: UI yang ramah pengguna dibangun dengan teknologi web modern.

## Struktur Proyek
-   `/backend`: Server API (Node.js, Express, Prisma, PostgreSQL)
-   `/frontend`: Aplikasi Klien (React, Vite, Tailwind CSS)

## Setup Cepat
1.  **Backend**:
    -   `cd backend`
    -   `pnpm install`
    -   Konfigurasi `.env` (lihat `backend/README.md`)
    -   `npx prisma migrate dev`
    -   `npx prisma db seed` (opsional)
    -   `pnpm run dev`
2.  **Frontend**:
    -   `cd frontend`
    -   `pnpm install`
    -   Konfigurasi `.env` (lihat `frontend/README.md`)
    -   `pnpm run dev`

Untuk detail lebih lanjut mengenai setup, arsitektur, dan kontribusi, silakan lihat `README.md` di dalam direktori `backend` dan `frontend`.