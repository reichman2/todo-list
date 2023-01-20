import React, { PropsWithRef } from "react";
import { ApiDataEntries } from "../pages/api/items";
import Card from "./Card";
import DeleteModal from "./DeleteModal";
import Modal from "./Modal";
import TodoItem from "./TodoItem";


interface TodoListProps extends React.PropsWithChildren {
   ref: React.RefObject<TodoList>;
   modalRef: React.RefObject<Modal>;
   deleteModalRef: React.RefObject<DeleteModal>;
   apiData?: any;
}

interface TodoListState {
    items: Array<ApiDataEntries>;
}


class TodoList extends React.Component<TodoListProps, TodoListState> {

    constructor(props: TodoListProps) {
        super(props);

        this.state = {
            items: [
                {
                    id: "stank",
                    authorId: "stankyAuthorSam",
                    text: "Type in the text box above to get started.  To delete an item, click on it!"
                },
                ...this.props.apiData
            ]
        }

    }

    openModal(key: number) {
        const item = this.state.items[key];
        this.props.deleteModalRef.current?.setState({ taskName: item.text })
        this.props.modalRef.current?.show();

        const removeItem = () => {
            this.remove(key);
            this.props.modalRef.current?.hide();

        }

        // TODO: this might be better approached by using a single callback function, so im not setting this function every single time...
        this.props.modalRef.current?.setState({ onOkay: removeItem });
    }

    remove(key: number) {

        console.log('remove', key);
        this.setState({ items: this.state.items.filter((e, i) => {
            if (i == key) {
                console.log("Deleting:", e);
                const body = JSON.stringify({ postId: e.id });

                const res = fetch("/api/item", { method: "DELETE", body });
                console.log(res);

                return false;
            } 
            
            return true;
        })});
        console.log(this.state.items);
        
    }

    render() {
        const elems = this.state.items.map((e, i) => (<TodoItem title={ `id: ${e.id}\nauthorId: ${e.authorId}` } key={ i } onClick={ () => this.openModal(i) }>{ e.text }</TodoItem>));

        return (
            <div className="w-full flex justify-center flex-wrap">
                { elems }
            </div>
        );
    }
}

export default TodoList;