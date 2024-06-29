const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("List-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You Must Write Something");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        
        // Adding close button (span)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        
        listContainer.appendChild(li);
        inputBox.value = '';

        saveData(); // Save data to localStorage after adding task

        // Event listener for removing task
        span.addEventListener('click', function() {
            li.remove();
            saveData(); // Save data after removing task
        });

        // Event listener for toggling checked class
        li.addEventListener('click', function() {
            li.classList.toggle('checked');
            saveData(); // Save data after checking/unchecking
        });
    }
}

const addButton = document.querySelector('button');
addButton.addEventListener('click', addTask);

function saveData() {
    let tasks = [];
    listContainer.querySelectorAll("li").forEach(function(item) {
        let task = {
            text: item.textContent.trim(),
            checked: item.classList.contains('checked')
        };
        tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(function(task) {
            let li = document.createElement("li");
            li.textContent = task.text;
            
            if (task.checked) {
                li.classList.add('checked');
            }
            
            // Adding close button (span)
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            
            listContainer.appendChild(li);
            
            // Event listener for removing task
            span.addEventListener('click', function() {
                li.remove();
                saveData(); // Save data after removing task
            });

            // Event listener for toggling checked class
            li.addEventListener('click', function() {
                li.classList.toggle('checked');
                saveData(); // Save data after checking/unchecking
            });
        });
    }
}

showTasks(); // Load tasks from localStorage when the page loads
