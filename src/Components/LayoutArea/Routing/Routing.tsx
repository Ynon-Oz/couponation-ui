import { Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "../../AdminArea/AdminDashboard/AdminDashboard";
import About from "../../MainArea/About/About";
import Contact from "../../MainArea/Contact/Contact";
import Coupons from "../../MainArea/Coupons/Coupons";
import Page404 from "../../MainArea/Page404/Page404";
import Welcome from "../../MainArea/Welcome/Welcome";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/home" component={Welcome} exact />
                <Route path="/coupons" component={Coupons} exact />
                <Route path="/about" component={About} exact />
                <Route path="/contact-us" component={Contact} exact />
                <Route path="/admin" component={AdminDashboard} exact />
                <Redirect from="/" to="/home" exact/>
                <Route component={Page404}/> {/* Last */}
            </Switch>
        </div>
    );
}

export default Routing;
