# Dokumentasi Proyek PBP-FRONTEND

Selamat datang di tim\! 🚀 Dokumen ini akan memandu Anda memahami struktur proyek *frontend* kita dan bagaimana cara mulai berkontribusi, bahkan jika Anda belum pernah menggunakan Git, GitHub, atau React sebelumnya.

## 1\. Memahami Struktur Proyek

Proyek ini dibuat menggunakan **Vite + React**, sebuah setup modern yang memungkinkan pengembangan aplikasi dengan cepat. Berikut adalah penjelasan dari file dan folder utama yang akan Anda temui:

  * **`/.gitignore`**: File ini berisi daftar file atau folder yang tidak akan diunggah ke GitHub, seperti `node_modules` atau file konfigurasi lokal.
  * **`/index.html`**: Ini adalah halaman HTML utama dari aplikasi kita. Aplikasi React kita akan "disuntikkan" ke dalam elemen `<div id="root">` di dalam file ini.
  * **`/public`**: Folder ini berisi aset statis yang tidak perlu diproses oleh *build tool*, seperti gambar atau *favicon*.
  * **`/src`**: Ini adalah folder terpenting tempat kita akan bekerja. Seluruh kode sumber (logika dan tampilan) aplikasi berada di sini.
      * **`App.jsx`**: Komponen utama aplikasi kita. Anggap saja ini sebagai "wadah" untuk semua komponen lain yang akan kita buat.
      * **`main.jsx`**: Titik masuk (entry point) dari aplikasi. File ini mengambil komponen `App` dan menampilkannya di dalam `index.html`.
  * **`package.json`**: File ini adalah "jantung" dari proyek Node.js. Isinya adalah daftar *dependencies* (pustaka/modul yang kita gunakan) dan *scripts* (perintah untuk menjalankan, membangun, atau menguji aplikasi).
  * **`vite.config.js`**: File konfigurasi untuk Vite, yaitu *build tool* yang kita gunakan.

-----

## 2\. Struktur di Dalam Folder `src`

Seiring berkembangnya proyek, kita perlu menjaga agar folder `src` tetap rapi dan terorganisir. Untuk itu, kita akan membaginya ke dalam beberapa sub-folder berdasarkan fungsinya.

  * `/src`
      * `/assets`: Untuk menyimpan file-file aset seperti gambar (JPG, PNG, SVG), *font*, atau file CSS global.
      * `/components`: **Kumpulan komponen UI yang dapat digunakan kembali**. Contoh: `Button.jsx`, `Input.jsx`, `Header.jsx`.
      * `/pages`: **Merepresentasikan halaman-halaman pada aplikasi**. Contoh: `HomePage.jsx`, `LoginPage.jsx`, `ProfilePage.jsx`.
      * `/utils`: Berisi fungsi-fungsi bantuan (*helper functions*) yang bisa digunakan di berbagai bagian aplikasi. Contoh: `validators.js` atau `api.js`.
      * `App.jsx`: Tetap sebagai komponen utama yang mengatur *routing* (perpindahan antar halaman).
      * `main.jsx`: Titik masuk aplikasi.

### Contoh Praktis: Membangun Fitur Login

Mari kita lihat bagaimana semua bagian ini bekerja sama saat kita membangun halaman login.

1.  **Membuat Fungsi Bantuan di `/utils`**
    Pertama, kita buat fungsi untuk validasi email. Ini adalah contoh sempurna untuk file `utils`.

    **`/src/utils/validators.js`**

    ```javascript
    export const isEmailValid = (email) => {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return emailRegex.test(email);
    };
    ```

2.  **Membuat Halaman di `/pages`**
    Selanjutnya, kita buat halaman login. Halaman ini akan mengimpor fungsi validasi dari `utils` dan akan menggunakan *state* (akan dijelaskan di bagian Hooks) untuk mengelola input pengguna.

    **`/src/pages/LoginPage.jsx`**

    ```jsx
    import React, { useState } from 'react';
    import { isEmailValid } from '../utils/validators.js';

    const LoginPage = () => {
      // Mengelola data input form menggunakan useState Hook
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = (event) => {
        event.preventDefault(); // Mencegah form reload halaman
        if (!isEmailValid(email)) {
          setError('Format email tidak valid!');
          return;
        }
        // Logika untuk mengirim data login ke server
        console.log('Data login:', { email, password });
        setError('');
      };

      return (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Masuk</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      );
    };

    export default LoginPage;
    ```

