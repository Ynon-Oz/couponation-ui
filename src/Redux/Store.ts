import { combineReducers, createStore } from "redux";
import { usersReducer } from "./UsersState";


// Multiple Reducers
const reducers = combineReducers({userState: usersReducer
    /* ,  next resource*/})


const store = createStore(reducers);

export default store;

