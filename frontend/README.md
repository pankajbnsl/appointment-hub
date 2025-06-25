# Frontend - Appointment Hub System

## Overview

This is the frontend implementation of a appointment hub system built using **React.js**. It allows users to register/login as a **Client** or **Provider**, view providers, check their availability, and book appointments. The interface is clean, responsive, and designed to integrate seamlessly with the Node.js/Express + MongoDB backend.

## Tech Stack

* **React** (via Vite)
* **React Router DOM** for client-side routing
* **Axios** for API communication
* **Context API** for global authentication state
* **CSS** (no Tailwind or external UI libraries)

## File Structure

```
frontend/
├── public/
├── src/
│   ├── api/
│   │   └── axios.js              
│   ├── components/                
│   │   ├── AdminPanel.jsx
│   │   ├── ClientPanel.jsx
│   │   └── ProviderPanel.jsx
│   ├── context/
│   │   └── AuthContext.jsx        
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── Dashboard.jsx
│   ├── routes/
│   │   ├── ProtectedRoute.jsx   
│   └── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Pages & Validation

### 1. Register Page (`RegisterPage.jsx`)

#### Functionality:

* Form for creating a new user
* Role selection: client or provider
* On success, redirects to login

#### Validations:

* **Name**: Minimum 3 characters 
* **Email**: Browser-level validation for email type
* **Password**: Minimum 8 characters 

### 2. Login Page (`LoginPage.jsx`)

#### Functionality:

* User login
* Stores JWT token and user info in localStorage and context
* Redirects to `/dashboard` if already logged in

#### Validations:

* Required email and password fields
* Basic client-side empty field check


### 3. Dashboard Page (`Dashboard.jsx`)

#### Functionality:

* Displays role-specific dashboard:

  * Admin: view all bookings and users
  * Client: view and manage their bookings
  * Provider: view booked slots and schedule

## Routing & Auth

* Protected routes use `ProtectedRoute.jsx`

  * Redirects unauthenticated users to login
* Auth pages are wrapped in `RedirectIfAuth.jsx`

  * Prevents already logged-in users from accessing login/register

## Auth Management

* Global state using `AuthContext`
* Stores user & token in `localStorage`
* Axios automatically adds token to headers for API requests

## API Integration

All API calls are centralized in:

* `src/api/axios.js`

  * Uses Axios instance with baseURL
  * Attaches Bearer token from localStorage

## Responsiveness

* All pages are styled using pure CSS
* Responsive design ensured with flexbox and media queries
* Designed to work on desktop, tablet, and mobile resolutions

## How to Run

1. Navigate to `frontend` directory
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Open browser at: `http://localhost:5173`

## Notes

* No external UI libraries used
* No Tailwind CSS or Material UI
* Clean and developer-friendly code without AI-generated patterns
* Fully connected to backend (make sure backend is running on port 5000)

---
