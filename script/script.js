{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            }
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

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
        <li class="list__task${task.done && hideDoneTasks ? " tasks__list--hidden" : ""
                }">
            <button class="js-done list__taskButton">
                ${task.done ? "✔️" : ""}
            </button>
            <span class="${task.done ? " list__taskItem--done" : ""}">
                ${task.content}
            </span>
            <button class="js-remove list__taskButton list__taskButton--remove">🗑</button>
        </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const bindButtonsEvents = () => {
        const setAllTasksDoneButton = document.querySelector(".js-setAllTasksDone");

        if (setAllTasksDoneButton) {
            setAllTasksDoneButton.addEventListener("click", () => {
                setAllTasksDone();
            });
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-hideDoneTask");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", () => {
                toggleHideDoneTasks();
            });
        }
    };

    const renderButtons = () => {
        let htmlButtonsString = "";

        if (!tasks.length) {
            return;
        }
        htmlButtonsString += `
        <h2>Lista do zrobienia</h2>
        <button class="js-hideDoneTask buttons__button"> ${hideDoneTasks ? "Pokaż " : "Ukryj "
            }ukończone</button>
        <button ${tasks.every(({ done }) => done) ? "disabled" : ""}
            class="js-setAllTasksDone buttons__button">
              Ukończ wszystkie
        </button>`;


        document.querySelector(".js-buttonEvents").innerHTML = htmlButtonsString;
    };



    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTask = newTaskElement.value.trim();

        if (newTask !== "") {
            addNewTask(newTask);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};