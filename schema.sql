-- Staff Source App Schema --
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;
-- Departments 
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
USE employees_db;
-- Roles --
CREATE TABLE employee_roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(65,2) NOT NULL,
  dept_id INT,
    PRIMARY KEY (id),
  FOREIGN KEY (dept_id)
    REFERENCES departments(id)
);

USE employees_db;
-- Employees
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (manager_id)
    REFERENCES employees(id),
  FOREIGN KEY (role_id)
    REFERENCES employee_roles(id),
  PRIMARY KEY (id) 
);
USE employees_db;
INSERT INTO departments (dept_name)
VALUES ("Legal"),("Human Resources"),("Information Technology Support"),("Sales"),("Accounting"),("Research and Development"),("Operations");


USE employees_db;
INSERT INTO employee_roles (title, salary,dept_id)
VALUES ("HR Coordinator",67000,2),("Paralegal",79000,1),("IT Manager",98000,3),("Sales Associate",71000,4),("Accountant",83000,5),("Researcher",92000,6),("Operations Manager",101000,7);

USE employees_db;
INSERT INTO employees (first_name,last_name,role_id)
VALUES ("David","Olsen",7),("Emily","Rodriguez",6),("Brittney","Harrington",4),("Daniel","Holland",1),("Aaron","Schitt",5),("Sam","Torres",2),("Adam","Everson",3);