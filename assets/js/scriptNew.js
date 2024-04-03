// empty array for tasks in local storage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
// start next id at 0 if no existing task data
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// task id counts +1 starting at 0 and sets value in localstorage
function generateTaskId() {
    nextId++;
    localStorage.setItem('nextId', nextId);
}

// create a task card function
function createTaskCard(task) {


    // Task card properties
    let taskCard = $("<div>").addClass("card dragTask").attr("id", task.id).css('margin', '10px')
    let taskTitle = $("<h4>").addClass("card-header").text(task.title);
    let taskBody = $("<div>").addClass("card-body").text(task.description);
    let taskDate = $("<div>").addClass("card-footer").text(task.dueDate);
    let taskState = $("<p>").addClass("card-text").text(task.id);
    let rmvTaskBtn = $("<a>").addClass("btn btn-danger delete-task").text("Remove Task").attr("data-id", task.id);


    // create task card
    taskBody.append(taskState, taskDate, rmvTaskBtn);
    taskCard.append(taskTitle, taskBody); 
    return taskCard;

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

    // form input variables
    let taskInputEl = $('#task-input');
    let dateInputEl = $('#calendarSelect');
    let taskDescriptionInputEl = $('#taskDescription');

    // envoke generateTaskId
    generateTaskId();

    // task object model
    let nuTask = {
        title: taskInputEl.val(),
        date: dateInputEl.val(),
        description: taskDescriptionInputEl.val(),
        id: nextId,
        status: "to-do"

    };

    // resets form
    taskInputEl.val('');
    dateInputEl.val('');
    taskDescriptionInputEl.val('');

    // set local storage item for tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // add task data to localstorage 
    tasks.push(nuTask);


    // Evoke Render task list
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
});
