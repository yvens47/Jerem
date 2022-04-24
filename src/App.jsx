import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Login from './components/login/login';
import Register from './components/login/register';
import axios from 'axios';
import Dashboard from './components/dashboard/dashboard';
import DashboardHome from './components/dashboard/home';
import Transactions from './components/dashboard/transactions';

import { usePlaidLink } from 'react-plaid-link';

function App() {
	const [linkToken, setLinktoken] = useState('');

	useEffect(async () => {
		const response = await axios.get(
			'https://jeremserver.jeanpierre34.repl.co/create-link-token'
		);
		console.log(response.data);
		setLinktoken(prev => response.data);
	}, []);

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (public_token, metadata) => {
			// send public_token to server
			console.log(public_token);

			axios
				.post('https://jeremserver.jeanpierre34.repl.co/token-exchange', {
					publicToken: public_token
				})
				.then(response => {
					console.log(response);

					return response.json();
				})
				.then(data => console.log(JSON.stringifydata));
		}
	});

	return (
		<main>
			<Navbar user={null} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<Login user={null} />} />
				<Route path="/register" element={<Register user={null} />} />

				<Route path="dashboard" element={<Dashboard />}>
          <Route index  element={<DashboardHome />}/>
					<Route  path=":me" element={<h1>Me</h1>} />
					<Route path="transactions" element={<Transactions/>} />
				</Route>
			</Routes>
		
			<Footer />
		</main>
	);
}

export default App;
