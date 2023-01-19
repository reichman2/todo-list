import React, { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    title?: string;
}


export default class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e: React.MouseEvent<HTMLDivElement>) {
        // TODO open modal to delete
        if (this.props.onClick)
            this.props.onClick(e);
    }

    render() {
        return (
            <div 
                className={`bg-white rounded-md shadow-sm hover:shadow-md transition-shadow ease-linear px-8 py-4 w-fit text-gray-800 mx-2 my-2 ${this.props.className || ""}`}
                onClick={ this.onClickHandler }
                title={ this.props.title }
            >
                { this.props.children }
            </div>
        );
    }
}