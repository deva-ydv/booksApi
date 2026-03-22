# 📚 Books API

A production-ready backend system built using **Node.js, Express, TypeScript, and MongoDB**, designed to simulate a real-world digital library with authentication, file uploads, cloud storage, and automated testing.

---

## 🚀 Live Demo

👉 https://bookapis.devadeveloper.in/

---

## 🧠 Features

* 🔐 JWT-based Authentication & Authorization
* 🔑 Secure password hashing using bcrypt
* 📁 File upload system (Multer + Cloudinary)
* 🧪 Automated testing using Jest & Supertest
* ⚠️ Centralized error handling
* 🧠 Ownership-based access control
* 🌐 Static file serving support
* 🐳 Dockerized deployment (AWS EC2 + Nginx + HTTPS)

---

## 🏗️ Architecture

```bash
src/
 ├── books/        # Book module (CRUD + upload)
 ├── user/         # Auth module
 ├── middleware/   # Auth + error handling
 ├── config/       # DB & external services
 ├── app.ts
server.ts
```

---

## ⚙️ Tech Stack

* Node.js + Express + TypeScript
* MongoDB + Mongoose
* JWT + bcrypt
* Multer + Cloudinary
* Jest + Supertest
* Docker + AWS EC2 + Nginx

---

## 🔐 Authentication Flow

1. User registers → password hashed using bcrypt
2. JWT token generated (`sub` = user ID)
3. Token sent in `Authorization: Bearer <token>`
4. Middleware verifies token and attaches `userId`

---

## 📦 File Upload Flow

1. User uploads files via API (Multer)
2. Files stored temporarily in `/public`
3. Uploaded to Cloudinary
4. URLs stored in MongoDB
5. Temporary files deleted automatically

---

## 🧪 Testing

* Framework: **Jest + Supertest**
* Mocked dependencies:

  * Database (userModel)
  * bcrypt
  * JWT

### Run Tests

```bash
npm test
```

---

## ⚡ Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/deva-ydv/booksApi.git
cd booksApi
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create `.env` file:

```env
PORT=5513
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

### 4. Run Project

#### Development

```bash
npm run dev
```

#### Production

```bash
npm run build
npm start
```

---

## 🐳 Docker Setup

```bash
docker build -t booksapi .
docker run -p 5513:5513 booksapi
```

---

## 📡 API Endpoints

### Auth

* `POST /api/users/register` → Register user
* `POST /api/users/login` → Login user

### Books

* `POST /api/books` → Create book (Auth required)
* `GET /api/books` → Get all books
* `GET /api/books/:id` → Get single book
* `PUT /api/books/:id` → Update book (Auth required)
* `DELETE /api/books/:id` → Delete book (Auth required)

---

## 💡 Key Highlights

* Clean and modular architecture
* Production-level error handling
* Secure authentication system
* Scalable file storage (Cloudinary)
* Automated testing setup

---

## 👨‍💻 Author

**Deva Ydv**

* GitHub: https://github.com/deva-ydv
* Portfolio: https://devadeveloper.in

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
