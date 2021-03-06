import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import CompanyModel from "../../../Models/CompanyModel";
import { companiesDeletedAction, companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import "./CompaniesManagerFc.css";





function CompaniesManagerFc(): JSX.Element {

    const [state, setState] = useState(store.getState().companiesAppState.companies);
    const unsubscribe = store.subscribe(()=>{store.getState()}) ;

    async function fetchData() {
        try {

            const response = await axios.get<CompanyModel[]>(globals.urls.companies);
            store.dispatch(companiesDownloadedAction(response.data)) // Global State;
            setState(response.data); //Local State
            console.log(response.data);
            notify.success(SccMsg.COMPANIES_DOWNLOADED)
        } catch (err) {
            notify.error(err);
            console.log(err);
        }

    }

    async function deleteCompany(id: any) {

        const res = window.confirm(
            "Are you sure you want to delete this company : " + id + "?"
        );
        if (res) {
            id = +id;
            try {
                console.log("Before axios: " + state);
                const response = await axios.delete<any>(globals.urls.companies + id);
                const companiesFromSrv = state.filter((c) => c.id !== id);
                console.log("After filter - state: " + state);
                setState(  companiesFromSrv );
                console.log(state);
                store.dispatch(companiesDeletedAction(id));
                notify.success(SccMsg.COMPANY_DELETED);
            } catch (err) {
                notify.error(err);
            }
        }
    }

    useEffect(() => {
        //didMount
        if (state.length == 0) {
            fetchData();
            store.subscribe(() => {
                setState( store.getState().companiesAppState.companies); // Will let us notify
            })

        }
        return () => {
            //unMount
            unsubscribe();
        };
    });

    function idToStringFormatter(id: number) {
        const str = "/admin/companies/" + id.toString() + "/update";
        console.log(str)
        return str;
    }

    return (
        <div className="CompaniesManagerFc">

            <div className="CompaniesManagerHead">
                <NavLink to="/admin" className="BackButton">
                    <Fab size="small" color="primary" aria-label="add">
                        <ArrowBackIosIcon />
                    </Fab></NavLink>
                <h3>Companies Manager FC</h3>
                {/* <input type="text" placeholder="Search..." onChange={this.setValue} value={this.state.search}></input> */}
                {/* <br /><p>{this.state.search}</p> */}
            </div>
            <hr />



            <TableContainer component={Paper}>
                <Table className="Table2" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Web</TableCell>
                            <TableCell align="center">Actions <NavLink to="/admin/companies/add"> <Fab size="small" color="primary" aria-label="add" >
                                <AddIcon />
                            </Fab></NavLink></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.map((c: CompanyModel) => (
                            <TableRow key={c.id}>
                                <TableCell align="left">{c.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {c.name}
                                </TableCell>
                                <TableCell align="left">{c.address}</TableCell>
                                <TableCell align="left">{c.phone}</TableCell>
                                <TableCell align="left">{c.email}</TableCell>
                                <TableCell align="left">{c.website}</TableCell>
                                <TableCell align="center">
                                    <NavLink to={idToStringFormatter(c.id)}> <Fab size="small" color="default" aria-label="add" >
                                        <EditOutlinedIcon />
                                    </Fab></NavLink>
                                    <NavLink to="/admin/companies"> <Fab size="small" color="secondary" aria-label="add"
                                        onClick={() => deleteCompany(c.id)}>
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

export default CompaniesManagerFc;
