import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./FClock.css";

function FClock(): JSX.Element {
    const [state, setState] = useState(
        {
            time: new Date().toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit", hour12: false }),

        }
    );

    useEffect(() => {
        //didMount
        const timerId = window.setInterval(() => {
            const time = new Date().toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit", hour12: false });
            setState({ time: time });
        }, 1000);
        return () => {
            //willUnMount
            clearInterval(timerId);

        };
    });


    return (
        <div className="FClock">
            <Typography >
                <p>{state.time}</p>
            </Typography>
        </div>
    );
}

export default FClock;
