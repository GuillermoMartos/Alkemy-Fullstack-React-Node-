const express = require('express');
const router = express.Router();
const {Abm, User}= require('../db')



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

router.post('/log-in', async (req, res)=>{
    const {user, password} = req.body
    console.log("soy el user pass:")
    console.log(user+password)
    
    try{
        const rta = await User.findOne({
            where: {
                name: user
            }
        })
    
       
        // return res.status(200).json(rta[0].abms)
        return res.status(200).json(rta)
    } 
    catch(error){
        return res.status(505).json(error)
    }
})


router.post('/sign-up', async (req, res)=>{
    const {password,name} = req.body
    console.log("soy el password y name:" + name)
    console.log(password)
    

    try{
        const rta = await User.create({ name:name, password:password })
        return res.status(200).json(rta)
    } 
    catch(error){
        return res.status(505).json(error)
    }
})




router.post('/user', async (req, res)=>{
    const {user} = req.body
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
    
       
        // return res.status(200).json(rta[0].abms)
        return res.status(200).json(rta.filter(m=> m.abms))
    } 
    catch(error){
        return res.status(505).json(error)
    }
})

module.exports = router ;