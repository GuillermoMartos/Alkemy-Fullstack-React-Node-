const express = require('express');
const router = express.Router();
const {Abm, User}= require('../db')

router.get('/', async (req, res)=>{
    // const{price}=(req.body)
    
    // let prueba=await Abm.create({
    //     concept:"pago auto",
    //     date:new Date(),
    //     amount:price,
    //     type:"out"
    // })
    
    // const user=await User.findCreateFind( {
    //     where:{name:"Rob"},
    //     defaults:{name:"Rob",
    //     password:"asd123"},
    // })

    // const user=await User.create({
    //     name:"Rob",
    //     password:"asd123"
    // })
        
    // await prueba.setUsers(user);
    
    const rta = await Abm.findAll({
        where: {
            type: "out"
        },
        include:{
            model:User,
            attributes:['name'],
            through:{attributes:[]}
        }
    })

   
    res.json(rta)
})

module.exports = router ;