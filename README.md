# REST API Manajemen Buku
Pemrograman API - UAS

## Deskripsi Project
Project ini merupakan implementasi REST API Manajemen Buku menggunakan Next.js (App Router) sebagai backend, PostgreSQL (NeonDB) sebagai database, dan Prisma ORM sebagai pengelola database.

API ini dilengkapi dengan security layer berupa JWT Bearer Token, middleware authentication, serta role-based authorization (Admin & User). Seluruh endpoint diuji menggunakan Postman dan dideploy ke Vercel.

## Teknologi yang Digunakan
- Next.js 14 (App Router)
- Node.js Runtime
- PostgreSQL (NeonDB)
- Prisma ORM
- JWT (JSON Web Token)
- bcryptjs
- Postman
- Vercel

## Struktur Project
app/
└─ api/
   ├─ auth/
   │  ├─ login/
   │  │  └─ route.js
   │  └─ register/
   │     └─ route.js
   ├─ books/
   │  ├─ route.js
   │  └─ [id]/
   │     └─ route.js
middleware.js
prisma/
└─ schema.prisma

## Middleware
Middleware digunakan untuk:
- Mengecek keberadaan token
- Memvalidasi JWT
- Menolak request tanpa token
- Mengatur akses berdasarkan role

Aturan akses:
- /api/auth/* → Public
- /api/books/* → User & Admin (token wajib)
- DELETE /api/books/:id → Admin only

## Endpoint API

### Authentication
| Method | Endpoint | Deskripsi |
|------|---------|----------|
| POST | /api/auth/register | Registrasi user |
| POST | /api/auth/login | Login & mendapatkan JWT |

### Books (Protected)
| Method | Endpoint | Akses |
|------|---------|------|
| GET | /api/books | User / Admin |
| GET | /api/books/:id | User / Admin |
| POST | /api/books | User / Admin |
| PUT | /api/books/:id | User / Admin |
| DELETE | /api/books/:id | Admin only |

## Format Response (Konsisten)

### Success
```json
{
  "success": true,
  "message": "...",
  "data": {}
} 
```

### Error
```json
{
  "success": false,
  "error": "Unauthorized",
  "code": 401
}
```

## Deployment
Backend dideploy menggunakan Vercel  
Database menggunakan NeonDB  

URL API:
https://pemrog-api-nextjs-main.vercel.app

## Testing
Pengujian dilakukan menggunakan Postman, meliputi:
- Register Admin & User
- Login untuk mendapatkan token
- Akses protected route dengan dan tanpa token
- Pengujian role-based authorization (Admin vs User)


## Author
Zaki Zakaria Zakse (23104410010)  
Isra Naswa Reyka S. (23104410006)  
Agistha Ardha S.P. (23104410009)  
Jovanda Kelvin W.P. (23104410035)  
Jusafa Ido A. (23104410022)  

Program Studi Teknik Informatika  
Universitas Islam Blitar
