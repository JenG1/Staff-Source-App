INSERT INTO employee_roles (title, salary,dept_id)
VALUES ("General Manager","80,000",)("vanilla", 2.50, 100)("vanilla", 2.50, 100)("vanilla", 2.50, 100)("vanilla", 2.50, 100);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

-- Roles --
CREATE TABLE employee_roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  dept_id INT NULL,
  FOREIGN KEY (dept_id),
  PRIMARY KEY (id)
);

-- Employees
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  FOREIGN KEY (manager_id),
  FOREIGN KEY (role_id),
  PRIMARY KEY (id) 
);