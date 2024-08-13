import React, { useContext, useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PlusOneIcon from '@mui/icons-material/PlusOne';
import './ProductDetails.css'
import { Details } from '../DetailsContext'
import { listcontext } from '../listcontext'
import { cartcontext } from '../cartcontext'

const ProductDetails = () => {
    const [state,setstate] = useState()
    const [idstate,setidstate] = useState({})
   const [data,setdata] = useState([])
   const [liststate,setliststate] = useContext(listcontext)
   const {cartstate,setcartstate} = useContext(cartcontext)
console.log('find',idstate);
console.log('key',state);


    const key = useParams()
    console.log('check',key);
    useEffect(() => {
      if (key) {
        const parameter = (key.key.split(':'))
        console.log(parameter);
        setstate(parameter[1])
      }
       

    }, [key])
    
  

  const {Details1} = useContext(Details)
  useEffect(() => {
    
    if (Details1) {
      setdata(Details1||[])
     console.log('details',Details1);
    }
    
  }, [Details1,state])
  

  
  
useEffect(() => {
    if (data) {
      console.log('Data:', data); // Log data to check its content

        const result = data.find((item)=>item.product_id == state)
        console.log(state);
     console.log('find1',result);

    //console.log('res',result)
    setidstate(result||{})
    }
    
  }, [data,state,idstate.product_id])

  const Add = ()=>{
    if (idstate.name) {
      setcartstate(cartstate+1)

    }
    setliststate([...liststate,idstate])


  }

  

  return (
   <>
   <div className='details'>
    <div className='intdiv'>
        <img src={idstate?.product_url} alt="" />
    </div>
    <div >
    <div className='Name'>{idstate?.name}</div>
    <div className='paragraph'>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined</p>
    </div>
    <div className='pri'>
      <p>Price:{idstate.price}$</p>
    </div>
    <div className='btnclass'>
    <div ><button className='button2' type="button" onClick={Add}><PlusOneIcon className='svg'/></button></div>
    </div>
    
    </div>
   </div>
   </>
  )
}

export default ProductDetails