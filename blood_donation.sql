
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


desc users;

select * from users;
