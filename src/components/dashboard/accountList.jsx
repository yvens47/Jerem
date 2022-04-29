import React, { Fragment } from 'react';

function BankListAccount(props) {
	return (
		<div className="list-group list-group-checkable">
			{props.accounts.map(account => (
				<Fragment key={account.account_id}>
					<input
						className="list-group-item-check"
						type="radio"
						name="listGroupCheckableRadios"
						id="listGroupCheckableRadios1"
						value=""
					/>
					<label
						className="list-group-item py-3  "
						htmlFor="listGroupCheckableRadios1"
					>
						<div className="d-flex justify-content-between align-items-between">
							<span className='sm'>{account.name}</span>
             
							<span>${account.balances.available}</span>
						</div>

						<span className="d-block small opacity-50">
							{account.official_name}
						</span>
					</label>
				</Fragment>
			))}

		
		</div>
	);
}
export default BankListAccount;
