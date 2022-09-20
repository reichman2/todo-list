import React from "react";


interface InputBarProps {
    className?: string;
    cardRef: React.Ref<HTMLDivElement>;
}

interface InputBarState {
    text?: string;
    keyDown: boolean;
    placeholder: string;
    height: number;
}



// const InputBar: NextComponentType<{}, {}, InputBarProps> = ({ className = "" }: InputBarProps) => {
class InputBar extends React.Component<InputBarProps, InputBarState> {
    constructor(props: InputBarProps) {
        super(props);

        this.state = {
            text: "",
            keyDown: false,
            placeholder: this.randomPlaceholder(),
            height: 25
        };

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    keyDownHandler(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key == "Enter" && !e.shiftKey) {
            e.preventDefault();

            if (!this.state.keyDown && this.state.text) {
                
                this.setState({
                    keyDown: true
                });
                
                console.log(`submitted value: ${this.state.text}`);
                // TODO submit this.state.text to api and create new card and save.
                
                this.setState({ 
                    text: "",
                    placeholder: this.randomPlaceholder()
                });

                this.props.cardRef
            }
        }

        const target = e.target as HTMLElement;
        target.style.height = 'inherit';

        const compStyle = window.getComputedStyle(target);
        const getCompValue = (prop: string) => parseInt(compStyle.getPropertyValue(prop));

        let height = 
                getCompValue('border-top-width') + 
                getCompValue('border-bottom-width') + 
                target.scrollHeight +
                getCompValue('padding-top') + 
                getCompValue('padding-bottom');

        target.style.height = `${height}px`;
    }

    keyUpHandler(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && this.state.keyDown) {
            this.setState({
                keyDown: false
            });

            console.log("eup");
        }
    }

    onChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            text: e.target.value
        });

        // console.log(`this.state.text: ${this.state.text}, e.target.value: ${e.target.value}`);
    }

    randomPlaceholder(): string {
        // TODO load these in from a separate file.
        // TODO optimize so this isn't called every keypress (or so the value doesn't change every keypress).
        //      should change every time a new item is submitted, and on page reloads.
        const placeholders = [
            "Buy apples",
            "Do homework",
            "Take my meds",
            "File taxes"
        ];

        let rand = Math.floor(Math.random() * placeholders.length);

        return placeholders[rand] + "...";
    }

    render() {
        
        // TODO figure out a way to make textarea auto-expand for content.
        return (
            <div className={`m-2 ${this.props.className}`}>
                <textarea
                    className="border-gray-400 border-2 rounded-sm focus:border-blue-700 outline-none block px-3 py-2 w-full transition ease-linear resize-none overflow-hidden" 
                    onKeyDown={ this.keyDownHandler }
                    onKeyUp={ this.keyUpHandler }
                    placeholder={ this.state.placeholder }
                    onChange={ this.onChangeHandler }
                    value={ this.state.text }
                ></textarea>
            </div>
        );
    }
}

export default InputBar;