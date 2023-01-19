import React from "react";
import Card from "./Card";


interface TodoItemProps extends React.PropsWithChildren {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    title?: string;
}


export default class TodoItem extends React.Component<TodoItemProps> {
    constructor(props: TodoItemProps) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.remove = this.remove.bind(this);
    }

    onClickHandler(e: React.MouseEvent<HTMLDivElement>) {
        if (this.props.onClick)
            this.props.onClick(e);
    }

    remove() {
        // TODO open delete modal

        // TODO if okay, delete this element.
    }
    
    render() {
        return (
            <Card title={ this.props.title || "" } onClick={ this.onClickHandler }>
                { this.props.children }
            </Card>
        );
    }
}