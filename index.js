


let taskId = 1;

const taskManager = {
  //array
  tasks: [],

  preAddTask: function () {
    try {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    } catch (e) {
      this.tasks = []; // set default value if localStorage parsing failed
      taskId = this.tasks.length - 1;
    }

    this.addTask();
  },

  //add new task
  addTask: function () {
    const temp = JSON.parse(localStorage.getItem("tasks"));

    if (temp !== null) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
      taskId = this.tasks.length;
    }

    const taskInput = document.getElementById("taskDescription");
    description = taskInput.value.trim();
    taskInput.value = "";
    //const description = prompt("Please add description for the task");

    if (description.trim() === "") {
      alert("Task description can not be empty!");
      return;
    }

    const task = {
      id: taskId++,
      description: description,
      completed: false,
    };

    // add to array
    this.tasks.push(task);
    //save to localstorage from array
    localStorage.setItem("tasks", JSON.stringify(this.tasks));

    //update
    this.listAllTasks();
    this.listCompletedTasks();
  },

  listAllTasks: function () {
    //get tasks from localstorage
    const tasksArr = JSON.parse(localStorage.getItem("tasks"));
    const tasksContainer = document.getElementById("myTasks");

    //clear localstorage
    tasksContainer.innerHTML = "";

    //add new child (old and new tasks)
    tasksArr.forEach((element) => {
      const myTask = document.createElement("p");
      myTask.innerHTML =
        element.id + " " + element.description + " " + element.completed;
      if (!element.completed) {
        tasksContainer.appendChild(myTask);
      }
    });
  },

  completeTask: function () {
    //get id
    const id = parseInt(
      prompt("Enter the id of the task you want to complete:")
    );

    //check if id matches
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      alert("Task not found!");
    }

    //set completed to true
    task.completed = true;

    //update localstorage from array
    localStorage.clear;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));

    //update
    this.listCompletedTasks();
    this.listAllTasks();
  },

  //update both lists
  refresh: function () {
    this.listAllTasks();
    this.listCompletedTasks();
  },

  removeTask: function () {
    //get id
    const id = parseInt(prompt("Enter the id of the task you want to remove:"));

    //check if id matches
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      alert("Task not found!");
    }

    //this.tasks.splice(id - 1);

    //set completed to true

    //update localstorage from array
    localStorage.clear;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));

    //update
    this.listCompletedTasks();
    this.listAllTasks();
  },

  listCompletedTasks: function () {
    //get tasks from localstorage
    const tasksArr = JSON.parse(localStorage.getItem("tasks"));
    const tasksContainer = document.getElementById("completed-tasks");

    //clean localstorage
    tasksContainer.innerHTML = "";

    //add new child (old and new tasks)
    tasksArr.forEach((element) => {
      const myTask = document.createElement("p");
      myTask.innerHTML =
        element.id + " " + element.description + " " + element.completed;
      if (element.completed) {
        tasksContainer.appendChild(myTask);
      }
    });
  },
  
};
