// empty array for tasks in local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// start next id at 0 if no existing task data
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// establish section for appending cards after form submission
const toDoListEL = $('#todo-cards');

// task id counts +1 starting at 0 and sets value in localstorage
function generateTaskId() {
    nextId++;
    localStorage.setItem('nextId', nextId);
}

// createTaskcard function to generate task cards
function createTaskCard(task) {
    let taskCard = $("<div>").addClass("card drag").attr("id", task.id).css('margin', '10px');
    let taskCardHeader = $("<h4>").addClass("card-header").text(task.title);
    let taskCardBod = $("<div>").addClass("card-body").text(task.description);
    let taskCardDate = $("<div>").addClass("card-footer").text(task.dateEl);
    let taskCardId = $("<p>").addClass("card-text").text(task.id);
    let deleteTaskBtn = $("<a>").addClass("btn btn-danger delete-task").text("Remove");

    // append elements to task card body
    taskCardBod.append(taskCardId, taskCardDate, deleteTaskBtn);

    // Append header to card body
    taskCard.append(taskCardHeader, taskCardBod);

    // Return the task card
    return taskCard;
}

// generate task list with draggable cards
function renderTaskList() {

    // steps
    // 1. retrieve tasks from local storage
    // 2. loop through tasks and add to lane **Note- refactoring with conditional logic may be required to add tasks to lanes other than to-do"
    // 3. make the card draggable 


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
     helper: function(event){
         let originalcard = $(event.target).hasClass('.drag') ? $(event.target) : $(event.target).closest('.drag');
         return originalcard.clone().css({width: originalcard.outerWidth(),});
     }
 });
}


// add new task
function handleAddTask(event){

    // Steps
    // 1. establish form input variables
    // 2. evoke generateTaskId to get new id for task
    // 3. establish new task object model using established form input variables 
    // 4. restet the form
    // 5. establish local storage for task data
    // 6. push data to local storage
    // 7. evoke renderTasksList **Note- Render task list TBD POC created for testing**

    event.preventDefault();

        // pull data from bread crumbs form
        let titleEl = document.querySelector("#titleInput");
        let dateEl = document.querySelector("#dateInput");
        let descriptionEl = document.querySelector("#taskStatus");

    // envoke generateTaskId
    generateTaskId();

    // task object model
    let nuTask = {
        title: titleEl.value,
        date: dateEl.value,
        description: descriptionEl.value,
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

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // date picker
    $(function () {
        $('#calendarSelect').datepicker({
          changeMonth: true,
          changeYear: true,
        });
      });

    // 
      $("#addCrumb").on("click", handleAddTask);
});
