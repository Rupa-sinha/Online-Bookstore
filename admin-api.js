//create mini express
const exp=require('express')
const adminApi=exp.Router();
adminApi.use(exp.json())

const jwt=require("jsonwebtoken")
//const expressErrorHandler=require("express-async-handler")

//login req
adminApi.post("/login", async(req,res,next)=>{
    let adminCollectionObject=req.app.get("adminCollectionObject")
    let credentials=req.body;
    let user=await adminCollectionObject.findOne({username:credentials.username})

    if(typeof user=== "undefined"){
        res.send({message:"invalid username"})
    }
    else{
       // let result=await bcryptjs.compare(credentials.password,user.password)
        if(user.password!== credentials.password){
            res.send({message:"Invalid password"})
        }
        
        else{
            delete user.password; 
            let token=await jwt.sign({username:credentials.username},'abcdef',{expiresIn:10})
            res.send({message:"login-success",
            token:token,
            username:credentials.username
            })
        }
    }
})







//export
module.exports=adminApi;