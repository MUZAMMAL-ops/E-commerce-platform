import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Address.css'
import { Address1 } from '../Address'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Address = () => {
    const [state,setstate] = useState('')
    const {Addstate,setAddstate} = useContext(Address1)
    const navigate = useNavigate()
    

    // const submitAddress = (e) => {
                 
    //               setstate(e.target.value)
    // }

    const submit = (e) => {
        e.preventDefault();
        setAddstate(e.target.value)
    }

  return (
    <>
    <Helmet>
       <title>Address</title>
    </Helmet>
    <form action="">
     <div className='Address'> 
        <label htmlFor="Address" >Address:</label>
      <input type="text" value={Addstate} className='input' name="Address" onChange={submit} id="" />
      <Link to={'/checkout'}>
      <button type="button" >submit</button>
      </Link>
      </div>
    </form> 
    </>
  )
}

export default Address