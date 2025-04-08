import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();

const login = async (req,res)=>{
    const {username,password}=req.body;
    // console.log(req.body);
    if(!username || !password){
        return res.status(400).json({"Message":"Required fields are missing"});
    }
     try{
        const user =await User.findOne({username});
        if(!user){
            return res.status(404).json({"message":"User not found"})
        }
    
        const isUser =await bcrypt.compare(password,user.password);
        if(!isUser){
            return res.status(401).json({'messaage':'Invalid credentials'})
        }
    
        const token = jwt.sign(
            {username:user.username,
             role:user.role
            },
            process.env.JWT_SECRET,
            {expiresIn:'2h'}
    
        );
    
        res.status(200).json({'message':'Loginn Successful',token});
    
    }
    catch(err){
        res.status(500).json({'message':'Internal server error'});
    }
}

export default login ;