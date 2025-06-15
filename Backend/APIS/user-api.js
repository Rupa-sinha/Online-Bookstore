// import mini express
const exp=require('express')
const userApi=exp.Router();
userApi.use(exp.json())
const bcryptjs =  require('bcryptjs')
const jwt = require('jsonwebtoken');
const productApi = require('./product-api');
const Razorpay = require('razorpay')
const shortid = require('shortid')
var ObjectID  = require('mongodb').ObjectId;

const razorpay = new Razorpay({
	key_id: 'rzp_test_vnRjGBqLgiLmim',
	key_secret: 'X60VOORp2h1nMJqvHiHCQatg'
})

//payment gateway
userApi.post('/razorpay/:username', async (req, res) => {
    let userCartCollectionObject = req.app.get("userCartCollectionObject")
    let loggedUser = req.params.username;

    let totalPrice = 0


    //find user in usercartcollection
    let userCart = await userCartCollectionObject.findOne({username: loggedUser})
    if(userCart!== null){
        userCart.products.forEach((book)=>{
            totalPrice=totalPrice+(parseInt(book.price)*parseInt(book.bookQuantity))
        })
        //res.send({message:"total price is", totalPrice: totalPrice})
        const payment_capture = 1
	    const amount =totalPrice
       // console.log("amount is",amount)
	    const currency = 'INR'

	   const options = {
		   amount: amount*100,
           
           

           
		   currency,
		   receipt: shortid.generate(),
		   payment_capture
    	}

	try {
		const response = await razorpay.orders.create(options)
		//console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	   } catch (error) {
		console.log(error)
	}
}
    
 else{
        res.send({message: "Empty Cart"})
    }

	
})




//post request
userApi.post('/createuser',async (req,res,next)=>{
    let userCollectionObject = req.app.get("userCollectionObject")

    //get user obj
    let newUser = req.body;
   // console.log("newUser",newUser)

    //search in db
    let user= await userCollectionObject.findOne({username:newUser.username})

    //if user already existed
    if(typeof user!== 'undefined')
    {
        res.send({message:"user already existed"})
    }
    //if user not existed
    else{
        // hashed password
        let hashedPassword = await bcryptjs.hash(newUser.password,7)
        newUser.password=hashedPassword
        
        //insert
        await userCollectionObject.insertOne(newUser)
            res.send({message:"user created"})
    }

})


//login request
userApi.post("/login",async (req,res,next)=>{
    let userCollectionObject = req.app.get("userCollectionObject")
    let credentials = req.body;

    //search user
    let user = await userCollectionObject.findOne({username:credentials.username})

    // invalid username
    if(typeof user=== 'undefined')
    {
        res.send({message:"invalid username"})
    }
    //if user existed
    else{
        //invalid password
        let result = await bcryptjs.compare(credentials.password,user.password)
        if(result === false)
        {
            res.send({message:"invalid password"})
        }
        else{
            //get token
            delete user.password;
            let token = await jwt.sign({username:credentials.username},"abcdef",{expiresIn:120}) 
            res.send({message:"login-success",
            token:token,
            username:credentials.username,
            userObj:user
            
        })
        }
    }
})


// //add to cart
// userApi.post('/addtocart',async(req,res,next)=>{
//     let userCartCollectionObject = req.app.get("userCartCollectionObject")

//     //get user cart obj
//     let userCartObj = req.body;

//     //serach user in usercartcollection
//     let userInCart = await userCartCollectionObject.findOne({username:userCartObj.username})

//     //if user not existed
//     if(userInCart === null)
//     {
//         //create new usercart obj
//         let products = [];
//         products.push(userCartObj.prodObj)
//         let newUserCartObj = {username:userCartObj.username, products:products}

//         //insert
//         await userCartCollectionObject.insertOne(newUserCartObj)
//         res.send({message:"product added to cart"})
//     }
//     //if user already existed
//     else{

//         userInCart.products.push(userCartObj.prodObj)
//         //update
//         await userCartCollectionObject.updateOne({username:userCartObj.username},{$set:{...userInCart}})
//         res.send({message:"product added to cart"})
//     }
// })


//add to cart
userApi.post("/addtocart", async(req,res,next)=>{
    let userCartCollectionObject = req.app.get("userCartCollectionObject")

    //get user cart obj
    let userCartObj = req.body;
 //console.log("usercartobj",userCartObj)
    //find user in usercartcollection
    let userInCart = await userCartCollectionObject.findOne({username: userCartObj.username})
     //console.log("user in cart",userInCart)
     //console.log("userInCart",userInCart)
    let flag = 0
    //if user not existed in cart
    if(typeof userInCart === "undefined"){
        //new usercartObject
        let products = [];
        userCartObj.prodObj.bookQuantity = 1
        products.push(userCartObj.prodObj)
        let newUserCartObject = {username: userCartObj.username, products: products}

        //insert
        await userCartCollectionObject.insertOne(newUserCartObject)
        res.send({message: "Book added to cart", bookCnt: 1})
    }
    //if user already existed in cart
    else{
        userInCart.products.forEach((book) => {
            if(book._id === userCartObj.prodObj._id){
                book.bookQuantity = book.bookQuantity + 1
                flag = 1
            }
        })
        if(flag === 0){
            userCartObj.prodObj.bookQuantity = 1
            userInCart.products.push(userCartObj.prodObj)
        }
        let bookCnt = 0
        userInCart.products.forEach((book)=>{
            bookCnt = bookCnt + book.bookQuantity
        })
        

        //update
        await userCartCollectionObject.updateOne({username: userCartObj.username}, {$set:{...userInCart}})
        res.send({message: "Book added to cart", bookCnt: bookCnt})
    }
})


