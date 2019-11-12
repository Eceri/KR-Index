import React, {Component} from "react";

export class ClickReveal extends Component{
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
        let clickTitle = this.props.match.params.title;
        let content = this.match.params.content;
        return <div>
            <div>
                <div onClick={this.show}className={"clickRevealButton"}>{clickTitle}</div>
            </div>
            {this.state.show ? (<div className={"clickRevealContent"} ref={(element) => {this.menu = element;}} >
                {content}
                </div>) : null}
        </div>
    }
    }
