const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//getting all subs
router.get('/', getSubscriber, async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//getting one sub
router.get('/:id', getSubscriber, (req, res) => {
   res.send(res.subscriber) 
})

//creating a sub
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//updating a sub
router.patch('/', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null ) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message })
    }
})

//deleting a sub
router.delete('/:id', getSubscriber, async (req, res) => {
    try{
        await res.subscriber.remove()
        res.json({ message: 'deleted' })
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({message: 'cannot find sub'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router