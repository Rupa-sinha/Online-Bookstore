import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
function Category(props)
{
    let history = useHistory()
    let [catBooks,setCatBooks] = useState([])
    let product = props.product
    let username = localStorage.getItem("username")
   
    const colors = {
        orange : "#FFBA5A",
        grey : "#a9a9a9"
    }
     const stars = Array(5).fill(0)
     //see details
     const seeDetails = (bookid)=>{
        history.push(`/productdetails/${bookid}`)
}
//react js
const pushToReact=()=>{
    let reactBook = product.filter(prod=> prod.category === 'REACT')
    setCatBooks(reactBook)
}
//full stack
const pushToFullStack=()=>{
    let fsdBook = product.filter(prod=> prod.category === 'FULL STACK')
    setCatBooks(fsdBook)
}
//node js
const pushToNode = ()=>{
    let nodeBook = product.filter(prod=> prod.category === 'NODEJS')
    setCatBooks(nodeBook)
}
//js
const pushToJs = ()=>{
    let jsBook = product.filter(prod=> prod.category === 'JAVASCRIPT')
    setCatBooks(jsBook)
}
//html
const pushToHtml = ()=>{
    let htmlBook = product.filter(prod=> prod.category === 'HTML CSS RWD')
    setCatBooks(htmlBook)
}
//db
const pushToDb = ()=>
{
    let mdBook = product.filter(prod=> prod.category === 'MONGODB')
    setCatBooks(mdBook)
}

//update book by admin
const updateBook= (bookId)=>{
    history.push(`/updatebook/${bookId}`)
}
const pushToAll = ()=>{
    history.push('/viewproducts')
}
return (
    <div className="mb-0"> 
     <nav class="navbar navbar-expand-md navbar-dark header">
                <div class="container-fluid">         
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                        <ul className="navbar-nav navigation2 ms-5">
                        <li className="nav-item">
                                <button onClick={()=>pushToAll()} className="btn btn-lg text-white book-category" id="b">All</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={()=> pushToFullStack()} className="btn  btn-lg text-white book-category"
                                id="b">Full Stack</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={()=>pushToReact()} className="btn btn-lg text-white book-category" id="b">ReactJs</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={()=>pushToNode()} className="btn btn-lg text-white book-category" id="b">NodeJs</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={()=>pushToJs()} className="btn  btn-lg text-white book-category" id="b">JavaScript</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={()=> pushToHtml()} className="btn btn-lg text-white book-category" id="b">HTML CSS RWD</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={()=>pushToDb()} className="btn btn-lg text-white book-category" id="b">MongoDb</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
     <div className="ms-5 me-5 p-5">    
     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-4 bg-light ">
        {
          catBooks &&  catBooks.map((element,ind)=>{
                return(
                    <div className="col p-5" key={ind}> 
                        <div className="card w-75 shadow m-2  align-self-center">
                        <img src={element.profileImage} className="card-img-top" onClick={()=>seeDetails(element._id)}  alt="" style={{height:"300px"}} />
                            <div className="card-body mt-2">
                            <h5 className="card-title p-1"><strong>Title: {element.title}</strong></h5>
                                <h6 className="p-1">Author:{element.author}</h6>
                                <h6 className="text-danger p-1">Price: Rs {element.price} /-</h6>
                                <h6>
                                    {stars.map((E,ind)=>{
                                        return(
                                            <FaStar
                                            key={ind}
                                            color ={element.rating > ind ? colors.orange : colors.grey}
                                             />)  }) }
                                  <span>({(element.reviews)})</span>
                                         </h6>
                                  { username === "admin"?
                                  <>
                                     <button className="btn btn-success float-start" onClick={()=>updateBook(element._id)}>Update</button>
                                     <button className="btn btn-danger float-end" onClick={()=>props.deleteBook(element._id)}>Delete</button>
                                  </>:
                                  <button className="btn btn-success m-3 float-center " onClick={()=> props.addProductToCart(element)} >Add to cart</button> } 
                            </div>
                        </div>
                        </div> ) }) }     
       </div>
        </div>
    </div>
)}
export default Category