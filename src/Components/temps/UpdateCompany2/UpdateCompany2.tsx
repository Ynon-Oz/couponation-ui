import { Fab, TextField } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";

import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
// import "./UpdateCompany2.css";
import { companiesUpdatedAction } from "../../../Redux/CompaniesAppState";
import { useEffect, useState } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/Store";

interface RouteParam{
    id: string;
}
interface UpdateCompanyProps extends RouteComponentProps<RouteParam> {
}






function UpdateCompany(Props: UpdateCompanyProps): JSX.Element {
    const [comp, setComp] = useState(null);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<CompanyModel>({
        mode: "onTouched",

    });

    useEffect(() => {
        //didMount
        return () => {
          //unMount
        };
      });

    const history = useHistory();

    async function send(company: CompanyModel) {
        console.log(company);
        try {

            const response = await axios.put<CompanyModel>(globals.urls.companies, company);
            store.dispatch(companiesUpdatedAction(response.data));

            console.log(response.data);


            notify.success(SccMsg.COMPANY_UPDATED)
            history.push('/admin/companies')
        }
        catch (err) {
            notify.error(err);
        }
    }
        return (
            <div className="UpdateCompany">
                <form onSubmit={handleSubmit(send)}>


                    <TextField id="standard-basic" label="Company Name" {...register("name", {
                        required: {
                            value: true,
                            message: 'Missing name'
                        }, minLength: {
                            value: 0,
                            message: 'Name should contain at least 2 characters'
                        },
                    })} />

                    <br />
                    <span className="ErrSpan">{errors.name?.message}</span>

                    <br />

                    <TextField id="standard-basic" label="Address" {...register("address", {
                        required: {
                            value: true,
                            message: 'Missing address'
                        },
                    })} />

                    <br />
                    <span className="ErrSpan">{errors.address?.message}</span>
                    <br />

                    <TextField id="standard-basic" label="Phone Number"
                        {...register("phone", { required: true })} />
                    <br />
                    {errors.phone && <span className="ErrSpan">Missing phone number</span>}
                    <br />

                    <TextField id="standard-basic" label="Email"
                        {...register("email", { required: true })} />

                    <br />
                    {errors.email && <span className="ErrSpan">Missing fax number</span>}
                    <br />
                    <TextField id="standard-basic" label="Web-Site" {...register("website", { required: true })} />
                    <br />
                    {errors.website && <span className="ErrSpan">Missing WebSite</span>}
                    <br /> <br />

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



    export default UpdateCompany;
