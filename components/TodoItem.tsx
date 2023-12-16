import React from "react";
import Button from "./Button";
import Card from "./Card";
import Checkbox from "./Checkbox";


interface TodoItemProps extends React.PropsWithChildren {
    onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    completed?: boolean;
}

interface TodoItemState {
    completed: boolean;
}


export default class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
    constructor(props: TodoItemProps) {
        super(props);

        this.state = {
            completed: this.props.completed || false
        }

        this.toggleComplete = this.toggleComplete.bind(this);
    }


    toggleComplete() {
        this.setState({
            completed: !this.state.completed
        });
    }
    
    render() {
        return (
            <Card className="flex w-full items-center" title={ this.props.title || "" } >
                {/* <input type="checkbox" className="mr-4" /> */}
                <Checkbox onClick={ this.toggleComplete } className="mr-4" />
                <div className={`inline-block w-full transition-all ease-linear ${(this.state.completed) ? "line-through" : "" }`} >
                    <span className="line-slice"></span>
                    { this.props.children }
                </div>

                <Button className="bg-red-500 text-white justify-end" onClick={ this.props.onDelete }>Delete</Button>
            </Card>
        );
    }
}