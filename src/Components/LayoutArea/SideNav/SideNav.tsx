import { NavLink } from "react-router-dom";
import "./SideNav.css";

function SideNav(): JSX.Element {
    return (
        <div className="SideNav">
            <nav>
                <NavLink to="/home" exact>Home</NavLink><br />
                <NavLink to="/coupons" exact>Coupons</NavLink><br />
                <NavLink to="/about" exact>About</NavLink><br />
                <NavLink to="/contact-us" exact>Contact Us</NavLink><br />
                <NavLink to="/login" exact>Login</NavLink>


            </nav>
        </div>
    );
}

export default SideNav;
