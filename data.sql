-- Usar la base de datos
USE ferreteria_db;

-- Insertar categorías
INSERT INTO categories (nombre) VALUES 
('Herramientas'),
('Ofertas'),
('Novedades');

-- Insertar marcas
INSERT INTO brands (nombre) VALUES 
('Stanley'),
('Black & Decker'),
('Bosch'),
('Tramontina');

-- Insertar etiquetas
INSERT INTO tags (nombre) VALUES 
('Herramientas manuales'),
('Herramientas eléctricas'),
('Industriales'),
('Promoción'),
('Nuevo'),
('Edición limitada');

-- Insertar usuarios
INSERT INTO users (nombre, email, password, rol, avatar) VALUES
('Juan Pérez', 'juan@gmail.com', 'hashedPassword123', 'cliente', '/avatars/juan.png'),
('María Gómez', 'maria@gmail.com', 'hashedPassword456', 'admin', '/avatars/maria.png');

-- Insertar productos
INSERT INTO products (nombre, descripcion, precio, imagen, stock, category_id, brand_id) VALUES
('Martillo de acero', 'Martillo de alta resistencia para uso profesional.', 4500.00, '/images/martillo.jpg', 25, 1, 1), -- Stanley
('Taladro eléctrico 500W', 'Taladro ideal para tareas del hogar y profesionales.', 15000.00, '/images/taladro.jpg', 15, 1, 2), -- Black & Decker
('Caja de herramientas completa', 'Incluye 50 piezas esenciales.', 30000.00, '/images/caja.jpg', 10, 3, 3), -- Bosch
('Juego de destornilladores', 'Set de 6 destornilladores con mango ergonómico.', 6000.00, '/images/destornilladores.jpg', 30, 2, 4); -- Tramontina



-- Asignar etiquetas a productos (product_tags)
INSERT INTO product_tags (product_id, tag_id) VALUES
(1, 1), -- Martillo → Herramientas manuales
(1, 3), -- Martillo → Industriales
(2, 2), -- Taladro → Herramientas eléctricas
(2, 4), -- Taladro → Promoción
(3, 5), -- Caja herramientas → Nuevo
(3, 6), -- Caja herramientas → Edición limitada
(4, 1), -- Destornilladores → Herramientas manuales
(4, 4); -- Destornilladores → Promoción


-- Tabla de marcas
CREATE TABLE brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Asegurate también de que la tabla products tenga esta columna:
-- brand_id INT,
-- FOREIGN KEY (brand_id) REFERENCES brands(id)
