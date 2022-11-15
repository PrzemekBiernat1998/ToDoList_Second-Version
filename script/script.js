{
    let tasks = [];
    let hideTaskDone = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content : newTaskContent},
        ];

        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ]

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;

        render();
    };

    const toggleAllTasksDone = () =>{
        tasks = tasks.map((tasks) =>({
            ...tasks, 
            done :true,
        }
        ));
        render();
    };

    const clearInput = () => {
        const clearInput = document.querySelector(".js-newTask");
        clearInput.value = "";
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };
     
    cosnt bidnButtonEvents = () => {
        const setAllTaskDoneEvents = document.querySelector("js-setAllTaskDone");

        if (setAllTaskDoneEvents){
            setAllTaskDoneEvents.addEventListener("click", () => {
                setAllTaskDone();
            });
        };
    };

    const bindToggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li 
                class="list__task">
                    <button class="list__taskButton js-done">${task.done ? "✔" : ""}</button>
                    <span class="list__taskItem ${task.done ? "list__taskItem--done" : ""}">${task.content}</span>
                    <button class="list__taskButton list__taskButton--remove js-remove">🗑️</button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

    };
    const renderButtons = () => {

    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bidnButtonEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        {
            addNewTask(newTaskContent);
        }

        clearInput();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
};