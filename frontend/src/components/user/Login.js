import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useHistory } from 'react-router-dom'
function Login(props) {
    let {register,handleSubmit,formState:{errors}} = useForm()
    let history = useHistory()

    const onFormSubmit=(credentials)=>{

        axios.post(`/user/login`,credentials)
        .then(res=>{
            let resObj=res.data;
            if(resObj.message === "login-success")
            {
                 //save token in local storage
                 localStorage.setItem("token",resObj.token)
                 localStorage.setItem("username",resObj.username)
                 localStorage.setItem("user",JSON.stringify(resObj.userObj))
                 localStorage.setItem("type",credentials.type)
                 alert("login success")
                props.setUserLoginStatus(true)
                history.push(`/userprofile/${resObj.username}`)
                  
            }
            else{
                alert(resObj.message)
            }
            

        })
        .catch(err=>{
            console.log(err)
            alert("error in login")
        })
        
    }
    const pushToReg = ()=>{
        history.push('/register')
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
                     {/*login form */}
                     <form className="w-50" onSubmit={handleSubmit(onFormSubmit)}> 
                         
                         <h1 className="mt-2 mb-4 border-bottom pb-3 border-3">Sign-In</h1>

                     {/* username */}
                     <label htmlFor="un" className="form-label mt-2"><strong>Username</strong></label> 
                     <input type="text" id="un" className="form-control mb-3"  {...register('username',{required:true})}  />
                     {errors.username && <p className="text-danger">* username is required</p>}

                      {/* password */}
                      <label htmlFor="pw" className="form-label"><strong>Password</strong></label> 
                      <input type="password" id="pw" className="form-control mb-3"  {...register('password',{required:true})}      />  
                      {errors.password && <p className="text-danger">* Password is required</p>}

                      <button className="btn btn-danger mb-3">Sign in</button>  

                  <p className="mt-4">New Customer? <span className="text-primary" onClick={()=> pushToReg()}>click here</span></p>                       
                     </form>
                    
                 </div>
                

             </div>
           
         

       </div>
    )
}
export default Login;