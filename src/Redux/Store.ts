import { combineReducers, createStore } from "redux";
import { couponsReducer } from "./CouponsAppState";
import { companiesReducer } from "./CompaniesAppState";
import { usersReducer } from "./UsersState";


// Multiple Reducers
const reducers = combineReducers({
     userState: usersReducer,
     couponsAppState: couponsReducer,
     companiesAppState: companiesReducer
 })


const store = createStore(reducers);

export default store;

