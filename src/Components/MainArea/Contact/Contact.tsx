import { Button, TextField } from "@material-ui/core";
import "./Contact.css";

function Contact(): JSX.Element {
    return (
        <div className="Contact">
            <h1>Contact Us</h1>
            {/* <input type="label" placeholder="Name"></input> */}
            <form>
            <TextField className="TextBox" id="outlined-basic" label="Name" variant="outlined" /><br />
            <TextField className="TextBox" id="outlined-basic" label="Email" variant="outlined" /><br />
            <Button variant="contained" color="primary">
                Submit
            </Button>
            </form>
        </div>
    );
}

export default Contact;
