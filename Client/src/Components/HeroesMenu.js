import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import heroes from "../Assets/classes/classes";
export class HeroesMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }
  show(event) {
    event.preventDefault();
    this.setState(
      {
        show: true
      },
      () => {
        document.addEventListener("click", this.close);
      }
    );
  }
  close(event) {
    /*if (!this.menu.contains(event.target) || event.target){*/
    event.preventDefault();
    this.setState({ show: false }, () => {
      document.removeEventListener("click", this.close);
    });
  }

  render() {
    return (
      <div onClick={this.show} className={"navLink"}>
        <div>
          <div>Heroes</div>
        </div>
        {this.state.show ? (
          <div
            className={"menu"}
            ref={element => {
              this.menu = element;
            }}
          >
            {heroes.map(heroClass => (
              <div className={"class"}>
                {console.log(heroClass)}
                <NavLink to={"/" + heroClass.name} className={"navLink"}>
                  {heroClass.name}
                </NavLink>
                {heroClass.heroes.map(hero => (
                  <NavLink to={`/hero/${hero}`} className={"heroLink"}>
                    {hero}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}
