const express=require('express');
const Route = express.Router();
Route.post('/addUser',(req,res)=>{
         const json = req.body;
         const addCrud =require("../db/helpers/userCrud")
         addCrud.add(json,res);
})
Route.post('/joinUser',(req,res)=>{
    const json = req.body;
    const addCrud =require("../db/helpers/userCrud")
    addCrud.add(json,res);
})
Route.post('/messageUser',(req,res)=>{
    const json = req.body;
    const addCrud =require("../db/helpers/userCrud")
    addCrud.add(json,res);
})
module.exports=Route;