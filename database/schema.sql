CREATE DATABASE IF NOT EXISTS registration_login_db;
USE registration_login_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Useful DBMS queries demonstrated by the application:
-- SELECT COUNT(*) FROM users;
-- SELECT id, name, email, phone, gender, created_at FROM users ORDER BY id DESC;
-- SELECT id, name, email, phone, gender, created_at FROM users WHERE email = ?;
