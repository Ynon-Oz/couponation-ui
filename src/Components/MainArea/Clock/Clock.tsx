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
            time: new Date().toLocaleTimeString()
        };
    }

    public render(): JSX.Element {
        return (
            <div className="Clock">
                <p>{this.state.time}</p>
            </div>
        );
    }

    public componentDidMount(): void {

        this.timerId = window.setInterval(() => {
            const time = new Date().toLocaleTimeString();
            this.setState({ time: time });
        }, 1000);
    }

    public componentWillUnmount(){
        clearInterval(this.timerId);
    }
}

export default Clock;
