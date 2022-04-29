import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
	name: 'login',
	initialState: {
		user: null //{name:"Jean Pierre", email:"jyvenspierre@gmail.com"}
	},
	reducers: {
		login: {
			reducer(state, action) {
			
        state.user = action.payload
			},
      prepare(user) {
        return {
          payload:user
        }
      }
		},
		logout: {
      	reducer(state, action) {
				//state.push(action.payload);
       
        state.user = action.payload
			},
      prepare(user) {
        return {
          payload:user
        }
      }
      
			
		},
    isLogin: {
			reducer(state, action) {
				//state.push(action.payload);
       
        state.user = action.payload
			},
      prepare(user) {
        return {
          payload:user
        }
      }
		}
	}
});

// Action creators are generated for each case reducer function
export const { login, isLogin, logout } = loginSlice.actions;

export default loginSlice.reducer;
