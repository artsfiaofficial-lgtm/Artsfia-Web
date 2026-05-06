import express from 'express'
import jwt from 'jsonwebtoken'
const route = express.Router()

route.post('/identify', (req, res)=>{
    const {email, password} = req.body 
    if(email === process.env.AUTH_EMAIL && password === process.env.AUTH_PASSWORD){
        const token = jwt.sign(
            {email},
            process.env.JWT_SECRET,
            {expiresIn : '1d'}
        )
        res.status(200).json({token})
    }
    else{
        res.status(401).json({message : "Unauthorized"})
    }
})

export default route