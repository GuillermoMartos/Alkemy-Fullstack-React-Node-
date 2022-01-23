const express = require('express');
const router = express.Router();
const {Abm, User}= require('../db')

router.get('/:user', async (req, res)=>{
    const {user} = req.params.user
    console.log("soy el user:")
    console.log(user)
    
    try{
        const rta = await User.findAll({
            where: {
                name: user
            },
            include:{
                model:Abm,
                attributes:['concept', 'amount', 'date', 'type'],
                through:{attributes:[]}
            }
        })
    
       
        return res.json(rta)
    } 
    catch(error){
        return res.json({error:error})
    }
})


router.post('/create', async (req, res)=>{
    const {user, concept, amount, date, type} = req.body
    
    try{
        await User.create({
            name:user,
            password:user
        })

        const findUser=await User.findOne({
        where:{
            name:user
        }
        })
        
        const newAbm = await Abm.create({concept, amount, date, type,})

        await findUser.setAbms(newAbm);
        return res.json({res:"success"})
    }
    catch(error){
        console.log(error)
        return res.status(505).json({res:"fail", txt:error})
    }

   
    
})

module.exports = router ;