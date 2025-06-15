//import express
const exp=require('express')
const app=exp();


//import userApi
const userApi = require('./APIS/user-api')
const adminApi = require('./APIS/admin-api')
const productApi = require('./APIS/product-api')
const orderApi = require('./APIS/order-api')
const sellerApi = require('./APIS/seller-api')
//const path = require("path")

//coonection build of react with current server
//app.use(exp.static(path.join(__dirname,"./build/")))

//execute api based on path
app.use('/user',userApi)
app.use('/admin',adminApi)
app.use('/product',productApi)
app.use('/order',orderApi)
app.use('/seller',sellerApi)


//db connection url
let dburl= "mongodb+srv://pragya:pragya@cluster0.relg8.mongodb.net/projectdb?retryWrites=true&w=majority"

//import mongo client
let mongoClient = require('mongodb').MongoClient;
//const sellerApi = require('./APIS/seller-api');


//connect with mongodb
 mongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{

    if(err)
    {
        console.log("err in db connection",err)
    }

    else{
        //create database object
       let  databaseobject = client.db("projectdb")
       //create collection object
       let userCollectionObject = databaseobject.collection("usercollection")
       let adminCollectionObject = databaseobject.collection("admincollection")
       let productCollectionObject = databaseobject.collection("productcollection")
       let userCartCollectionObject = databaseobject.collection("usercartcollection")
       let orderCollectionObject = databaseobject.collection("ordercollection")
       let sellerCollectionObject = databaseobject.collection("sellercollection")

       //sharing collection object
       app.set("userCollectionObject",userCollectionObject)
       app.set("adminCollectionObject",adminCollectionObject)
       app.set("productCollectionObject",productCollectionObject)
       app.set("userCartCollectionObject",userCartCollectionObject)
       app.set("orderCollectionObject",orderCollectionObject)  
       app.set("sellerCollectionObject",sellerCollectionObject)


        console.log("db connection")
    }
 })









 
 






// port no
const port=4000;
app.listen(port,()=>console.log("server is listening to port 3000"))