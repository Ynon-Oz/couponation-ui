import { Button, TextField } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import LoginDetailsModel from '../../../Models/LoginDetailsModel';
import globals from '../../../Services/Globals';
import notify, { SccMsg } from '../../../Services/Notification';
import SendIcon from '@material-ui/icons/Send';
import "./Login.css";
import store from '../../../Redux/Store';
import { userLogin } from '../../../Redux/LoginAppState';
import SuccessfulLoginModel from '../../../Models/SuccessfulLoginModel';

function Login(): JSX.Element {
    
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginDetailsModel>({
        mode: "onTouched",

    });
    const history = useHistory();

    async function send(loginDetails: LoginDetailsModel) {
        console.log(loginDetails);
        try {
            
            const response = await axios.post<LoginDetailsModel>(globals.urls.login, loginDetails);

            history.push('/')
            console.log(response.data);
            const successLogin = response.data as SuccessfulLoginModel; 
            store.dispatch(userLogin(successLogin));
        }
        catch (err) {
            notify.error(err);

        }
    }

    
    return (
        <div className="Login">
                        <form onSubmit={handleSubmit(send)}>

			<LockIcon/>
            <h4>Sign in</h4>
            <TextField id="standard-basic" label="Email"
                    {...register("userName", { required: true })} />

                <br />
                {errors.userName && <span className="ErrSpan">Missing Email</span>}
                <br />

                <TextField type="password" id="standard-basic" label="Password" {...register("password", {
                    required: {
                        value: true,
                        message: 'Missing password'
                    },
                })} />
<br/>

<br/>
            <Button startIcon={<SendIcon />} size="small" variant="contained" color="primary" aria-label="add" type="submit" disabled={!isValid}>
                    Sign in
                </Button>
                </form>
        </div>
    );
}

export default Login;
