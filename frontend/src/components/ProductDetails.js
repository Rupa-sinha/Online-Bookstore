import { useHistory, useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa'
import { useState } from "react";
import {useForm} from 'react-hook-form'

function ProductDetails(props){
    let paramsObj = useParams()
    let history = useHistory()
    let {register,handleSubmit,formState:{errors}} = useForm()
    let book = props.product.filter(bookObj=> bookObj._id === paramsObj.bookid )
    console.log("book",book)
    const colors = {
        orange : "#FFBA5A",
        grey : "#a9a9a9"
    }
    const [review,setReview] = useState([])
    const [currentValue,setCurrentValue] = useState(0)
    const [hoverValue,setHoverValue] = useState(undefined )
    const [rateStatus,setRateStatus] = useState(false)
    const stars = Array(5).fill(0)
    const handleClick = (value)=>{
        setCurrentValue(value)
    }
    const handleMouseOver = (value)=>{
        setHoverValue(value)
    }
    const handleMouseLeave = ()=>{
        setHoverValue(undefined)
    }
    const onFormSubmit = (rev)=>{
        console.log("review ",rev)
        setReview(rev)
        setRateStatus(true)
    }
      //update
      const updateBook = (bookId)=>{
        history.push(`/updatebook/${bookId}`)
    }
    return(
       <div className="container">
           <div className="card m-5 p-5 bg-light shadow-lg">
               <div className="row">
                   <div className="col-4">
                       <img src={book[0].profileImage} className="img-fluid rounded-start" />
                   </div>

                   <div className="col-8"> 
                   <div className="row">
                   <div className="card-body ">
                       <h5 className="card-title d-flex justify-content-start fs-3"><strong>{book[0].title} :</strong></h5>
                       <h6 className="fs-3 d-flex justify-content-start">{book[0].description}</h6>
                       <p className="card-text d-flex justify-content-start mt-5  fs-4"><strong>Author: </strong> {book[0].author}</p>
                       <p className="card-text d-flex justify-content-start fs-4 text-danger"><strong>Price: </strong> Rs {book[0].price}/-</p>
                       <h6 className="card-text d-flex justify-content-start  fs-4">
                                         {
                                    
                                        stars.map((E,ind)=>{
                                        return(
                                            <FaStar
                                             key={ind}
                                            size={30}
                                            color ={book[0].rating > ind ? colors.orange : colors.grey}
                                             />
                                        )
                                    }) 
                                   
                                  }
                                  <span>({(book[0].reviews)})</span>
                                         </h6>
                                         { (localStorage.getItem("username")) === "admin"?
                                      <>
                                         <button className="btn btn-outline-dark btn-lg mt-5 float-start" onClick={()=>updateBook(book[0]._id)}>Update</button>
                                        
                                         <button className="btn btn-outline-dark btn-lg mt-5 ms-5 float-start" onClick={()=>props.deleteBook(book[0]._id)}>Delete</button>
                                      </>

                                       :
                                      <button className="btn btn-outline-dark btn-lg m-4 float-start " onClick={()=> props.addProductToCart(book[0])} >Add to cart</button>
                                      }  
                        </div>
                       <div className="row">
                       <div className="col-7">
                           <div className="mt-3 p-3 text-start ">
                               <>
                               <p className="fs-5 mb-2 fst-italic"> Rate this book</p>
                               {
                                   stars.map((e,ind)=>{
                                       return(
                                           <FaStar 
                                           key ={ ind}
                                           size={24}
                                           color ={ (hoverValue || currentValue)> ind ? colors.orange : colors.grey}
                                           onClick={()=> handleClick(ind+1)}
                                           onMouseOver ={ ()=> handleMouseOver(ind+1)}
                                           onMouseLeave ={handleMouseLeave}
                                            />
                                       )
                                   })
                               }
                               </>
                            <form onSubmit={handleSubmit (onFormSubmit)}> 
                           <label htmlFor="exampleFormControlTextarea1" className="form-label text-start mt-5 fst-italic fs-5">Write your review</label>
                           <textarea className="form-control text-start" id="exampleFormControlTextarea1" rows="3"
                            {...register("review")}></textarea>
                           <button type="submit" className=" btn btn-danger mt-3">Submit</button>
                           </form>
                          </div>
                           </div>
                           
                           <div className="col-5 mt-5">
                               {
                                   rateStatus ?
                                   <>
                                   <strong className="fs-5 ">{localStorage.getItem("username")}</strong>
                                   <br />
                                   { stars.map((E,ind)=>{
                                         return(
                                             <FaStar
                                             key={ind}
                                             color ={currentValue > ind ? colors.orange : colors.grey}
                                              />
                                         )
                                     })    
                                   }
                                   <br />
                                     {review.review}
                                   </>:
                                   <p></p>
                               }
                           </div>
                       </div>
                   </div>
                   </div>
               </div>
           </div>
       </div>
    )

}
export default ProductDetails;