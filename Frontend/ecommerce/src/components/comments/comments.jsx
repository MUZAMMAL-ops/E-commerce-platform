import React, { useState,useEffect } from 'react'
import './comments.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Commentlist from '../commentlist/commentlist'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Comments = () => {
    const comm = ({
        comment:"",
        imageURL:"",
    })
    const [state,setstate] = useState(comm);
    const [commentstate,setcommentstate] = useState([])
    console.log('?',commentstate);

    // console.log('comment',state);
    
       
        const submit = (e) => {
            //e.preventDefault()
            const Bea = localStorage.getItem('Token')
    
            axios.post('http://localhost:4000/commenting',{
                comment:state.comment,
                imageURL:state.imageURL
            } ,{
                headers:{
                    'Authorization':Bea
                }
            }
            )
            .then((data)=>{
                console.log('d',data);
            })
        }
        
           
        // }

        const fetchcomm = () => {
            axios.get('http://localhost:4000/fetchcomm?page=1')
            .then((response)=> {
                setcommentstate(response.data)
                console.log('curly',response.data);


            })
        }
        useEffect(() => {
           
     }, [])

        
            useEffect(() => {
                fetchcomm()
    
            }, [commentstate])
        
       
        
        
    

    
    const post = (e) => {
             setstate({...state,[e.target.name]:e.target.value})
    }
    

  return (
    <>
    <Helmet>
        <title>comments</title>
    </Helmet>
    <div className='message'>     
         <textarea name="comment" value={state.comment} id=""  onChange={post}  cols="32" rows="10" maxLength={60}></textarea>
    </div>
  <div className='message-image'>
    <input type="text" name="imageURL" value={state.imageURL}  onChange={post}  id="" />
</div>
<div className="message-btn">
    <button className='message-btn1'type="button" disabled={!state.comment}  onClick={submit}>post</button>

</div>
<div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
{
    commentstate
    ?commentstate.map((item,index)=>(
        
        <Commentlist index={index} image={item.image_URL} comment1={item.Comment} upvote={item.upvote} id={item.Comment_id}/>
    ))
    :null
    
}
</div>
</>
  )
}


export default Comments