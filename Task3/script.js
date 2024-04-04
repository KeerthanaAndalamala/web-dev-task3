document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    loadTasks();

    // Add Task
    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasks();
            taskInput.value = "";
        }
    });

    // Delete or Complete Task
    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("edit")) {
            editTask(e.target.parentElement);
        } else if (e.target.classList.contains("delete")) {
            deleteTask(e.target.parentElement);
            saveTasks();
        } else if (e.target.tagName === "LI") {
            e.target.classList.toggle("completed");
            saveTasks();
        }
    });
 
    function addTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);  
    }

    // Function to delete a task
    function deleteTask(taskElement) {
        taskElement.remove();
        alert("Are you sure to delete")
    }

    // Function to edit a task
    function editTask(taskElement) {
        const taskText = taskElement.querySelector(".task-text");
        const newText = prompt("Edit the task:", taskText.textContent);
        if (newText !== null) {
            taskText.textContent = newText;
            saveTasks();
        }
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", taskList.innerHTML);
    }

    function loadTasks() {
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
            taskList.innerHTML = tasks;
        }
    }
});
