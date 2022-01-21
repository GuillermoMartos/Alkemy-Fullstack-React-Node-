const express = require('express');
const router = express.Router();
const {Abm}= require('../db')

router.get('/', (req, res)=>{
    let prueba=5
    let vas=Abm.findAll()
    res.json(vas)
})

module.exports = router ;