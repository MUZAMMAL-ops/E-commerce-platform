import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import './style1.css'

const Login = () => {
    const Data = {
        Email:"", 
        Password:"",
    }
    
    const [state,setstate] = useState({Data})
    const [apistate,setapistate] = useState(null)
    const [registrationStatus, setRegistrationStatus] = useState(null);  

    const navigate = useNavigate();

    //const [,setsignstate] = useContext(signcontext1)
    //console.log(state);
    

    const submit  = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/login",state)
        .then((Response)=>{
            console.log(Response);
            if (Response.data.Token) {
                localStorage.setItem('Token',Response.data.Token);
                setapistate(Response.data.Token)
                setRegistrationStatus('Logging you in');

                
            } else if(Response.data==='please provide correct password')  {
                //console.log(Response.data);
                setRegistrationStatus('please provide correct password');
            } else if(Response.data==='some error occurs'||Response.data==='some error occured'){
                setRegistrationStatus('some error occur please try again')
            } else if(Response.data==='Please provide your credentials'){
                setRegistrationStatus('Please provide your credentials')
            }
        })
          
    }
    console.log(registrationStatus);


    useEffect(() => {
      if (apistate!==null) {
        setTimeout(() => {
            navigate("/Home")
        }, 3000);        
      }
    }, [apistate])
    


    
    const Recievedata = (e)=>{
        
        setstate({...state,[e.target.name]:e.target.value})
    }
  return (
 <>
 <form action="">
    <div className='parent1'>
        <h1>Login</h1>
        <div className='Email'>
            <label htmlFor="Email">Email:</label>
            <input type="email" name="Email" value={state.name} id="Email" placeholder='Email' required onChange={Recievedata} />
        </div>
        
        <div className='Email'>
            <label htmlFor="Password">Name:</label>
            <input type="password" name="Password" value={state.name} id="Password1" placeholder='Password' required onChange={Recievedata} />
        </div>
       
        <div className='btnparent'>
        <button className='btn' type="submit" onClick={submit} >Login</button>

        </div>
        <Link to={'/signup'}>
        <li>Dont have Account!create one</li>
    </Link>
    </div>
    </form>
   

    {
        registrationStatus === 'Logging you in'
        ? <li>Logged in successfully</li>
        : registrationStatus === 'please provide correct password'
          ? <li>please provide correct password</li>
          : registrationStatus==='some error occur please try again'  
          ?<li>some error occur please try again</li> 
          :registrationStatus==='Please provide your credentials'
          ?<li>Please provide your credentials</li> 
          :null

    }
    
    </>

    
    
    
  )
}

export default Login