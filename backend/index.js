const express= require('express');
const path= require('path')

require('dotenv').config();
// const cors=require('cors');
const todoroute =require('./route/todo_route')
require('./db');

const PORT= process.env.PORT||3000;
const app = express();
// app.use(cors());
app.use(express.static(path.join(__dirname,'frontend/dist')));


app.use(express.json());


app.get('/',(req,res)=>{
    res.send('hello');
})

app.use(todoroute)
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'frontend/dist/index.html')));
app.listen(PORT, '0.0.0.0',()=>{
    console.log(`server listening on: ${PORT}`)
});
