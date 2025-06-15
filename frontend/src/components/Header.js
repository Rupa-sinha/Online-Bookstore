import {useHistory} from 'react-router-dom'
import './Header.css'
function Header(props) {
   let history=useHistory();
  let username = localStorage.getItem("username")  
    //login
    function pushToLogin(){
        history.push('/login')
    }
    //register
    function pushToRegistration(){
        history.push('/register')
    }
    const pushToSeller = ()=>{
      history.push(`/sellregister`)
    }

const pushToCart = ()=>{
    history.push('/usercart')
}
const pushToSearch = ()=>{
  history.push('/search')
}
const pushToHome = ()=>{
  history.push('/')
}
const pushToReturn = ()=>{
  history.push('/returnsandorders')
}
const logoutUser=()=>{
    localStorage.clear();
     props.setUserLoginStatus(false)
   history.push('/')

}
const pushToAdmin = ()=>{
  history.push("/adminlogin")
}
    return(
       <nav class="navbar navbar-expand-md navbar-dark header ">
       <div className="container-fluid ">
         
                  <div className="navbar-brand">
                  <img className="header-logo" src="https://zeevector.com/wp-content/uploads/LOGO/Amazon-India-Logo-PNG-White.png"
                  onClick={()=>pushToHome()}
                  alt="" />
                  </div>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        
         <div className="header collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ">
             
              {/* search */}
               <li className="nav-item header__search" >
               <div className="nav-link" >
            
                        <div className="input-group search" onClick={()=>pushToSearch()}>
                          <button className="btn btn-light" type="button">
                                Books
                            </button>
                            <input type="text" className="form-control" placeholder="Search by title/author......"
                            onChange={(event)=> props.setSearchItem(event.target.value)}        
                            />
                             <div className="input-group-append">
                                <button className="btn btn-warning" type="button" onClick={()=>pushToSearch()}>
                                     <i class="fa fa-search"></i>
                                 </button>
                            </div>
                         </div>
                </div>
               </li>

              {/*,register/login */}
               <li className="nav-item" id="register">
          
          <div className="nav-link text-white location dropdown" id="Dropdown" data-bs-toggle="dropdown" >
         
         <div className="dropdown-toggle text-white " role="button" id="dropdownMenuLink" data-bs-toggle="dropdown">
             { !props.userLoginStatus ?
                  <span className="text-left">Hello, Sign in</span>
                  :
                  <span className="text-left">{`Hello, ${username}`}</span>
             }
                  <br />
                  <span className="fs-5"><strong>Account & Lists</strong></span>
           
          </div>
            
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                  <div className="text-center m-2 bg-light" > 
                      { !props.userLoginStatus ?
                      <button className="btn w-75 btn-warning text-dark " type="submit" onClick={()=>pushToLogin()}>Sign in</button>
                      :
                      <>
                      <button className="btn w-75 btn-warning text-dark " type="submit" onClick={()=>logoutUser()}>Sign out</button>
                      {/* <button onClick={()=> pushToSeller()}>Your seller account</button> */}
                       </> 
                      }
                      <p className="m-3  border-bottom border-4 pb-4">New Customer? <span className="signin text-primary " onClick={()=>pushToRegistration()}> Start here</span>.</p>
                      <div className="row">
                        <div className="col-3  border-end border-4">
                          </div>  
                          <div className="col-9 text-start">
                          <p class="fs-5" id="blue"  onClick={()=> pushToSeller()}>Seller</p>
                          <p class="fs-5" id="blue" onClick={()=> pushToAdmin()}>Admin</p>
                          </div>

                      </div>
                      </div>
                      </ul>
              </div>
               </li>
    {/*returns and orders */}
             <li className="nav-item" >
             <div className="nav-link text-white" id="return" onClick={()=>pushToReturn()}>
                 <div className="ps-2">
                 <span >Returns</span>
                 <br />
                 <span className="fs-5"><strong>& Orders</strong></span>
                 </div>
             </div>
             </li>

{/* cart */}
             <li className="nav-item">
             <div className="nav-link text-white" id="cart">

                <div className="ps-2">
                    <span><i class="fas fa-shopping-cart"></i></span>
                     { props.userLoginStatus?
                    <span className=" ms-2 badge bg-secondary">{props.count}</span>:
                    <span class="badge bg-secondary"></span>
                     }
                    <br />
                   <a onClick={()=>pushToCart()}> <span className="fs-5 mt-5 ms-2 pt-5"><strong>Cart</strong></span> </a>
                </div>
                 </div>
            </li>
          </ul>
          </div>
          </div>
       </nav>
    )}
export default Header;