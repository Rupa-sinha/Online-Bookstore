const exp=require('express')
const sellerApi=exp.Router();
sellerApi.use(exp.json())
const bcryptjs =  require('bcryptjs')
const jwt = require('jsonwebtoken');

//register req
sellerApi.post('/createseller',async (req,res,next)=>{
    let sellerCollectionObject = req.app.get("sellerCollectionObject")

    //get user obj
    let newSeller = req.body;
    console.log("newSeller",newSeller)

    //search in db
    let seller= await sellerCollectionObject.findOne({username:newSeller.username})
   console.log("seller",seller)
    //if user already existed
    if(typeof seller!=="undefined")
    {
        res.send({message:"seller already existed"})
    }
    //if user not existed
    else{
        // hashed password
        let hashedPassword = await bcryptjs.hash(newSeller.password,7)
        newSeller.password=hashedPassword
        
        //insert
        await sellerCollectionObject.insertOne(newSeller)
            res.send({message:"seller acount created"})
    }

})


//login request
sellerApi.post("/login",async (req,res,next)=>{
    let sellerCollectionObject = req.app.get("sellerCollectionObject")
    let credentials = req.body;

    //search user
    let seller = await sellerCollectionObject.findOne({username:credentials.username})

    // invalid username
    if(typeof seller === 'undefined')
    {
        res.send({message:"invalid username"})
    }
    //if user existed
    else{
        //invalid password
        let result = await bcryptjs.compare(credentials.password,seller.password)
        if(result === false)
        {
            res.send({message:"invalid password"})
        }
        else{
            //get token
            delete seller.password;
            let token = await jwt.sign({username:credentials.username},"abcdef",{expiresIn:120}) 
            res.send({message:"login-success",
            token:token,
            username:credentials.username,
            userObj:seller
            
        })
        }
    }
})






















module.exports = sellerApi