import { Fab, FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import RegistrationModel from "../../../Models/RegistrationModel";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import "./Register.css";
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

// interface State {
//     pas$word: string;
//     showPassword: boolean;
// }


function Register(): JSX.Element {
    // const [values, setValues] = React.useState<State>({
    //     pas$word: '',
    //     showPassword: false,
    // });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<RegistrationModel>({
        mode: "onTouched",

    });
    const history = useHistory();

    async function send(registerInfo: RegistrationModel) {
        console.log(registerInfo);
        try {
            // const formData = new FormData();
            // formData.append("email", registerInfo.email);
            // formData.append("password", registerInfo.password);
            // formData.append("firstName", registerInfo.firstName);
            // formData.append("lastName", registerInfo.lastName);
            // formData.append("phone", registerInfo.phone);
            // formData.append("address", registerInfo.address);
            const response = await axios.post<RegistrationModel>(globals.urls.register, registerInfo);
            notify.success(SccMsg.CUSTOMER_ADDED)

            history.push('/coupons')
            console.log(response.data);
        }
        catch (err) {
            // console.log(err.message);
            notify.error(err);

        }
    }
    // const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handleClickShowPassword = () => {
    //     setValues({ ...values, showPassword: !values.showPassword });
    // };

    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };

    return (
        <div className="Register">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(send)}>

                <TextField id="standard-basic" label="First Name"
                    {...register("firstName", {
                        required: {
                            value: true,
                            message: 'Missing first name'
                        },
                        minLength: {
                            value: 0,
                            message: 'Name should contain at least 2 characters'
                        },
                    })} />
                <br /><span className="ErrSpan">{errors.firstName?.message}</span><br />
                <TextField id="standard-basic" label="Last Name"
                    {...register("lastName", {
                        required: {
                            value: true,
                            message: 'Missing last name'
                        },
                        minLength: {
                            value: 0,
                            message: 'Name should contain at least 2 characters'
                        },
                    })} />
                <br /><span className="ErrSpan">{errors.lastName?.message}</span><br />

                <TextField id="standard-basic" label="Email"
                    {...register("email", { required: true })} />

                <br />
                {errors.email && <span className="ErrSpan">Missing Email</span>}
                <br />

                <TextField id="standard-basic" label="Phone Number"
                    {...register("phone", { required: true })} />
                <br />
                {errors.phone && <span className="ErrSpan">Missing phone number</span>}
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
                <TextField id="standard-basic" label="Password" {...register("password", {
                    required: {
                        value: true,
                        message: 'Missing password'
                    },
                })} />

                <br />
                <span className="ErrSpan">{errors.password?.message}</span>
                <br />
                {/* <FormControl className="" >
                    <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.pas$word}
                        onChange={handleChange('pas$word')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'Missing password'
                            },
                        })}
                    />
                </FormControl> */}




                <br /> <br />

                <NavLink to="/" className="BackButton">
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

export default Register;
