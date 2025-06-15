import { FaStar } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
function Search(props)
{

let searchItem = props.searchItem;
let product = props.product
let history = useHistory()

let searchData = []

 searchData = product.filter((val)=>{
     if(val.title.toString().toLowerCase().includes(searchItem))
    {
        return val
    }
   
})
const colors = {
    orange : "#FFBA5A",
    grey : "#a9a9a9"
}
 const stars = Array(5).fill(0)

 const seeDetails = (bookid)=>{
    history.push(`/productdetails/${bookid}`)
}
return(
    <div className="ms-5 me-5 p-5">
       { (searchItem.length>0) ?
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 bg-light ">
        {
          searchData &&  searchData.map((element,ind)=>{
                return(
                    <div className="col " key={ind}> 
                        <div className="card w-75 shadow m-2  align-self-center">
                        <img src={element.profileImage} className="card-img-top" onClick={()=>seeDetails(element._id)} alt="" style={{height:"300px"}} />
                            <div className="card-body mt-2">
                            <h5 className="card-title p-1"><strong>Title: {element.title}</strong></h5>
                                <h6 className="p-1">Author:{element.author}</h6>
                                <h6 className="text-danger p-1">Price: Rs {element.price}/-</h6>
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
                        
                                  <button className="btn btn-success float-center m-3 " onClick={()=> props.addProductToCart(element)}  >Add to cart</button> 
                            </div>


                        </div>
                        </div>
                    

                    )
                })
            
           }     
       
        </div>
        :
        <h1 className="m-5" >loading...... </h1>
}
        </div>
)
}
export default Search;