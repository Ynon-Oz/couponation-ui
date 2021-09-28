import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import "./SideNav.css";

function SideNav(): JSX.Element {

    const [loggedIn, setLoggedIn] = useState(false);

    const unsubscribe = store.subscribe(() =>
        console.log()
    )

    const buttons = loggedIn && store.getState().loginAppState.loggedIn.userType=="ADMIN"  ?     <><NavLink className="nav-link" to="/admin" exact>Admin</NavLink><br /></>    :  null   ;

    useEffect(() => {
        //didMount
        store.subscribe(() => { setLoggedIn(store.getState().loginAppState.loggedIn != null ? true : false) })
        return () => {
            //unMount
            unsubscribe();
        };
    });

    return (
        <div className="SideNav">
            <nav>
                <NavLink className="nav-link" to="/home" exact>Home</NavLink><br />
                <NavLink className="nav-link" to="/coupons" exact>Coupons</NavLink><br />
                <NavLink className="nav-link" to="/about" exact>About</NavLink><br />
                <NavLink className="nav-link" to="/contact-us" exact>Contact Us</NavLink><br />
                <div>

                   {buttons}
                </div>

            </nav>
        </div>
    );
}

export default SideNav;
