# <Bread Crumbs Kanban Task Manager>

## Description

This project has been created with the intention of providing a tool for task management specific to agile kanban style development. The project's title is a reference to the story of Hansel and Gretel and their proverbial trail of bread crumbs intended to lead them out of the woods. This task manager is designed for getting anyone out of the woods in the agile kanban fashion!         

## Table of Contents

- [Usage](#usage)
- [Credits](#credits)
- [Tests](#Tests)

## Link to Website
https://petecodes4u.github.io/breadCrumbTasks/

## Usage

The intended usage of this application is to list tasks with movable task cards that can be applied to swim lanes for 'to do', 'in progress', and 'done' with the purpose of assisting users by visually organizing tasks. 

![](./assets/images/breadCrumbs2.gif)

## Features

- User form with inputs for task name, finish date, and task description.
- User form validation - a user is required to enter a task name and finish date, the task description is optional.
- User form data is storred in  the browser localStorage using JSON.
- Movable task cards with color coordination for tasks based on finish date (pink/red for past due, yello/orange for due today and blue/purple for due in the future).
- Swim lanes for To Do, In Progress and Done.
- When a user moves a task to the Done swim lane, the task card will be rendered in blue/purple. 

## Tests
 
 **Feature - User form**
 
 **GIVEN :** the webpage loads successfully.
 
 **WHEN :** the app loads.
 
 **THEN :** a landing page containing containing swim lanes for to do, in progress and done with 'Add Task' button.

##

 **Feature - User form**

 **GIVEN :** the webpage loads successfully.  
 
 **WHEN :** the user clicks the Add Task button.
 
 **THEN :** the user form is rendered with fields for Task title, Finish Date and Description. 

##

 **Features - User Form**

 **GIVEN :** The user form is populated with a task title and finish date.
 
 **WHEN :** the user clicks the Add Crumb! button.
 
 **THEN :** the task is rendered in the to do swim lane.

##

 **Feature - User Form**

 **GIVEN :** the user form is NOT populated with title and finish date data
 
 **WHEN :** the user clicks the Add Crumb! button.
 
 **THEN :**  the user recieves a pop up alert prompting completion of the form and the task is not generated in the to do swim lane.

##

 **Feature - Bread Crumbs Task Board**

 **GIVEN :** the page is loaded successfully.
 
 **WHEN :** there are tasks present.
 
 **THEN :**  the user can move the task to te desired swim lane.

 ##

 **Feature - Bread Crumbs Task Cards**

 **GIVEN :** the task finish date is earlier than today's date.
 
 **WHEN :** the user clicks the Add Crumb! button.
 
 **THEN :** The task card is rendered in a pink/red gradient.

 ##

 **Feature - Bread Crumbs Task Cards**

 **GIVEN :** the task finish date is on today's date.
 
 **WHEN :** the user clicks the Add Crumb! button.
 
 **THEN :** The task card is rendered in a yellow/orange gradient.
 

##

**Feature - Bread Crumbs Task Cards**

 **GIVEN :** the task finish date is on greater than today's date.
 
 **WHEN :** the user clicks the Add Crumb! button.
 
 **THEN :** The task card is rendered in a blue/purple gradient.

##

**Feature - Bread Crumbs Task Cards**

 **GIVEN :** the task is in a swim lane other than done.
 
 **WHEN :** the user moves the task card to the done lane.
 
 **THEN :** The task card is rendered in a blue/purple gradient.

##

 **Feature - Bread Crumbs Task Cards**

 **GIVEN :** the task is in the done lane.
 
 **WHEN :** the user moves the task card out of the done lane.
 
 **THEN :** The task card is rendered in a color scheme respective to the finish date.


