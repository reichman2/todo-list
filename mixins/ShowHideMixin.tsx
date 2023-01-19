import React from "react";


export interface ShowHideMixinProps {
    isVisible?: boolean;
}

export interface ShowHideMixinState {
    isVisible: boolean;
}


export default abstract class ShowHideMixin<P = {}, S = {}> extends React.Component<ShowHideMixinProps & P, ShowHideMixinState & S> {
    constructor(props: ShowHideMixinProps & P) {
        super(props);

        this.state = {
            ...this.state,
            isVisible: this.props.isVisible!
        }
        
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    show() {
        this.setState({ ...this.state, isVisible: true });
    }

    hide() {
        this.setState({ ...this.state, isVisible: false });
    }

    toggleVisibility() {
        this.setState({ ...this.state, isVisible: !this.state.isVisible });
    }

    abstract render(): JSX.Element;
}