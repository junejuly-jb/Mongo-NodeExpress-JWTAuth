const router = require('express').Router();
const verify = require('../middleware/verifyToken')

router.get('/todos', verify, (req, res) => { 
    res.send(req.user)
})

module.exports = router;