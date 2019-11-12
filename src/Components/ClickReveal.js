import React, {Component} from "react";

export class ClickReveal extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
        };
        this.show = this.show.bind(this);
    }
    show(event) {
        event.preventDefault();
        this.setState({
            show: !this.state.show,
        });
    }
    render(){
        return <div className={this.props.className}>
            <div>
                <div onClick={this.show}className={"clickRevealButton"}>{this.props.title}</div>
            </div>
            {this.state.show ? (<div className={"clickRevealContent"} ref={(element) => {this.menu = element;}} >
                {this.props.content}
                </div>) : null}
        </div>
    }
    }
