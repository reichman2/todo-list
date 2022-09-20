import React from "react";
import InputBar from "./InputBar";


interface ContainerProps extends React.PropsWithChildren {

}

export default class CardContainer extends React.Component<ContainerProps> {
    constructor(props: ContainerProps) {
        super(props);
    }

    render() {
        return (
            <>
                { this.props.children }
            </>
        );
    }
}