import React, { Component } from "react";
import "./Die.css";
import die1 from "./die-1.svg";
import die2 from "./die-2.svg";
import die3 from "./die-3.svg";
import die4 from "./die-4.svg";
import die5 from "./die-5.svg";
import die6 from "./die-6.svg";

class Die extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [die1, die2, die3, die4, die5, die6]
    }
  }

  render() {
    return (
      <button
        className={this.props.locked ? "Die Die-locked" : "Die"}
        onClick={() => this.props.handleClick(this.props.idx)}>
        <img className="Die-image" src={this.state.images[this.props.val - 1]} />
      </button>
    );
  }
}

export default Die;
