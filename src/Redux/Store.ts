import { combineReducers, createStore } from "redux";
import { couponsReducer } from "./CouponsAppState";
import { companiesReducer } from "./CompaniesAppState";
import { usersReducer } from "./UsersState";
import { loginReducer } from "./LoginAppState";


// Multiple Reducers
const reducers = combineReducers({
     userState: usersReducer,
     couponsAppState: couponsReducer,
     companiesAppState: companiesReducer,
     loginAppState: loginReducer
 })


const store = createStore(reducers);

export default store;

