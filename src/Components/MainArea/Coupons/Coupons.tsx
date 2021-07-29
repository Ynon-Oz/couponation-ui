import axios from "axios";
import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import "./Coupons.css";

interface CouponsState {
	coupons: CouponModel[];
}

class Coupons extends Component<{}, CouponsState> {
// private url = "https://localhost:8080/coupons"
    public constructor(props: {}) {
        super(props);
        this.state = {
			coupons:[],
        };
    }

    public async componentDidMount() {

        if(this.state.coupons.length==0){
          try {
            const response = await axios.get<CouponModel[]>(globals.urls.coupons);
      
            store.dispatch(couponsDownloadedAction(response.data)) // Global State;
      
            this.setState({ coupons: response.data }); //Local State
            notify.success(SccMsg.USERS_DOWNLOADED)
          } catch (err) {
            notify.error(err);
            console.log(err);
          }
        }
     
    }

    public render(): JSX.Element {
        return (
            <div className="Coupons">
				<h1>Coupons</h1>
            </div>
        );
    }
}

export default Coupons;
