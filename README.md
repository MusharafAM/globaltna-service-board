# GlobalTNA Mini Service Request Board

A full-stack Mini Service Request Board built for the GlobalTNA Full-Stack Developer Intern technical assessment.

The application allows public users to view available service requests. Registered users can create service requests, update request status, and delete requests.

## Tech Stack

### Frontend
- Next.js App Router
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Features

### Public Users
- View all service requests
- View individual service request details
- Filter service requests by category

### Registered Users
- Register an account
- Login with email and password
- Create service requests
- Update request status
- Delete service requests
- Logout

## Service Request Statuses

A service request can have one of the following statuses:

- Open
- In Progress
- Closed

## Authorization Rules

| Action | Public User | Registered User |
|---|---:|---:|
| View service requests | Yes | Yes |
| View request details | Yes | Yes |
| Create service request | No | Yes |
| Update status | No | Yes |
| Delete request | No | Yes |

## Project Structure

```text
globaltna-service-board/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
  frontend/
    app/
    components/
  README.md
```

## Backend API Endpoints

### Auth Routes

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Job Routes

```text
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PATCH  /api/jobs/:id
DELETE /api/jobs/:id
```

## Environment Variables

### Backend

Create a `.env` file inside the `backend` folder.

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/globaltna_service_board
JWT_SECRET=replace_with_your_jwt_secret
```

### Frontend

Create a `.env.local` file inside the `frontend` folder.

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/MusharafAM/globaltna-service-board.git
cd globaltna-service-board
```


### 2. Start MongoDB locally

Make sure MongoDB is running on your machine.

Default local MongoDB connection:

```text
mongodb://127.0.0.1:27017
```

### 3. Run the backend

Open a terminal:

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```text
http://localhost:5001
```

### 4. Run the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

## Test Flow

1. Open `http://localhost:3000`
2. View available service requests
3. Register a new account
4. Login
5. Create a new service request
6. Open the request detail page
7. Update the request status
8. Delete the request
9. Logout

## Notes

This project focuses on the required full-stack service request workflow. JWT authentication was also added so that only registered users can create, update, and delete service requests.

Public users can still view available service requests without logging in.
