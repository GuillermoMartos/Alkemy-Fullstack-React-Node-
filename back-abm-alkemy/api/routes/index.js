const express = require('express');
const router = express.Router();
const {Abm, User}= require('../db')

router.get('/', async (req, res)=>{
    const{price}=(req.body)
    
    let prueba=await Abm.create({
        concept:"pago auto",
        date:new Date(),
        amount:price,
        type:"out"
    })
    
    const user=await User.create({
        name:"Juan",
        password:"asd123"
    })
    
    await prueba.setUsers(user);
    
    const rta = await User.findAll({
        where: {
            name: "Juan"
        },
        include:{
            model:User,
            attributes:['concept','date','amount','type'],
            through:{attributes:[]}
        }
    })

   
    res.json(rta)
})

module.exports = router ;