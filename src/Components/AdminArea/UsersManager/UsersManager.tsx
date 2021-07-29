import { Button, Fab, TableBody, TableContainer, TableHead } from "@material-ui/core";
import { Component } from "react";
import "./UsersManager.css";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Table } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";


interface UsersManagerState {
    users: UserModel[];
}

class UsersManager extends Component<{}, UsersManagerState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            users: store.getState().userState,
        };
    }

//     public render(): JSX.Element {
//         return (
//             <div className="UsersManager">
//                 <div className="">
//                     <Fab size="small" color="primary" aria-label="add">
//                         <ArrowBackIosIcon />
//                     </Fab>
//                     {/* <TextField className="TextBox" id="standard-basic" label="Search..." variant="outlined" /><br /> */}
//                     <input type="text" placeholder="Search..."></input>

//                     <Fab size="small" color="primary" aria-label="add">
//                         <AddIcon />
//                     </Fab>
//                 </div>
//                 <hr />
//                 <TableContainer component={Paper}>
//                     <Table className="UsersTable" aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>User Name</TableCell>
//                                 <TableCell align="right">Password</TableCell>
//                                 <TableCell align="right">Type</TableCell>
//                                 <TableCell align="right">Company</TableCell>
//                                 <TableCell align="right">Active</TableCell>
//                                 <TableCell align="right">Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {users.map((user) => (
//                             <TableRow key={user.id}>
//                                 <TableCell component="th" scope="row">{user.userName}</TableCell>
//                                 <TableCell align="right">{user.password}</TableCell>
//                                 <TableCell align="right">{user.type}</TableCell>
//                                 <TableCell align="right">{user.company}</TableCell>
//                                 <TableCell align="right">{user.active}</TableCell>
//                                 <TableCell >
//                                     <Fab size="small" color="primary" aria-label="add">
//                                         <EditOutlinedIcon />
//                                     </Fab>
//                                     <Fab size="small" color="primary" aria-label="add">
//                                         <DeleteOutlineOutlinedIcon />
//                                     </Fab>
//                                 </TableCell>
//                             </TableRow>
//                             {/* ))} */}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>

//         );
//     }
// }

export default UsersManager;
