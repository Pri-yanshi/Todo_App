const express= require('express');
const path= require('path')

require('dotenv').config();
// const cors=require('cors');
const todoroute =require('./route/todo_route')
require('./db');

const PORT= process.env.PORT||3000;
const app = express();
// app.use(cors());
app.use(express.static('dist'));


app.use(express.json());


app.get('/',(req,res)=>{
    res.send('hello');
})

app.use(todoroute)

app.listen(PORT,()=>{
    console.log(`server listening on: ${PORT}`)
});
