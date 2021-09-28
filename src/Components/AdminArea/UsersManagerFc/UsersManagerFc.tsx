import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import store from "../../../Redux/Store";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import "./UsersManagerFc.css";
import UserModel from "../../../Models/UserModel";
import axios from "axios";
import globals from "../../../Services/Globals";
import { usersDeletedAction, usersDownloadedAction } from "../../../Redux/UsersState";
import notify, { SccMsg } from "../../../Services/Notification";

function UsersManagerFc(): JSX.Element {


    const [state, setState] = useState(store.getState().userState.users);
    const unsubscribe = store.subscribe(() => { store.getState() });

    useEffect(() => {
        //didMount
        if (state.length == 0) {
            fetchData();
            store.subscribe(() => {
                setState( store.getState().userState.users); 
            })

        }
        return () => {
            //unMount
            unsubscribe();
        };
    });

    async function fetchData() {
        try {

            const response = await axios.get<CompanyModel[]>(globals.urls.users);
            store.dispatch(usersDownloadedAction(response.data)) // Global State;
            setState(response.data); //Local State
            console.log(response.data);
            notify.success(SccMsg.COMPANIES_DOWNLOADED)
        } catch (err) {
            notify.error(err);
            console.log(err);
        }

    }

    async function deleteUser(id: any) {

        const res = window.confirm(
            "Are you sure you want to delete this user : " + id + "?"
        );
        if (res) {
            id = +id;
            try {
                // console.log("Before axios: " + state);
                const response = await axios.delete<any>(globals.urls.users + id);
                const usersFromSrv = state.filter((u) => u.id !== id);
                // console.log("After filter - state: " + state);
                setState(  usersFromSrv );
                console.log(state);
                store.dispatch(usersDeletedAction(id));
                notify.success(SccMsg.COMPANY_DELETED);
            } catch (err) {
                notify.error(err);
            }
        }
    }

    function idToStringFormatter(id: number) {
        const str = "/admin/users/" + id.toString() + "/update";
        console.log(str)
        return str;
    }


    return (
        <div className="UsersManagerFc">



            <div className="CompaniesManagerHead">
                <NavLink to="/admin" className="BackButton">
                    <Fab size="small" color="primary" aria-label="add">
                        <ArrowBackIosIcon />
                    </Fab></NavLink>
                <h3>Users Manager FC</h3>
                {/* <input type="text" placeholder="Search..." onChange={this.setValue} value={this.state.search}></input> */}
                {/* <br /><p>{this.state.search}</p> */}
            </div>
            <hr />



            <TableContainer component={Paper}>
                <Table className="Table2" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Company Id</TableCell>
                            <TableCell align="center">Actions <NavLink to="/admin/companies/add"> <Fab size="small" color="primary" aria-label="add" >
                                <AddIcon />
                            </Fab></NavLink></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.map((u: UserModel) => (
                            <TableRow key={u.id}>
                                <TableCell align="left">{u.id}</TableCell>
                                <TableCell component="th" scope="row">{u.userName}</TableCell>
                                <TableCell align="left">{u.type}</TableCell>
                                <TableCell align="left">{u.companyId}</TableCell>
                                <TableCell align="center">
                                    <NavLink to={idToStringFormatter(u.id)}> <Fab size="small" color="default" aria-label="add" >
                                        <EditOutlinedIcon />
                                    </Fab></NavLink>
                                    <NavLink to="/admin/companies"> <Fab size="small" color="secondary" aria-label="add"
                                        onClick={() => deleteUser(u.id)}>
                                        <DeleteOutlineOutlinedIcon />
                                    </Fab></NavLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    );
}

export default UsersManagerFc;
