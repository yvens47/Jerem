import React, { useState } from 'react';
import '../pages.css';
import Button from '@mui/material/Button';
import mobile from '../../images/mobile.svg';
import { Navigate } from 'react-router-dom';
import InputIcon from '@mui/icons-material/Input';
import ContactsIcon from '@mui/icons-material/Contacts';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
function HomePage(props) {
	const [navigate, setNavigate] = useState(false);

	// navigate to login page
	if (navigate) return <Navigate to="/login" />;

	return (
		<div className="wrapper">
			<div className="banner py-5">
				<div className="container">
					<div className="row justify-content-center py-5">
						<div className="col-md-6">
							<div className="banner-content">
								<h1 className="display-3 fw-bold">Welcome to Jere'm</h1>
								<h2 className="display-5">Safe and easy money transfer</h2>
								<p className="lead">lorem ipsum greda grod gredsm oged</p>
								<hr />
								<Button
									onClick={() => setNavigate(true)}
									variant="contained"
									color="primary"
								>
									Get Started
								</Button>
							</div>
						</div>
						<div className="col-md-6">
							<img src={mobile} width="100%" />
						</div>
					</div>
				</div>
			</div>

			<div className="container-fluid">
				<div className="container">
					<div className="row py-5 justify-content-center" style={{ background: 'white' }}>

           <div className='col-md-4'>
             
           
             <InputIcon className='feature-icon' />
               <h2 className='display-5'>lorem ipsume </h2>
            
             <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum</p>

             
           
           </div>
             <div className='col-md-4'>
             
        
            <ContactsIcon className='feature-icon' />
                    <h2 className='display-5'>lorem ipsume </h2>
           
             <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum </p>

             
           
           </div>
             <div className='col-md-4'>
             
           <ConfirmationNumberIcon className='feature-icon' />
                 <h2 className='display-5'>lorem ipsume </h2>
            
             <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit</p>

             
           
           </div>
            <div className='col-md-4'></div>
						
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
