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
import Settings from './components/dashboard/Settings';
import Transactions from './components/dashboard/transactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {login, isLogin, logout} from "./store/features/login/loginSlice"
import { useSelector, useDispatch } from 'react-redux'
import 'animate.css'

import { usePlaidLink } from 'react-plaid-link';

function App() {
	const [linkToken, setLinktoken] = useState('');
  const user = useSelector(state => state.login.user)
  const dispatch = useDispatch()



	useEffect(async () => {
		const response = await axios.get(
			'https://jeremserver.jeanpierre34.repl.co/create-link-token'
		);
		
		setLinktoken(prev => response.data);
    if(localStorage.getItem('user')){
      dispatch(isLogin(JSON.parse(localStorage.getItem('user'))));
    }
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

  const signOut = ()=>{

     dispatch(logout(null));
     localStorage.removeItem('user')
  }
  console.log("line 60 ", user)

	return (
		<main>
      <div className='container-fluid'>
			<Navbar user={user} logout={signOut} />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
        </div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<Login user={user} />} />
				<Route path="/register" element={<Register user={user} />} />

        
				<Route path="dashboard" element={<Dashboard  />}>
					<Route  path='send' element={<DashboardHome/>} />
					<Route path=":me" element={<h1>Me</h1>} />
					<Route index  element={<Transactions />} />
          <Route path="settings" element={<Settings/>} />
				</Route>
			</Routes>

			<Footer />
		</main>
	);
}

export default App;
