import { Button, ButtonGroup } from "@material-ui/core";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import SuccessfulLoginModel from "../../../Models/SuccessfulLoginModel";
import { userLogout } from "../../../Redux/LoginAppState";
import store from "../../../Redux/Store";
import Clock from "../../MainArea/Clock/Clock";
import FClock from "../../MainArea/FClock/FClock";
import Bless from "../Bless/Bless";
import "./Header.css";


function Header(): JSX.Element {

    const [loggedIn, setLoggedIn] = useState(false);
    const unsubscribe = store.subscribe(() => console.log());
    const history = useHistory();


    const buttons = !loggedIn ? <ButtonGroup className="ButtonGroup" size="small" aria-label="small outlined primary  button group">
        <NavLink to="/login"><Button>Login</Button></NavLink>
        <NavLink to="/users/register"><Button>Register</Button></NavLink>
    </ButtonGroup>
        : <Button onClick={() => logout()} >Log Out</Button>;


    useEffect(() => {
        //didMount
        store.subscribe(() => { setLoggedIn(store.getState().loginAppState.loggedIn != null ? true : false) })
        return () => {
          //unMount
          unsubscribe();
        };
      });

    function logout() {
        console.log(store.getState().loginAppState.loggedIn.userType);
        store.dispatch(userLogout());
        history.push('/login')
    }

    return (
        <div className="Header">
            <h1>Couponation</h1>
            <div className="LoginButtons">
                {buttons}

            </div>
            <FClock />
            <Bless />
        </div>
    );
}

export default Header;
