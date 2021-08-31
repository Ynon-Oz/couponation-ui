import { Redirect, Route, Switch } from "react-router-dom";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AdminDashboard from "../../AdminArea/AdminDashboard/AdminDashboard";
import CompaniesManager from "../../AdminArea/CompaniesManager/CompaniesManager";
import CouponsManager from "../../AdminArea/CouponsManager/CouponsManager";
import PurchasesManager from "../../AdminArea/PurchasesManager/PurchasesManager";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UsersManager from "../../AdminArea/UsersManager/UsersManager";
import About from "../../MainArea/About/About";
import Contact from "../../MainArea/Contact/Contact";
import Coupons from "../../MainArea/Coupons/Coupons";
import Page404 from "../../MainArea/Page404/Page404";
import Welcome from "../../MainArea/Welcome/Welcome";
import Login from "../../UsersArea/Login/Login";
import Register from "../../UsersArea/Register/Register";
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
                <Route path="/admin/companies/add" component={AddCompany} exact />
                <Route path="/admin/companies/update" component={UpdateCompany} exact />
                <Route path="/admin/coupons" component={CouponsManager} exact />
                <Route path="/admin/purchases" component={PurchasesManager} exact />
                <Route path="/admin/users" component={UsersManager} exact />
                <Route path="/users/register" component={Register} exact />
                <Route path="/users/login" component={Login} exact />
                <Redirect from="/" to="/home" exact/>
                <Route component={Page404}/> {/* Last */}
            </Switch>
        </div>
    );
}

export default Routing;
