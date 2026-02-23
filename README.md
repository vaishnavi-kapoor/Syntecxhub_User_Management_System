User Management System
Lightweight full-stack User Management System built with an Express + MongoDB backend and a React (Vite) frontend.

Features

Register, list, update, and delete users
File upload for user images (stored in public/userImages)
Simple REST API with controllers and route separation
Minimal React front-end with UserForm and UserList components
Tech stack

Backend: Node.js, Express, Mongoose, Multer
Frontend: React, Vite, React Router
Quick start

Prerequisites

Node.js (v18+ recommended)
MongoDB (local or cloud URI)
Install dependencies

Run the frontend (development)

Build for production

Lint

Project structure

index.js - Express server entry (serves API and static front-end artifacts)
controllers/ - Request handlers (userController.js)
models/ - Mongoose models (userModel.js)
routes/ - Express routers (userRoutes.js)
public/userImages/ - Uploaded user images
src/ - React application source
src/pages/RegisterPage.jsx - Registration page
src/components/UserForm.jsx - Form for add/edit
src/components/UserList.jsx - Displays users
src/services/userService.js - Frontend API calls
Environment variables

MONGODB_URI - MongoDB connection string (e.g. mongodb://localhost:27017/usersdb)
PORT - Port for Express server (default: 5000)
Example .env (create at project root)

API

Base path: /api/users

GET /api/users - List all users
GET /api/users/:id - Get user by id
POST /api/users - Create a new user (multipart/form-data for image)
PUT /api/users/:id - Update user by id
DELETE /api/users/:id - Delete user by id
Notes about file uploads

Uploaded images are saved to public/userImages via multer. Ensure the folder exists and is writable.
Frontend

The frontend uses Vite. Key files:
src/services/userService.js contains fetch wrappers to the API.
src/components/UserForm.jsx handles create/update UI and image selection.
src/components/UserList.jsx shows the users and delete/edit actions.
Deployment

Build the frontend (npm run build) and serve the dist directory with your preferred static server or let Express serve it if configured.
Ensure MONGODB_URI is set in the production environment.
Contributing

Feel free to open issues or PRs. Keep changes focused and add tests where appropriate.
License

ISC (see package.json)
Contact

For questions or improvements, open an issue or contact the repository owner.
Would you like example curl commands for the API or a short screenshot/usage section added?
