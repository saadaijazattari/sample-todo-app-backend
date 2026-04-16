const Todo = require('../models/Todo');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    console.error('Get all error:', error);  // ✅ Add logging
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
};

// Get single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Get by id error:', error);  // ✅ Add logging
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
};

// Create new todo
exports.createTodo = async (req, res) => {
  try {
    console.log('Request body:', req.body);  // ✅ Debug log
    
    const { title, description } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false
    });

    console.log('Todo created:', todo);  // ✅ Debug log

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Create todo error:', error);  // ✅ Detailed logging
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todoId = req.params.id;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Update fields
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    
    // ✅ Remove this line - timestamps:true will handle it automatically
    // todo.updatedAt = Date.now();

    await todo.save();

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Update error:', error);  // ✅ Add logging
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: todo
    });
  } catch (error) {
    console.error('Delete error:', error);  // ✅ Add logging
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
};

// Toggle todo completion status
exports.toggleTodoStatus = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    todo.completed = !todo.completed;
    // ✅ Remove this line - timestamps:true will handle it automatically
    // todo.updatedAt = Date.now();
    await todo.save();

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Toggle error:', error);  // ✅ Add logging
    res.status(500).json({
      success: false,
      message: 'Error toggling todo status',
      error: error.message
    });
  }
};