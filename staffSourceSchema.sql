-- Staff Source App Schema --
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;
-- Roles --
CREATE TABLE employee_roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  dept_id INT NOT NULL,
  FOREIGN KEY (dept_id),
  PRIMARY KEY (id)
);

USE employees_db;
-- Employees
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  FOREIGN KEY (manager_id),
  PRIMARY KEY (id) 
);

USE employees_db;
-- Departments 
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
