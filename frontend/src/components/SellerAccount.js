import { useHistory } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
function SellerAccount(props){
    let username = localStorage.getItem("username")
    let history = useHistory()

    const pushToAddBook = ()=>{
        history.push(`/addbook/${username}`)
    }
      
    let sellerBook = props.product.filter(prodObj=> prodObj.seller === username)
  
    //update book by seller
    const updateBook= (bookId)=>{
        history.push(`/updatebook/${bookId}`)
    }

    const colors = {
        orange : "#FFBA5A",
        grey : "#a9a9a9"
    }
     const stars = Array(5).fill(0)
     
return(
    <div>
         <h1 className=" m-3 fst-italic">Welcome {username}</h1>
         <p className="fs-3 text-center text-success ms-5 mt-3 border-bottom border-5 pb-4">You have added {sellerBook.length} book to the store</p>
         <div className="text-end m-5">
         <button type="button" className="btn btn-link btn-lg"  onClick={()=>pushToAddBook()}>+ Add more books</button>
         </div>
         <div className="ms-5 me-5 p-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 bg-light ">
            {
              sellerBook &&  sellerBook.map((element,ind)=>{
                    return(
                        <div className="col p-5 " key={ind}> 
                            <div className="card w-75 shadow m-2  align-self-center">
                            <img src={element.profileImage} className="card-img-top"  alt="" style={{height:"300px"}} />
                                <div className="card-body mt-2">
                                <h5 className="card-title p-1"><strong>Title: {element.title}</strong></h5>
                                    <h6 className="p-1">Author:{element.author}</h6>
                                    <h6 className="text-danger  p-1">Price: Rs {element.price}/-</h6>
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
                            
                                    
                                    
                                         <button className="btn btn-success float-start" onClick={()=> updateBook(element._id)} >Update</button>
                                         <button className="btn btn-danger float-end" onClick={()=>props.deleteBook(element._id)} >Delete</button>
                

                                </div>


                            </div>
                            </div>
                        
                        )
                    })
                
               }     
           
            </div>
            
         
            </div>
            
    </div>
)
}
export default SellerAccount;