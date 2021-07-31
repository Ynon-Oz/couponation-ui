import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import EmptyView from "../../MainArea/EmptyView/EmptyView";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import "./CompaniesManager.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@material-ui/data-grid";

interface CompaniesManagerState {
    companies: CompanyModel[];
    columns: GridColDef[];
}

class CompaniesManager extends Component<{}, CompaniesManagerState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            companies: [],
            columns: [
            //     { 
            //         field: 'id', 
            //     headerName: 'ID', 
            //     type: 'number', 
            //     // width: 90
            //  },

                {
                    field: 'companyId',
                    headerName: 'Id',
                    type: 'number',
                    // width: 150,
                    editable: true,
                },
                {
                    field: 'companyName',
                    headerName: 'Name',
                    // width: 150,
                    editable: true,
                },
                {
                    field: 'companyAddress',
                    headerName: 'Address',
                    // width: 110,
                    editable: true,
                }, {
                    field: 'companyPhoneNumber',
                    headerName: 'Phone',
                    // width: 110,
                    editable: true,
                }, {
                    field: 'companyFaxNumber',
                    headerName: 'Fax',
                    // width: 110,
                    editable: true,
                }, {
                    field: 'companyWebSite',
                    headerName: 'Web',
                    // width: 110,
                    editable: true,
                },
                // {
                //     field: 'fullName',
                //     headerName: 'Full name',
                //     description: 'This column has a value getter and is not sortable.',
                //     sortable: false,
                //     width: 160,
                //     valueGetter: (params: GridValueGetterParams) =>
                //         `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
                //         }`,
                // };
            ],
        };
    }

    public async componentDidMount() {

        if (this.state.companies.length == 0) {
            try {
                const response = await axios.get<CompanyModel[]>(globals.urls.companies);

                store.dispatch(companiesDownloadedAction(response.data)) // Global State;

                this.setState({ companies: response.data }); //Local State
                notify.success(SccMsg.COMPANIES_DOWNLOADED)
            } catch (err) {
                notify.error(err);
                console.log(err);
            }
        }

    }

    public render(): JSX.Element {
        return (
            <div className="CompaniesManager">

                <div className="">
                    <NavLink to="/" className="BackButton">
                        <Fab size="small" color="primary" aria-label="add">
                            <ArrowBackIosIcon />
                        </Fab></NavLink>
                    <input type="text" placeholder="Search..."></input>

                </div>
                <hr />
                {/* <div >
                    <DataGrid
                        rows={this.state.companies.map((c)=>(
                           <span key={c.companyId}></span>
                        ))}
                        columns={this.state.columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div> */}

                <hr />


                <TableContainer component={Paper}>
                    <Table className="Table2" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Fax</TableCell>
                                <TableCell align="center">Web</TableCell>
                                <TableCell align="center">Actions <NavLink to="/admin"> <Fab size="small" color="primary" aria-label="add" >
                                    <AddIcon />
                                </Fab></NavLink></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.companies.map((c) => (
                                <TableRow key={c.companyId}>
                                    <TableCell component="th" scope="row">
                                        {c.companyName}
                                    </TableCell>
                                    <TableCell align="left">{c.companyAddress}</TableCell>
                                    <TableCell align="left">{c.companyPhoneNumber}</TableCell>
                                    <TableCell align="left">{c.companyFaxNumber}</TableCell>
                                    <TableCell align="left">{c.companyWebSite}</TableCell>
                                    <TableCell align="center">
                                        <NavLink to="/"> <Fab size="small" color="default" aria-label="add" >
                                            <EditOutlinedIcon />
                                        </Fab></NavLink>
                                        <NavLink to="/"> <Fab size="small" color="secondary" aria-label="add" >
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
}

export default CompaniesManager;
