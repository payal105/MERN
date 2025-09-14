import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.json({success:false,message:"Unauthorized Access"})
    }

    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.userId = tokenDecode.id;
        }
        else{
            return res.json({success:false,message:"Unauthorized Access"})
        }
        next(); // Excecute controller function if token is valid

    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}

export default authUser;