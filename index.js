// TASK MANAGER APP

// vi ska skapa en liten app där vi kan lägga till "tasks", markera en task som klar,
// visa alla tasks samt filtrera ut alla klara tasks.
// användaren gör val i en meny och vår app visar sedan korrekt val

// vår app ska bestå av två delar:
// 1. ett objekt som ska innehålla all logik
// 2. en funktion som ska hantera menyval

// vårt objekt ska ha följande properties:
// - array som innehåller alla tasks
// - funktion för att lägga till en ny task
// - funktion för att markera en task som klar
// - funktion för att visa alla tasks
// - funktion för att visa alla tasks som är klara

// vår menu() ska ta emot en input från en user och visa rätt val

let taskId = 1;

// OBJEKT
const taskManager = {
  // properties här
  tasks: [],
  addTask: function () {
    //Vi vill ta emot beskrivningen på en task från en user
    const description = prompt("Please add description for the task");
    if (description.trim() === "") {
      alert("Task description can not be empty!");
      this.addTask();
    }

    const task = {
      id: taskId++,
      description: description,
      completed: false,
    };

    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    alert("Task added successfully!");
  },

  listAllTasks: function () {
    if (this.tasks.length === 0) {
      alert("No tasks available.");
    }
    const tasksArr = JSON.parse(localStorage.getItem("tasks"));
    const tasksContainer = document.getElementById("myTasks");
    
    tasksArr.forEach((element) => {
      const myTask = document.createElement("p");
      myTask.innerHTML = element;
      tasksContainer.appendChild(myTask);
    });
  },

  completeTask: function () {
    const id = parseInt(
      prompt("Enter the id of the task you want to complete:")
    );
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      alert("Task not found!");
    }

    task.completed = true;
    alert("Task marked as complete!");
  },

  listCompletedTasks: function () {
    const completedTasks = this.tasks.filter((task) => task.completed);

    if (completedTasks.length === 0) {
      alert("No completed tasks!");
    }

    let message = "";
    completedTasks.forEach((task) => {
      message += `Id: ${task.id}, Description: ${task.description}\n`;
    });
    alert(message);
  },
};

// MENU FUNCTION
// function menu() {
//   // ta emot input och visa korrekt val
//   const choice = parseInt(
//     prompt(
//       "Select from the menu:\n1) Add a new task\n2) Complete a task\n3) List all tasks\n4) List completed tasks\n5) Exit"
//     )
//   );
//   switch (choice) {
//     case 1:
//       //console.log("Add a new task");
//       taskManager.addTask();
//       break;
//     case 2:
//       //console.log("Complete a task");
//       taskManager.completeTask();
//       break;
//     case 3:
//       //console.log("List all tasks");
//       taskManager.listAllTasks();
//       break;
//     case 4:
//       //console.log("List completed tasks");
//       taskManager.listCompletedTasks();
//       break;
//     case 5:
//       alert("Goodbye!");
//       return;
//     default:
//       alert("Invalid choice, Please enter a number between 1-5");
//   }
// }
