import React from "react";
import ShowHideMixin from "../mixins/ShowHideMixin";
import Button from "./Button";
import Card from "./Card";


interface ModalProps extends React.PropsWithChildren {
    onOkay?: () => void;
}

interface ModalState {
    onOkay?: () => void;
}


export default class Modal extends ShowHideMixin<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);

        this.state = {
            isVisible: this.props.isVisible!
        }
    }


    render() {
        return (
            <div className={`${this.state.isVisible? "block" : "hidden"} fixed w-full h-full bg-black bg-opacity-40 transition-opacity ease-linear`}>
                <Card className="w-1/2 h-80 bg-white mx-auto my-24">
                    {/* Modal Header */}
                    <div className="">
                        <span 
                            className="text-black hover:text-gray-600 transition-colors ease-linear cursor-pointer text-3xl float-right"
                            onClick={ this.hide }
                        >
                            &times;
                        </span>
                    </div>
                    

                    <div>
                        <div className="px-2 py-1.5">
                            {/* Modal Content goes here... */}
                            { this.props.children }
                        </div>

                        <div className="">
                            <Button onClick={ this.state.onOkay } className="">Okay</Button>
                            <Button onClick={ this.hide } className="bg-red-500 text-gray-50">Cancel</Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}