Dengan struktur ini, logika validasi terpisah (`utils`), komponen halaman terdefinisi dengan jelas (`pages`), dan komponen UI kecil (seperti `<button>`) bisa dibuat di dalam `/components` untuk digunakan kembali.

-----

## 3\. Konsep Penting di React: Hooks

**Hooks** adalah fungsi spesial dari React yang memungkinkan Anda untuk "mengaitkan" (*hook into*) fitur React seperti *state* dan *lifecycle* dari komponen fungsional. Singkatnya, **Hooks membuat komponen fungsional menjadi canggih.**

Dua Hooks yang paling sering digunakan adalah:

### `useState`: Untuk Mengelola State

*State* adalah data di dalam komponen yang bisa berubah seiring waktu dan memengaruhi apa yang ditampilkan di layar. `useState` adalah cara kita membuat dan mengelola *state* tersebut.

**Konsep:** `const [variabel, setVariabel] = useState(nilaiAwal);`

  * `variabel`: Nilai *state* saat ini.
  * `setVariabel`: Fungsi untuk memperbarui nilai *state*.
  * `nilaiAwal`: Nilai pertama kali saat komponen dimuat.

**Contoh Sederhana: Penghitung Klik**

```jsx
import React, { useState } from 'react';

function Counter() {
  // Deklarasi state 'count' dengan nilai awal 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Anda sudah menekan tombol sebanyak {count} kali</p>
      {/* Memanggil setCount untuk mengubah nilai state saat tombol diklik */}
      <button onClick={() => setCount(count + 1)}>
        Klik Saya
      </button>
    </div>
  );
}
```

Pada contoh `LoginPage` di atas, kita menggunakan `useState` untuk menyimpan nilai dari input email dan password.

### `useEffect`: Untuk Menjalankan "Side Effects"

*Side effects* adalah operasi apa pun yang berinteraksi dengan dunia luar komponen, seperti:

  * Mengambil data dari API (*fetching data*).
  * Mengubah judul dokumen (`document.title`).
  * Menjalankan *timer* (`setInterval`).

`useEffect` memungkinkan kita menjalankan kode setelah komponen di-render.

**Konsep:** `useEffect(() => { /* Kode efek samping */ }, [dependencies]);`

  * **Fungsi callback**: Kode yang ingin Anda jalankan.
  * **Array dependensi**: Mengontrol kapan efek samping dijalankan.
      * `[]` (array kosong): Hanya berjalan sekali setelah render pertama.
      * `[variabel]` (diisi): Berjalan setiap kali nilai `variabel` berubah.
      * Tidak ada array: Berjalan setiap kali komponen re-render (hati-hati, bisa menyebabkan *infinite loop*).

**Contoh Sederhana: Mengubah Judul Halaman**

```jsx
import React, { useState, useEffect } from 'react';

function TitleChanger() {
  const [name, setName] = useState('');

  // useEffect ini akan berjalan setiap kali nilai 'name' berubah
  useEffect(() => {
    document.title = `Halo, ${name || 'Pengunjung'}`;
  }, [name]);

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Ketik nama Anda"
    />
  );
}
```

-----

## 4\. Cara Berkontribusi (Alur Kerja Git & GitHub)

Untuk menjaga agar kode di *branch* **main** tetap stabil dan bersih, kita akan menggunakan alur kerja (workflow) khusus. *Branch* **main** diproteksi, artinya tidak ada yang bisa langsung melakukan *push* ke sana. Semua perubahan harus melalui *Pull Request* (PR) dan disetujui oleh admin.

Berikut adalah langkah-langkah praktis dari awal hingga akhir:

### Langkah 1: Persiapan Awal (Hanya sekali)

