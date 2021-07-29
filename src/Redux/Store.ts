import { combineReducers, createStore } from "redux";
import { couponsReducer } from "./CouponsAppState";
import { usersReducer } from "./UsersState";


// Multiple Reducers
const reducers = combineReducers({userState: usersReducer
     ,  couponsAppState: couponsReducer })


const store = createStore(reducers);

export default store;

