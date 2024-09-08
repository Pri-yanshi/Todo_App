const express = require("express");
const router=express.Router();
const todoModel = require('./../models/todoModel');


router.post('/items',async(req,res)=>{
    try{
        const todo= new todoModel(req.body);
        let result = await todo.save();
        res.status(200).json(result);
    }
    catch(error){
      res.status(500).json({message:'an error occured', error:error.message});

    }
})
// read the data
router.get('/items',async(req,res)=>{
    try{
        let items= await todoModel.find();
        if(items.length>0)
           res.status(200).json(items);
    }
    catch(error){
        res.status(500).json({message:'item not found',error:error.message})
    }
})
// read the prticular data
router.get('/items/:id',async(req,res)=>{
    try{
        let items= await todoModel.find({_id:req.params.id});
        if(items.length>0)
           res.status(200).json(items);
    }
    catch(error){
        res.status(500).json({message:'item not found',error:error.message})
    }
})
//  delete the data
router.delete('/items/:id',async(req,res)=>{
    const{id}=req.params
    try{
        let items= await todoModel.findByIdAndDelete(id);
        if(!items){
            return res.status(404).send({ message: 'Item not found' })
        }
        res.status(200).send({ message: 'Item deleted successfully' });

    }
    catch(error){
        res.status(500).json({message:'item not found',error:error.message})
    }
})

// //Update the data

router.put('/items/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;
        const updateItem=req.body;
        let result = await todoModel.findByIdAndUpdate(itemId,updateItem,{new:true, runValidators:true});
        if(!result){
            return res.status(404).json({message: 'data not found'})
        }
           res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message:'item not found for update',error:error.message})
    }
})

module.exports=router