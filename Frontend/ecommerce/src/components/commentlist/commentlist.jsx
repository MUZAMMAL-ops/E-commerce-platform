import React, { useState,useEffect } from 'react'
import './commentlist.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import axios from 'axios';

const Commentlist = ({image,comment1,upvote,id}) => {
  const [bstate,setbstate] = useState(null)
  const [state,setstate] = useState(null)

  const sendupvote = () =>{
    
      
    
    axios.patch('http://localhost:4000/upvote',{
        upvote:1,
        comment_id:id
    })
    .then((Response)=>{
      setstate(Response.data)

    })
  }
 

  

  useEffect(() => {
   
    
  }, [])
  console.log('api',state);

  
  return (
    <>
       <div className="commlist">
        <div className='main2'>
        <div className='p1'>
        <p>{comment1}</p>
        </div>
        
        <div className='image4'>
            <a href={image} target='blank'><img src={image} alt="" /></a>
        </div>
        </div>
        <button style={{backgroundColor:'transparent'}}   onClick={sendupvote}><ThumbUpIcon  style={{marginLeft:'4px', color:'green'}} /></button>
        <span>{upvote}</span>

       </div>

    </>
  )
}

export default Commentlist