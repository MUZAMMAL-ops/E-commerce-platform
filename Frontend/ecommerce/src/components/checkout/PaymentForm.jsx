import { useNavigate } from "react-router-dom";
import React, { createContext, useContext, useState } from 'react';
import { PaymentElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { red } from "@mui/material/colors";
import axios from "axios";
import  {Helmet} from "react-helmet";
import { Address1 } from "../Address";
import { listcontext } from "../listcontext";
import { Totalcontext } from "../Totalcontext";
import { cartcontext } from "../cartcontext";


const CheckoutForm1 = ({clientSecret1}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message,setmessage] = useState(null);
    const [isprocessing,setisprocessing] = useState(false);
    const navigate = useNavigate()
    const Addstate = useContext(Address1)
    const liststate = useContext(listcontext)
    const Totalstate = useContext(Totalcontext)
    const {cartstate,setcartstate} = useContext(cartcontext)



    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }
        setisprocessing(true)
        const {error,paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`
            },
            redirect:"if_required"  
        })
        if (error){
            setmessage(error.message)
        }else if(paymentIntent && paymentIntent.status==="succeeded") {
            setmessage("payment status:" + paymentIntent.status + 'succedded')
            const Bea = localStorage.getItem('Token')
            console.log(Bea);
            axios.post('http://localhost:4000/createorder',  {
                Address:Addstate,
                products:liststate,
                Total_price:Totalstate,
                currency:'usd',
                status:true,
                 ordstatus:'Active',
                

            }, {
                headers:{
                    'authorization': Bea,
                }

            })
            .then((data)=>{
                console.log(data);
            })
              setcartstate(0)
            navigate("/complete")
        }else{
            setmessage("unexpected state")
        }
        setisprocessing(false)
    }

    return (
        <>
        <Helmet>
            <title style={{color:"blue"}}>checkout</title>
        </Helmet>
        <form onSubmit={handleSubmit} style={{marginTop:200, width:300,marginLeft:650 }}>
            <PaymentElement/> 
            <button disabled={isprocessing}>
            <span >
                {isprocessing?"processing...":"pay now"}
            </span>
            </button>
        </form>
        </>
      );
}

export default CheckoutForm1