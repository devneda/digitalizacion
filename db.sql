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

-- Tabla productos
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Datos de ejemplo
INSERT INTO categories (name) VALUES ('Tecnología'),('Hogar'),('Oficina');
INSERT INTO products (name, description, price, image_url, category_id) VALUES
('Auriculares inalámbricos','Auriculares con cancelación de ruido',59.99,'/images/auriculares.jpg',1),
('Lámpara LED','Lámpara de escritorio con brazo flexible',29.50,'/images/lampara-led.png',2),
('Monitor 24"','Monitor Full HD',129.00,'/images/monitor-24p.jpg',3);
