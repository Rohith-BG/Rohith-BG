import express from 'express'
import cors from 'cors'
const app=express();
import createUser from './routes/user.js'
import login from './routes/login.js'
import verify from '../middlewares/verifyMiddleware.js'
import User from './models/user.js'
import healthRoute from './routes/healthRoute.js'
// import rollBased from '../middlewares/rbac.js';
// import password from '../src/routes/password.js';
// middleware to parse the data
app.use(express.json());
app.use(cors());
app.use('/signUp',createUser);
app.use('/login',login);
app.use('/api/user',healthRoute);


// app.use('/api/user',verify,password);


app.get('/', (req, res) => {
    res.send('Server is live!');
});
  


export default app ;
