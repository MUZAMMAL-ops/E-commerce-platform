import { useContext,useReducer } from 'react'
import React from 'react'
import './Button.css'
import { signcontext1 } from '../../Paginationcontext'





const Button = () => {
const {pstate,setpstate} = useContext(signcontext1) 

const add = ()=>{
  setpstate(pstate+1)
}
const minus = ()=>{
  setpstate(Math.max(1, pstate - 1));

}
  return (
    <>
     <div className='btncontain'>
        <button  className='btn2' type="button" onClick={minus}  >Pre</button>
        <button  className='btn1' type="button" onClick={add}>Next</button>
        </div>
        </>
      )
    
   
}

export default Button