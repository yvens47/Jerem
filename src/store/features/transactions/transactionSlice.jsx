import { createSlice } from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
	name: 'login',
	initialState: {
		transactions: null //{name:"Jean Pierre", email:"jyvenspierre@gmail.com"}
	},
	reducers: {
		getTransactions: {
			reducer(state, action) {
			
        state.user = action.payload
			},
      prepare(user) {
        return {
          payload:user
        }
      }
		},
		
    
	}
});

// Action creators are generated for each case reducer function
export const { getTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
