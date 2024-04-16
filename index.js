document.addEventListener("DOMContentLoaded", () => {
  let taskId = 1;

  //array
  const tasks = [];
  function preAddTask() {
    try {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    } catch (e) {
      this.tasks = []; // set default value if localStorage parsing failed
      taskId = this.tasks.length - 1;
    }

    addTask();
  }
  //add new task
  function addTask() {
    const taskInput = document.getElementById("taskDescription");
    const description = taskInput.value.trim();

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
    tasks.push(task);
    taskInput.value = "";

    //update
    listAllTasks();
    listCompletedTasks();
  }
  function listAllTasks() {
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
  }

  function completeTask() {
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

    //update
    listCompletedTasks();
    listAllTasks();
  }
  //update both lists
  function refresh() {
    listAllTasks();
    listCompletedTasks();
  }
  function removeTask() {
    //get id
    const id = parseInt(prompt("Enter the id of the task you want to remove:"));

    //check if id matches
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      alert("Task not found!");
    }

    //update
    listCompletedTasks();
    listAllTasks();
  }
  function listCompletedTasks() {
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
  }
});
