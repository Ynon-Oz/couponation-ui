import { Fab, TextField } from "@material-ui/core";
import { Component } from "react";
import "./UsersManager.css";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { XGrid } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import UserModel from "../../../Models/UserModel";
import axios from "axios";
import notify from "../../../Services/Notification";
import globals from "../../../Services/Globals";
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { NavLink } from "react-router-dom";
import EmptyView from "../../MainArea/EmptyView/EmptyView";


interface UsersManagerState {
    users: UserModel[];
}
// https://material-ui.com/components/tables/#sorting-amp-selecting

class UsersManager extends Component<{}, UsersManagerState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            users: []


        };
    }

    public async componentDidMount() {
        try {
            const response = await axios.get<UserModel[]>(globals.urls.users);;
            this.setState({ users: response.data });
        }
        catch (err) {
            notify.error(err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="UsersManager">
                <div className="">
                    <NavLink to="/">
                    <Fab size="small" color="primary" aria-label="add">
                        <ArrowBackIosIcon />
                    </Fab></NavLink>
                    <TextField className="TextBox" id="standard-basic" label="Search..." variant="outlined" /><br />
                    <input type="text" placeholder="Search..."></input>

                    <Fab size="small" color="primary" aria-label="add" >
                        <AddIcon />
                    </Fab>
                </div>
                <hr />

                {!this.state.users.length && <EmptyView msg="No Users for you" />}
                {this.state.users.length && <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Type</th>
                            <th>Company</th>
                            <th>
                                Actions <NavLink to="/admin/users/add"><button>➕</button></NavLink>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.email}</td>
                                <td>{u.type}</td>
                                <td>{u.companyId}</td>
                                <td>
                                    {/* <button onClick={() => this.deleteCat(u.userId)}>🗑️</button> */}
                                    <button>✏️</button>
                                    {/* <NavLink to={'cats/details/' + c.id}><button>🛈</button></NavLink> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}

            </div>

        );
    }
}

export default UsersManager;


