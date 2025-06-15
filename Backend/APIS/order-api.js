//create mini express
const exp=require('express')
const orderApi=exp.Router();
orderApi.use(exp.json())


//post orders to order collection
orderApi.post("/addtoorder",async(req,res,next)=>{
    let  orderCollectionObject=req.app.get("orderCollectionObject")
      
     // let newOrder=JSON.parse(req.body.prodObj);
     let newOrder = req.body
     console.log("new order",newOrder)

    //find user in ordercollection
    let userInCart = await orderCollectionObject.findOne({username: newOrder.username})
     //console.log("user in cart",userInCart)
    let flag = 0
    //if user not existed in cart
    if(typeof userInCart === 'undefined'){
        //new usercartObject
        let products = [];
       // newOrder.prodObj.bookQuantity = 1
        products.push(newOrder.order)
        let newUserCartObject = {username: newOrder.username, products: products}

        //insert
        await orderCollectionObject.insertOne(newUserCartObject)
        res.send({message: "Book added to order"})
    }
    //if user already existed in cart
    else{
        userInCart.products.push(newOrder.order)
        //update
        await orderCollectionObject.updateOne({username: newOrder.username}, {$set:{...userInCart}})
        res.send({message: "Book added to return"})
    }
   })



//get oders details
orderApi.get('/getorder/:username',  async(req,res,next)=>{
    let  orderCollectionObject=req.app.get("orderCollectionObject")
    let loggedUser = req.params.username;
    
     //find user in usercartcollection
     let userCart = await orderCollectionObject.findOne({username: loggedUser})

     if(typeof userCart!== 'undefined'){
    
        res.send({message: userCart.products})
    }
    else{
        res.send({message: "Empty Cart"})
    }

})
//return order
orderApi.put('/return/:username/:bookid/:ind',async(req,res,next)=>{
    let orderCollectionObject = req.app.get("orderCollectionObject")
    //get logged in user
    let loggedUser=req.params.username;
    let bookid=req.params.bookid;
    let ind = re.params.ind;
    //find user in ordercollection
    let userCart=await orderCollectionObject.findOne({username:loggedUser})
    console.log("usercart",userCart)
    
    userCart.products[ind].forEach((book)=>{
        if(book._id===bookid){
                let i=userCart.products[ind].indexOf(book)
                userCart.products[ind].splice(i,1)
        } 
})
console.log("user cart final",userCart)
await orderCollectionObject.updateOne({username:userCart.username},{$set:{...userCart}})
        res.send({message:"Book Returned From Cart"})

})


















module.exports = orderApi