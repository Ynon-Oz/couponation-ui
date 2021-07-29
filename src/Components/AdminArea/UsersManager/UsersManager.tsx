import { Fab, TextField } from "@material-ui/core";
import { Component } from "react";
import "./UsersManager.css";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import UserModel from "../../../Models/UserModel";
import axios from "axios";
import notify from "../../../Services/Notification";
import globals from "../../../Services/Globals";
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';


interface UsersManagerState {
    users: UserModel[];
    columns: GridColDef[];
}

class UsersManager extends Component<{}, UsersManagerState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            users: [],
            columns:  [
                { field: 'id', headerName: 'ID', width: 90 },
                {
                  field: 'firstName',
                  headerName: 'First name',
                  width: 150,
                  editable: true,
                },
                {
                  field: 'lastName',
                  headerName: 'Last name',
                  width: 150,
                  editable: true,
                },
                {
                  field: 'age',
                  headerName: 'Age',
                  type: 'number',
                  width: 110,
                  editable: true,
                },
                {
                  field: 'fullName',
                  headerName: 'Full name',
                  description: 'This column has a value getter and is not sortable.',
                  sortable: false,
                  width: 160,
                  valueGetter: (params: GridValueGetterParams) =>
                    `${params.getValue(params.id, 'firstName') || ''} ${
                      params.getValue(params.id, 'lastName') || ''
                    }`,
                },
              ];
            
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
                    <Fab size="small" color="primary" aria-label="add" href="/admin">
                        <ArrowBackIosIcon />
                    </Fab>
                    <TextField className="TextBox" id="standard-basic" label="Search..." variant="outlined" /><br />
                    <input type="text" placeholder="Search..."></input>

                    <Fab size="small" color="primary" aria-label="add" >
                        <AddIcon />
                    </Fab>
                </div>
                <hr />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={this.users.}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
                <div>
                    {this.state.users.map(u => <span key={u.userId} > {u.userName}</span>)}
                </div>
            </div>

        );
    }
}

export default UsersManager;


