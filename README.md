# Implementasi Algoritma Elliptic Curve Digital Signature Algorithm dan Algoritma SHA-256 pada Autentikasi RESTful Web API

Repository ini berisi source code dari aplikasi client yang dibangun menggunakan ReactJS dan RESTful web API yang dibangun menggunakan ExpressJS dan mengimplementasikan Algoritma ECDSA dan SHA-256 dalam melakukan penandatanganan JSON Web Token.

## RESTful Web API
RESTful Web API Dibangun menggunakan ExpressJS dan PostgreSQL. Terdiri dari tiga endpoint yaitu Login, Register, dan Protected. Pada RESTful Web API proses autentikasi dilakukan dengan JSON Web Token yang dibangun menggunakan algoritma penandatanganan Elliptic Curve Digital Signature Algorithm dan SHA-256. Pada Algoritma ECDSA, elliptic curve yang digunakan adalah 𝐸 ∶ 𝑦 ^ 2 ≡ 𝑥^3 + 7 𝑚𝑜𝑑 2143 dengan titik basis (122,107) yang memiliki orde 𝑛 = 2089, kunci privat 𝑥 = 1111 dan kunci publik 𝑄 = (212,50).

dokumentasi API dapat diakses pada : https://documenter.getpostman.com/view/17275912/2s93m4WhDZ

## Aplikasi Client 
Aplikasi sisi client dibangun menggunakan ReactJS dan TailwindCSS. Terdiri dari tiga halaman utama yaitu Login, Register, dan Home. Halaman Login merupakan Halaman yang digunakan untuk mengakses endpoint yang akan melakukan penandatanganan JWT menggunakan ECDSA dan SHA-256, Halaman Register digunakan untuk mendaftarkan pengguna pada aplikasi sisi server, Sedangkan halaman Home hanya dapat diakses ketika pengguna sudah login dan berhasil melakukan verifikasi JWT pada sisi server.


## Cara Menjalankan Aplikasi
* Pada aplikasi sisi client cukup lakukan NPM run start
* Pada aplikasi sisi server sebelum aplikasi dijalankan pastikan dilakukan migrasi terlebih dahulu dengan cara menjalankan script berikut pada terminal :  npx sequelize-cli db:migrate
* Setelah dilakukan migrasi Server dapat dijalankan dengan script berikut : node app.js