import { useState , useEffect } from "react";
import { BrowserRouter, Switch, Link, Route , useHistory } from "react-router-dom"
import Register from './user/Register'
import Login from './user/Login'
import Image from './Image'
import ViewProducts from './ViewBooks';
import UserCart from './UserCart'
import Search from './Search'
import axios from 'axios'
import UpdateBook from './UpdateBook';
import SellerAccount from './SellerAccount';
import AddProducts from './AddBook';
import BestSeller from './BestSeller';
import NewArrivals from './NewArrivals';
import Category from './Category';
import ReturnsAndOrders from './ReturnsAndOrders';
import ShippingAddress from './ShippingAddress';
import SellRegister from './seller/SellRegister';
import SellerLogin from './seller/SellerLogin';
import Footer from './Footer';
import AdminLogin from './admin/AdminLogin';
import ProductDetails from './ProductDetails';
import Header from './Header'
function Home() {
  //get username from local storage
  let username = localStorage.getItem("username")
  let [userLoginStatus,setUserLoginStatus]=useState('')
  let [refresh,setRefresh] = useState(0)
  let [count,setCount] = useState(0)
  let [searchItem,setSearchItem] = useState([])
 
  //get product
  let [product,setProduct] = useState([]);
  useEffect(()=>{
      axios.get('/product/getproducts')
      .then(res=>{
          let prodObj=res.data.message;
          setProduct(prodObj);
          
      })
  },[refresh])

  //delete book from produclist
  const deleteBook = async(bookId) => {
    await axios.delete(`/product/deletebook/${bookId}`)
    .then(res => {
        let resObj = res.data;
        alert(resObj.message)
    })
    .catch(err=>{
        console.log(err);
        alert("something went wrong")
    })
    setRefresh(refresh + 1)
}
  
//add product to cart
const addProductToCart =(prodObj) => {
  let newObj = {
      username: username,
      prodObj: prodObj
  }
  // make post req
  axios.post("/user/addtocart",newObj)
  .then(res=>{
      let responseObj = res.data
      alert(responseObj.message)
      setCount(responseObj.bookCnt)
  })
  .catch(err=>{
      alert("something went wrong in adding book to cart")
  })
}

// add order to orderdb
const addProductToOrder =(prodObj) =>{
  let orderObj = {
    username: username,
    order: prodObj
  }
  //post req
  axios.post('/order/addtoorder',orderObj)
  .then(res=>{
      let resObj=res.data;
  })
  .catch(err=>{
      console.log(err)
      alert("error in creating products")
  })
}

// set cart count
  useEffect(() => {
    if(localStorage.token) {
      setUserLoginStatus(true)
      axios.get(`/user/cartcount/${username}`)
      .then(res=>{
          let responseObj = res.data
          setCount(responseObj.message)
      })
      .catch(err=>{
          alert("something went wrong in getting cart count")
      })
    }else{
      setUserLoginStatus(false)
    }
  },[userLoginStatus])

  const updateCartCnt = (n) => {
    setCount(n)
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
                  <Route path="/register">
                      <Register />
                  </Route>
 
                  <Route path="/sellregister">
                    <SellRegister />
                  </Route>
                  
                  <Route path="/login">
                      <Login  setUserLoginStatus={ setUserLoginStatus} />
                  </Route>

                  <Route path='/sellerlogin'>
                    <SellerLogin  setUserLoginStatus={ setUserLoginStatus} />
                  </Route>

                   <Route path="/adminlogin"> 
                       <AdminLogin  setUserLoginStatus={ setUserLoginStatus} />
                  </Route>

                  <Route path='/returnsandorders'>
                  <Header userLoginStatus={userLoginStatus}   count={count}  setUserLoginStatus={setUserLoginStatus} setSearchItem={setSearchItem} />
                    <ReturnsAndOrders userLoginStatus={userLoginStatus}  />
                  </Route>
                  
                  <Route path='/productdetails/:bookid'>
                  <Header userLoginStatus={userLoginStatus}   setUserLoginStatus={ setUserLoginStatus} count={count} setSearchItem={setSearchItem}  />
                         <ProductDetails  product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart}/>
                  </Route>

                  <Route path='/shippingaddress'>
                    <ShippingAddress setRefresh={setRefresh} refresh={refresh} updateCartCnt={updateCartCnt} />
                  </Route>

                  <Route path='/viewproducts'>  
                  <Header userLoginStatus={userLoginStatus}   setUserLoginStatus={ setUserLoginStatus} count={count} setSearchItem={setSearchItem}  />
                  <h1 className="text-dark">Start Shopping</h1>
                   <ViewProducts product={product} addProductToCart={addProductToCart} deleteBook={deleteBook} />
                  </Route>

                <Route path='/sellers/:username'>
                <Header userLoginStatus={userLoginStatus}   count={count}  setUserLoginStatus={setUserLoginStatus} setSearchItem={setSearchItem} />
                <SellerAccount  product={product} deleteBook={deleteBook}/>
                </Route>

                  <Route path="/userprofile/:username">
                    <Header userLoginStatus={userLoginStatus}   count={count}  setUserLoginStatus={setUserLoginStatus} setSearchItem={setSearchItem} />
                   <Image />
                    <Category product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart}/>
                    <BestSeller product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart} />
                    <NewArrivals product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart}/>
                     <ViewProducts product={product} addProductToCart={addProductToCart} deleteBook={deleteBook} /> 
                     <Footer />
                    </Route> 

                  <Route path="/adminprofile/:username">
                  <Header userLoginStatus={userLoginStatus}   setUserLoginStatus={ setUserLoginStatus} count={count} setSearchItem={setSearchItem} />
                    <Image/>
                    <Category product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart}/>
                    <BestSeller product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart} />
                    <NewArrivals product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart}/>
                   <ViewProducts product={product}  addProductToCart={addProductToCart} deleteBook={deleteBook} /> 
                    <Footer />
                  </Route>

                  <Route path='/usercart'>
                  <Header userLoginStatus={userLoginStatus}   setUserLoginStatus={ setUserLoginStatus} count={count} setSearchItem={setSearchItem} />
                  <UserCart  userLoginStatus={userLoginStatus}  updateCartCnt={updateCartCnt} addProductToOrder={addProductToOrder}/>
                  </Route>

                  <Route path='/search'> 
                  <Header userLoginStatus={userLoginStatus}   setUserLoginStatus={ setUserLoginStatus} count={count} setSearchItem={setSearchItem} />
                    <Search  searchItem={searchItem} product={product} addProductToCart={addProductToCart}/>
                  </Route>

                  <Route path='/updatebook/:bookId'>
                    <UpdateBook  setRefresh={setRefresh} refresh={refresh}/>
                  </Route>
                  
                  <Route path='/addbook/:username'> 
                    <AddProducts  setRefresh={setRefresh} refresh={refresh} />     
                  </Route>

                   <Route path="/">
                      <Header userLoginStatus={userLoginStatus}   setUserLoginStatus={ setUserLoginStatus} setSearchItem={setSearchItem}/>
                      <Image/>
                      <Category product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart}/>
                      <BestSeller product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart}/>
                      <NewArrivals product={product}  deleteBook={deleteBook} addProductToCart={addProductToCart}/>
                      <ViewProducts product={product}   addProductToCart={addProductToCart} deleteBook={deleteBook} />
                      <Footer />
                  </Route>      
       </Switch>                
      </BrowserRouter>
    </div>
  );}
export default Home;
