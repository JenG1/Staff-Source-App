# Staff-Source-App
 Organize and plan a business using Staff Source App. 

Description
A command-line application that at a minimum allows the user to:

- Displays Departments, Roles, and Employees
- Add Departments, Roles, and Employees
- Delete Departments, Roles, and Employees

Technologies Used
The following technologies and tools were used
JavaScript
node.js
MySQL Workbench

The following npm packages were used
mysql
inquirer
console.table

Getting Started
The Staff-Source node.js app is maintained in Github with the SQL file to use in the MySQL workbench. You will need to add your password in the server.js file to run on your local machine
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'your password',
	database:  'employees_db'
});

#Acknowledgments ####StackOveflow