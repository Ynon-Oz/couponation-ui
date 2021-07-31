import "./EmptyView.css";

interface EmptyViewProps {
	msg: string;
}

function EmptyView(props: EmptyViewProps): JSX.Element {
    return (
        <div className="EmptyView">
			            <h2>{props.msg}</h2>

        </div>
    );
}

export default EmptyView;
