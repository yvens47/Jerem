import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Navigate} from 'react-router-dom';

export default  function Login(props) {  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
 

   useEffect(  async ()=>{

     
    if(props.user && props.user !== null) 
      setRedirect(true);
   
    
  
    
  },[])

  const handleSubmit =(e)=>{
  
    e.preventDefault();

    // login user here
    

    // redirect to dashaboard
    setRedirect((prevState) =>true)
    
  }
  // navigate to dashboard
  if(redirect) return <Navigate to='/dashboard'/>

 
  
  
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
