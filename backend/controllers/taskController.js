// taskController.js
const db = require('./db');

const getTasks = (req, res) => {
    db.all("SELECT * FROM tasks WHERE userId = ?", [req.user.id], (err, tasks) => {
        if (err) return res.status(500).send("Error fetching tasks");
        res.json(tasks);
    });
};

const createTask = (req, res) => {
    const { title, description, status } = req.body;
    
    db.run("INSERT INTO tasks (userId, title, description, status) VALUES (?, ?, ?, ?)", 
        [req.user.id, title, description, status], function(err) {
            if (err) return res.status(500).send("Error creating task");
            res.status(201).json({ id: this.lastID, title, description, status });
    });
};

const updateTask = (req, res) => {
    const { id, status } = req.body;
    
    db.run("UPDATE tasks SET status = ? WHERE id = ? AND userId = ?", [status, id, req.user.id], function(err) {
        if (err) return res.status(500).send("Error updating task");
        res.send("Task updated successfully");
    });
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    
    db.run("DELETE FROM tasks WHERE id = ? AND userId = ?", [id, req.user.id], function(err) {
        if (err) return res.status(500).send("Error deleting task");
        res.send("Task deleted successfully");
    });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
