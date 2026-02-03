# Task Manager App

A full-stack MERN task management system with role-based access,
analytics dashboard, and smooth UI animations.

## ✨ Features

- JWT Authentication (Admin & User roles)
- Create, update, delete, assign tasks
- Task priority & due date management
- Admin analytics dashboard
- Excel export for tasks and users
- Framer Motion animations
- Responsive dashboard UI

## 🛠 Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

## ⚙️ Environment Variables

### Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_INVITE_TOKEN=your_admin_token

### Frontend (.env)
VITE_API_BASE_URL=http://localhost:5000


## 📂 Project Structure

Task_Manager_App/
├── backend/
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend/Task-Manager/
│   ├── components
│   ├── pages
│   ├── context
│   └── utils





