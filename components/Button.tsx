import React from "react";


interface ButtonProps extends React.PropsWithChildren {
    className?: string;
    onClick?: () => void;
}


export default class Button extends React.Component<ButtonProps> {

    constructor(props: ButtonProps) {
        super(props);
    }

    
    render() {
        return (
            <div className="inline-block font-medium text-sm p-0 m-0 text-gray-900">
                <button 
                  onClick={ this.props.onClick } 
                  className={`bg-white px-4 py-2 rounded-md cursor-pointer shadow-md hover:shadow-sm hover:brightness-90 transition ease-linear mx-3 my-2 ${ this.props.className }`}
                >
                    { this.props.children }
                </button>
            </div>
        );
    }
}