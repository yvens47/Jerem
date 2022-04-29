import React from 'react';
import Avatar from '@mui/material/Avatar';
import Time from "react-time"

function Transaction({ transaction }) {
	return (
		<div className="transaction d-flex flex-row justify-content-between border-bottom py-3 px-1">
			<div className='d-flex '>
				<Avatar>
					 {transaction.receiver.last_name[0]}
				</Avatar>
        <div className='mx-2 d-flex align-items-center'>{transaction.receiver.last_name +" "+transaction.receiver.last_name}</div>
			</div>
			<div className='mx-2 d-flex align-items-center' >{transaction.description}</div>
			<div className='mx-2 d-flex align-items-center' >
        <Time value={transaction.createdAt} format="MM/DD" />
         </div>
			<div className='mx-2 d-flex align-items-center'>{transaction.amount}</div>
			{/*JSON.stringify(transaction)*/}
		</div>
	);
}
export default Transaction;
