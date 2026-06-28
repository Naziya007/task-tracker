# ⚡ TaskFlow – MERN Task Tracker

A full-stack Task Tracker built with the MERN stack (MongoDB, Express, React, Node.js).

## 🌐 Live Demo
- **Frontend:** [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend API:** [https://your-api.onrender.com](https://your-api.onrender.com)

---

## 🚀 Features

### Mandatory
- ✅ Create, Read, Update, Delete tasks (full CRUD)
- ✅ Form validation (frontend + backend)
- ✅ RESTful API with Express.js
- ✅ MongoDB Atlas integration via Mongoose
- ✅ Responsive UI (mobile-first)
- ✅ Dynamic updates without page refresh (React Context)
- ✅ Deployed on Vercel (frontend) + Render (backend)

### Bonus
- 🔍 Search tasks in real-time
- 🎯 Filter by status & priority
- 📊 Sort by date, priority, title
- 📈 Stats bar with completion progress
- 🏷️ Tags support
- ⏰ Due dates with overdue detection
- 🔁 One-click status cycling
- 🔔 Toast notifications (react-hot-toast)
- 🌙 Dark-mode UI
- ♻️ Reusable components with CSS Modules
- 🔒 Environment variables for all secrets

---

## 🛠️ Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React 18, Vite, CSS Modules   |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB Atlas, Mongoose       |
| HTTP      | Axios                         |
| Toasts    | react-hot-toast               |
| Deploy FE | Vercel                        |
| Deploy BE | Render                        |

---

## 📁 Project Structure

```
task-tracker/
├── backend/
│   ├── models/
│   │   └── Task.js          # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js    # All CRUD + filter routes
│   ├── server.js            # Express app entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskCard.jsx      # Individual task card
    │   │   ├── TaskForm.jsx      # Create/edit modal form
    │   │   ├── FilterBar.jsx     # Search, filter, sort
    │   │   └── StatsBar.jsx      # Task statistics
    │   ├── context/
    │   │   └── TaskContext.jsx   # Global state management
    │   ├── utils/
    │   │   └── api.js            # Axios API instance
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```

### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env → add your MongoDB URI
```

Your `backend/.env` should look like:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/tasktracker
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev    # starts on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env → set your backend URL
```

Your `frontend/.env` should look like:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev    # starts on http://localhost:5173
```

---

## 🌍 Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo, set **Root Directory** to `backend`
4. **Build command:** `npm install`
5. **Start command:** `node server.js`
6. Add environment variables:
   - `MONGO_URI` = your Atlas connection string
   - `CLIENT_URL` = your Vercel frontend URL (after deploying)
   - `PORT` = 5000
7. Deploy → copy the Render URL

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo, set **Root Directory** to `frontend`
3. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
4. Deploy

---

## 📡 API Reference

| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | /api/tasks                | Get all tasks (+ filters)|
| GET    | /api/tasks/:id            | Get single task          |
| POST   | /api/tasks                | Create task              |
| PUT    | /api/tasks/:id            | Update task              |
| PATCH  | /api/tasks/:id/status     | Update status only       |
| DELETE | /api/tasks/:id            | Delete task              |

### Query Parameters for GET /api/tasks
| Param    | Values                            | Description     |
|----------|-----------------------------------|-----------------|
| status   | todo / in-progress / completed    | Filter by status|
| priority | low / medium / high               | Filter by priority|
| search   | any string                        | Search title/desc|
| sortBy   | createdAt / dueDate / title / priority | Sort field  |
| order    | asc / desc                        | Sort direction  |

---

## 👩‍💻 Author

Built as a technical assignment for the Full Stack Developer Intern position at **Coll-Edge Connect**.
