const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();
const port = 8080;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to enable HTTP method overrides (e.g., PUT and DELETE in forms)
app.use(methodOverride("_method"));

// Set EJS as the templating engine and configure views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Path to the JSON file storing tasks
const tasksFilePath = path.join(__dirname, "tasks.json");

// Helper function to read tasks from the JSON file
function readTasks() {
    // Read and parse the JSON file to return an array of tasks
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    return JSON.parse(data);
}

// Helper function to write tasks to the JSON file
function writeTasks(tasks) {
    // Convert the tasks array to a JSON string and save it to the file
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Route to display the list of all tasks
app.get("/tasks", (req, res) => {
    const tasks = readTasks(); // Fetch tasks from the JSON file
    res.render("index.ejs", { tasks }); // Render the 'index.ejs' template with the tasks data
});

// Route to display the form for adding a new task
app.get("/tasks/new", (req, res) => {
    res.render("new.ejs"); // Render the 'new.ejs' template
});

// Route to handle form submission for creating a new task
app.post("/tasks", (req, res) => {
    const { Title, Description, Status } = req.body; // Extract task details from the form
    const id = uuidv4(); // Generate a unique ID for the task
    const tasks = readTasks(); // Fetch the current tasks
    tasks.push({ id, Title, Description, Status }); // Add the new task to the array
    writeTasks(tasks); // Save the updated tasks array to the JSON file
    res.redirect("/tasks"); // Redirect to the tasks list
});

// Route to display a single task's details
app.get("/tasks/:id", (req, res) => {
    const { id } = req.params; // Extract task ID from the URL
    const tasks = readTasks(); // Fetch tasks from the JSON file
    const task = tasks.find((t) => t.id === id); // Find the task by ID
    res.render("show.ejs", { task }); // Render the 'show.ejs' template with the task data
});

// Route to display the form for editing a specific task
app.get("/tasks/:id/edit", (req, res) => {
    const { id } = req.params; // Extract task ID from the URL
    const tasks = readTasks(); // Fetch tasks from the JSON file
    const task = tasks.find((t) => t.id === id); // Find the task by ID
    res.render("edit.ejs", { task }); // Render the 'edit.ejs' template with the task data
});

// Route to handle form submission for updating a task's status
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params; // Extract task ID from the URL
    const { Status } = req.body; // Extract the new status from the form
    const tasks = readTasks(); // Fetch tasks from the JSON file
    const task = tasks.find((t) => t.id === id); // Find the task by ID
    if (task) {
        task.Status = Status; // Update the task's status
        writeTasks(tasks); // Save the updated tasks array to the JSON file
    }
    res.redirect("/tasks"); // Redirect to the tasks list
});

// Route to handle the deletion of a task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params; // Extract task ID from the URL
    let tasks = readTasks(); // Fetch tasks from the JSON file
    tasks = tasks.filter((t) => t.id !== id); // Remove the task with the specified ID
    writeTasks(tasks); // Save the updated tasks array to the JSON file
    res.redirect("/tasks"); // Redirect to the tasks list
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
