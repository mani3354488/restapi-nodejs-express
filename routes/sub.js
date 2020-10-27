const express = require('express')
const router = express.Router()

//getting all subs
router.get('/', (req, res) => {
    res.send('Hello World')
})

//getting one sub
router.get('/:id', (req, res) => {
    
})

//creating a sub
router.post('/', (req, res) => {
    
})

//updating a sub
router.patch('/', (req, res) => {
    
})

//deleting a sub
router.delete('/:id', (req, res) => {
    
})

module.exports = router