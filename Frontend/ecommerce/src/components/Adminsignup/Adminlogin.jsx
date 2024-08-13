import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import './style2.css'

const Adminlogin = () => {
    const Data = {
        Email:"", 
        Password:"",
        Role:""
    }
    
    const [state,setstate] = useState({Data})
    const [apistate,setapistate] = useState(null)
    const [registrationStatus, setRegistrationStatus] = useState(null);  

    const navigate = useNavigate();
    console.log(state);

    //const [,setsignstate] = useContext(signcontext1)
    //console.log(state);
    

    const submit  = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/Adminlogin",state)
        .then((Response)=>{
            console.log(Response);
            if (Response.data.Token) {
                localStorage.setItem('Token',Response.data.Token);
                setapistate(Response.data.Token)
                setRegistrationStatus('Logging you in');

                
            } else if(Response.data==='Please register yourself')  {
                //console.log(Response.data);
                setRegistrationStatus('Please register yourself');
            } else if(Response.data==='please provide correct password'){
                setRegistrationStatus('please provide correct password')
            } else if(Response.data==='some error occured'){
                setRegistrationStatus('some error occured')
            } else if('Please provide your credentials Admin'){
                setRegistrationStatus('Please provide your credentials Admin')
            }
        })
          
    }
    console.log(registrationStatus);


    useEffect(() => {
      if (apistate!==null) {
        setTimeout(() => {
            navigate("/Dashboard")
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
        <h1>Admin Login</h1>
        <div className='Email'>
            <label htmlFor="Email">Email:</label>
            <input type="email" name="Email" value={state.name} id="Email" placeholder='Email' required onChange={Recievedata} />
        </div>
        <div className='Email'>
            <label htmlFor="Password">Pwd:</label>
            <input type="password" name="Password" value={state.name} id="Password1" placeholder='Password' required onChange={Recievedata} />
        </div>
        <div className='select'>
            <label htmlFor="Role1">Role:</label>
        <select name="Role" id="Role1" value={state.name} onChange={Recievedata} >
          <option >Admin</option>
          <option >owner</option>
            </select>
        </div>
       
        <div className='btnparent'>
        <button className='btn' type="submit" onClick={submit} >Login</button>

        </div>
        
    </div>
    </form>
   

    {
        registrationStatus === 'Logging you in'
        ? <li>Logged in successfully</li>
        : registrationStatus === 'Please register yourself'
          ? <li>Please register yourself</li>
          : registrationStatus==='please provide correct password'  
          ?<li>please provide correct password</li> 
          :registrationStatus==='some error occured'
          ?<li>some error occured</li> 
          :registrationStatus==='Please provide your credentials Admin'
          ?<li>Please provide your credentials Admin</li>
          :null

    }
    
    </>

    
    
    
  )
}

export default Adminlogin