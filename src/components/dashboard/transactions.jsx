import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import Typography from '@mui/material/Typography';
function Transactions(props) {
	const [linkToken, setLinktoken] = useState('');
	const [transactions, setTransactions] = useState([]);
	useEffect(() => {
		if (localStorage.getItem('linkToken')) {
			setLinktoken(prev => localStorage.getItem('linkToken'));
		}

		getTransactions(localStorage.getItem('public_token'));
	}, []);

	const getTransactions = accessToken => {
		console.log(localStorage.getItem('public_token'));

		axios
			.post('https://jeremserver.jeanpierre34.repl.co/transactions', {
				publicToken: localStorage.getItem('public_token')
			})
			.then(function(response) {
				const lists = response.data.transactions;
				console.log(lists);
				setTransactions(prev => lists);
			})
			.catch(e => console.log(e));
	};

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (public_token, metadata) => {
			// send public_token to server

			axios
				.post('https://jeremserver.jeanpierre34.repl.co/token-exchange', {
					publicToken: public_token
				})
				.then(response => {
					const { accessToken, accounts } = response.data;

					if (!localStorage.getItem('accessToken')) {
						localStorage.setItem('accessToken', accessToken);
					} else {
						localStorage.setItem('accessToken', accessToken);
					}
				});
		}
	});

	return (
		<div className="transactions container">
			<div className="row">
				<div className="col-md-3">
        
        </div>
				<div className="col-md-9">
					<Typography variant='h2'>Transactions List</Typography>
					{transactions && (transactions.length === 0 ) && (
						<div>
              
							<Typography variant='p' className="lead">
								You don't have  transactions to display at this time.
							</Typography>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Transactions;
