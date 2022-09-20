import React, { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren{
    className?: string;
}


export default class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    render() {
        return (
            <div className={`bg-white rounded-md shadow-sm hover:shadow-md transition-shadow ease-linear px-8 py-4 w-fit text-gray-800 mx-2 my-2 ${this.props.className || ""}`}>
                { this.props.children }
            </div>
        );
    }
}