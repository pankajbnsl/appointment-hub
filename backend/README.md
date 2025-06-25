# Backend - Appointment Hub System

## Overview

This is the backend implementation of a appointment hub system built using **Node.js**, **Express**, and **MongoDB**. The backend provides secure authentication, role-based access, and RESTful APIs for providers to add availability, clients to book slots, and admins to manage the system.

## Tech Stack

* **Node.js** with **Express**
* **MongoDB** using **Mongoose**
* **JWT** for authentication
* **bcryptjs** for password hashing
* **dotenv** for environment variables
* **cors** for cross-origin requests

## Prerequisites

Before setting up the project, ensure the following are installed on your system:

* **Node.js**
* **Express (via npm)**
* **MongoDB (local or Atlas)**

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js               
│   ├── controllers/
│   │   ├── auth.controller.js    
│   │   ├── availability.controller.js 
│   │   └── booking.controller.js 
│   ├── middlewares/
│   │   └── authMiddleware.js     
│   ├── models/
│   │   ├── User.js                
│   │   ├── Availability.js       
│   │   └── Booking.js            
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── availability.routes.js
│   │   └── booking.routes.js
│   ├── utils/
│   │   └── generateToken.js       
│   └── app.js                     
├── server.js                     
├── .env                           
├── package.json
└── README.md
```

## API Endpoints

### Auth (`/api/auth`)

* `POST /register` – Register as client or provider
* `POST /login` – Login and get JWT token

### Availability (`/api/availability`)

* `POST /` – Provider adds available time slots
* `GET /:providerId` – Get availability for a provider

### Bookings (`/api/bookings`)

* `POST /` – Client books a slot with provider
* `GET /me` – Get bookings of the logged-in user
* `GET /admin` – Admin gets all bookings in the system

## Libraries & Packages Used

| Package      | Purpose                      |
| ------------ | ---------------------------- |
| express      | Web framework                |
| mongoose     | MongoDB ODM                  |
| bcryptjs     | Password hashing             |
| jsonwebtoken | JWT-based authentication     |
| dotenv       | Load environment variables   |
| cors         | Enable cross-origin requests |

## How to Run

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/booking-app
   JWT_SECRET=yourSuperSecretKey
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. The server should start on: `http://localhost:5000`

## Authentication Flow

* JWT is issued at login and stored on frontend (localStorage)
* Protected routes require Bearer token in headers
* Middleware `authMiddleware.js` validates and attaches `req.user`

## Role-Based Access

* Clients: can book and view their bookings
* Providers: can add availability, view their own schedule
* Admin: can view all bookings

## Database Design

* **User**: `name`, `email`, `password`, `role`
* **Availability**: `providerId`, `date`, `slots[]`
* **Booking**: `clientId`, `providerId`, `date`, `slot`, `status`

