import { useHistory} from 'react-router-dom'
import axios from 'axios'
import { useState , useEffect } from "react";

function UserCart(props)
{
    let username = localStorage.getItem("username")
     let history = useHistory()

     //to see recommendations
     const pushToViewProducts = ()=>{
         history.push('/viewproducts')
     }

     let [cartData, setCartData] = useState([])
     let [price, setPrice] = useState(0)
     let [refresh, setRefresh] = useState(0)
 
     useEffect(()=>{
         fetch(`/user/usercart/${username}`)
         .then(response => response.json())
         .then(json => {
             const arObj = json.message
            setCartData(arObj)
             setPrice(json.totalPrice)
         })
     },[refresh])
     
     //increment quantity of added books
     const incBookInCart = async (bookid) => {
        await axios.put(`/user/addbook/${username}/${bookid}`)
        .then(res => {
            let resObj = res.data;
            alert(resObj.message)
           // console.log("book count",resObj.bookCnt)
            props.updateCartCnt(resObj.bookCnt)
        })
        .catch(err=>{
            console.log(err);
            alert("something went wrong")
        })
        setRefresh(refresh + 1)
    }

    //decrement
    const decObjInCart = async (bookid) => {
        await axios.put(`/user/removebook/${username}/${bookid}`)
        .then(res => {
            let resObj = res.data;
            alert(resObj.message)
            props.updateCartCnt(resObj.bookcnt)
        })
        .catch(err=>{
            console.log(err);
            alert("something went wrong")
        })
        setRefresh(refresh + 1)
    }

    //shipping address
    const pushToShipping = () =>{
        props.addProductToOrder(cartData)
        history.push('/shippingaddress')
    }

    //remove from cart
    const deleteBookInCart = async(bookid)=>{
        await axios.put(`/user/deletebook/${username}/${bookid}`)
        .then(res=>{
            let resObj = res.data;
            alert(resObj.message)
            props.updateCartCnt(resObj.bookcnt)
        })
        .catch(err=>{
            console.log(err);
            alert("error in deleting")
    })
    setRefresh(refresh + 1)
    }
    //continue shopping
    const back = ()=>{
        history.push(`/userprofile/${username}`)
    }

    return(
        <div>
    {
        ! ((cartData.length>0) && (props.userLoginStatus) && (cartData !== "Empty Cart") ) ?
          
            <div className="m-5">
            <img  src="data:image/png;base64,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" 
            width="400px"           />
             <h2 className="text-center text-danger mt-5 mb-3">Your cart is Empty</h2>
             <a className="text-primary" onClick={()=>pushToViewProducts(cartData)}>See recommdentations</a>
        </div>
            :
            <div>
               <div className="row"> 

               <div className="col-6 mt-5 pt-5 ">
                      <button type="button" className="btn btn-primary btn-lg text-start" onClick={()=> back()}>Continue Shopping</button>
                     </div>

                    <div  className=" col-6  mt-5">
                    <h2 className="text-danger">Total Price : Rs {price} /-</h2>
                    <button className="btn  btn-primary btn-lg mt-3 me-5" onClick ={()=>pushToShipping()}>Proceed to Checkout</button>
                    </div> 
                   
                </div>
        <div className="container mt-5">
           
        <h2 className="  fst-italic text-start  text-danger p-5">see your cart items</h2>
            {
                 <table className="table bg-light shadow-lg m-3 ">
                 <thead>
                     <tr>
                     </tr>
                 </thead>
                 <tbody>
                     {
              cartData &&  cartData.map((data,ind)=>{
                    return(
                     <tr key={ind} className="shadow ">
                          <td><img src={data.profileImage} width="120px" /></td>
                             <td className="pt-4 fs-4"><strong>{data.title}</strong>
                             <br/>
                                 By: {data.author}
                                 <br/>
                                <span className="fs-5"> Price: Rs {data.price} /- </span>
                             </td>
                             <td className="fs-5 pt-4 mt-4 "> Amount: Rs {data.price* data.bookQuantity} /-
                             <br />
                              <i className="fas fa-plus pt-4 "  onClick = {() => incBookInCart(data._id)}></i> 
                               <span className="border p-1 mt-5 ms-2 me-2 bg-light"> <td >{data.bookQuantity}</td> </span>
                                 <i className="fas fa-minus pt-3" onClick = {() => decObjInCart(data._id)}></i>
                             </td>   
                             <td><button className="btn btn-danger mt-5" onClick={()=> deleteBookInCart(data._id)} >Remove from Cart</button></td>

                         </tr>
                    )
                    })
                }
                </tbody>
                </table>
               }     
            </div>
            </div>
        }
        </div>
        
    )
}
export default UserCart;