import React  from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function DashboardHome(props){
  return(
    <div className='container'>
      <div className='row justify-content-center align-items-center py-5'>
        <div className='col-md-8'>
          <h1 className='display-3'>
            Send Money
          </h1>
          <p className='lead'>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator</p>
          <hr/>
         <div className='mb-2 mt-2'>
           <TextField label='Amount' type='tel'fullWidth variant='outlined'  placeholder='$'/>
         </div>
           <div className='mb-2'>
           <TextField variant='outlined' label='to' fullWidth/>
         </div>
           <div className='mb-2'>
           <TextField  placeholder='gift' variant='outlined' label='Description' fullWidth/>
         </div>
          <div className=''>
            <Button color='primary' variant='contained'>Send</Button>
          </div>
        
        </div>
      </div>
     

     
    </div>
  )
}
export default  DashboardHome;