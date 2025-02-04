# Fullstack Blog Project

Welcome to the Fullstack Blog Project! This project aims to create a fully functional blog application using a fullstack web development approach. 

Deployed link : [https://blogs-dusky-delta.vercel.app/](https://blogs-dusky-delta.vercel.app/)
API link (render.com) : [https://blogs-5yoe.onrender.com/](https://blogs-5yoe.onrender.com/)
## Technologies Used

- Frontend: Next.js
- Backend: Node.js
- Database: PostgreSQL (Supabase) with Prisma ORM

## Features

- User authentication and authorization with JWT tokens
- Client-side route protection using HOC and next-router
- MVC architecture with Prisma ORM
- Pages router with Next.js for simplicity and more control over ssr and ssg
- Clean and simple UI with with css modules 
- ```/``` contains all the blogs with ssr
- ```/blog/:id``` contains the blog with the given id with ssg

## Getting Started

### Backend
cd into the backend directory and run the following commands:

```bash
cd blogs-backend
yarn

yarn build

yarn start
```
make sure to create a .env file with the following variables:

```bash 
DATABASE_URL=##########
DIRECT_URL=#############
JWT_SECRET=##########
````


Server will be running on http://localhost:8000

### Frontend
cd into the frontend directory and run the following commands:

```bash
cd blogs-frontend
yarn

yarn dev
```
edit the .env file with the following variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Client will be running on http://localhost:3000

## Thanks for checking out the project! 