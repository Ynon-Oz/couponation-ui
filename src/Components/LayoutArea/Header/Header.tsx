import Clock from "../../MainArea/Clock/Clock";
import Bless from "../Bless/Bless";
import "./Header.css";
function Header(): JSX.Element {
    return (
        <div className="Header">
			<h1>Couponation</h1>
            <Clock/>
            <Bless/>
        </div>
    );
}

export default Header;