//getting cart count
userApi.get("/cartcount/:username", async(req,res,next) => { 
    let userCartCollectionObject = req.app.get("userCartCollectionObject")
    //get username from url params
    let username = req.params.username;

    let userCart = await userCartCollectionObject.findOne({username: username})
    if(typeof userCart === 'undefined'){
        res.send({message: 0})
    }
    else{
        let count = 0
        userCart.products.forEach((book) => {
            count = count + book.bookQuantity
        })
        res.send({message: count})
    }
})

//get  user's cart books
userApi.get("/usercart/:username",async(req, res) => {
    let userCartCollectionObject = req.app.get("userCartCollectionObject")

    //get logged in user 
    let loggedUser = req.params.username;

    let totalPrice = 0


    //find user in usercartcollection
    let userCart = await userCartCollectionObject.findOne({username: loggedUser})


    if(typeof userCart!== 'undefined'){
        userCart.products.forEach((book) => {
            totalPrice = totalPrice + (parseInt(book.price) * parseInt(book.bookQuantity))
        }) 
        res.send({message: userCart.products, totalPrice: totalPrice})
    }
    else{
        res.send({message: "Empty Cart"})
    }
})

//add book for logged in user
userApi.put("/addbook/:username/:bookid",async(req, res) => {
    let userCartCollectionObject = req.app.get("userCartCollectionObject")

    //get logged in user 
    let loggedUser = req.params.username;
    let bookid = req.params.bookid;

    //find user in usercartcollection
    let userCart = await userCartCollectionObject.findOne({username: loggedUser})
    
    console.log("usercart",userCart)
    
    userCart.products.forEach((book)=>{
        if(book._id === bookid){
            book.bookQuantity = book.bookQuantity + 1
        }
    })
    
    let bookCnt = 0
    userCart.products.forEach((book)=>{
        bookCnt = bookCnt + book.bookQuantity
    })

    //update
    await userCartCollectionObject.updateOne({username: userCart.username}, {$set:{...userCart}})
    res.send({message: "one more book Added to cart", bookCnt: bookCnt})
})

//remove book
userApi.put("/removebook/:username/:bookid",async(req,res,next)=>{
    let userCartCollectionObject = req.app.get("userCartCollectionObject")
    //get logged in user
    let loggedUser=req.params.username;
    let bookid=req.params.bookid;
    //find user in usercartcollection
    let userCart=await userCartCollectionObject.findOne({username:loggedUser})
    let bookc=0
    userCart.products.forEach((book)=>{
        bookc=bookc+book.bookQuantity
    })
    console.log("book count",bookc)
    if(bookc>1){
        userCart.products.forEach((book)=>{
            if(book._id===bookid){
                if(book.bookQuantity>1){
                    book.bookQuantity=book.bookQuantity-1
                }
                else{
                    let i=userCart.products.indexOf(book)
                    userCart.products.splice(i,1)
                }
            }
        })
        let bookcnt=0;
        userCart.products.forEach((book)=>{
            bookcnt=bookcnt+book.bookQuantity
        })
       
        //update
        await userCartCollectionObject.updateOne({username:userCart.username},{$set:{...userCart}})
        res.send({message:"Book Removed From Cart ", bookcnt: bookcnt})
    }
    else{
        await userCartCollectionObject.deleteOne({_id: ObjectID(userCart._id)})
        res.send({message:"Book Removed From Cart",bookcnt:0})
        
    }
        


})


//delete book
userApi.put("/deletebook/:username/:bookid",async(req,res,next)=>{
    let userCartCollectionObject = req.app.get("userCartCollectionObject")
    //get logged in user
    let loggedUser=req.params.username;
    let bookid=req.params.bookid;
    //find user in usercartcollection
    let userCart=await userCartCollectionObject.findOne({username:loggedUser})
    let bookc=0
    userCart.products.forEach((book)=>{
        bookc=bookc+book.bookQuantity
    })
    if(bookc>1){
        userCart.products.forEach((book)=>{
            if(book._id===bookid){
                    book.bookQuantity=0
                    let i=userCart.products.indexOf(book)
                    userCart.products.splice(i,1)
                    
                   }
        })
        let bookcnt=0;
        userCart.products.forEach((book)=>{
            bookcnt=bookcnt+book.bookQuantity
        })
        
        //update
        await userCartCollectionObject.updateOne({username:userCart.username},{$set:{...userCart}})
        res.send({message:"Book Removed From Cart", bookcnt:bookcnt})
    }
    else{
        await userCartCollectionObject.deleteOne({_id: ObjectID(userCart._id)})
        res.send({message:"Book Removed From Cart",bookcnt:0})
        
    }
        



})



// //get cart data
// userApi.get('/getcart/:username', async (req,res,next)=>{
//     let userCartCollectionObject = req.app.get("userCartCollectionObject")
//     let un = req.params.username;

//     let cartList = await userCartCollectionObject.find({username:un}).toArray()
//    // console.log("cartList",cartList)
//     res.send({message:cartList})

// })

//make the cart empty after order
userApi.delete('/placeorder/:username', async(req,res,next)=>{
    let userCartCollectionObject = req.app.get("userCartCollectionObject")
   // let  orderCollectionObject = req.app.get("orderCollectionObject")

    //get logged in user
    let loggedUser = req.params.username;

    let userCartObj = await userCartCollectionObject.findOne({username: loggedUser})


    //delete user in usercartcollection
    await userCartCollectionObject.deleteOne({username: loggedUser})
    res.send({message: "order successfull . Thank you for shopping",bookCnt: 0})

})




module.exports=userApi;