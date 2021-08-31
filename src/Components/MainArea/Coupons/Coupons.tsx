import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import EmptyView from "../EmptyView/EmptyView";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "./Coupons.css";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Fab, IconButton, Typography } from "@material-ui/core";
import couponsPics from '../../../Assets/CouponsImg/burger.jpg';
interface CouponsState {
  coupons: CouponModel[];
  expanded: boolean;
}

class Coupons extends Component<{}, CouponsState> {
  // private url = "https://localhost:8080/coupons"
  public constructor(props: {}) {
    super(props);
    this.state = {
      coupons: [], expanded: false,
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
      <div className="Coupons">
        <h1>Coupons</h1>

        {!this.state.coupons.length && <EmptyView msg="No Coupons for you" />}
        {this.state.coupons.length &&
          <div className="CouponsArea">
            {this.state.coupons.map((c) => (
              <Card key={c.id} className="CouponCard">
                <CardHeader
                  // avatar={
                  //   <Avatar aria-label="recipe" >
                  //     {c.companyId}
                  //   </Avatar>
                  // }
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  title={c.title}
                  subheader={c.amount}
                />
                <CardMedia
                  className="CardMedia"
                  image={couponsPics}//{c.image}"
                  title={c.image}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {c.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {c.price} USD
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="Buy Now" color="primary">
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                  // className={clsx(classes.expand, {
                  //   [classes.expandOpen]: expanded,
                  // })}
                  // onClick={handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                      Heat 1/2 cup of the broth in a pot until simmering, balbla.....
                    </Typography>
                    <Typography paragraph>
                      Heat oil in a (14- to 16-inch) paella pan or a large, deep sbla bla bla...
                    </Typography>
                    <Typography paragraph>
                      Add rice and stir very gently to distribute. Top with artichokes bla bla bla...
                    </Typography>
                    <Typography>
                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            ))
            }

          </div>
        }



      </div>
    );
  }
}

// public handleExpandClick()  {
//   this.setState({ coupons: response.data })
// }; //Local State


export default Coupons;
