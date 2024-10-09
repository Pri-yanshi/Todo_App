import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'
import Todo from './component/Todo'
import { API_URL } from './config';



const App = () => {
  const[todos, setTodos]=useState([]);
  const[input, setInput]=useState("");
  const[upUI,setUpUI]=useState(false);
  const[error,setError]=useState(false);
  useEffect(()=>{
    ;(async()=>{
      try {
        setError(false)
        const response=await axios.get(API_URL)
        console.log(response.data);
        setTodos(response.data)
      } catch (error) {
        setError(true)
      }
    })()    
  },[upUI])
  const saveTodo= async()=>{
    try {
      setError(false)
      const result= await axios.post('/api/items',{text:input})
      console.log(result.data)
      setUpUI((prev)=>!prev)
      setInput('');

    } catch (error) {
      setError(true)
    }
  }

  // if(error){
  //   return <h1 className=' w-[250px] text-center font-bold relative top-[250px] left-[650px] border-b-2 '>! Opps Something went wrong</h1>
  // }
  return (
    <>
      <div className=' w-[700px] p-2 flex flex-col items-center absolute top-20 left-[400px]'>
        <h1 className=' text-xl font-bold mt-2 text-center'>ToDo App</h1>
        <div className=' flex m-[6px]'>
          <input onChange={(e)=>{setInput(e.target.value)}} className=' w-[450px] p-[5px] mr-[2px] focus:outline-none border-b-2 border-gray-900' type="text" value={input} placeholder='Add ToDos...'/>
          <button className=' w-[60px] cursor-pointer bg-black text-white rounded-t-md rounded-br-md' onClick={saveTodo}>Add</button>
        </div>
        <div>
          {todos.map((e)=> <Todo key={e._id} text={e.text} id={e._id} setUpUI={setUpUI}/>)}
        </div>
      </div>
    </>
  )
}

export default App


