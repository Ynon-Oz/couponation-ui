import Clock from "../../MainArea/Clock/Clock";
import "./Header.css";
function Header(): JSX.Element {
    return (
        <div className="Header">
			<h1>Couponation</h1>
            <Clock/>
        </div>
    );
}

export default Header;
