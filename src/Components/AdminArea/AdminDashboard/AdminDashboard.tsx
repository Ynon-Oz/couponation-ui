import { NavLink } from "react-router-dom";
import "./AdminDashboard.css";
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

function AdminDashboard(): JSX.Element {
    return (
        <div className="AdminDashboard">
            <h1>Administrative Tools</h1>
            <div className="Grid">
                <NavLink className="nav-link" to="/admin/users">
                    <PeopleAltOutlinedIcon ></PeopleAltOutlinedIcon><br />
                    Users
                </NavLink>
                <NavLink className="nav-link" to="/admin/companies">Companies</NavLink>
                <NavLink className="nav-link" to="/admin/coupons">Coupons</NavLink>
                <NavLink className="nav-link" to="/admin/customers">Customers</NavLink>
                <NavLink className="nav-link" to="/admin/purchases">Purchases</NavLink>
            </div>
        </div>
    );
}

export default AdminDashboard;

{/* <span className="material-icons-outlined">
people
</span> */}
// import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';