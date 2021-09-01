import { Button, ButtonGroup } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Clock from "../../MainArea/Clock/Clock";
import FClock from "../../MainArea/FClock/FClock";
import Bless from "../Bless/Bless";
import "./Header.css";
function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1>Couponation</h1>
            <ButtonGroup className="ButtonGroup" size="small" aria-label="small outlined primary  button group">
                <NavLink to="/login"><Button>Login</Button></NavLink>
                <NavLink to="/users/register"><Button>Register</Button></NavLink>
            </ButtonGroup>            
            <FClock />
            <Bless />
        </div>
    );
}

export default Header;
