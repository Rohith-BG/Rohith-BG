import changePassword from "../controllers/resetPassword.js";
import express from 'express'
const router = express.Router();

router.patch('/password',changePassword);

export default router