-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS tienda;

-- Usar la base de datos
USE tienda;

-- Crear la tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Insertar categorías de ejemplo
INSERT INTO categorias (nombre) VALUES
('Tecnología'),
('Hogar'),
('Juguetes'),
('Ropa');

-- Crear la tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
    descripcion TEXT NOT NULL,
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Crear tabla de usuarios con UUID BINARY(16), campos extra y bandera de cambio de contraseña
CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  must_change_password BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);