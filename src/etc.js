import React, { Component } from "react";
import {ClassPerks} from "./Components/Hero/ClassPerks";
import perks from "./Assets/genericPerks/genericPerks";
class Contact extends Component {
    render() {
        return (
            <div>
                <h2>GOT QUESTIONS?</h2>
                <p>The easiest thing to do is post on
                    our <a href="http://forum.kirupa.com">forums</a>.
                </p>
                <div>
                    <ClassPerks perks={perks}/>
                </div>
            </div>
        );
    }
}
export default Contact;
