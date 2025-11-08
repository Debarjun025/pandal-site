require('dotenv').config();
const express = require('express');
const db = require('./db');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { authenticateToken, requireRole } = require('./middleware/auth');

const app = express();

// ----------------- CORS FIX (Top-most middleware) -----------------
const allowedOrigins = [
  "https://vivekanandaboysclub.vercel.app", // ✅ deployed frontend
  "http://localhost:5173",                  // ✅ Vite local dev
  "http://localhost:3000"                   // ✅ CRA fallback
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // ✅ Always respond to OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

// ----------------- JSON + URLENCODED -----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------- DB Setup / Migrations -----------------
const dbPath = path.join(__dirname, 'pandal.db');
if (!fs.existsSync(dbPath)) {
  const migrationsPath = path.join(__dirname, 'migrations.sql');
  if (fs.existsSync(migrationsPath)) {
    const migrations = fs.readFileSync(migrationsPath, 'utf8');
    db.exec(migrations, (err) => {
      if (err) console.error('❌ DB migration error:', err);
      else console.log('✅ DB created & migrated');
    });
  } else {
    console.error('❌ migrations.sql not found!');
  }
}

// ----------------- Static Uploads -----------------
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

// ----------------- Email Transporter -----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use App Password for Gmail
  },
});
app.set("mailer", transporter);

// ----------------- CORS Debug Route -----------------
app.get('/api/test-cors', (req, res) => {
  res.json({
    message: "✅ CORS test route working",
    origin: req.headers.origin || "none",
    headers: req.headers
  });
});

// ----------------- Routes -----------------
app.get('/', (req, res) => {
  res.json({ message: '🎉 Pandal backend running successfully!' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/donors', require('./routes/donors'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admins', require('./routes/admins'));
app.use('/api/donate', require('./routes/donate')); // donation handling

// ----------------- 404 Handler -----------------
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
