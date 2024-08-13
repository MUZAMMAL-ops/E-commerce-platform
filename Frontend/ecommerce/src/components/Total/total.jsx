import React, { useContext, useState } from 'react'
import './Total.css'
import { Totalcontext } from '../Totalcontext'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// import { payment } from '../paytotal'

const Total = () => {
    const {Totalstate} = useContext(Totalcontext)
    console.log(',,',Totalstate);


  return (
    <>
    <Helmet>
       <title>total</title>
    </Helmet>
    <div className="total">
        <p className='p1'>{Totalstate.amount1}$</p>
    </div>
    <div className='proceed'>
      <Link to={'/Address'}>
      <button type="button" className='btnproceed' >Proceed</button>
      </Link>
    </div>
   
    </>
  )
}

export default Total