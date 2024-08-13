import React, { useContext, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './Navbar.css'
import { searchcontext } from '../searchcontext';
import { counter } from '../countcontext';
import { useParams,Link } from 'react-router-dom';
import { cartcontext } from '../cartcontext';

const Navbar = () => {
  const {state1,setstate1} = useContext(searchcontext)
  const {counter1,setcounter1} = useContext(counter)
  const {cartstate} = useContext(cartcontext)




  const apicall = (e)=>{
    setstate1(e.target.value)
  };
  
  return (
    <>
    <div className='main'>
        <div>
            <h3>Ecommerce</h3> 
        </div>
        <div>
          <form >
          <input className='search' value={state1} onChange={apicall}  type="text" name="" id="" />
          </form>
        

        </div>
        <div>{counter1}</div>
        <div className='count' >
          <Link to={'/list'}>
            <AddShoppingCartIcon/>
            </Link>
            <h4>{cartstate}</h4>
         
        </div>
              
    </div>


  
    </>
   
  )
}

export default Navbar