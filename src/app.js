import express from 'express'
import cors from 'cors'
const app=express();
import createUser from './routes/user.js'
import login from './routes/login.js'
import verify from '../middlewares/verifyMiddleware.js';
import User from './models/user.js'
import rollBased from '../middlewares/rbac.js';
import password from '../src/routes/password.js';
// middleware to parse the data
app.use(express.json());
app.use(cors());
app.use('/signUp',createUser);
app.use('/login',login);
app.use('/api/user',verify,password);

app.get('/',verify,rollBased('admin'),async (req,res)=>{
    try{
        // console.log('hi');
        const users = await User.find();
        res.status(200).json({"All users":users})
    }catch(err){
        res.status(500).json({'message':res.message})
    }
})
app.get('/',(err,req,res)=>{
    return res.status(500).json({'error':err.stack})
})


export default app ;