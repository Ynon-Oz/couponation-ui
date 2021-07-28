import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./SideNav.css";

function SideNav(): JSX.Element {
    return (
        <div className="SideNav">
            <nav>
                <NavLink className="nav-link" to="/home" exact>Home</NavLink><br />
                <NavLink className="nav-link" to="/coupons" exact>Coupons</NavLink><br />
                <NavLink className="nav-link" to="/about" exact>About</NavLink><br />
                <NavLink className="nav-link" to="/contact-us" exact>Contact Us</NavLink><br />
                <NavLink className="nav-link" to="/login" exact>Login</NavLink><br />
                <NavLink className="nav-link" to="/admin" exact>Admin</NavLink><br />


            </nav>
        </div>
    );
}

export default SideNav;
