import React from "react";

interface AlertProps extends React.PropsWithChildren {
    type: "success" | "warn" | "fail";
}


const colorMap = {
    success: "bg-green-400",
    warn: "bg-yellow-400",
    fail: "bg-red-400"
};


export default class Alert extends React.Component<AlertProps> {
    constructor(props: AlertProps) {
        super(props);
    }

    render() {
        return (
            <div className={`absolute ${ colorMap[this.props.type] } w-full py-3 shadow-sm`}>
                <div>
                    {/* Content */}
                    <div className="flex w-full items-center">
                        <div className="inline-block w-full pl-4 pr-2 text-white font-medium">
                            { this.props.children }
                        </div>

                        <div className="-mt-1 px-2 ">
                            <span className="text-3xl text-white cursor-pointer hover:text-gray-300 transition-colors ease-linear">&times;</span>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}