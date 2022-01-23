const express = require('express');
const router = express.Router();
const {Abm, User}= require('../db')

router.get('/:user', async (req, res)=>{
    const {user} = req.query.user
    console.log("soy el user:")
    console.log(user)
    
    try{
        const rta = await User.findAll({
            where: {
                name: "Rob"
            },
            include:{
                model:Abm,
                attributes:['concept', 'amount', 'date', 'type'],
                through:{attributes:[]}
            }
        })
    
       
        // return res.status(200).json(rta[0].abms)
        return res.status(200).json(rta.filter(m=> m.abms))
    } 
    catch(error){
        return res.status(505).json(error)
    }
})


router.post('/create', async (req, res)=>{
    const {user, concept, amount, date, type} = req.body
    
    try{
        // await User.create({
        //     name:user,
        //     password:user
        // })

        const findUser=await User.findOne({
        where:{
            name:user
        }
        })
        
        const newAbm = await Abm.create({concept, amount, date, type,})

        await newAbm.setUsers(findUser);
        return res.json({res:"success"})
    }
    catch(error){
        console.log(error)
        return res.status(505).json({res:"fail", txt:error})
    }

   
    
})

module.exports = router ;