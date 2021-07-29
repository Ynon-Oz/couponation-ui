import { Component } from "react";
import "./CompaniesManager.css";

interface CompaniesManagerState {
	
}

class CompaniesManager extends Component<{}, CompaniesManagerState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
			
        };
    }

    public render(): JSX.Element {
        return (
            <div className="CompaniesManager">
				
            </div>
        );
    }
}

export default CompaniesManager;
