// empty array for tasks in local storage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// start next id at 0 when no existing task data
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// establish reference to to-do section html for appending tasks
const toDoListEL = $('#todo-cards');


// task id counts +1 starting at 0 and sets value in localstorage
function generateTaskId() {
    nextId++;
    localStorage.setItem('nextId', nextId);
}

//task card function
function createTaskCard(task) {
    let taskCard = $("<div>").addClass("card drag").attr("id", task.id).css('margin', '10px');
    let taskCardHeader = $("<h4>").addClass("card-header").text(task.title);
    let taskCardBod = $("<div>").addClass("card-body").text(task.description);
    let taskCardDate = $("<div>").addClass("card-body").text(task.date);
    let deleteTaskBtn = $("<a>").addClass("btn btn-danger remove-task").attr("id", "remove-task").text("Remove");

    // append elements to task card body
    taskCardBod.append(taskCardDate, deleteTaskBtn);

    // Append header to card body
    taskCard.append(taskCardHeader, taskCardBod);

    // Return the task card
    return taskCard;
}

// function generate task list with draggable cards 
function renderTaskList() {

    //pull tasks from local storage
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // clear list to prevent duplicating tasks
    toDoListEL.empty();

    // Loop through the task list and append to 'to-do' lane
    for (let task of taskList) {
        let card = createTaskCard(task);
        toDoListEL.append(card);
    }

    // add drag property to task cards
    $(".drag").draggable({
        zIndex: 100,
        opacity: 0.5,
        helper: function (event) {
            let originalcard = $(event.target).hasClass('.drag') ? $(event.target) : $(event.target).closest('.drag');
            return originalcard.clone().css({ width: originalcard.outerWidth(), });
        }
    });
}

// function for adding new tasks
function handleAddTask(event) {
    event.preventDefault();

    // pull data from bread crumbs form
    let titleEl = $("#titleData");
    let dateEl = $("#dateData");
    let descriptionEl = $("#statusData");

    // New task Id
    generateTaskId();

    // Create a new task object
    let nuTask = {
        title: titleEl.val(),
        date: dateEl.val(),
        description: descriptionEl.val(),
        id: nextId,
        status: "to-do"
    };

    // reset form after bread crumb add
    document.getElementById("form").reset();

    // push new task to local storage
    taskList.push(nuTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // evoke renderTaskList to populate 'To-do' lane
    renderTaskList();
}



// function remove a task
function handleDeleteTask(event) {
    
    // establish remove by Id 
    let remove = parseInt($(event.target).closest('.card').attr('id'));

    // filter tasks for id that has triggered 'remove
    taskList.filter((task) => {task.id !== remove});

    // update localStorage tasks JSON object 
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // eliminate the task card from the viewport
    $(event.target).closest('.card').remove();
    
}

// function to handle dropping a task into a new status lane
function handleDrop(event, ui) {


}

// document ready functions
$(document).ready(function () {

    // add listener on 'add crumb' submit button in bread crumbs form
    $("#addCrumb").on("click", handleAddTask);

    //  add listener for removing tasks
    $(".container").on("click", '.remove-task', handleDeleteTask);

    

    // add date picker to due date field
    $("#dateData").datepicker({
        changeMonth: true,
        changeYear: true,
    });

    // Make the .lane elements droppable
    $(".lane").droppable({
        accept: ".drag",
        drop: function (event, ui) {
            ui.draggable.detach().appendTo($(this));
        }
    });

    // evoke render task list to populate lanes
    renderTaskList();
});