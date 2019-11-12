import React, {Component} from "react";
import "./styles/Menu.css"

export class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
        };
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }
    show(event) {
        event.preventDefault();
        this.setState({
            show: true,
        }, () => {document.addEventListener('click', this.close)});
    }
    close(event) {
        if (!this.menu.contains(event.target)){
        this.setState({ show: false }, () => {
            document.removeEventListener('click', this.close);
        });}
    }
    render(){
        return <div>
            <div>
                <div onClick={this.show}>Heroes</div>
            </div>
            {this.state.show ? (<div className={"menu"} ref={(element) => {this.menu = element;}} >
                    <div className={"subMenu"}>All</div>
                    <div className={"subMenu class"}> Menu item 2 </div>
                    <div className={"subMenu class"}> Menu item 3 </div>
                    <div className={"subMenu class"}> Menu item 4 </div>
                    <div className={"subMenu class"}> Menu item 5 </div>
                    <div className={"subMenu class"}> Menu item 6 </div>
                    <div className={"subMenu class"}> Menu item 7 </div>
                    <div className={"subMenu class"}> Menu item 8 </div>
                </div>) : null}
        </div>
    }
    }
