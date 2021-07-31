import { Fab } from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddIcon from '@material-ui/icons/Add';
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import EmptyView from "../../MainArea/EmptyView/EmptyView";
import "./CouponsManager.css";
import axios from "axios";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface CouponsManagerState {
    coupons: CouponModel[];

}

class CouponsManager extends Component<{}, CouponsManagerState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            coupons: [],

        };
    }

    public async componentDidMount() {

        if (this.state.coupons.length == 0) {
            try {
                const response = await axios.get<CouponModel[]>(globals.urls.coupons);

                store.dispatch(couponsDownloadedAction(response.data)) // Global State;

                this.setState({ coupons: response.data }); //Local State
                notify.success(SccMsg.COUPONS_DOWNLOADED)
            } catch (err) {
                notify.error(err);
                console.log(err);
            }
        }

    }

    public render(): JSX.Element {
        return (
            <div className="CouponsManager">
                <h1>Coupons</h1>
                <NavLink to="/">
                    <Fab size="small" color="primary" aria-label="add">
                        <ArrowBackIosIcon />
                    </Fab>
                </NavLink>
                {!this.state.coupons.length && <EmptyView msg="No Users for you" />}
                {this.state.coupons.length && <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Img</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>
                                Actions <NavLink to="/admin"> <Fab size="small" color="primary" aria-label="add" >
                                    <AddIcon />
                                </Fab></NavLink>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.coupons.map((c) => (
                            <tr key={c.id}>
                                <td >{c.title}</td>
                                <td>{c.image}</td>
                                <td>{c.description}</td>
                                <td>{c.amount}</td>
                                <td>{c.startDate}</td>
                                <td>{c.endDate}</td>

                                <td>
                                    <NavLink to="/"> <Fab size="small" color="default" aria-label="add" >
                                        <EditOutlinedIcon />
                                    </Fab></NavLink>
                                    <NavLink to="/"> <Fab size="small" color="secondary" aria-label="add" >
                                        <DeleteOutlineOutlinedIcon />
                                    </Fab></NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}

            </div>
        );
    }
}

export default CouponsManager;
