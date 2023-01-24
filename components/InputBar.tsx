import { prisma } from "@prisma/client";
import React from "react";
import Card from "./Card";
import TodoList from "./TodoList";


interface InputBarProps {
    className?: string;
    listRef: React.RefObject<TodoList>;
}

interface InputBarState {
    text: string;
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
            height: 25,
        };
        
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    async keyDownHandler(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key == "Enter" && !e.shiftKey) {
            e.preventDefault();

            if (!this.state.keyDown && this.state.text) {
                this.setState({
                    keyDown: true
                });
                
                // TODO submit this.state.text to api and create new card and save.
                // TODO submit to api

                // TODO create new card and save
                const listCurrent = this.props.listRef.current;
                if (listCurrent) {
                    const items = listCurrent.state.items;
                    
                    const body = JSON.stringify({ text: this.state.text });
                    
                    const res = await fetch("/api/item", { method: "POST", body });
                    const resJson = await res.json();

                    if (res.ok) {
                        // TODO success ribbon.
                        console.log("SUCCESS!!");
                        items.push({ text: this.state.text, id: resJson['id'], authorId: resJson['authorId'] });

                        this.setState({ 
                            text: "",
                            placeholder: this.randomPlaceholder()
                        });
                    } else {
                        // TODO failure ribbon.
                        console.error("FAILURE!!!!!!");
                    }

                    listCurrent.setState({ items });
                }
                
            }
        } else if (e.key == "Control") {
            // TODO implement formatting
        }
    }

    keyUpHandler(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && this.state.keyDown) {
            this.setState({
                keyDown: false
            });

        }
    }

    onChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ text: e.target.value });
    }

    randomPlaceholder(): string {
        // TODO load these in from a separate file.
        // TODO optimize so this isn't called every keypress (or so the value doesn't change every keypress).
        //      should change every time a new item is submitted, and on page reloads.
        const placeholders = [
            "Buy apples",
            "Do homework",
            "Take meds",
            "File taxes",
            "Call mom",
            "Call dad",
            "Book flight",
            "Fix merge conflict"
        ];

        let rand = Math.floor(Math.random() * placeholders.length);

        return placeholders[rand] + "...";
    }

    render() {
        // TODO placeholder in ::after
        // TODO figure out a way to make textarea auto-expand for content.
        return (
            <div className={`m-2 ${this.props.className}`}>
                <textarea
                    className="_input-bar border-gray-400 border-2 rounded-sm focus:border-blue-700 outline-none block px-3 py-2 w-full transition ease-linear resize-none overflow-hidden bg-white min-h-min max-h-50" 
                    onKeyDown={ this.keyDownHandler }
                    onKeyUp={ this.keyUpHandler }
                    data-placeholder={ this.state.placeholder }
                    placeholder={ this.state.placeholder }
                    onInput={ this.onChangeHandler }
                    value={ this.state.text }
                >
                </textarea>
            </div>
        );
    }
}

export default InputBar;