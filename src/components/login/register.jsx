import React,{useState,useEffect} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Navigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios'

function Register(props){
  
  const [email, setEmail] = useState('')
   const [firstname, setFirstname] = useState('')
   const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
 

   useEffect(  async ()=>{

     
    if(props.user && props.user !== null) 
      setRedirect(true);
   
    
  
    
  },[])

  const handleSubmit =(e)=>{
    e.preventDefault();

      // login user here
    const endpoint = `https://Jeremserver.jeanpierre34.repl.co/users/register`

    axios({
      url:endpoint,
      method:"post",
      data:{email, password, last_name:lastname, first_name:firstname}
    }).then((response)=>{
      if(response.data.message ==='Registered'){
        setRedirect(true); 
        
        
      }
    }).
      catch((e)=>console.log(e))
  }
   // navigate to dashboard
  if(redirect) return <Navigate to='/login'/>
  
  return (
   <div className="wrapper register">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-5 py-5">
						<Typography variant='h2' className="login-heading display-5 text-center">
              Register
            </Typography>
            <Typography align='center' variant='p' className='lead'>To Become a member</Typography>
            <form onSubmit ={handleSubmit}>
                <div className='d-flex flex-rows mb-2 mt-2'>
                  <div className='flex-grow-1 me-1'>  <TextField
								id="outlined-basic"
								label="First Name"
								variant="outlined"
                fullWidth
                 onChange={(e)=>setFirstname(e.currentTarget.value)}
                value={firstname}
							/></div>
                  <div className='flex-grow-1 me-1'>  <TextField
								id="outlined-basic"
								label="Last Name"
								variant="outlined"
                fullWidth
                 onChange={(e)=>setLastname(e.currentTarget.value)}
                value={lastname}
							/></div>
                
                </div>

              
              <div><TextField
								id="outlined-basic"
								label="Email"
								variant="outlined"
                fullWidth
                 onChange={(e)=>setEmail(e.currentTarget.value)}
                value={email}
                      helperText="We'll never share your email with anyone else."
							/></div>
						

              <div className='mt-2'>
                <TextField
                  type='password'
                onChange={(e)=>setPassword(e.currentTarget.value)}
								id="outlined-basic"
								label="Password"
								variant="outlined"
                fullWidth
                value={password}
							/>
              
              </div>
						<div className='mt-2'>
							<Button
                elevation={0}
                type='submit'
                fullWidth variant='outlined'>Register</Button></div>
							
			

              </form>
            
					</div>
				</div>
			</div>
		</div>
  )
}
export default Register;