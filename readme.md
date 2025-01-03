# Todo List Project

This is a simple **Todo List** application built with **Node.js**, **Express**, and **EJS** for dynamic rendering. It allows users to create, view, edit, and delete tasks. The data is stored in a **JSON file** (`tasks.json`) for simplicity. This project demonstrates the basic functionality of a task management system.

## Features

- Create new tasks with titles, descriptions, and status.
- View task details.
- Edit the status of existing tasks.
- Delete tasks.
- User-friendly interface with task details displayed horizontally.
- Responsive design for mobile and desktop.

## Technologies Used

- **Node.js** and **Express** for the backend.
- **EJS** for rendering dynamic views.
- **CSS** for styling and creating a responsive layout.
- **JSON** file (`tasks.json`) to persist task data.

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (preferably the latest stable version)
- **npm** (Node Package Manager)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/jainkhushi3/todolist.git
   cd todolist
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Create a `tasks.json` file in the root directory (if not already created) to store tasks. Here's an example of the file structure:

   ```json
   [
     {
       "id": "uuid-1",
       "Title": "Task 1",
       "Description": "This is task 1",
       "Status": "Pending"
     },
     {
       "id": "uuid-2",
       "Title": "Task 2",
       "Description": "This is task 2",
       "Status": "In Progress"
     }
   ]
   ```

4. Start the application:

   ```bash
   nodemon index.js
   ```

   The application should now be running at `http://localhost:8080`.

## File Structure

```
/todolist
|── /node_modules
├── /public                  # Folder for static assets (CSS, images, etc.)
│   └── style1.css
|   └── style.css          # Stylesheet for the frontend
│
├── /views                   # Folder for EJS views
│   ├── index.ejs            # View for displaying all tasks
│   ├── new.ejs              # View for creating new tasks
│   ├── edit.ejs             # View for editing tasks
│   ├── show.ejs             # View for displaying task details
│
├── tasks.json               # JSON file storing task data
├── index.js                   # Main server file
├── package.json             # Project dependencies and scripts
└── README.md                # Project README file
```

## How to Use

1. **Home Page** (`/tasks`): Displays all the tasks in the list. Tasks are displayed with options to view details, edit, or delete them.
   
2. **Create New Task** (`/tasks/new`): A form to create a new task by providing a title, description, and status.
   
3. **Task Details** (`/tasks/:id`): View more information about a specific task by clicking on "See in Detail."
   
4. **Edit Task** (`/tasks/:id/edit`): Edit the status of an existing task (Pending, In Progress, Completed).

5. **Delete Task**: Delete a task by clicking the "Delete Task" button.

## Example of Task Detail View

Here is a screenshot of how a task looks when viewed in detail:

- **Title**: Task 1
- **Description**: This is task 1
- **Status**: Pending

### Edit Task Example

- Users can change the status of a task (Pending, In Progress, Completed) using a dropdown in the Edit page.