import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import "./Coupons.css";

interface CouponsState {
	coupons: CouponModel[];
}

class Coupons extends Component<{}, CouponsState> {
private url = "https://localhost:8080/coupons"
    public constructor(props: {}) {
        super(props);
        this.state = {
			coupons:[],
        };
    }

    // public async componentDidMount() {

    //     if(this.state.coupons.length==0){
    //       try {
    //         const response = await axios.get<CatModel[]>(globals.urls.coupons);
      
    //         store.dispatch(catsDownloadedAction(response.data)) // Global State;
      
    //         this.setState({ cats: response.data }); //Local State
    //         notify.success(SccMsg.DOWNLOADED_CATS)
    //       } catch (err) {
    //         notify.error(err);
    //       }
    //     }
     
    // }

    public render(): JSX.Element {
        return (
            <div className="Coupons">
				<h1>Coupons</h1>
            </div>
        );
    }
}

export default Coupons;
