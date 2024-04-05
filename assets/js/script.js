// empty array for tasks in local storage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// start next id at 0 when no existing task data
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// establish reference for appending tasks to lanes (todo, inprogress, done)
const toDoListEL = $('#todo-cards').addClass('lane');
const inProgEl = $('#in-progress-cards').addClass('lane');
const doneEl = $('#done-cards').addClass('lane');

// task id counts +1 starting at 0 and sets value in localstorage
const generateTaskId = () => {
    nextId++;
    localStorage.setItem('nextId', nextId);
    return nextId;
};



//task card function
const createTaskCard = (task) => {
    let taskCard = $("<section>").addClass("card drag").attr("id", task.id);
    let taskCardHeader = $("<h2>").addClass("card-header").text(task.title);
    let taskCardBod = $("<section>").addClass("card-body").text(task.description);
    let taskCardDate = $("<section>").addClass("card-body").text(task.date);
    let deleteTaskBtn = $("<a>").addClass("btn btn-danger remove-task").attr("id", "remove-task").text("Remove");

    //set status by lane
    const laneStatus = coordinateTaskColor(task.date);

    // add laneStatus as class to task card
    taskCard.addClass(laneStatus)

    // append elements to task card body
    taskCardBod.append(taskCardDate, deleteTaskBtn);

    // Append header to card body
    taskCard.append(taskCardHeader, taskCardBod);

    // Return the task card
    return taskCard;
};


// function generate task list with draggable cards 
const renderTaskList = () => {
    toDoListEL.empty();
    inProgEl.empty();
    doneEl.empty();

    //pull tasks from local storage
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // Loop through the bread crumbs and append to lane
    for (task of taskList) {
        let breadCrumb = createTaskCard(task);
        if (task.progState === "to-do") {
            toDoListEL.append(breadCrumb);
        } else if (task.progState === "in-progress") {
            inProgEl.append(breadCrumb);
        } else {
            doneEl.append(breadCrumb);
        }
    }

    // add drag property to task cards
    $(".drag").draggable({
        opacity: 0.25,
        zIndex: 100,
        helper: function (event) {
            let breadCrumbTask;
            if ($(event.target).hasClass(".drag")) {
                breadCrumbTask = $(event.target);
            } else {
                breadCrumbTask = $(event.target).closest(".drag");
            }
            return breadCrumbTask.clone().css({
                width: breadCrumbTask.outerWidth(),
            });
        }
    });
};

// function for adding new tasks
const handleAddTask = (event) => {
    event.preventDefault();

    // pull data from bread crumbs form
    let titleEl = $("#titleData");
    let dateEl = $("#dateData");
    let descriptionEl = $("#statusData");

    // evoke generate task Id function
    let crumbId = generateTaskId();

    // new task object that pulls values from bread crumb form
    let nuTask = {
        title: titleEl.val(),
        date: dateEl.val(),
        description: descriptionEl.val(),
        id: crumbId,
        // establishes intial progState of "to-do" for appending to appropriate lane
        progState: "to-do",
    };

    // reset form after bread crumb add
    document.getElementById("form").reset();

    // push new task to local storage and save to LS
    taskList.push(nuTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // evoke renderTaskList to populate 'To-do' lane
    renderTaskList();
};

// function remove a task
const handleDeleteTask = (event) => {
    let remove = parseInt($(event.target).closest('.card').attr('id'));

    // filter tasks JSON object in localStorage for id marked for removal
    taskList = taskList.filter((task) => task.id !== remove);

    // update local storage (eliminate object from tasks array)
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // eliminate the task card from the view port
    $(event.target).closest('.card').remove();
};

// function for dropping a bread crumb into a new progState lane
const handleDrop = (event, ui) => {
    let breadCrumbId = ui.draggable[0].dataset.id;
    let newProgState = event.target.id;
    let moveTask = JSON.parse(localStorage.getItem('tasks'));

    // update prog state
    for (task of moveTask) {
        if (task.id === parseInt(breadCrumbId)) {
            task.progState = newProgState;
        }
    }
    // update the local storage
    localStorage.setItem("tasks", JSON.stringify(moveTask))

    // evoke render task list to populate list
    renderTaskList();
};

// color coordination function to color task cards by date
const coordinateTaskColor = (dateEl) => {
    let tDay = dayjs();

    // use dayjs to set color coordination by date
    let coordinateTaskColor = dayjs(dateEl);

    // determine date difference (when date > today (future) || date = today (today) || date < today (pastdue)
    let difference = tDay.diff(coordinateTaskColor, "day", true);

    // evaluate bread crumb date and apply determine the class for colorization
    if( task.progState === "done") { 
        return "future"
    } else if (difference > 1) {
        return "pastdue";
    } else if (difference > 0 && difference <= 1) {
        return "today";
    } else {
        return "future";
    }
};
// document ready functions
$(document).ready(function () {

    // apply lane elements droppability 
    $(".lane").droppable({
        accept: ".drag",
        drop: function (event, ui) {

            //grab the id of the bread crumb being dragged 
            let movedID = Number($(ui.draggable).attr('id'));

            // pull the progState from the lane the breadcrumb moved into
            let newProgState = $(this).attr("id");

            // pull bread crumb task data from localStorage
            let taskList = JSON.parse(localStorage.getItem("tasks"));

            //loop and find task object to update the progstate JSON data for the moved breadcrumb 
            for (let task of taskList) {
                if (task.id === movedID) {
                    task.progState = newProgState;
                    break;
                }
            }

            // save the new progState to the json object 
            localStorage.setItem("tasks", JSON.stringify(taskList));


            // color update when moved to done lane
            if (newProgState === "done") {
                $(ui.draggable).addClass("future");
            }
            // append the breadcrumb to the new lane
            ui.draggable.detach().appendTo($(this));
        }
    });

    // click on 'add crumb' submit button in bread crumbs form
    $("#addCrumb").on("click", handleAddTask);

    //  click on remove button (bread crumb)
    $(".container").on("click", ".remove-task", handleDeleteTask);

    // add date picker to finish date field
    $("#dateData").datepicker({
        changeMonth: true,
        changeYear: true,
    });
    // evoke render task list to populate lanes
    renderTaskList();
});