Sebelum mulai, pastikan Anda sudah menginstal:

1.  **Git**: Sistem kontrol versi untuk melacak perubahan kode.
2.  **Node.js**: Lingkungan untuk menjalankan JavaScript di luar browser (termasuk `npm`, manajer paket).

### Langkah 2: Clone Repository

*Clone* adalah proses mengunduh seluruh *repository* (proyek) dari GitHub ke komputer lokal Anda.

```bash
# Buka terminal atau Command Prompt, navigasi ke folder tempat Anda ingin menyimpan proyek
git clone https://github.com/Doctor3131/PBP-FRONTEND.git

# Masuk ke direktori proyek
cd PBP-FRONTEND
```

### Langkah 3: Instalasi Dependencies

Setelah berhasil mengunduh proyek, Anda perlu menginstal semua pustaka/modul yang dibutuhkan oleh proyek.

```bash
# Perintah ini akan menginstal semua dependencies yang terdaftar di package.json
npm install
```

### Langkah 4: Buat Branch Baru

**Sangat penting\!** Jangan pernah bekerja langsung di *branch* `main`. Buatlah *branch* baru untuk setiap fitur atau perbaikan yang Anda kerjakan. Ini akan mengisolasi pekerjaan Anda dan memudahkan proses *review*.

```bash
# Pastikan Anda berada di branch main dan sudah update
git checkout main
git pull

# Buat branch baru dan langsung pindah ke branch tersebut
# Format penamaan branch yang baik: feature/nama-fitur atau fix/nama-bug
git checkout -b feature/tambah-halaman-login
```

### Langkah 5: Mulai Koding\!

Sekarang Anda siap untuk membuat perubahan. Jalankan server pengembangan untuk melihat perubahan secara langsung di browser.

```bash
# Jalankan aplikasi secara lokal
npm run dev
```

Buka browser dan akses `http://localhost:5173` (atau alamat lain yang muncul di terminal). Sekarang Anda bisa mulai mengubah kode sesuai contoh praktis di atas.

### Langkah 6: Simpan Perubahan (Commit)

Setelah selesai mengerjakan fitur, simpan perubahan Anda menggunakan Git.

```bash
# Cek status perubahan
git status

# Tambahkan semua file yang telah Anda ubah ke 'staging area'
git add .

# Simpan perubahan dengan pesan yang jelas (commit)
git commit -m "feat: Menambahkan halaman login dengan validasi"
```

> **Tips Pesan Commit:** Gunakan pesan yang deskriptif. Awali dengan tipe perubahan seperti `feat:` (fitur baru), `fix:` (perbaikan bug), `docs:` (dokumentasi), dll.

### Langkah 7: Upload Perubahan ke GitHub (Push)

Unggah *branch* baru beserta *commit* Anda ke *repository* di GitHub.

```bash
# 'origin' adalah nama remote repository di GitHub
# 'feature/tambah-halaman-login' adalah nama branch Anda
git push origin feature/tambah-halaman-login
```

### Langkah 8: Buat Pull Request (PR)

Setelah berhasil melakukan *push*, buka *repository* proyek di GitHub. Anda akan melihat notifikasi untuk membuat *Pull Request* dari *branch* yang baru saja Anda *push*.

1.  Klik tombol **"Compare & pull request"**.
2.  Beri judul dan deskripsi yang jelas mengenai perubahan yang Anda buat.
3.  Klik **"Create pull request"**.

Admin akan mendapatkan notifikasi, me-review kode Anda, dan jika semuanya baik, akan me-*merge* PR Anda ke *branch* `main`.

### Langkah 9: Selalu Update\! (Pull)

Setelah PR Anda di-*merge*, atau jika ada rekan tim lain yang perubahannya sudah di-*merge* ke `main`, Anda harus memperbarui *branch* `main` di komputer lokal Anda.

```bash
# Pindah kembali ke branch main
git checkout main

# Tarik perubahan terbaru dari GitHub
git pull
```

Selamat\! Anda sudah menyelesaikan satu siklus kontribusi. Ulangi dari **Langkah 4** untuk mengerjakan fitur berikutnya.