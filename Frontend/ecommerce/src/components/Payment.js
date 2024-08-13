import { useContext, useState,useEffect } from "react";
import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Totalcontext } from "./Totalcontext";
import axios from "axios";
import CheckoutForm1 from "./checkout/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise =  loadStripe('pk_test_51OmWeLEfy3jnLq95zdaDl84I7ypBrLgc0UNWaJonT7SnCt9DO5oirFfN74m6DbmTVHYUtFlLLAPIcU8uZNa2jnmc00RJyqUSEC');

const Payment = () => {
    const {Totalstate} = useContext(Totalcontext)

    const [clientSecret,setclientSecret] = useState('')

    useEffect(() => {
        console.log('set',Totalstate);
      
        const intent = async() =>{
          if (Totalstate) {
            await axios.post("http://localhost:4000/collect",Totalstate)
           .then((Response)=>{
            if (Response.data==='hahaha') {
              <li>Hello world</li>
              
            }else{
              setclientSecret(Response.data.int)
             console.log('server',Response.data);
          
             
            }
             
             
           })
            
          }
          
           
         }
     intent()
      }, [Totalstate])
  return (
    <>
    {stripePromise && clientSecret &&(
        <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm1/>
    </Elements>
    )}
    </>
    
  )
}

export default Payment