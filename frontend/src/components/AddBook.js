import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from "axios";

function AddProducts(props)
{
let {register,handleSubmit,formState:{errors}} = useForm();
let [file,setFile]=useState(null)
let username = localStorage.getItem("username")
let history = useHistory()
let refresh = props.refresh;
const onFormSubmit = (prodObj)=>{
   
    prodObj.seller = username;
    //create formdata obj
    let formData = new FormData();

    //append file to formdata
    formData.append("photo",file,file.name)

    //add prodobj to formdata
    formData.append("prodObj",JSON.stringify(prodObj))

    //post req
    axios.post('/product/createproduct',formData)
    .then(res=>{
        let resObj=res.data;
        alert(resObj.message)
        props.setRefresh(refresh+1)
    })
    .catch(err=>{
        console.log(err)
        alert("error in creating products")
    })
  history.push(`/sellers/${username}`)
}

    const onFileSelect=(e)=>{
        setFile(e.target.files[0])
    }
return(

    <div style={{marginLeft:"30%"}}>
              
             <div className="d-flex justify-content-center t border shadow bg-light m-3 w-50 ">
                    
                 {/* Form */}
                     <form className="w-50"onSubmit={handleSubmit (onFormSubmit)} >

                        <h1 className="m-2">Add Books</h1>
                    

                         {/* name */}
                         <label htmlFor="un" className="form-label mt-3"><strong>Title</strong></label>
                         <input type="text" id="un" className="form-control mb-3" {...register('title')} />

                         {/* Email */}
                         <label htmlFor="author" className="form-label "><strong>Author</strong></label>
                         <input type="text" id="author" className="form-control mb-3"  {...register('author')}/>
                         
                         
                         {/* price */}
                         <label htmlFor="price" className="form-label "><strong>Price</strong></label>
                         <input type="number" id="price" className="form-control mb-3" {...register('price')}/>

                          {/* Category */}
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

                         {/*rating */}
                         <label htmlFor="rating" className="form-label "><strong>Rating</strong></label>
                         <input type="number" id="rating" className="form-control mb-3" {...register('rating')}/>

                          {/*reviews */}
                          <label htmlFor="reviews" className="form-label "><strong>Reviews</strong></label>
                         <input type="number" id="reviews" className="form-control mb-3" {...register('reviews')}/>
                         
                         
                          {/*published date */}
                          <label htmlFor="dateP" className="form-label "><strong>Published on</strong></label>
                         <input type="date" id="dateP" className="form-control mb-3" {...register('dateOfPub')}/>


                         {/* file */}
                         <input type="file" name="photo" className="form-control mb-3 mt-3" onChange={(e)=>{onFileSelect(e)}}></input>
                         

                         {/* description */}
                         <label htmlFor="des" className="form-label">Description</label>
                         <textarea id="des" className="form-control mb-3" rows="4" {...register('description')}></textarea>

                         {/* submit */}
                         <button className="btn btn-primary  mb-3">Add Book</button>

                     </form>
                  
             </div>
             
         </div>
)
}
export default AddProducts;