const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// function to to run to initialize program
function init () {

    // Team array
    let team = [];

    // function to handle generating manager - first bc we need a manager
    function createManager() {
        inquirer.prompt([
            {
              type: "input",
              name: "managerName",
              message: "What is the team manager's name?",
              validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
            },
            {
                type: "input",
                name: "managerId",
                message: "Input the team manager's Id?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "managerEmail",
                message: "What is team manager's email address?",
                validate: answer => {
                  if (answer !== "" && answer.includes("@")) {
                    return true;
                  }
                  return "Please enter a valid email address";
                }
              },
              {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              }
          ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            // push to team array
            team.push(manager);

            // call the next function that will ask what type of employee will be created next
            createTeam();
          })
    }

    // function that asks what type of employee they would like to create next
    function createTeam(){
        inquirer.prompt([
            // question asking what we should make next
                // choices(engineer, intern, I dont want to add anything else)
                {
                type: 'list',
                message: 'What do you want to do next?',
                name: 'nextTeamMember',
                choices: ['Add an Engineer','Add an Intern','Finish team build'],
                validate(answer) {
                    if (!answer) {
                        return "You have made no selection."
                    }
                }
                  },
        ]).then(userChoice => {
           if (userChoice.nextTeamMember === "Add an Engineer") {
                // call the question function and create new engineer obj
                createEngineer();
           } else if (userChoice.nextTeamMember === "Add an Intern") {
            // call the question function and create new intern obj
                createIntern();
           } else {
            // default - buildTeam()
            buildTeam();
           }
        })
    }

    // function to handle generating engineer
    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the Engineer's name?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "engineerId",
                message: "Input the Engineer's ID",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "engineerEmail",
                message: "Input the Engineer's Email address",
                validate: answer => {
                  if (answer !== "" && answer.includes("@")) {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "engineerGithub",
                message: "What is the Engineer's Github Username?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            team.push(engineer);
            createTeam();
        })
    }

    // function to handle generating intern
    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the Intern's name?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "internId",
                message: "Input the Intern's ID",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "internEmail",
                message: "What is the Intern's email address?",
                validate: answer => {
                  if (answer !== "" && answer.includes("@")) {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              },
              {
                type: "input",
                name: "internSchool",
                message: "What is the name of the Intern's school?",
                validate: answer => {
                  if (answer !== "") {
                    return true;
                  }
                  return "Please enter at least one character.";
                }
              }
              
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            team.push(intern);
            createTeam();
        })
    }

    // function to buildTeam
    function buildTeam() {

        return fs.writeFileSync(outputPath,render(team),'utf-8');
    }
        
    createManager(); 
}

init();
