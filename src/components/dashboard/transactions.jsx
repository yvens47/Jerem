import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import cityImg from '../../images/undraw_city_life_gnpr.svg';
import { useOutletContext } from 'react-router-dom';
import Transaction from "./transaction"
function Transactions(props) {
	const [linkToken, setLinktoken] = useState('');
	const [transactions, setTransactions] = useState([]);
	const user = useOutletContext();
  

	useEffect(() => {
		if (localStorage.getItem('linkToken')) {
			setLinktoken(prev => localStorage.getItem('linkToken'));
		}
    console.log(user)
     if(user){
    getUserTransactions();
       
     }

		getTransactions(localStorage.getItem('public_token'));
	}, [user]);

	// get user transactions [ sending and receiving]
	const getUserTransactions = ()=> {
    
    console.log(user)
    const endpoint = `https://Jeremserver.jeanpierre34.repl.co/transactions/${user._id}`;
    console.log(endpoint)
		axios
			.get(endpoint)
			.then(function({data}) {
        console.log(data)
        setTransactions(data)
      }).catch((function (error){
        console.log(error)
      }));
	};

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
				
				<div className="col-md-9 p-5">
					<Typography className='mb-2' variant="h2">Transactions ({transactions.length})</Typography>
          <div>
            
          </div>

					{user &&
						transactions &&
						transactions.length === 0 && (
							<div className="d-flex flex-column mt-3">
								<img src={cityImg} alt="no trnsactions" width="70%" />
								<Typography variant="p" className="lead">
									You don't have transactions to display at this time.
								</Typography>
							</div>
						)}
					{/*display transactions */}
          <div className='transactions'>
            {transactions.map((transaction) => (
      
              <Transaction transaction ={transaction} key={transaction._id} />
            ))}
          
          
          </div>
				</div>
			</div>
		</div>
	);
}

export default Transactions;
