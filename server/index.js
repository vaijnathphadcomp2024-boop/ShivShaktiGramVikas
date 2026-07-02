require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', routes);

// ── Root health check ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🙏 Shivshakti GramVikas Pratishtan API is running' });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start ────────────────────────────────────────────────────────────────────
const start = async () => {
  // Uncomment when you have a real MONGO_URI:
  // await connectDB();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
};

start();
