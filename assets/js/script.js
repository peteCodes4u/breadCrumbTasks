// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// pete's code starts here



// form data constants

const formEL = $('#breadCrumbForm');
const taskInputEl = $('#task-input');
const dateInputEl = $('#calendarSelect');
const taskDescriptionInputEl = $('#taskDescription');
const toDoListEL = $('#sortable');

// calendar selection feature

$(function () {
    $('#calendarSelect').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

  const printBreadCrumb = function (task, date, description) {
    const taskEl = $('<div>');
    const taskData = task.concat(' due on ', date, " ", description);
    taskEl.text(taskData);
    taskEl.appendTo(toDoListEL);
  };
  
  const FormSubmit = function (event) {
    event.preventDefault();
  
    const taskInput = taskInputEl.val();
    const dateInput = dateInputEl.val();
    const taskDescriptionInput = taskDescriptionInputEl.val();
  
    if (!taskInput || !dateInput || !taskDescriptionInput) {
      alert('Please provide input for Task title, Due Date and Description!');
      return;
    }
  
    printBreadCrumb(taskInput, dateInput, taskDescriptionInput);
  
    // resets form
    taskInputEl.val('');
    dateInputEl.val('');
    taskDescriptionInputEl.val('');


    $(function () {
        $('#sortable').sortable();
      });

  };
  
  formEL.on('submit', FormSubmit);

// pete's code  ends here


// Todo: create a function to generate a unique task id
function generateTaskId() {

   let bcid = "BCID" + Math.floor(Math.random() * 10000000);
   return bcid;
    
}

// Todo: create a function to create a task card
function createTaskCard(task) {



}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
