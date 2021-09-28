import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import axios from "axios";
import { Component, SyntheticEvent } from "react";
import { NavLink, useHistory } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companiesDeletedAction, companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
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
import { Unsubscribe } from "redux";

interface CompaniesManagerState {
    companies: CompanyModel[];
    columns: GridColDef[];
    search:string;
}

class CompaniesManager extends Component<{}, CompaniesManagerState> {
    private unsubscribe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = {
            companies: store.getState().companiesAppState.companies,
            search:'',
            columns: [
                //     { 
                //         field: 'id', 
                //     headerName: 'ID', 
                //     type: 'number', 
                //     // width: 90
                //  },

                {
                    field: 'id',
                    headerName: 'Id',
                    type: 'number',
                    // width: 150,
                    editable: true,
                },
                {
                    field: 'name',
                    headerName: 'Name',
                    // width: 150,
                    editable: true,
                },
                {
                    field: 'address',
                    headerName: 'Address',
                    // width: 110,
                    editable: true,
                }, {
                    field: 'phone',
                    headerName: 'Phone',
                    // width: 110,
                    editable: true,
                }, {
                    field: 'email',
                    headerName: 'Email',
                    // width: 110,
                    editable: true,
                }, {
                    field: 'website',
                    headerName: 'Website',
                    editable: true,
                },
                
            ],
        };
    }
    public async fetchData(){
        try{

            const response = await axios.get<CompanyModel[]>(globals.urls.companies);
            store.dispatch(companiesDownloadedAction(response.data)) // Global State;
            this.setState({ companies: response.data }); //Local State
            notify.success(SccMsg.COMPANIES_DOWNLOADED)
        } catch (err) {
            notify.error(err);
            console.log(err);
        }

    }
    public  componentDidMount()  {

        if (this.state.companies.length == 0) {
                this.fetchData();
                store.subscribe(() => {
                    this.setState({ companies: store.getState().companiesAppState.companies }); // Will let us notify
                })
           
        }

    }

    public async deleteCompany(id: any) {

        const res = window.confirm(
            "Are you sure you want to delete this cat : " + id + "?"
        );
        if (res) {
            id = +id;
            try {
                console.log("Before axios: "+this.state.companies);
                const response = await axios.delete<any>(globals.urls.companies + id);
                const companiesFromSrv = this.state.companies.filter((c) => c.id !== id);
                console.log("After filter this.state: "+this.state.companies);
                this.setState({ companies: companiesFromSrv});
                console.log(this.state.companies);
                store.dispatch(companiesDeletedAction(id));
                notify.success(SccMsg.COMPANY_DELETED);
            } catch (err) {
                notify.error(err);
            }
        }
    }

    private setValue= (args: SyntheticEvent)=>{
        // args - info about the event
        // args.target - the tag that raised the event
        const value = (args.target as HTMLInputElement).value;
        this.setState({search:value});
        console.log(args);
    }

    public render(): JSX.Element {
        return (
            <div className="CompaniesManager">

                <div className="CompaniesManagerHead">
                    <NavLink to="/admin" className="BackButton">
                        <Fab size="small" color="primary" aria-label="add">
                            <ArrowBackIosIcon />
                        </Fab></NavLink>
                        <h3>Companies Manager</h3>
                    <input type="text" placeholder="Search..." onChange={this.setValue} value={this.state.search}></input>
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
                                <TableCell align="center">Fax</TableCell>
                                <TableCell align="center">Web</TableCell>
                                <TableCell align="center">Actions <NavLink to="/admin/companies/add"> <Fab size="small" color="primary" aria-label="add" >
                                    <AddIcon />
                                </Fab></NavLink></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.companies.map((c) => (
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
                                        <NavLink to={this.idToStringFormatter(c.id)}> <Fab size="small" color="default" aria-label="add" >
                                            <EditOutlinedIcon />
                                        </Fab></NavLink>
                                        <NavLink to="/admin/companies"> <Fab size="small" color="secondary" aria-label="add"
                                            onClick={() => this.deleteCompany(c.id)}>
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
    private idToStringFormatter(id: number ){
        const str = "/admin/companies/"+id.toString()+"/update";
        console.log(str)
        return str;
    }
    public componentWillUnmount(): void{
        this.unsubscribe();
    }
}

export default CompaniesManager;
