const express = require('express')

const db = require ('../data/dbConfig.js')

const router = express.Router()


router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(rows =>{
        res.status(200).json({Data: rows})
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'its all funky'})
    })
})


router.get('/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .first()
    .then(param =>{
        if(param){
             res.status(200).json({data: param})
        } else {
              res.status(404).json({errorMessage: 'Look ma a bird'})
        }
    })
    .catch(err =>{
        res.status(500).json({errorMessage: 'i made an oopsies'})
    })
})

router.post('/', (req,res) =>{
    db("accounts")
    .insert(req.body, 'id')
    .then(param => {
        res.status(201).json({results: param})
    })
    .catch(err =>{
        res.status(500).json({errorMessage: 'how many of these errors are necessary?'})
    })
})



router.put('/:id', (req, res) => {
    const changes = req.body

    db('accounts')
    .where({id: req.params.id})
    .update(changes)
    .then(count =>{
        if(count > 0){
            res.status(200).json({message: 'SUCCESSS'})
        } else{
            res.status(404).json({errorMessage: 'These are not the ids your looking for'})
        }
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'holy jesus this is a lot of error messages im running out of ideas'})
    })
})


router.delete('/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .del()
    .then(count =>{
        if(count > 0){
            res.status(200).json({message: 'SUCCESSS'})
        } else{
            res.status(404).json({errorMessage: 'almost like you copy pasted and it didnt work huh'})
        }
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'this is the final error message, signing off'})
    })
})





module.exports = router