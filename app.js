document.addEventListener("DOMContentLoaded", function () {
    const taskInputs = document.querySelectorAll(".task-input");
    // Load tasks from localStorage
    loadTasks();
  
    taskInputs.forEach((input) => {
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && input.value.trim() !== "") {
          const taskText = input.value.trim();
          const task = document.createElement("div");
          task.classList.add("task");
          task.textContent = taskText;
  
          const tasksContainer = input.previousElementSibling;
          tasksContainer.appendChild(task);
  
          // Save tasks to localStorage
          saveTasks();
  
          input.value = "";
        }
      });
    });
    // Function to save tasks to localStorage
    function saveTasks() {
      const columns = document.querySelectorAll(".column");
      const data = {};
  
      columns.forEach((column) => {
        const tasks = column.querySelectorAll(".task");
        const tasksArray = [];
        tasks.forEach((task) => {
          tasksArray.push(task.textContent);
        });
        data[column.id] = tasksArray;
      });
  
      localStorage.setItem("trelloCloneData", JSON.stringify(data));
    }
    // Function to load tasks from localStorage
    function loadTasks() {
      const data = JSON.parse(localStorage.getItem("trelloCloneData"));
  
      if (data) {
        Object.keys(data).forEach((columnId) => {
          const column = document.getElementById(columnId);
          const tasksContainer = column.querySelector(".tasks");
          data[columnId].forEach((taskText) => {
            const task = document.createElement("div");
            task.classList.add("task");
            task.textContent = taskText;
            tasksContainer.appendChild(task);
          });
        });
      }
    }
    // Event delegation to handle removing tasks
    document.querySelector(".board").addEventListener("click", function (e) {
      if (e.target.classList.contains("task")) {
        e.target.remove();
        saveTasks();
      }
    });
  });