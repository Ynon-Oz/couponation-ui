import { Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "../../AdminArea/AdminDashboard/AdminDashboard";
import CompaniesManager from "../../AdminArea/CompaniesManager/CompaniesManager";
import CouponsManager from "../../AdminArea/CouponsManager/CouponsManager";
import PurchasesManager from "../../AdminArea/PurchasesManager/PurchasesManager";
import UsersManager from "../../AdminArea/UsersManager/UsersManager";
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
                <Route path="/admin/companies" component={CompaniesManager} exact />
                <Route path="/admin/coupons" component={CouponsManager} exact />
                <Route path="/admin/purchases" component={PurchasesManager} exact />
                <Route path="/admin/users" component={UsersManager} exact />
                <Redirect from="/" to="/home" exact/>
                <Route component={Page404}/> {/* Last */}
            </Switch>
        </div>
    );
}

export default Routing;
