//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
const colors = require('colors');
var figlet = require('figlet');


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
  viewHome();
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
        "Remove Employees",
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

        case "Add Departments":
          addDept();
          break;

        case "Add Roles":
          addRole();
          break;

        case "Remove Employees":
          deleteStaff();
          break;

        case "EXIT":
          connection.end();
          break;
      }
    });
}
function viewHome() {
  figlet('Staff Source App', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    start();
});
}
//View all departments 
function viewDept() {
  console.log("\n...Viewing All Departments...\n".cyan.underline);
  connection.query("SELECT * FROM departments ORDER BY id", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}
//View all roles including departments
function viewRoles() {
  console.log("\n...Viewing All Roles...\n".cyan.underline);
  var sql = "SELECT employee_roles.id AS id,employee_roles.title AS title,departments.dept_name AS department FROM employee_roles JOIN departments ON employee_roles.dept_id = departments.id ORDER BY employee_roles.id";
  connection.query(sql, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}

function viewStaff() {
  console.log("\n...Viewing All Staff...\n".cyan.underline);
  var sql = "SELECT employees.id AS id,employees.first_name AS first,employees.last_name AS last,employee_roles.title AS title FROM employees JOIN employee_roles ON employees.role_id = employee_roles.id ORDER BY employees.id";
  connection.query(sql, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}


function addStaff() {
  console.log("\n...Adding Employee...\n".cyan.underline);
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is their first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is their last name?"
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info

      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName
        },
        function (err) {
          if (err) throw err;
          let firstName = answer.firstName;
          let lastName = answer.lastName;
          queryStaffRole(firstName, lastName)
        }
      );
    });
}

function queryStaffRole(firstName, lastName) {
  connection.query("SELECT * FROM employee_roles", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            let choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
          message: "What is their Role?"
        }
      ])
      .then(function (answer) {
        let chosenRole;
        for (var i = 0; i < results.length; i++) {
          if (results[i].title === answer.choice) {
            chosenRole = results[i];
          }
        }
        connection.query(
          "UPDATE employees SET ? WHERE ? AND ?",
          [
            {
              role_id: chosenRole.id
            },
            {
              first_name: firstName
            },
            {
              last_name: lastName
            },
          ],
          function (error) {
            if (error) throw err;
            console.log("\nEmployee Added Successfully!\n".cyan.underline);
            start();
          }
        );
      });
  });
}

function addDept() {
  console.log("\n...Adding Department...\n".cyan.underline);
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "What is name of the department?"
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO departments SET ?",
        {
          dept_name: answer.deptName,
        },
        function (err) {
          if (err) throw err;
          console.log("\nDepartment added successfully!\n".cyan.underline);
          start();
        }
      );
    });
}

function addRole() {
  console.log("\n...Adding a Role...\n".cyan.underline);
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
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee_roles SET ?",
        {
          title: answer.roleTitle,
          salary: answer.roleSalary
        },
        function (err) {
          if (err) throw err;
          let roleTitle = answer.roleTitle;
          queryRoles(roleTitle)
        }
      );
    });
}

function queryRoles(roleTitle) {
  connection.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            let choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].dept_name);
            }
            return choiceArray;
          },
          message: "What Department?"
        }
      ])
      .then(function (answer) {
        let chosenRole;
        for (var i = 0; i < results.length; i++) {
          if (results[i].dept_name === answer.choice) {
            chosenRole = results[i];
          }
        }
        connection.query(
          "UPDATE employee_roles SET ? WHERE ?",
          [
            {
              dept_id: chosenRole.id
            },
            {
              title: roleTitle
            }
          ],
          function (error) {
            if (error) throw err;
            console.log("\nRole added successfully!\n".cyan.underline);
            start();
          }
        );
      });
  });
}

function deleteStaff() {
  checkID();
  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "staffID",
          type: "input",
          message: "What is the employee's ID?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "DELETE SET FROM employees WHERE ?",
          {
            id: answer.staffID,
          },
          function (err) {
            if (err) throw err;
            console.log('\nThe Employee Was Removed - See the Employee Table\n'.cyan.underline);
            start();
          }
        );
      });
  });
}
function checkID() {
  var sql = "SELECT employees.id AS id,employees.first_name AS first,employees.last_name AS last,employee_roles.title AS title FROM employees JOIN employee_roles ON employees.role_id = employee_roles.id";
  connection.query(sql, function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);

  });
}



