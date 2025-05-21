# SmartFeed - Backend

Server API untuk aplikasi SmartFeed, dibangun dengan Node.js, Express.js, dan Prisma ORM.

## Fitur (Termasuk yang Direncanakan)
- Autentikasi JWT dan manajemen sesi.
- Operasi CRUD untuk Kandang, Sapi, Pakan.
- Logika untuk penjadwalan pakan per sapi.
- Pencatatan riwayat pemberian pakan.
- Validasi data menggunakan Zod.
- **Pelacakan Bobot Sapi**: Endpoint untuk mencatat dan mengambil riwayat bobot sapi (*direncanakan*).
- **Fungsionalitas Admin**:
    - Endpoint untuk manajemen pengguna (pembuatan akun oleh admin - *direncanakan*).
    - Kontrol akses berbasis peran (RBAC) untuk endpoint tertentu (misalnya, pembuatan kandang, penambahan jenis pakan oleh admin - *direncanakan*).

## Tech Stack
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- Zod

## Setup
1.  **Instal Dependensi**:
    ```bash
    pnpm install
    ```
2.  **Variabel Lingkungan (.env)**:
    Buat file `.env` dan isi dengan:
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
    PORT=3000
    JWT_SECRET="your_jwt_secret"
    JWT_EXPIRES_IN="1h"
    JWT_REFRESH_SECRET="your_jwt_refresh_secret"
    JWT_REFRESH_EXPIRES_IN="7d"
    # ADMIN_EMAIL="admin@example.com" # Opsional, untuk seed admin awal
    # ADMIN_PASSWORD="adminpassword" # Opsional, untuk seed admin awal
    ```
    Sesuaikan `DATABASE_URL` dengan konfigurasi PostgreSQL Anda.
3.  **Migrasi Database**:
    Pastikan PostgreSQL berjalan dan database telah dibuat.
    ```bash
    pnpx prisma migrate dev
    ```
    *(Catatan: Untuk fitur pelacakan bobot, mungkin diperlukan migrasi baru untuk tabel `BobotHistory` atau sejenisnya).*
4.  **Seed Database (Opsional)**:
    ```bash
    pnpx prisma db seed
    ```
    *(Skrip seed mungkin perlu diperbarui untuk membuat akun admin awal jika `ADMIN_EMAIL` dan `ADMIN_PASSWORD` didefinisikan).*

## Menjalankan Server
```bash
pnpm run dev
```
Server akan berjalan di `http://localhost:3000` (atau port yang ditentukan).

## Struktur Modul Utama & Potensi Pengembangan
- `src/core`: Autentikasi, error handling, middleware RBAC (*direncanakan*).
- `src/modules`:
    - `auth`: Logika login & refresh token.
    - `user`: Manajemen pengguna (CRUD oleh admin - *direncanakan*).
    - `kandang`: Manajemen kandang.
    - `sapi`: Manajemen sapi, termasuk endpoint untuk riwayat bobot (*direncanakan*).
    - `pakan`: Manajemen pakan.
    - `jadwal`: Manajemen jadwal pakan.
    - `record`: Manajemen catatan pemberian pakan.
- `prisma`: Skema (mungkin termasuk model `BobotHistory`, `UserRole`), migrasi, dan seed database.

## API Endpoints (Contoh & Direncanakan)
Semua endpoint diawali `/api/v1`.
- `POST /api/v1/login`
- `GET /api/v1/kandang` (Akses pembuatan mungkin dibatasi untuk admin)
- `POST /api/v1/sapi`
- `POST /api/v1/sapi/:sapiId/bobot`: Menambah catatan bobot baru (*direncanakan*).
- `GET /api/v1/sapi/:sapiId/bobot`: Mendapatkan riwayat bobot sapi (*direncanakan*).
- `GET /api/v1/jadwal/kandang/:kandangId/display?date=YYYY-MM-DD`
- `GET /api/v1/records`
- `POST /api/v1/admin/users`: Membuat pengguna baru (khusus admin - *direncanakan*).