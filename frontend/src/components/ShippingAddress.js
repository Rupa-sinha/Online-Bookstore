import { useForm } from 'react-hook-form'
import { useState }  from 'react'
import  { useHistory } from 'react-router-dom'
import axios from 'axios';
function  ShippingAddress(props)
{
    let {register,handleSubmit,formState:{errors}}=useForm();
    let username = localStorage.getItem("username")
    let history=useHistory("")
    let refresh= props.refresh
    const onFormsubmit=(e)=>{
        console.log(e);
    }

    const [name, setName] = useState('Mehul')

const makeCartEmpty = async()=>{
    await axios.delete(`/user/placeorder/${username}`)
    .then(res=>{
        let resObj = res.data;
        alert(resObj.message)
        props.updateCartCnt(resObj.bookCnt)
        history.push("/returnsandorders")

    })
    props.setRefresh(refresh+1)
}
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    const __DEV__ = document.domain === 'localhost'
    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch(`/user/razorpay/${username}`, { method: 'POST' }).then((t) =>t.json())
        
		const options = {
			key: __DEV__ ? 'rzp_test_vnRjGBqLgiLmim' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: (data.amount*100).toString(),
			order_id: data.id,
			name: 'Start Payment',
			description: 'Please continue your payment',
			image:"https://www.theindiaexpert.com/wp-content/uploads/2016/01/amazon.in_.jpg",
			handler: function (response) {
                makeCartEmpty()
			},
			prefill: {
				name,
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}




    return(
        <div>
            <img
                    className="m-5"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    width="150px"
                />
        <div style={{marginLeft:"30%"}} >
             
          <div className="d-flex justify-content-center t border shadow bg-light m-3 w-50">

             <form className=" w-50 border-top " onSubmit={handleSubmit(onFormsubmit)}> 

               <h3 className="mt-2 mb-4 border-bottom pb-3 border-3">Enter your shipping address</h3>

                <label html for="fn" className="form-label"><strong>Full Name</strong></label>
                <input type="text" id="fn" className="form-control mb-3" {...register('fullname',{required:true})} />
                {errors.fullname && <p className="text-danger">* Full Name is required</p>}

   
           <label htmlFor="add"><strong>Address</strong></label>
           <input type="text" id="add" className="form-control mb-3" {...register('address',{required:true})}></input>
           {errors.address && <p className="text-danger">* Addressis required</p>}
   
           <label htmlFor="ct"><strong>City</strong></label>
           <input type="text" id="ct" className="form-control mb-3"{...register('city',{required:true})}></input>
           {errors.city && <p className="text-danger">* city is required</p>}
   
          
           <label htmlFor="pc"><strong>Postal Code</strong></label>
           <input type="number" id="pc" className="form-control mb-3" {...register('postalcode',{required:true})}></input>
           {errors.postalcode && <p className="text-danger">* Postal Code is required</p>}


           <label htmlFor="cn"><strong>Country</strong></label>
           <input type="text" id="cn" className="form-control mb-3" {...register('country',{required:true})}></input>
           {errors.country && <p className="text-danger">* Country is required</p>}
           
   
           <button type="submit" className="btn btn-success mt-3 p-2 mb-3" onClick={displayRazorpay}>Make Payment</button>
           </form>
           </div>
      </div>
      </div>
       )

}  
export default ShippingAddress;