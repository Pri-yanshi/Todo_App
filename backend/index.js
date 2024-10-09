const express= require('express');

require('dotenv').config();
const cors=require('cors');
const todoroute =require('./route/todo_route')
require('./db');

const PORT= process.env.PORT||4000;
const app = express();
app.use(cors({
    origin:  'https://todo-app-1-6qy9.onrender.com'
}));

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('hello');
})

app.use('/api',todoroute)

app.listen(PORT,()=>{
    console.log(`server listening on: ${PORT}`)
});
