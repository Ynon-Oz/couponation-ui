import { Fab, TextField } from "@material-ui/core";
import { Component, SyntheticEvent } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import "./UpdateCompany.css";
import CompanyModel from "../../../Models/CompanyModel";
import axios from "axios";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/Store";
import { companiesUpdatedAction } from "../../../Redux/CompaniesAppState";
// import { useForm } from "react-hook-form";


interface RouteParam {
    id: string;
}

interface UpdateCompanyProps extends RouteComponentProps<RouteParam> {

}

interface UpdateCompanyState {
    company: CompanyModel;
}

class UpdateCompany extends Component<UpdateCompanyProps, UpdateCompanyState> {

    public constructor(props: UpdateCompanyProps) {
        super(props);
        const id = +this.props.match.params.id;
        const com = store.getState().companiesAppState.companies.filter(c => c.id === id)[0];
        this.state = {
            company: com
        };
    }

    public async componentDidMount() {
    
    }

    public async send(company: CompanyModel) {
        console.log(company);
        try {

            const response = await axios.put<CompanyModel>(globals.urls.companies+"/"+company.id, company);
            store.dispatch(companiesUpdatedAction(response.data));

            console.log(response.data);


            notify.success(SccMsg.COMPANY_UPDATED)
            // history.push('/admin/companies')
        }
        catch (err) {
            notify.error(err);
        }
    }
    private setValue= (args: SyntheticEvent)=>{
        
        const value = (args.target as HTMLInputElement).value;
        const com = this.state.company;
        com.name=value;
        this.setState({company:com});
        console.log(args);
    }
    
    public render(): JSX.Element {
        return (
            <div className="UpdateCompany">
                {/* <form onSubmit={handleSubmit(send)}> */}


                <TextField id="standard-basic" label="Company Name" onChange={this.setValue} value={this.state.company.name}
                // {...register("name", {
                //     required: {
                //         value: true,
                //         message: 'Missing name'
                //     }, minLength: {
                //         value: 0,
                //         message: 'Name should contain at least 2 characters'
                //     },
                // })} 
                />

                <br />
                {/* <span className="ErrSpan">{errors.name?.message}</span> */}

                <br />

                <TextField id="standard-basic" label="Address" value={this.state.company.address}
                // {...register("address", {
                //     required: {
                //         value: true,
                //         message: 'Missing address'
                //     },
                // })}
                />

                <br />
                {/* <span className="ErrSpan">{errors.address?.message}</span> */}
                <br />

                <TextField id="standard-basic" label="Phone Number" value={this.state.company.phone}
                // {...register("phone", { required: true })} 
                />
                <br />
                {/* {errors.phone && <span className="ErrSpan">Missing phone number</span>} */}
                <br />

                <TextField id="standard-basic" label="Email" value={this.state.company.email}
                // {...register("email", { required: true })} 
                />

                <br />
                {/* {errors.email && <span className="ErrSpan">Missing fax number</span>} */}
                <br />
                <TextField id="standard-basic" label="Web-Site" value={this.state.company.website}
                // {...register("website", { required: true })}
                />
                <br />
                {/* {errors.website && <span className="ErrSpan">Missing WebSite</span>} */}
                <br /> <br />

                <NavLink to="/admin/companies" className="BackButton">
                    <Fab size="small" color="primary" aria-label="back">
                        <CloseIcon />
                    </Fab>
                </NavLink>

                <Fab size="small" color="primary" aria-label="add" type="submit" >
                    {/* disabled={!isValid}> */}
                    <SendIcon />
                </Fab>


                {/* </form> */}
            </div>
        );
    }
}

export default UpdateCompany;
