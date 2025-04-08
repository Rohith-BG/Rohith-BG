import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

export const checkDBConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connected')
    }
    catch(err){
        console.log('Error:',err);
    }
}
