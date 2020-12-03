const router = require('express').Router();
const verify = require('../middleware/verifyToken')
const Todo = require('../model/Todo');
const User = require('../model/User');

router.post('/createTodo', verify, async (req, res) => { 
    
    const todo = new Todo({
        todo: req.body.todo,
        user_id: req.user
    })

    try {
        const savedTodo = await todo.save()
        res.send(savedTodo)
    }
    catch (err) { 
        res.status(400).send('Error adding todo')
    }

})


router.get('/user', verify, async (req, res) => {
    
    user = await User.find({ _id: req.user })
    return res.status(200).send(user)
    
})


router.get('/myTodos', verify, async (req, res) => { 
    
    todos = await Todo.find({ user_id: req.user })
    return res.status(200).send(todos)

})

router.get('/todo/:id', verify, async (req, res) => { 

    todo = await Todo.find(
        {
            _id: req.params.id
        })

    if (!todo) {
        return res.status(200).send('No todos found')
    }
    else if (todo[0].user_id != req.user._id ) { 
        return res.status(200).send('this todo doesnt belongs to you')
    }
    else { 
        return res.status(200).send(todo)
    }

})


router.get('/todos', verify, async (req, res) => { 
    
    todo = await Todo.find()

    if (!todo) {
        return res.status(200).send('No Todos')
    }
    else { 
        return res.status(200).send(todo)
    }

})

router.delete('/deleteTodo/:id', verify, async (req, res) => {
    
    try { 

        const removePost = await Todo.remove({ _id: req.params.id })
        return res.status(200).json({
            message: 'Todo deleted successfully'
        })

    } catch (err) {
        
        res.status(500).json({ error: err })
    
    }
        
})

router.put('/updateTodo/:id', verify, async (req, res) => { 

    const validTodo = await Todo.find({ _id: req.params.id })
    
    if (validTodo[0].user_id != req.user._id) { 
        return res.status(201).json({message: 'This todo is not yours'})
    }
    
    const newValues = { $set: { todo: req.body.todo }}

    try {
        const updatedTodo = await Todo.updateOne({ _id: req.params.id }, newValues)

        return res.status(200).json({message: 'updated successfully'})
    } catch (err) { 

        res.status(500).json({ error: err })

    }

})

module.exports = router;