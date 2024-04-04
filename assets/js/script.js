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
            let breadCrumbTask = $(event.target).hasClass('.drag') 
            ? $(event.target) : $(event.target).closest('.drag');
            return breadCrumbTask.clone();
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

    // evoke generate task Id function
    generateTaskId();

    // new task object that pulls values from bread crumb form
    let nuTask = {
        title: titleEl.val(),
        date: dateEl.val(),
        description: descriptionEl.val(),
        id: nextId,
        progState: "to-do"
    };
    
    // reset form after bread crumb add
    document.getElementById("form").reset();

    // push new task to local storage
    taskList.push(nuTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // evoke renderTaskList to populate 'To-do' lane
    renderTaskList();
}

// function to color coordinate task cards by state (today, past due, future)
function coordinateTaskColor(task) {
    // let color =  JSON.parse(localStorage.getItem("tasks"))

}


// function remove a task
function handleDeleteTask(event) {
    
    // identify task card by id that has been selected for removal
    let remove = parseInt($(event.target).closest('.card').attr('id'));

    // filter tasks JSON object in localStorage for id marked for removal
    taskList = taskList.filter((task) => remove !== task.id );

    // update local storage (eliminate object from tasks array)
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // eliminate the task card from the view port
    $(event.target).closest('.card').remove();
    
}

// function to handle dropping a task into a new status lane
function handleDrop(event, ui) {


}

// color coordination function to color task cards by date
function coordinateTaskColor(dateEl) {

    // set today using dayjs
    let today = dayjs();

    // use dayjs to set color coordination by date
    let coordinateTaskColor = dayjs(dateEl);

    // determine date difference (when date > today (future) || date = today (today) || date < today (pastdue)
    let difference = today.diff(coordinateTaskColor, 'day', true);

    if (difference > 1) {
        return "pastdue";
    } else if  (difference > 0 & difference <= 1) {
        return "today";
    } else { return "future";}

}

// document ready functions
$(document).ready(function () {

    // add listener on 'add crumb' submit button in bread crumbs form
    $("#addCrumb").on("click", handleAddTask);

    //  add listener for removing tasks
    $(".container").on("click", '.remove-task', handleDeleteTask);

    // add date picker to finish date field
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