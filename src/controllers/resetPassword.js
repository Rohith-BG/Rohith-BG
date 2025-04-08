import User from "../models/user.js";

import bcrypt from 'bcrypt'

const changePassword = async (req,res)=>{
    const {oldPassword,newPassword}=req.body;

    if(!oldPassword || !newPassword){
        return res.status(400).json({"message":"Required fields are missing"})
    }

    try{
        console.log(req.user.username);
        const user = await User.findOne({username:req.user.username});
        console.log(user);

        if(!user){
            return res.status(404).json({'message':'User with this password is not present'})
        }

        const isMatch = await bcrypt.compare(oldPassword,user.password)

        if(!isMatch){
            return res.status(401).json({'message':'Incorrect password'});
        }
        
        user.password=newPassword;
        await user.save();
        res.status(200).json({'message':"new password updated"})

    }
    catch(err){
        console.log(err.stack);
       return  res.status(500).json({'message':'Internal server error'});
    }

}

export default changePassword;