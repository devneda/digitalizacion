// server.js

const express = require('express');
const path    = require('path');
const mysql   = require('mysql2/promise');
const bcrypt  = require('bcryptjs');
const session = require('express-session');

const app = express();

// ----- CONFIGURACIÓN DE BASE DE DATOS -----
const dbConfig = {
  host:        '127.0.0.1',   // fuerza TCP en lugar de socket Unix
  port:        3306,
  user:        'root',
  password:    'root',        // ajusta aquí tu contraseña real
  database:    'proyecto_ia',
  insecureAuth: true          // en desarrollo, para evitar errores de plugin
};

async function getConnection() {
  return mysql.createConnection(dbConfig);
}

// ----- MIDDLEWARES -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'un_secreto_super_seguro',
  resave: false,
  saveUninitialized: false
}));

// ----- RUTAS -----

// GET /login → mostrar formulario
app.get('/login', (req, res) => {
  res.render('login');
});

// POST /login → procesar credenciales
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const conn = await getConnection();
  const [rows] = await conn.execute(
    'SELECT id, username, password_hash FROM users WHERE email = ?',
    [email]
  );
  await conn.end();

  if (!rows.length || !(await bcrypt.compare(password, rows[0].password_hash))) {
    return res.render('login', { error: 'Credenciales inválidas' });
  }

  req.session.userId = rows[0].id;
  res.redirect('/');
});

// GET /register → mostrar formulario
app.get('/register', (req, res) => {
  res.render('register');
});

// POST /register → crear usuario
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const conn = await getConnection();
  try {
    await conn.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );
  } catch (err) {
    await conn.end();
    return res.render('register', { error: 'Usuario o email ya registrado' });
  }
  await conn.end();
  res.redirect('/login');
});

// POST /logout → destruir sesión
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// GET /contact → mostrar formulario de contacto
app.get('/contact', (req, res) => {
  res.render('formulario');
});

// POST /contact → procesar datos de contacto
app.post('/contact', async (req, res) => {
  console.log('Mensaje de Contacto:', {
    nombre:  req.body.name,
    email:   req.body.email,
    asunto:  req.body.subject,
    mensaje: req.body.message
  });
  // → Aquí iría la lógica de envío de correo / guardado en BD.
  res.redirect('/?info=contacto_ok');
});

// GET /products → listar todos los productos
app.get('/products', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');

  const conn = await getConnection();

  // 1) Recuperar todos los productos
  const [productos] = await conn.execute('SELECT * FROM products');

  // 2) Recuperar username para las iniciales
  const [userRows] = await conn.execute(
    'SELECT username FROM users WHERE id = ?',
    [req.session.userId]
  );

  await conn.end();

  if (!userRows.length) {
    req.session.destroy();
    return res.redirect('/login');
  }
  const username = userRows[0].username;
  const initials = username
    .split(/[\s._-]+/)
    .map(w => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  res.render('products', {
    user: { initials },
    productos
  });
});

// GET /profile → mostrar perfil (ejemplo básico)
app.get('/profile', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.send('<h1>Perfil de usuario</h1><p>Aquí podrías mostrar los datos de tu cuenta.</p>');
});

// GET /settings → mostrar ajustes (ejemplo básico)
app.get('/settings', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.send('<h1>Ajustes de usuario</h1><p>Aquí podrías cambiar tu contraseña, etc.</p>');
});

// GET / → Dashboard principal
app.get('/', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  const conn = await getConnection();

  // 1) Recuperar username
  const [userRows] = await conn.execute(
    'SELECT username FROM users WHERE id = ?',
    [req.session.userId]
  );
  if (!userRows.length) {
    req.session.destroy();
    await conn.end();
    return res.redirect('/login');
  }
  const username = userRows[0].username;

  // 2) Recuperar productos
  const [products] = await conn.execute('SELECT * FROM products');

  // 3) Recuperar categorías
  const [categories] = await conn.execute('SELECT * FROM categories');

  await conn.end();

  const productsCount   = products.length;
  const categoriesCount = categories.length;
  const initials = username
    .split(/[\s._-]+/)
    .map(w => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  // Detectar ?info=contacto_ok para mensaje de agradecimiento
  const mensajeInfo = (req.query.info === 'contacto_ok')
    ? '¡Gracias! Hemos recibido tu mensaje de contacto.'
    : null;

  res.render('dashboard', {
    user:            { initials },
    products,
    productsCount,
    categories,
    categoriesCount,
    mensajeInfo
  });
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
