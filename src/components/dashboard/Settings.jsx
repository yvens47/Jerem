import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import { usePlaidLink } from 'react-plaid-link';
import bufferImg from '../../images/buffer.svg';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";



function Settings(props) {
	const [isbankAccountConnected, setIsbankAccountConnected] = useState(true);
	const [linkToken, setLinktoken] = useState('');
	const [accessToken, setAccessToken] = useState('');
  const user = useOutletContext();
	const [activeStep, setActiveStep] = React.useState(0);
	useEffect(async () => {
		// const response = await axios.get(
		// 	'https://jeremserver.jeanpierre34.repl.co/create-link-token'
		// );
		setLinktoken(prev => localStorage.getItem('linkToken'));
		// if(!localStorage.getItem('linkToken')){
		//       localStorage.setItem("linkToken",  response.data);
		//     }else{
		//       localStorage.setItem("linkToken",  response.data);
		//     }
	}, []);

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (public_token, metadata) => {
			// send public_token to server
			if (!localStorage.getItem('public_token')) {
				localStorage.setItem('public_token', public_token);
			} else {
				localStorage.setItem('public_token', public_token);
			}

			axios
				.post('https://jeremserver.jeanpierre34.repl.co/token-exchange', {
					publicToken: public_token
				})
				.then(response => {
					const { accessToken } = response.data;
					setAccessToken(prev => accessToken);
					setIsbankAccountConnected(prev => true);

					if (!localStorage.getItem('accessToken')) {
						localStorage.setItem('accessToken', accessToken);
					} else {
						localStorage.setItem('accessToken', accessToken);
					}
				});
		}
	});

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className="container">
			<div className="row justify-content-center align-items-center py-2">
				<div className="col-md-8">
				
          <div className='settings-wrapper d-flex flex-column'>
            	<Typography variant='h2'>Account Setting</Typography>
            <div>
              <div className='border p-3'>
                <TextField fullWidth variant='outlined' label='Email' value={user && user.email} />
              </div>
              
            
            </div>
             
          </div>
								

				</div>
			</div>
		</div>
	);
}
export default Settings;
