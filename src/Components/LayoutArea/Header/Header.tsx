import { Button, ButtonGroup } from "@material-ui/core";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SuccessfulLoginModel from "../../../Models/SuccessfulLoginModel";
import { userLogout } from "../../../Redux/LoginAppState";
import store from "../../../Redux/Store";
import Clock from "../../MainArea/Clock/Clock";
import FClock from "../../MainArea/FClock/FClock";
import Bless from "../Bless/Bless";
import "./Header.css";


function Header(): JSX.Element {

    const [loggedIn, setLoggedIn] = useState(false);
    const unsubscribe = store.subscribe(() => console.log('State after dispatch: ', store.getState()));

    let [user, setUser] = useState(store.getState().loginAppState.loggedIn);

    const buttons = user == null ? <ButtonGroup className="ButtonGroup" size="small" aria-label="small outlined primary  button group">
        <NavLink to="/login"><Button>Login</Button></NavLink>
        <NavLink to="/users/register"><Button>Register</Button></NavLink><Button onClick={() => logout()} >Logout</Button>
    </ButtonGroup>
        : <Button>Log Out</Button>;
    // useEffect(() => {
    //     //didMount
    //     if (store.getState().loginAppState.loggedIn.name){
    //         store.subscribe(() => {
    //             setLoggedIn(true); 
    //         })}    return () => {
    //             //unMount
    //         };
    // });

    useEffect(() => {
        //didMount
        // if (store.getState().loginAppState.loggedIn !== null) {
        //     store.subscribe(() => {
        //         setLoggedIn( store.getState().loginAppState.loggedIn!==null); 
        //     })
        //    user = store.subscribe(() => {  store.getState().loginAppState.loggedIn})
        // }

        return () => {
            //unMount
            // unsubscribe();
        };
    });

    function logout() {
        store.dispatch(userLogout());
        // user===null;
    }

    return (
        <div className="Header">
            <h1>Couponation</h1>
            <div>
                {buttons}

            </div>
            <FClock />
            <Bless />
        </div>
    );
}

export default Header;
