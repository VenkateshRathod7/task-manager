// taskRoutes.js
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');  // Import the authentication middleware
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// Get tasks (protected route)
router.get('/', authenticateJWT, getTasks);

// Create a new task (protected route)
router.post('/', authenticateJWT, createTask);

// Update a task (protected route)
router.put('/', authenticateJWT, updateTask);

// Delete a task (protected route)
router.delete('/:id', authenticateJWT, deleteTask);

module.exports = router;
