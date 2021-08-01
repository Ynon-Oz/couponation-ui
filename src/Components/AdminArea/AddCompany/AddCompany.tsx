import { Button, Fab, Icon, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import "./AddCompany.css";
import store from "../../../Redux/Store";
import { companiesAddedAction } from "../../../Redux/CompaniesAppState";




function AddCompany(): JSX.Element {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<CompanyModel>({
        mode: "onTouched",

    });
    const history = useHistory();

    async function send(company: CompanyModel) {
        console.log(company);
        try {
           
            const response = await axios.post<CompanyModel>(globals.urls.companies, company);
            store.dispatch(companiesAddedAction(response.data));

            console.log(response.data);


            notify.success(SccMsg.COMPANY_ADDED)
            history.push('/admin/companies')
        }
        catch (err) {
            notify.error(err);
        }
    }


    return (
        <div className="AddCompany">

            <form onSubmit={handleSubmit(send)}>


                <TextField id="standard-basic" label="Company Name" {...register("companyName", {
                    required: {
                        value: true,
                        message: 'Missing name'
                    }, minLength: {
                        value: 0,
                        message: 'Name should contain at least 2 characters'
                    },
                })} />

                <br />
                <span className="ErrSpan">{errors.companyName?.message}</span>

                <br />

                <TextField id="standard-basic" label="Address" {...register("companyAddress", {
                    required: {
                        value: true,
                        message: 'Missing address'
                    },
                })} />

                <br />
                <span className="ErrSpan">{errors.companyAddress?.message}</span>
                <br />

                <TextField id="standard-basic" label="Phone Number"
                    {...register("companyPhoneNumber", { required: true })} />
                <br />
                {errors.companyPhoneNumber && <span className="ErrSpan">Missing phone number</span>}
                <br />

                <TextField id="standard-basic" label="Fax Number"
                    {...register("companyFaxNumber", { required: true })} />

                <br />
                {errors.companyFaxNumber && <span className="ErrSpan">Missing fax number</span>}
                <br />
                <TextField id="standard-basic" label="Web-Site" {...register("companyWebSite", { required: true })} />
                <br />
                {errors.companyWebSite && <span className="ErrSpan">Missing WebSite</span>}
                <br /> <br />
                {/* <Button
        variant="contained"
        color="primary"
        type ="submit"
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button> */}
                <NavLink to="/admin/companies" className="BackButton">
                    <Fab size="small" color="primary" aria-label="back">
                        <CloseIcon />
                    </Fab>
                </NavLink> 
                
                    <Fab size="small" color="primary" aria-label="add" type="submit" disabled={!isValid}>
                        <SendIcon />
                    </Fab>
                

            </form>

        </div>
    );
}

export default AddCompany;
