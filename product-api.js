//import mini express
const exp = require('express')
const productApi = exp.Router()
productApi.use(exp.json())
var ObjectID  = require('mongodb').ObjectId;
//import cloudinary related modules
const cloudinary=require('cloudinary').v2
const multer=require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')



//configure cloudinary
cloudinary.config({
    cloud_name: 'dgwdk3b83',
    api_key: '415169195819767',
    api_secret: 'uZbLS3eELXGezaEwpjR3OPeb9-s'
});

//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Pragya',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})


//post req
productApi.post('/createproduct',multerObj.single("photo"), async (req,res,next)=>{
let productCollectionObject=req.app.get("productCollectionObject")

// get product obj
let newProd = JSON.parse(req.body.prodObj)

//search
let prod = await productCollectionObject.findOne({title: newProd.title})

//if existed
if(typeof prod !== "undefined")
{
    res.send({message:"productalready existed"})
}
//if not existed
else{

     //add CDN link of image
     newProd.profileImage=req.file.path
    await productCollectionObject.insertOne(newProd)
    res.send({message:"product added"})
}

})

//get req
productApi.get('/getproducts',async (req,res,next)=>{
    let productCollectionObject=req.app.get("productCollectionObject")

    let prodList = await productCollectionObject?.find().toArray()

    res.send({message:prodList})

})

//update rq
productApi.put('/updatebook/:bookId', async(req,res)=>{

    let productCollectionObject=req.app.get("productCollectionObject")
    //get the book id
    let bookId = req.params.bookId;
    //get the modified book
    let modifiedBook = req.body.book

    productCollectionObject.findOne({_id: ObjectID(bookId)})
    .then(bookObj =>{
        if(bookObj === null){
            res.send({message: "book not existed for update"})
        } 
        else{
            productCollectionObject.updateOne({_id: ObjectID(bookId)},
                {$set:{
                    title:modifiedBook.title,
                    author:modifiedBook.author,
                    price:modifiedBook.price
                }})
                .then((success)=>{
                    res.send({message: "BOOK UPDATED"})
                })
                .catch(err => res.send(err.message))
        }
    })


})

//delete book
productApi.delete('/deletebook/:bookId',async(req,res)=>{
    let productCollectionObject=req.app.get("productCollectionObject")
    //get the book id
    let bookId = req.params.bookId;

    await productCollectionObject.deleteOne({_id: ObjectID(bookId)})
        res.send({message: "BOOK DELETED"})
})







module.exports=productApi;