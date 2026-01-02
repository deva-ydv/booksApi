📚 Books API (Node.js + TypeScript)

A RESTful backend API built with Node.js, Express, and TypeScript for managing users and books.
Supports JWT authentication, file uploads, and Cloudinary integration for storing book files and cover images.

🚀 Features
User registration & login
JWT-based authentication
Create, update, delete, and list books
Upload book cover image + book file
Cloudinary for media storage
Zod-based request validation
Global error handling
Modular & scalable folder structure

🛠 Tech Stack
Node.js, Express, TypeScript, MongoDB+Mongoose, JWT(jsonwebtoken) ,bcrypt, Multer, Cloudinary, Zod, CORS

.
├── public/
│   └── data/
│       └── uploads/          # Temporary local uploads (Multer)
├── src/
│   ├── books/
│   │   ├── bookController.ts
│   │   ├── bookModel.ts
│   │   ├── bookRouter.ts
│   │   └── bookTypes.ts
│   │
│   ├── config/
│   │   ├── cloudinary.ts
│   │   ├── config.ts
│   │   └── db.ts
│   │
│   ├── middleware/
│   │   ├── authenticate.ts
│   │   └── globalErrorHandler.ts
│   │
│   ├── user/
│   │   ├── userController.ts
│   │   ├── userModel.ts
│   │   ├── userRouter.ts
│   │   ├── userTypes.ts
│   │   ├── userValidate.ts
│   │   └── userValidater.ts
│   │
│   └── app.ts
│
├── server.ts
├── package.json
├── tsconfig.json
└── README.md

👨‍💻 Author
Deva
Backend / MERN Developer
