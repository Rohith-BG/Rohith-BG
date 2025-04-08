 const rollBased = (...roles)=>{

    return (req,res,next)=>{
        const role = req.user.role;
        if(!roles.includes(role)){
           return res.status(403).json({'Message':'Unauthorize to access'})
        }
        next();
    }

}
export default rollBased;

