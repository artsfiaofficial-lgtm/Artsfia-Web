import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try{
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]; 
    if(!token){
        res.status(401).json({message : "No token"})
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()    
}
    catch{
        res.status(401).json({message : "Unauthorized"})
    }
}

export default auth