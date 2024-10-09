import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineCancel } from "react-icons/md";
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';
import { API_URL } from '../config';

const Todo = ({text , id , setUpUI, }) => {
   const[isEdit, setIsEdit]=useState(false);
   const[newItem,setNewItem]=useState(text);
   const[originalText, setOriginalText]=useState(text);
    const deleteTodo=async()=>{
        try {
           const result=await axios.delete(`${API_URL}/${id}`,) 
           console.log(result)
           if(result.status===200|| result.status===204){
            setUpUI((prev)=>!prev)
           }     
        } catch (error) {
            console.log("Failed to delete the todo item:",error);   
        }
    }
    const updateTodo = async()=>{
      try{
         const data= await axios.put(`${API_URL}/${id}`,{text:newItem})
         console.log(data)
         if(data.status===200){
            setIsEdit(false);
            setOriginalText(newItem);
            setUpUI((prev)=>!prev)
         }
        
      }
      catch(error){
         console.log("Failed to update due to:",error)
      }
    }
    const CancelItem=()=>{
      setIsEdit(false);
      setNewItem(originalText); 
    }
    
  return (
    <>
       <div className=' w-[580px] mt-4 bg-black text-white rounded p-4 flex items-center justify-between'>
         {isEdit ?(
            <>
            <div className=' flex m-[6px]'>
              <input onChange={(e)=>{setNewItem(e.target.value)}} className=' w-[410px] p-[5px] text-black mr-[2px] focus:outline-none border-b-2 border-gray-900' type="text" value={newItem} placeholder='Edit Item...'/>
              <button className=' w-[60px] cursor-pointer bg-slate-800 text-white rounded-t-md rounded-br-md' onClick={updateTodo}>Save</button>
           </div>
           <div className=' p-[3px] text-[19px] '>
             <MdOutlineCancel onClick={CancelItem} />
           </div>
            </>
         ):(
         <>
           <div className=' text-white'>{text}</div>
         </>
         )}
           <div className=' flex gap-2 cursor-pointer text-[20px]'>
             < BiEdit className={isEdit?'hidden':""} onClick={()=>{setIsEdit(!isEdit)}}/>
             <AiFillDelete onClick={deleteTodo}/>
           </div>
       </div>
    </>
  )
}

export default Todo
