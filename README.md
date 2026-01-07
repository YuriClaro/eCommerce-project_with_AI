# E-Commerce Project

A full-stack e-commerce project with React (frontend) and Node.js/Express (backend).

## 🌐 Deployment

**Frontend:** Deployed on [Vercel](https://vercel.com)

**Backend:** Deployed on [Render](https://render.com)

⚠️ **Important:** The backend APIs may take approximately 50 seconds to respond on first access due to Render's free tier cold start behavior. Subsequent requests will be faster.

## 📋 Prerequisites

- **Node.js** version 22 or higher
- **npm** (comes with Node.js)

[Install Node.js here](https://nodejs.org/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Setup and start the Backend

```bash
cd ecommerce-backend
npm install
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. In another terminal, setup and start the Frontend

```bash
cd ecommerce-project
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite)

## 📁 Project Structure

```
├── ecommerce-backend/     # Backend (Node.js/Express)
│   ├── models/            # Data models (Sequelize)
│   ├── routes/            # API routes
│   ├── defaultData/       # Default initial data
│   ├── images/            # Product and icon images
│   └── server.js          # Main server
│
├── ecommerce-project/     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Main pages
│   │   ├── utils/         # Helper functions
│   │   ├── assets/        # Images and resources
│   │   └── App.jsx        # Root component
│   └── vite.config.js     # Vite configuration
│
└── README.md              # This file
```

## 🔌 API Endpoints
The backend provides the following endpoints:

``GET /api/products`` - Get all products

``POST /api/cart-items`` - Add item to cart

``GET /api/cart-items`` - Get cart items

``PUT /api/cart-items/:id`` - Update cart item

``DELETE /api/cart-items/:id`` - Remove cart item

``GET /api/delivery-options`` - Get delivery options

``GET /api/orders`` - Get all orders

``POST /api/orders`` - Create new order

``GET /api/payment-summary`` - Get payment summary

``GET /api/reset`` - Reset to default data

## 🛠️ Available Scripts
Backend
```bash
npm run dev       # Start in development mode (nodemon)
npm start         # Start in productionBackend
```

Frontend
```bash
npm run dev       # Start development server (Vite)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Check code with ESLint
```

## 🔐 Environment Variables
If needed, create a .env file in the backend (won't be versioned in Git):
```bash
PORT=3000
NODE_ENV=development
```

## 📝 Features
✅ Product browsing
✅ Shopping cart
✅ Checkout with delivery options
✅ Order management
✅ Order tracking
✅ Payment summary

## 🤝 Technologies Used
## Backend

- Express.js

- Sequelize ORM

- SQLite/SQL.js

- CORS

- Nodemon (development)

## Frontend

- React 19

- React Router

- Vite

- Axios

- Day.js

- Vitest (testing)

## 📚 Additional Documentation
Backend Documentation
Troubleshooting

## 📄 License
ISC

## 👨‍💻 Author
Yuri Claro

Tip: If you're having issues, check the Troubleshooting section of the backend.
