import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useHistory } from 'react-router-dom'
function SellRegister() {

  let {register,handleSubmit,formState:{errors}} = useForm()
  let history= useHistory();
  
  const onFormSubmit = (userObj)=>{
     console.log(userObj)
      
      axios.post("/seller/createseller",userObj)
      .then(res=>{
          let resObj=res.data;
          alert(resObj.message)
          history.push('/sellerlogin')

      })
      .catch(err=>{
          console.log(err)
          alert("something went wrong")
      })
  }
const pushToLogin = ()=>{
    history.push('/sellerlogin')
}
    return(
        <div>
             <img
                    className="m-5"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    width="150px"
                />

         <div style={{marginLeft:"30%"}}>
              
             <div className="d-flex justify-content-center t border shadow bg-light m-3 w-50 ">
                    
                 {/* Form */}
                     <form className="w-50"onSubmit={handleSubmit (onFormSubmit)} >

                        <h1 className="mt-2 mb-4 border-bottom pb-3 border-3">Create your seller account</h1>
                    

                        {/* name */}
                        <label htmlFor="un" className="form-label mt-3"><strong>Your name</strong></label>
                         <input type="text" id="un" className="form-control mb-3" {...register('username',{required:true,minLength:4})} />
                          
                        {/* validation */}
                        {errors.username?.type==='required' && <p className="text-danger">* username is required</p>}
                          {errors.username?.type==='minLength' && <p className="text-danger">* Min length should be 4</p>}
                          
                         {/* Email */}
                         <label htmlFor="email" className="form-label "><strong>Email</strong></label>
                         <input type="email" id="email" className="form-control mb-3"  {...register('email',{required:true})}/>
                         {errors.email && <p className="text-danger">* Email is required</p>}

                         {/* Password */}
                         <label htmlFor="pw" className="form-label "><strong>Password</strong></label>
                         <input type="password" id="pw" className="form-control mb-3" {...register('password',{required:true})}/>
                         {errors.password && <p className="text-danger">* Password is required</p>}
                         
                         

                         {/* submit */}
                         <button className="btn btn-primary mt-3 mb-3">Create your seller account</button>
                         <p className="mt-4">Already have an account? <span className="text-primary" onClick={()=> pushToLogin()}>click here</span></p>
                     </form>
                  
             </div>
             
         </div>
        </div>
       
    )
}
export default SellRegister