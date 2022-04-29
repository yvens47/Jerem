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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import BankListAccount from './accountList';

const steps = [
	{ label: 'Chwazi Kont', description: '<bankList>' },
	{ label: 'Antre Nom Moun nan', description: 'Checking/Savings' },
	{ label: 'Konbyen Wap Voye', description: 'Who are you sending it to' },
	{ label: 'Voye', description: 'Send Money' }
];

function DashboardHome(props) {
	const [isbankAccountConnected, setIsbankAccountConnected] = useState(false);
	const [linkToken, setLinktoken] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const [activeStep, setActiveStep] = React.useState(0);
	const [accounts, setAccounts] = useState(null);
	const [institution, setInstitution] = useState(null);

	const [transferData, setTransferData] = useState({
		name: '',
		accountId: '',
		institution_id: '',
		amount: ''
	});

	useEffect(async () => {
    document.title ='Send Cash - Fast and Easy'
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
		onSuccess: async (public_token, metadata) => {
			setInstitution({
				account_id: metadata.account_id,
				name: metadata.institution.name,
				id: metadata.institution.institution_id
			});
			// send public_token to server
			if (!localStorage.getItem('public_token')) {
				localStorage.setItem('public_token', public_token);
			} else {
				localStorage.setItem('public_token', public_token);
			}
			// get access Token and public to
			const response = await axios.post(
				'https://jeremserver.jeanpierre34.repl.co/token-exchange',
				{
					publicToken: public_token
				}
			);
			console.log(response);
			const { accessToken } = response.data;
			setAccessToken(prev => accessToken);
			//  get nak accounts and balances here
			const getBanks = await axios.post(
				'https://jeremserver.jeanpierre34.repl.co/getBanks',
				{
					publicToken: public_token
				}
			);
			setAccounts(getBanks.data.accountData);
			console.log(getBanks);
			setIsbankAccountConnected(true);

			if (!localStorage.getItem('accessToken')) {
				localStorage.setItem('accessToken', accessToken);
			} else {
				localStorage.setItem('accessToken', accessToken);
			}
		},
		onExit: (error, metadata) => {
			console.log(error);
			console.log(metadata.status);
			alert(metadata.status);
			console.log(metadata);
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

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;

		const transferDataCopy = { ...transferData };
		transferDataCopy.accountId = institution.account_id;
		transferDataCopy.institution_id = institution.id;

		transferDataCopy[name] = value;
		setTransferData(transferDataCopy);
	};

	const sendPayment = async () => {
		alert('payment Send');
		// reset form.
		const proccessProcessorToken = await axios.post(
			'https://jeremserver.jeanpierre34.repl.co/processToken',
			{
				publicToken: localStorage.getItem('public_token'),
				accountId: institution.account_id
			}
		);
		console.log(proccessProcessorToken);
		var customerUrl =
			'https://api-sandbox.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C';
		var requestBody = {
			plaidToken: proccessProcessorToken.data,
			name: 'Jane Doe’s Checking'
		};

		const d = await axios.post(
			'https://api-sandbox.dwolla.com/customers/096ffa9e-1b61-4695-abf7-4f41a0d4d507/funding-sources',
			{
				data: {
					plaidToken: proccessProcessorToken.data,
					name: 'Jane Doe’s Checking'
				},
				headers: {
					'Content-Type': 'application/vnd.dwolla.v1.hal+json',
					Accept: 'application/vnd.dwolla.v1.hal+json',
					Authorization:
						'Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY'
				}
			}
		);
		console.log(d);

		setActiveStep(0);
	};

	return (
		<div className="container">
			<div className="row justify-content-center align-items-center py-5">
				<div className="col-md-10">
					{isbankAccountConnected ? (
						<>
							<Box sx={{ width: '100%' }}>
								<Stepper activeStep={activeStep} orientation="horizontal">
									{steps.map((step, index) => (
										<Step key={step.label}>
											<StepLabel>{step.label}</StepLabel>
										</Step>
									))}
								</Stepper>
							</Box>
							<Box className="border p-4">
								<div>
									{activeStep === 0 && (
										<>
											<Typography variant="h2">Chwazi Kont </Typography>
											<BankListAccount
												change={handleChange}
												accounts={accounts}
											/>
										</>
									)}
									{activeStep === 1 && (
										<>
											<h1>Contact</h1>
											<div className="mb-2">
												<TextField
													name="name"
													onChange={handleChange}
													variant="outlined"
													label="to"
													fullWidth
												/>
											</div>
                      
										</>
									)}
									{activeStep === 2 && (
										<>
											<h1>Amount</h1>

											<div className="mb-2 mt-2">
												<TextField
													name="amount"
													onChange={handleChange}
													label="Amount"
													type="tel"
													fullWidth
													variant="outlined"
													placeholder="$"
												/>
											</div>
										</>
									)}

									{activeStep === 3 && (
										<>
											<h1>Summary</h1>

											<div className="mb-2 mt-2">
												[summary will display here]
												{JSON.stringify(transferData)}
											</div>
										</>
									)}

									{/*<Typography>{steps[activeStep].description}</Typography> */}
									<Box sx={{ mb: 2 }}>
										<div className="d-flex justify-content-between">
											{activeStep === steps.length - 1 ? (
												<Button
													variant="contained"
													onClick={sendPayment}
													sx={{ mt: 1, mr: 1 }}
												>
													Finish
												</Button>
											) : (
												<Button
													variant="contained"
													onClick={handleNext}
													sx={{ mt: 1, mr: 1 }}
												>
													Continue
												</Button>
											)}

											{activeStep !== 0 && (
												<Button
													// disabled={index === 0}
													onClick={handleBack}
													sx={{ mt: 1, mr: 1 }}
												>
													Back
												</Button>
											)}
										</div>
									</Box>
								</div>
							</Box>
						</>
					) : (
						<Paper elevation={0} sx={{ width: '100%' }}>
							<div className="notConnected">
								<Box sx={{ width: '100%' }}>
									<img
										className="mb-2 p-3"
										src={bufferImg}
										alt="bank account"
										width="50%"
									/>

									<Typography variant="h2" component="h2">
										Konekte Bank Ou
									</Typography>
									<Typography variant="p" component="p">
										Pou Ou Komanse transfer Klike button Anba Ki make Konekte
									</Typography>
								</Box>
								<Box sx={{ marginTop: '10px', width: '100%' }}>
									<Button
										onClick={open}
										size="large"
										startIcon={<LinkIcon />}
										variant="outlined"
										color="primary"
									>
										Konekte
									</Button>
								</Box>
							</div>
						</Paper>
					)}
				</div>
			</div>
		</div>
	);
}
export default DashboardHome;
