import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Navigate} from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-toastify'
import {login} from "../../store/features/login/loginSlice"
import { useSelector, useDispatch } from 'react-redux'

export default  function Login(props) {  
  //const user = useSelector(state => state.login.user)
  const dispatch = useDispatch();
  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
 
 

   useEffect(  async ()=>{

     
    if(props.user && props.user !== null) 
      setRedirect(true);
   
    
  
    
  },[])

  const handleSubmit =(e)=>{
  
    e.preventDefault();
   
   
   // console.log(dispatch)

    // login user here
    const endpoint = `https://Jeremserver.jeanpierre34.repl.co/users/login`

    axios({
      url:endpoint,
      method:"post",
      data:{email, password},
     
    }).then((response)=>{
      console.log(response)
      if(response.data.success){
        toast.success("Logged in");
         dispatch( login(response.data.user));
        // save user data to local storage
        localStorage.setItem('user',JSON.stringify(response.data.user));
        
        
        setRedirect(true);
      }
      else{
         toast.error(response.data.message);
      }
    }).
      catch((e)=>console.log(e))
  
    
  }
  // navigate to dashboard
  if(redirect || props.user) return <Navigate to='/dashboard'/>

 
  
  
	return (
		<div className="wrapper login">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-3 py-5">
						<h2 className="login-heading display-5 text-center">
              Login
            </h2>
            <form onSubmit ={handleSubmit}>
              <div><TextField
								id="outlined-basic"
								label="Email"
								variant="outlined"
                fullWidth
                 onChange={(e)=>setEmail(e.currentTarget.value)}
                value={email}
							/></div>
						

              <div className='mt-2'>
                <TextField
                onChange={(e)=>setPassword(e.currentTarget.value)}
								id="outlined-basic"
								label="Password"
								variant="outlined"
                fullWidth
                value={password}
                  type='password'
							/>
              
              </div>
						<div className='mt-2'>
							<Button
                elevation={0}
                type='submit'
                fullWidth variant='outlined'>Login</Button></div>
							
			

              </form>
					</div>
				</div>
			</div>
		</div>
	);
}
