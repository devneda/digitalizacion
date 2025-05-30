// server.js

const express = require('express');
const path    = require('path');
const mysql   = require('mysql2/promise');
const bcrypt  = require('bcryptjs');
const session = require('express-session');

const app = express();

// Configuración de Base de Datos (TCP + insecureAuth)
const dbConfig = {
  host:        '127.0.0.1',   // fuerza TCP
  port:        3306,          // puerto por defecto
  user:        'root',
  password:    'root',        // o la que hayas definido
  database:    'proyecto_ia',
  insecureAuth: true          // permite auth menos seguros
};

async function getConnection() {
  return mysql.createConnection(dbConfig);
}

// Middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'un_secreto_super_seguro',
  resave: false,
  saveUninitialized: false
}));

// Rutas

// Dashboard
app.get('/', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const conn = await getConnection();

  // Usuario
  const [userRows] = await conn.execute(
    'SELECT username FROM users WHERE id = ?', [req.session.userId]
  );
  if (!userRows.length) {
    req.session.destroy();
    await conn.end();
    return res.redirect('/login');
  }
  const username = userRows[0].username;

  // Productos
  const [products] = await conn.execute('SELECT * FROM products');

  // Categorías
  const [catCountRows] = await conn.execute(
    'SELECT COUNT(*) AS cnt FROM categories'
  );
  await conn.end();

  const categoriesCount = catCountRows[0].cnt;
  const initials = username
    .split(/[\s._-]+/)
    .map(w => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  res.render('dashboard', {
    user: { initials },
    products,
    categoriesCount
  });
});

// Login
app.get('/login', (req, res) => res.render('login'));
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const conn = await getConnection();
  const [rows] = await conn.execute(
    'SELECT id, password_hash FROM users WHERE email = ?', [email]
  );
  await conn.end();

  if (!rows.length || !(await bcrypt.compare(password, rows[0].password_hash))) {
    return res.render('login', { error: 'Credenciales inválidas' });
  }

  req.session.userId = rows[0].id;
  res.redirect('/');
});

// Registro
app.get('/register', (req, res) => res.render('register'));
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const conn = await getConnection();
  try {
    await conn.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?,?,?)',
      [username, email, hash]
    );
  } catch {
    await conn.end();
    return res.render('register', { error: 'Usuario o email ya registrado' });
  }
  await conn.end();
  res.redirect('/login');
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
