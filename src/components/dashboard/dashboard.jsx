import React,{useState, useEffect}  from "react"
import {Outlet} from "react-router-dom"
import { usePlaidLink } from 'react-plaid-link';
import axios  from "axios"
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import './dashboard.css'
import {Navigate} from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


import Cloud from '@mui/icons-material/Cloud';
import { useSelector, useDispatch } from 'react-redux'



function Dashboard(props){
    const user = useSelector(state => state.login.user)
    //const dispatch = useDispatch() 
  
  
  const [bankAccount, setBankAccount] = useState(null);
  const [linkToken, setLinktoken] = useState('');
  const [accessToken,setAccessToken] = useState("");
  const [isLogged, setIslogged] =useState(false)  
  	useEffect(async () => {
		const response = await axios.get(
			'https://jeremserver.jeanpierre34.repl.co/create-link-token'
		);		
		setLinktoken(prev => response.data);
      if(!localStorage.getItem('linkToken')){
            localStorage.setItem("linkToken",  response.data);
          }else{
            localStorage.setItem("linkToken",  response.data);
          }
      if(!user){
        setIslogged(false)
      }
      return () => {
        setIslogged(true)
      }
    
      
	}, []);

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (public_token, metadata) => {
			// send public_token to server
      if(!localStorage.getItem('public_token')){
            localStorage.setItem("public_token", public_token);
          }else{
            localStorage.setItem("public_token", public_token);
          }
      

			axios
				.post('https://jeremserver.jeanpierre34.repl.co/token-exchange', {
					publicToken: public_token
				})
				.then(response => {
					
          const {accessToken}  =response.data;
         
          if(!localStorage.getItem('accessToken')){
            localStorage.setItem("accessToken", accessToken);
          }else{
            localStorage.setItem("accessToken", accessToken);
          }
          
				})
				
		}
	});

  return(
    <div className='wrapper'>

      {/*!bankAccount && <button onClick={open}>Connect Bank</button> */}

      <div className='d-flex flex-row py-5'>
        <div style={{width:'20%',paddingTop:"6rem"}}
          className='sidebar py-5  position-relative flex-shrink-1 '>
          <div className='border-end ' style={{position:"fixed",height:"100%",bottom:"25px",paddingTop:'6rem',width:"20%"}}>
            <div className='userProfile border-bottom py-3 d-flex justify-content-center'>
              <Stack direction="column" spacing={2} className='align-items-center'>
               
      <Avatar color='primary' style={{width:'100px', height:"100px"}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
               <Typography variant='h4'> {user && user.first_name +" "+user.last_name}</Typography>
      
    </Stack>
              
            
            </div>
         <Paper sx={{ width: '100%', maxWidth: '100%',  }} elevation={0}>
      <MenuList elevation={0}>
        <MenuItem component='a' href='/dashboard'>
          <ListItemIcon>
            <DashboardIcon fontSize="large"  style={{color:"rgb(17 83 158)"}} />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
          
        </MenuItem>
        <MenuItem component='a' href='/dashboard/settings' >
          <ListItemIcon>
            <SettingsIcon fontSize="large"  style={{color:"rgb(17 83 158)"}}/>
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
          
        </MenuItem>
        <MenuItem component='a' href='/dashboard/send'>
          <ListItemIcon>
            <SendIcon fontSize="large"  style={{color:"rgb(17 83 158)"}}/>
          </ListItemIcon>
          <ListItemText>Send Cash</ListItemText>
          
        </MenuItem>
        <MenuItem component='a' href='/dashboard'>
          <ListItemIcon>
            <ViewListIcon fontSize="large" style={{color:"rgb(17 83 158)"}} />
          </ListItemIcon>
          <ListItemText>Transactions</ListItemText>
          
        </MenuItem>
       
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="large" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
            </div>
        </div>
        <div className='content flex-grow-1 ' style={{width:'100%',paddingTop:"4rem", marginLeft:'56px'}}>
         <Outlet user={user}  context={user}   />
        </div>
      </div>

     
    </div>
  )
}
export default  Dashboard;