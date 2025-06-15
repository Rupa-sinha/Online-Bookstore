import { useForm} from "react-hook-form"
import { useParams,useHistory } from "react-router-dom";
import { useState } from 'react'
import axios from "axios";
function UpdateBook(props)
{
let {register,handleSubmit,formState:{errors}} = useForm();
let paramsObj = useParams()
let username = localStorage.getItem("username")
let history = useHistory()
let refresh = props.refresh
console.log("refresh is",refresh)
const onFormSubmit = (bookObj)=>{
    axios.put(`/product/updatebook/${paramsObj.bookId}`,{book:bookObj})
    .then(res=>{
        let resObj = res.data
        alert(resObj.message)
           props.setRefresh(refresh+1)
           if(username === "admin")
           {
        history.push('/adminprofile/admin')
           }
           else{
               history.push(`/sellers/${username}`)
           }
    })
    .catch(err=>{
        console.log(err)
        alert("error in updating book")
    })
 
}
return(
    <div style={{marginLeft:"30%"}}>
              
             <div className="d-flex justify-content-center t border shadow bg-light m-3 w-50 ">
                    
                 {/* Form */}
                     <form className="w-50"onSubmit={handleSubmit (onFormSubmit)} >
                     <h1 className="m-2">Update Book</h1>
                         { 
                         (username !== 'admin') ?
                         <>
                         <label htmlFor="un" className="form-label mt-3"><strong>Title</strong></label>
                         <input type="text" id="un" className="form-control mb-3" {...register('title')} />

                        
                         <label htmlFor="author" className="form-label "><strong>Author</strong></label>
                         <input type="text" id="author" className="form-control mb-3"  {...register('author')}/>
                         
                         
                        
                         <label htmlFor="price" className="form-label "><strong>Price</strong></label>
                         <input type="number" id="price" className="form-control mb-3" {...register('price')}/>
                          </>
                         :
                         <>
                           <label htmlFor="un" className="form-label mt-3"><strong>Title</strong></label>
                         <input type="text" id="un" className="form-control mb-3" {...register('title')} />


                         <label htmlFor="rating" className="form-label "><strong>Rating</strong></label>
                         <input type="number" id="rating" className="form-control mb-3" {...register('rating')}/>

                         <div className="mb-2">
                            <label for="bookCategory" className="form-label"><strong>Book Category</strong></label>
                            <select class="form-select" aria-label=".form-select-lg example" id="bookCategory" name="bookCategory" {...register("category")}>
                            <option  value="">     ---Select category---</option>
                                <option  value="HTML CSS RWD">HTML CSS RWD</option>
                                <option value="JAVASCRIPT">JAVASCRIPT</option>
                                <option value="REACT">REACT</option>
                                <option value="NODEJS">NODEJS</option>
                                <option value="MONGODB">MONGODB</option>
                                <option value="FULL STACK">FULL STACK</option>
                            </select>
                        </div>
                        <label htmlFor="reviews" className="form-label "><strong>Reviews</strong></label>
                         <input type="number" id="reviews" className="form-control mb-3" {...register('reviews')}/>
                         </>
                          
                         }
                         <button className="btn btn-primary  mb-3">Update Book</button>

                     </form>
                  
             </div>
             
         </div>
)
}
export default UpdateBook;