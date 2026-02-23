# Full Stack Auth Demo

A clean, readable full-stack authentication project with:

- **Frontend:** Vite + React (existing UI/UX preserved)
- **Backend:** Express + MongoDB with layered architecture (Routes → Controllers → Services)

---

## 1) Project Structure

```text
.
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── src/
    │   ├── app.js
    │   ├── server.js
    │   ├── config/
    │   │   ├── db.js
    │   │   └── env.js
    │   ├── models/
    │   │   └── User.js
    │   ├── routes/
    │   │   ├── auth.routes.js
    │   │   └── user.routes.js
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   └── user.controller.js
    │   ├── services/
    │   │   ├── auth.service.js
    │   │   └── user.service.js
    │   ├── middleware/
    │   │   ├── auth.middleware.js
    │   │   └── error.middleware.js
    │   └── utils/
    │       ├── apiError.js
    │       ├── asyncHandler.js
    │       └── response.js
    ├── tests/
    │   └── auth-user.test.js
    ├── .env.example
    └── package.json
```

---

## 2) Backend Flow 

1. **Route** receives API call.
2. **Controller** handles request/response.
3. **Service** contains business logic + MongoDB operations.
4. **Middleware** handles auth and errors.


---

## 3) Environment Setup

### Backend env (`backend/.env`)

Copy from example:

```bash
cp backend/.env.example backend/.env
```

Required keys:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`

### Frontend env (`frontend/.env`)

Copy from example:

```bash
cp frontend/.env.example frontend/.env
```

Required key:

- `VITE_API_URL` (example: `http://localhost:4000/api`)

---

## 4) Run Backend

```bash
cd backend
npm install
npm run dev
```

---

## 5) Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open Vite URL shown in terminal (usually `http://localhost:5173`).

---

## 6) API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/signin`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

---

## 7) Notes 

- Start from `routes` to understand entry points.
- Then open matching `controller` and `service` files.
- Keep validation/business logic in services, not routes.
- Use `.env` values instead of hardcoding secrets/URLs.
