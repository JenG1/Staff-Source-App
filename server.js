//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
const colors = require('colors');
//Connection Preferences
const connection = mysql.createConnection({
  host: "localhost",

  //Port
  port: 3306,

  // Username
  user: "root",

  //Password
  password: "Biodesi647025!",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  viewHome();
  start();
});
// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?\n",
      choices: [
        "View All Departments",
        "View All Employees",
        "View All Roles",
        "Add Employees",
        "Add Departments",
        "Add Roles",
        "EXIT"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Departments":
          viewDept();
          break;

        case "View All Employees":
          viewStaff();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add Employees":
          addStaff();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Roles":
          addRole();
          break;

        case "EXIT":
          connection.end();
          break;
      }
    });
}
function viewHome() {
  console.log('\nStaff '.magenta.underline, ' Source '.cyan.underline, ' App \n'.blue.underline);
}

function viewDept() {
  console.log("\n...Viewing All Departments...\n");
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    viewHome();
    start();
  });

}

function viewRoles() {
  console.log("\n...Viewing All Roles...\n");
  connection.query("SELECT * FROM employee_roles", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    viewHome();
    start();
  });
}


function viewStaff() {
  console.log("\n...Viewing All Staff...\n");
  let sql = "SELECT employees.id AS ID, employees.first_name AS First, employees.last_name AS Last, employee_roles.title As Title FROM employees JOIN employee_roles ON employees.role_id = employee_roles.id";
  connection.query(sql, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    viewHome();
    start();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "What is the title?"
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the salary for this role?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function () {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "SELECT * FROM employee_roles SET ?",
        {
          title: answer.roleTitle,
          salary: answer.roleSalary,
        },
        function (err) {
          if (err) throw err;
          console.log("Role Added Successfully"); 
          start();
        }
      );
    });
}





