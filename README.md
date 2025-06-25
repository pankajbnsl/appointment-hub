# Appointment Hub System (MERN Stack)

## Project Overview

This is a full-stack appointment booking platform built using the **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to register as **Clients** or **Providers**, book appointments, manage availability, and provides a central dashboard for **Admins** to oversee the system.

## Tech Stack

* **Frontend:** React (Vite), React Router, Axios, Context API, Vanilla CSS
* **Backend:** Node.js, Express, MongoDB, Mongoose, JWT

## Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
```

## Key Features

### Provider

* Register/login
* Add availability (date & time slots)
* View own bookings

### Client

* Register/login
* Browse providers
* Book appointments based on availability
* View personal bookings

### 🛠Admin

* Access all bookings in the system

## Authentication

* JWT-based secure authentication
* Role-based access for Client, Provider, Admin
* Token stored in localStorage

## API Communication

* Axios handles frontend API requests
* Token attached in Axios interceptor
* RESTful API built with Express

## Project Setup

### Backend

1. Ensure **Node.js**, **MongoDB**, and **npm** are installed.
2. Create `.env` file:

   ```env
   PORT=5000
   MONGO_URI=your_local_or_cloud_mongo_uri
   JWT_SECRET=your_jwt_secret
   ```
3. Run:

   ```bash
   cd backend
   npm install
   node server.js
   ```

### Frontend

1. Run:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open browser at `http://localhost:5173`

## Notes

* Simple CSS used, no external UI libraries like Tailwind
* Clean code structure, manually written with modular components
* Mobile-responsive design

## About AI Assistance

I’ve written and structured this project myself. I used **ChatGPT** lightly for code suggestions, validation ideas, and file structuring guidance — particularly for maintaining clean practices and avoiding redundant code.

---

