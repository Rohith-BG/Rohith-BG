import express from 'express'
import newUser from '../controllers/createUser.js'

const router = express.Router();

router.post('/createUser',newUser);

export default router;