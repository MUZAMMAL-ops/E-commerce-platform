import axios from 'axios'
import React, { useEffect, useState,useCallback, useContext } from 'react'
import Home from './Home'
import Button from '../Button/Button';
import { signcontext1 } from '../../Paginationcontext';
import { searchcontext } from '../searchcontext';
import { counter } from '../countcontext';
import { Details } from '../DetailsContext';

const Homeparent = () => {
    const [state,setstate] = useState([])
    const {setDetails1} = useContext(Details)
    setDetails1(state)
    const {setcounter1} = useContext(counter)
    setcounter1(state.length)
    const {state1} = useContext(searchcontext)
    console.log(state);
    const {pstate} = useContext(signcontext1)
    console.log(pstate);
    const [datastate,setdatastate] = useState(null)
       const products = ()=>{
        axios.get(`http://localhost:4000/products?search=${pstate}`)
        .then((Response)=>{
            setstate(Response.data.products)
            if (Response.data==='No product selected') {
                setdatastate('No product selected')
            }else if(Response.data==='no products'){
              setdatastate('product empty')

            }
         })
        
       }


        const search1 = ()=>{
          if (state1) {
            axios.get(`http://localhost:4000/prosearch?search=${state1}`)
            .then((Response)=>{
              setstate(Response.data.products)
            })
          }else{
            products()
           

          }
          }
         
      useCallback(
        () => {
          search1()
        },
        [state1],
      )
      
     
       
          useEffect(() => {
            products()
        
        }, [pstate])


  useEffect(() => {
    search1()
}, [state1])




  return (
    <div className='map1'>
      {
        state.map((item, index) => (
          <Home key={item.product_id} price={item.price} image={item.product_url} name={item.name} id={item.product_id} />
        ))
      }  
      <div>
        {
          state.length>0
          ?<Button/>
          :state.length<1
          ?<h1 className='li3'>no more products</h1>
          :null
          
        }
      </div>
    </div>
  );
};

export default Homeparent