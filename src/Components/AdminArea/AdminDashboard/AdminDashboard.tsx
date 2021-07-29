import { NavLink } from "react-router-dom";
import "./AdminDashboard.css";
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
function AdminDashboard(): JSX.Element {
    return (
        <div className="AdminDashboard">
            <h1>Administrative Tools</h1>
            <div className="Grid">
                <NavLink className="nav-link" id="Cell1" to="/admin/users">
                    <PeopleAltOutlinedIcon ></PeopleAltOutlinedIcon>
                    Users
                </NavLink>
                <NavLink className="nav-link" id="Cell2" to="/admin/companies">
                    <BusinessOutlinedIcon></BusinessOutlinedIcon><br />
                    Companies</NavLink>
                <NavLink className="nav-link" id="Cell3" to="/admin/coupons">
                    <PhotoLibraryOutlinedIcon></PhotoLibraryOutlinedIcon>
                    Coupons</NavLink>
                <NavLink className="nav-link" id="Cell4" to="/admin/purchases">
                    <CreditCardOutlinedIcon></CreditCardOutlinedIcon><br />
                    Purchases</NavLink>
            </div>
        </div>
    );
}

export default AdminDashboard;

