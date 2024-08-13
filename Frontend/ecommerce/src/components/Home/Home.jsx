import React from 'react'
import './Home.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import ProductDetails from '../ProductDetails/ProductDetails'
const Home = ({id,price,image,name}) => {
  return (
    <>
    <Link to={`/ProductDetails/:${id}`}>
      <div className='container'>
      <img src={image} alt='' />
      <div className='shirt'>
      <p>{name}</p>
    </div>
    <div className='price'>
      <p className='price1'>Price:{price}$</p>
    </div>

    </div>
    </Link>
    
    
   
    
    </>
  )
}

export default Home