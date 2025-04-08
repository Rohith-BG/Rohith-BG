import  User  from "../models/user.js";

const newUser = async (req,res)=>{
    try{
        const {username,password,email,role}=req.body
        // console.log(req.body);
        if(!username || !password){
            return res.status(400).json({'message':'Required fields are missing'})
        }
        const user = new User({username,password,email,role})
        await user.save();
        res.status(201).json({'User created':user})
        
    }catch(err){
        console.log(err.stack);
        res.status(500).json({'message':`User is not created`})
    }
}
export default newUser;