import jwt from "jsonwebtoken";

export const authMiddleware = (req,resp,next) =>{
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return resp.status(401).json({message:"Access denied!"});

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded ;
        next();
    }catch(error){
        resp.status(403).json({message:"Invalid token !"});
    }
};