import { Typography } from "@material-ui/core";
import { Component } from "react";
import "./Clock.css";

interface ClockState {
    time: string;
}

class Clock extends Component<{}, ClockState> {

    private timerId = 0;
    //1. To init props & state 
    public constructor(props: {}) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit", hour12: false })
        };
    }
    //time.toLocaleString('en-US', { hour: 'numeric', hour12: true }
    public render(): JSX.Element {
        return (
            <div className="Clock">
                <Typography >
                <p>{this.state.time}</p>
                </Typography>
            </div>
        );
    }

    public componentDidMount(): void {

        this.timerId = window.setInterval(() => {
            const time = new Date().toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit", hour12: false });
            this.setState({ time: time });
        }, 1000);
    }

    public componentWillUnmount() {
        clearInterval(this.timerId);
    }
}

export default Clock;
