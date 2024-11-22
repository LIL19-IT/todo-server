const User = require('../models/User');
const Todo = require('../models/Todo');

const all = async (req, res) => {
    try {
        const todos = await Todo.find({ userID: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching todos',
        })
    }
};

const add = async (req, res) => {
    const { title } = req.body;

    if(!title) {
        return res.status(400).json({
            message: 'Please fill in the required fields',
        })
    }

    try {
        const todo = new Todo({ title, userID: req.user._id });
        await todo.save();

        await User.findByIdAndUpdate(req.user._id, {
            $push: { createdTodos: todo._id },
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating todo',
        })
    }
};

const edit = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: 'Todo not found',
            });
        }

        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating todo status',
        })        
    }
};

const remove = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Todo deleted',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting todo',
        })
    }
};

module.exports = {
    all,
    add,
    edit,
    remove,
}