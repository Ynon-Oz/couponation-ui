import { Redirect, Route, Switch } from "react-router-dom";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AdminDashboard from "../../AdminArea/AdminDashboard/AdminDashboard";
import CompaniesManager from "../../AdminArea/CompaniesManager/CompaniesManager";
import CouponsManager from "../../AdminArea/CouponsManager/CouponsManager";
import PurchasesManager from "../../AdminArea/PurchasesManager/PurchasesManager";
import About from "../../MainArea/About/About";
import Contact from "../../MainArea/Contact/Contact";
import Coupons from "../../MainArea/Coupons/Coupons";
import Page404 from "../../MainArea/Page404/Page404";
import Welcome from "../../MainArea/Welcome/Welcome";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UpdateCompany2 from "../../AdminArea/UpdateCompany2/UpdateCompany2";
import Login from "../../UsersArea/Login/Login";
import Register from "../../UsersArea/Register/Register";
import "./Routing.css";
import CompaniesManagerFc from "../../AdminArea/CompaniesManagerFc/CompaniesManagerFc";
import UsersManagerFc from "../../AdminArea/UsersManagerFc/UsersManagerFc";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/home" component={Welcome} exact />
                <Route path="/coupons" component={Coupons} exact />
                <Route path="/about" component={About} exact />
                <Route path="/contact-us" component={Contact} exact />
                <Route path="/admin" component={AdminDashboard} exact />
                <Route path="/admin/companies" component={CompaniesManagerFc} exact />
                <Route path="/admin/companies/add" component={AddCompany} exact />
                <Route path="/admin/companies/:id/update" component={UpdateCompany2} exact />
                <Route path="/admin/coupons" component={CouponsManager} exact />
                <Route path="/admin/purchases" component={PurchasesManager} exact />
                <Route path="/admin/users" component={UsersManagerFc} exact />
                <Route path="/users/register" component={Register} exact />
                <Route path="/login" component={Login} exact />
                <Redirect from="/" to="/home" exact/>
                <Route component={Page404}/> {/* Last */}
            </Switch>
        </div>
    );
}

export default Routing;
