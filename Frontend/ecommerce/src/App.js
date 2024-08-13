import Signup from "./components/signup/signup";
import { BrowserRouter as Router,Routes,Route,useParams, useNavigate } from "react-router-dom";
import Login from "./components/login/login";
import Adminlogin from "./components/Adminsignup/Adminlogin";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Homeparent from "./components/Home/Homeparent";
import { Signup1 } from "./Paginationcontext";
import { Search } from "./components/searchcontext";
import { Total } from "./components/countcontext";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { DetailsProducts } from "./components/DetailsContext";
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { Arrayofitems } from "./components/listcontext";
import Listparent from "./components/listparent/listparent";
import { Cartcount } from "./components/cartcontext";
import { Total1, Totalcontext } from "./components/Totalcontext";
import { useContext, useState,useEffect } from "react";
import axios from "axios";
import { cx } from "./components/cxintent";
import PaymentForm from "./components/checkout/PaymentForm";
import CheckoutForm1 from "./components/checkout/PaymentForm";
import Payment from "./components/Payment";
import completion from "./components/checkout/completion";
import Completion from "./components/checkout/completion";
import Address from "./components/Address/Address";
import { ShipmentAddress } from "./components/Address";
import Comments from "./components/comments/comments";
import Commentlist from "./components/commentlist/commentlist";

  const stripePromise =  loadStripe('pk_test_51OmWeLEfy3jnLq95zdaDl84I7ypBrLgc0UNWaJonT7SnCt9DO5oirFfN74m6DbmTVHYUtFlLLAPIcU8uZNa2jnmc00RJyqUSEC')




function App() {
//   const {Totalstate} = useContext(Totalcontext)
//   const [clientSecret1,setclientSecret1] = useState('')


    
//   console.log('se',clientSecret1);
//   useEffect(() => {
//     console.log('set',Totalstate);
  
//     const intent = async() =>{
//       if (Totalstate) {
//         await axios.post("http://localhost:4000/collect",Totalstate)
//        .then((Response)=>{
//         if (Response.data==='hahaha') {
//           <li>Hello world</li>
          
//         }else{
//           setclientSecret1(Response.data.int)
//          console.log('server',Response.data);
      
         
//         }
         
         
//        })
        
//       }
      
       
//      }
//  intent()
//   }, [Totalstate])

// const opt = `${clientSecret1}`
//   const options = {
//    clientSecret1
//   }
  

  
  // console.log('cxintent',opt);
  
  return (
    <>
    <ShipmentAddress>
    <Cartcount>
    <Arrayofitems>
    <DetailsProducts>
    <Total>
    <Search>
    <Signup1>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homeparent/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Adminlogin/>}/>
        <Route path="/ProductDetails/:key" element={<ProductDetails />} />
        <Route path="/list" element={<Listparent/>}/>
        <Route path="/checkout"  element={<Payment/>}/>
        <Route path="/complete" element={<Completion/>}/>
        <Route path="Address" element={<Address/>}/>
        <Route path="comments" element={<Comments/>}/>
        {/* <Route path="/commentlist" element={<Comments/>}/> */}
      </Routes>
    </Router>
    </Signup1>
    </Search>
    </Total>
    </DetailsProducts>
    </Arrayofitems>
  </Cartcount>
  </ShipmentAddress>
    
    </>
     
    
    
    
  );
}

export default App;
