import React, { useState } from 'react';
import '../pages.css';
import Button from '@mui/material/Button';
import mobile from '../../images/undraw_launch_day_4e04.svg';
import { Navigate } from 'react-router-dom';
import InputIcon from '@mui/icons-material/Input';
import ContactsIcon from '@mui/icons-material/Contacts';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Typography from '@mui/material/Typography';
function HomePage(props) {
	const [navigate, setNavigate] = useState(false);

	// navigate to login page
	if (navigate) return <Navigate to="/login" />;

	return (
		<div className="wrapper">
			<div className="banner py-5 ">
				<div className="container">
					<div className="row justify-content-center py-5 align-items-center">
						<div className="col-md-6">
							<div className="banner-content">
								<Typography variant='h1' color='white' className="display-3 fw-bold animate__animated animate__bounce">
									Welcome to Jere'm
								</Typography>
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

			<div className="container-fluid ">
				<div className="container">
					<div
						className="row boder-bottom py-5 justify-content-center align-items-center"
						style={{ background: 'white', height: '400px' }}
					>
						<div className="col-md-4">
							<InputIcon className="feature-icon" />
							<h2 className="display-5">lorem ipsume </h2>

							<p>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum
							</p>
						</div>
						<div className="col-md-4">
							<ContactsIcon className="feature-icon" />
							<h2 className="display-5">lorem ipsume </h2>

							<p>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum{' '}
							</p>
						</div>
						<div className="col-md-4">
							<ConfirmationNumberIcon className="feature-icon" />
							<h2 className="display-5">lorem ipsume </h2>

							<p>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum delenit
							</p>
						</div>
					</div>

					<div className="row justify-content-center">
						<div className="d-flex">
							<div className="flex-grow-1">
								<img src="" width="100%" />
								<video width="400" autoPlay loop>
									{' '}
									<source
										src="https://silamoney.com/wp-content/uploads/2020/04/sila-app.mp4"
										type="video/mp4"
									/>
									<source
										src="https://silamoney.com/wp-content/uploads/2020/04/sila-app.ogv"
										type="video/ogg"
									/>{' '}
									Your browser does not support the HTML5 Video element.
								</video>
							</div>
							<div className="mx-2 py-5 px-5">
								<Typography className="fw-bold mb-3" variant="h1">
									perspiciatis unde omnis iste natus error sit{' '}
								</Typography>
								<Typography variant="p"className='lead' >
									ed ut perspiciatis unde omnis iste natus error sit voluptatem
									accusantium doloremque laudantium, totam rem aperiam, eaque
									ipsa quae ab illo inventore veritatis et quasi architecto
									beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
									quia voluptas sit aspernatur aut odit aut fugit, sed quia
									consequuntur magni dolores eos qui ratione voluptatem sequi
									nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
									dolo voluptas nulla pariatur
								</Typography>
								<p className="mt-3">
									<Button size="large" color="primary" variant="contained">
										Try Jerem Today
									</Button>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
      <div className='container-fluid'>
			<div
				className="row py-5 justify-content-center align-items-center"
				style={{
					background: '#2f2e41',
					height: ' 400px',
					marginTop: '-10px',
					zIndex: '1000',
					position: 'relative',
          backgroundImage:'linear-gradient(240deg, rgb(23 118 209 / 55%) 10%, rgb(23 118 209) 75%) rgb(47, 46, 65)'
				}}
			>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-8'>
             
              <Typography className='fw-bold' variant='h2' color='white'> omnis iste natus error sit voluptatem</Typography>
              <p className="mt-3">
									<Button size="large" color="primary" variant="contained">
										Try Jerem Today
									</Button>
                <Button className='mx-2' size="large" color="primary" variant="contained">
										Try Jerem Today
									</Button>
								</p>
            </div>
          </div>
        
        </div>
        </div>
        </div>
		</div>
	);
}

export default HomePage;
