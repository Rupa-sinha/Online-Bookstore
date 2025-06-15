import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Login from "./user/Login";

function ReturnsAndOrders(props) {
   let [order,setOrder] = useState([])
   let username = localStorage.getItem("username")
    useEffect(()=>{
        axios.get(`/order/getorder/${username}`)
        .then(res=>{
            console.log("res",res)
            let orderObj = res.data.message;
            console.log("order obj",orderObj)
            setOrder(orderObj)
        })
    },[order.username])

     console.log("order",order)

    const returnOrder = async (bookid,ind)=>{
      await  axios.put(`/order/return/${username}/${bookid}/${ind}`)
        .then(res=>{
            console.log("return",res)
        })
        .catch(err=>{
            console.log(err)
        })
    } 
     
    return(
        <div className="container">
            <h1 className=" m-3 fst-italic text-start m-4">See your orders</h1>
        {    
        props.userLoginStatus ?
             <table className="table  m-3 ">
             <thead>
                 <tr className="p-2">
                 </tr>
             </thead>
             <tbody>
                 {
          order &&  order.map((element,ind)=>{
                return(
                    element && element.map((data,ind)=>{
                        return(
                 <tr key={ind} className="shadow">
                      <td><img src={data.profileImage} width="120px" /></td>
                         <td className="pt-4 fs-4"><strong>{data.title}</strong>
                         <br/>
                             By: {data.author}
                             <br/>
                            <span className="fs-5"> Price: Rs {data.price} /- </span>

                         </td>
                        
                         <td className="fs-5 pt-4 mt-5 "> Amount: Rs {data.price* data.bookQuantity} /-
                         <br />
                    
                         </td>
                    
                         <td><button className="btn btn-danger mt-5" onClick={()=> returnOrder(data._id,ind)} >Return</button></td>

                     </tr>
                        )
                    })
                )
                })
            }
            </tbody>
            </table>:
            <div>
                <Login />
            </div>
           }     
         
         
     
        

     
        </div>
    
    )
}
export default ReturnsAndOrders;