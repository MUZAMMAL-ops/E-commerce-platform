import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './style.css'

const Signup = () => {
    const Data = {
        Email:"",
        Name:"",
        Password:"",
        Address:""
    }
    
    const [state,setstate] = useState({Data})
    const [apistate,setapistate] = useState(null)
    const [registrationStatus, setRegistrationStatus] = useState(null);  

    const navigate = useNavigate();

    //const [,setsignstate] = useContext(signcontext1)
    //console.log(state);
    

    const submit  = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/signup",state)
        .then((Response)=>{
            console.log(Response);
            if (Response.data.Token) {
                localStorage.setItem('Token',Response.data.Token);
                setapistate(Response.data.Token)
                setRegistrationStatus('registered');

                
            } else if(Response.data==='user already exist')  {
                //console.log(Response.data);
                setRegistrationStatus('alreadyExists');
            } else if(Response.data==='some error occur'||Response.data==='err'){
                setRegistrationStatus('some error occur please try again')
            } else if(Response.data==='Please fill the required information'){
                setRegistrationStatus('Please fill the required fields')
            }
        })
          
    }
    console.log(registrationStatus);


    useEffect(() => {
      if (apistate!==null) {
        setTimeout(() => {
            navigate("/")
        }, 3000);        
      }
    }, [apistate])
    


    
    const Recievedata = (e)=>{
        
        setstate({...state,[e.target.name]:e.target.value})
    }
  return (
 <>
 <form action="">
    <div className='parent'>
        <h1>SignUp</h1>
        <div className='Email'>
            <label htmlFor="Email">Email:</label>
            <input type="email" name="Email" value={state.name} id="Email" placeholder='Email' required onChange={Recievedata} />
        </div>
        <div className='Email'>
            <label htmlFor="Name">Name:</label>
            <input type="text" name="Name" value={state.name} id="Name1" placeholder='your Name' required onChange={Recievedata}/>
        </div>
        <div className='Email'>
            <label htmlFor="Password">Name:</label>
            <input type="password" name="Password" value={state.name} id="Password1" placeholder='Password' required onChange={Recievedata} />
        </div>
        <div className='Address'>
            <label htmlFor="Address">Addres:</label>
            <input type="text" name="Address" value={state.name} id="Address1" placeholder='Enter your Address' required onChange={Recievedata}/>
        </div>
        <div className='btnparent'>
        <button className='btn' type="submit" onClick={submit} >Signup</button>

        </div>
    </div>
    </form>
    {
        registrationStatus === 'registered'
        ? <li>User Registered</li>
        : registrationStatus === 'alreadyExists'
          ? <li>User already exists</li>
          : registrationStatus==='some error occur please try again'  
          ?<li>some error occur please try again</li> 
          :registrationStatus==='Please fill the required fields'
          ?<li>Please Fill the required fields</li> 
          :null

    }
    

    
    </>

    
    
    
  )
}

export default Signup