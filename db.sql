-- Crear base de datos
CREATE DATABASE IF NOT EXISTS proyecto_ia;
USE proyecto_ia;

-- Tabla de usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla categorías
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Tabla de productos
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla de pedidos
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla intermedia orders_items
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  PRIMARY KEY(order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabla de reseñas
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  user_id INT,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Datos de ejemplo
INSERT INTO users (username, email, password_hash) VALUES
('juanperez', 'juan@example.com', SHA2('password123',256)),
('ana_gomez', 'ana@example.com', SHA2('miClave!',256));
INSERT INTO categories (name) VALUES ('Tecnología'),('Hogar'),('Oficina');
INSERT INTO products (name, description, price, image_url, category_id) VALUES
('Auriculares inalámbricos','Auriculares con cancelación de ruido',59.99,'/images/auriculares.jpg',1),
('Lámpara LED','Lámpara de escritorio con brazo flexible',29.50,'/images/lampara-led.png',2),
('Monitor 24"','Monitor Full HD',129.00,'/images/monitor-24p.jpg',3);
INSERT INTO orders (user_id, total) VALUES
(1, 89.49), (2, 129.00);

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1,1,1), (1,2,1), (2,3,1);

INSERT INTO reviews (product_id, user_id, rating, comment) VALUES
(1,1,5,'¡Excelente calidad!'),
(3,2,4,'Muy buen monitor, aunque un poco brillante.');

