
CREATE DATABASE Blood_donation;
use Blood_donation;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  Gender ENUM('Male', 'Female'),
  location VARCHAR(100),
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE donate_appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  bloodType VARCHAR(10),
  appointmentDate DATE,
  location VARCHAR(255),
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


desc users;

select * from users;
