# Gmail Clone

A full-stack Gmail clone application built with Node.js (Express) for the backend and React (Vite) for the frontend. This project demonstrates user authentication, email management, and a modern UI/UX similar to Gmail.

## Features

- User Signup & Login (JWT authentication)
- Compose, send, receive, and delete emails
- Inbox, Sent, and Trash views
- Responsive and modern UI
- Input validation and error handling
- Protected routes and middleware

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- CORS, custom middleware

### Frontend
- React (Vite)
- CSS Modules
- Axios for API requests

## Folder Structure

```
backend/
  index.js
  package.json
  config/
  controllers/
  middlewares/
  models/
  routes/
  validators/
frontend/
  src/
    components/
    App.jsx
    main.jsx
  public/
  package.json
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure MongoDB connection in `config/db.js`.
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend app:
   ```sh
   npm run dev
   ```

### Environment Variables
- Configure backend environment variables (e.g., MongoDB URI, JWT secret) as needed.

## API Endpoints
- `/api/auth` - Authentication routes (login, signup)
- `/api/email` - Email operations (send, fetch, delete)
- `/api/user` - User profile and related actions

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
