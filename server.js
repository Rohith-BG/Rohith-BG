import { app } from './src/app.js';
import { checkDBConnection } from './src/config/db_connection.js'

checkDBConnection();

app.listen(process.env.PORT,()=>{
    console.log('server is running')
})