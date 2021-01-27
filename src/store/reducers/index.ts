import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from './users';
import mainAppReducer from './mainApp';

const rootReducer = combineReducers({
    usersReducer,
    mainAppReducer
})

export default rootReducer;