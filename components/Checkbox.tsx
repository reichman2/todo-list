import React from "react";
import checkboxStyles from '../styles/Checkbox.module.css';

interface CheckboxProps {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface CheckboxState {
    enabled: boolean;
}


export default class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    // TODO redux state? tied in with assoc. TodoItem
    constructor(props: CheckboxProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {

        return (
            <>
                {/* <div style={ checkboxStyles } onClick={ this.handleClick } className={`checkmark ${this.props.className} p-2 border-gray-500 border-2 cursor-pointer rounded-sm `}></div> */}
                <input type="checkbox" className="checkbox border-gray-500 border-2" onClick={ this.handleClick } />
            </>
        );
    }
}