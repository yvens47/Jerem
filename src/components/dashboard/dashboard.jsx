import React,{useState, useEffect}  from "react"
import {Outlet} from "react-router-dom"
import { usePlaidLink } from 'react-plaid-link';
import axios  from "axios"

function Dashboard(props){
  const [bankAccount, setBankAccount] = useState(null);
  const [linkToken, setLinktoken] = useState('');
  const [accessToken,setAccessToken] = useState("")
  
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

      {!bankAccount && <button onClick={open}>Connect Bank</button> }

      <Outlet />
    </div>
  )
}
export default  Dashboard;