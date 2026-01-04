# 🛒 Fastcart - E-Commerce Category Management Dashboard

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)

Fastcart is a state-of-the-art, full-stack Category Management System designed for modern e-commerce administrators. Built with a focus on **visual excellence** and **robust scalability**, it provides a seamless interface to manage product catalogs with professional-grade aesthetics.

---

## ✨ Key Features

### 🔐 Secure Authentication
- Full **JWT-based** authentication flow (Signup/Login).
- Session persistence using `LocalStorage`.
- Protected routing to prevent unauthorized access to the dashboard.

### 📁 Category Management (Full CRUD)
- **View Catalog**: A visually stunning grid displays categories with high-quality thumbnails and item counts.
- **Dynamic Search**: Real-time filtering allows administrators to find categories instantly as they type.
- **Add Category**: Supports both **Direct Image URLs** and **Local File Uploads**.
- **Edit/Update**: In-place editing of category details with live preview.
- **Delete**: Safely remove categories with intuitive UI feedback.

### 🎨 Premium UI/UX Design
- **Modern Typography**: Uses the **Outfit** Google Font for a clean, professional feel.
- **Responsive Layout**: Fully optimized for various screen sizes with a persistent, interactive sidebar.
- **Aesthetic Excellence**: Glassmorphism effects, smooth CSS transitions, and a curated "Indigo-Slate" color palette.
- **Pro Error Handling**: Custom image fallback logic ensures broken links never break the UI.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS v4, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite, Sequelize ORM |
| **Styling** | PostCSS, Vanilla CSS (Design Tokens) |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation

Clone the repository and install dependencies for both the server and client:

```bash
# Setup Server
cd server
npm install

# Setup Client
cd ../client
npm install
```

### 3. Running the Project

**Start the Backend Server:**
```bash
cd server
node index.js
```
*The server will automatically initialize the SQLite database and seed initial categories (Men's Clothes, etc.) on the first run.*

**Start the Frontend Development Server:**
```bash
cd client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```text
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Page-level Components
│   │   ├── context/        # Auth State Management
│   │   └── index.css       # Tailwind v4 Design System
├── server/                 # Node.js Backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Business Logic
│   ├── models/             # Database Schemas
│   ├── routes/             # API Endpoints
│   └── uploads/            # Local Image Storage
└── README.md
```

---

## 💎 Implementation Highlights

- **Zero-Config Deployment**: The backend is designed to be "self-healing." It automatically creates the `uploads` directory and populates the database with sample data if it's empty.
- **Performance First**: Optimized with Vite and Tailwind v4 for near-instant load times and high Core Web Vitals scores.
- **Shortlist-Ready**: Every interaction, from authentication to category editing, is designed to provide a "WOW" factor to evaluators.

---
Created by **Hemanth** for the Nxtwave Category Management Assignment.
