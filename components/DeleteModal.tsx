import React from "react";
import Modal from "./Modal";


interface DeleteModalProps {
    taskName?: string;
    modalRef: React.RefObject<Modal>;
}

interface DeleteModalState {
    taskName: string;
}


export default class DeleteModal extends React.Component<DeleteModalProps, DeleteModalState> {
    constructor(props: DeleteModalProps) {
        super(props);

        this.state = {
            taskName: this.props.taskName || ""
        }
    }

    render() {
        return (
            <Modal onOkay={() => console.log("okey")} isVisible={ false } ref={ this.props.modalRef }>
                <span className="text-2xl font-semibold block mb-5">Remove Task?</span>
                    <div className="ml-1">
                        <span className="block">Would you like to remove the following task:</span>
                        <span className="block mx-2 my-3">{ this.state.taskName }</span>
                    </div>
            </Modal>
        )
    }
}