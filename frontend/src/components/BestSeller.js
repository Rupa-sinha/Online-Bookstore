import { useHistory } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
function BestSeller(props)
{
    let username = localStorage.getItem("username")
     let product = props.product.filter(prod=> prod.rating>4) 
     let history = useHistory()
       console.log("product",product)
     //update book by admin
const updateBook= (bookId)=>{
    history.push(`/updatebook/${bookId}`)
}

 const seeDetails = (bookid)=>{
         history.push(`/productdetails/${bookid}`)
 }
 const colors = {
    orange : "#FFBA5A",
    grey : "#a9a9a9"
}
 const stars = Array(5).fill(0)
    return(
        <div className="ms-5 me-5 pt-0">
            <h1 className="text-start fst-italic">Best Sellers</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-4 bg-light ">
            {
              product &&  product.map((element,ind)=>{
                    return(
                        <div className="col p-5 " key={ind}> 
                            <div className="card shadow m-2  align-self-center" >
                            <img src={element.profileImage} className="card-img-top" onClick={()=>seeDetails(element._id)}  alt="" style={{height:"300px"}} />
                                <div className="card-body mt-2">
                                <h5 className="card-title p-1"><strong>Title: {element.title}</strong></h5>
                                    <h6 className="p-1">Author:{element.author}</h6>
                                    <h6 className="text-danger p-1">Price: Rs {element.price} /-</h6>

                                         <h6>
                                         {
                                    
                                        stars.map((E,ind)=>{
                                        return(
                                            <FaStar
                                            key={ind}
                                            color ={element.rating > ind ? colors.orange : colors.grey}
                                             />
                                        )
                                    }) 
                                  
                                   
                                  }
                                   <span>({(element.reviews)})</span>
                                         </h6>


                            
                                    { username === "admin"?
                                      <>
                                         <button className="btn btn-success float-start" onClick={()=>updateBook(element._id)}>Update</button>
                                         <button className="btn btn-danger float-end" onClick={()=>props.deleteBook(element._id)}>Delete</button>
                                      </>

                                       :
                                      <button className="btn btn-success float-center m-3 " onClick={()=> props.addProductToCart(element)} >Add to cart</button>
                                      }  
                                </div>


                            </div>
                            </div>
                        
                        )
                    })
                
               }     
           
            </div>
            
         
            </div>
    )
}
export default BestSeller;