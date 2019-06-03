const Usermodel = require("../models/schema");

const userOperation ={
    add(object,res){
        Usermodel.create(object,(err)=>{
           if(err){
               console.log("Data is not added due to ", err);
           }
           else{
               console.log("user added suucessfully",res);
           }
        })
    },
   
}

module.exports=userOperation;
