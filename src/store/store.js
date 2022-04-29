import {configureStore} from '@reduxjs/toolkit';
import loginReducer from "./features/login/loginSlice"
import transactionReducer from "./features/transactions/transactionSlice"


export default configureStore({
  reducer: {
    login:loginReducer,
    transaction:transactionReducer
  }
})