import React, { Component } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

class Home extends Component {
    render() {
        return (
            <div id={"pageContainer"}>
                <h1>King's Raid Compendium</h1>
                <Accordion allowZeroExpanded={true}>
                    <AccordionItem>
                        <a href={"/hero/Aselica"}>Aselica</a>
                        <AccordionItemHeading>

                            <AccordionItemButton>
                                What harsh truths do you prefer to ignore?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Exercitation in fugiat est ut ad ea cupidatat ut in
                                cupidatat occaecat ut occaecat consequat est minim minim
                                esse tempor laborum consequat esse adipisicing eu
                                reprehenderit enim.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    }
}

export default Home;
