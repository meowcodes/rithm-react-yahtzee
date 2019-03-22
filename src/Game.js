import React, { Component } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: this.initialRoll(),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      upperTotal: 0,
      lowerTotal: 0,
      end: false
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  initialRoll() {
    let arr = Array.from({ length: NUM_DICE })
    return arr.map(n => Math.ceil(Math.random() * 6));
  }

  roll(evt) {

    // roll dice whose indexes are in reroll
    if(!this.state.end){
      this.setState(st => ({
        // generate random val if not locked
        dice: st.dice.map(
          (d, i) => st.locked[i] ? d : Math.ceil(Math.random() * 6)),
        // locks all dice when out of rolls
        locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
        rollsLeft: st.rollsLeft - 1,
      }));
    }
  }

  toggleLocked(idx) {
    if (this.state.rollsLeft > 0 && this.state.dice[0]){
    // toggle whether idx is in locked or not
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ],
      }))
    } 
  }

  updateTotals(){
    let scores = this.state.scores;
    let upperVals = [ scores.ones, scores.twos, scores.threes, scores.fours, scores.fives, scores.sixes ]
    let lowerVals = [ scores.threeOfKind, scores.fourOfKind, scores.fullHouse, scores.smallStraight, 
                      scores.largeStraight, scores.yahtzee, scores.chance ]

    const reducer = (acc, currVal) => acc + currVal;
    
    let upperTotal = upperVals.filter(num => num !== undefined).reduce(reducer, 0);
    let lowerTotal = lowerVals.filter(num => num !== undefined).reduce(reducer, 0);
    
    this.setState({ upperTotal, lowerTotal });
  }

  doScore(rulename, ruleFn) {
    if(this.state.scores[rulename] === undefined && this.state.dice[0]){
      // evaluate this ruleFn with the dice and score this rulename
      this.setState(st => ({
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false),
      }), function() {
        this.updateTotals();

        let array = Object.values(this.state.scores);
        !array.includes(undefined) && this.endGame();
      });
      this.roll();
    }
  }

  endGame() {
    this.setState({ 
      end: true,
      locked: Array(NUM_DICE).fill(true),
      rollsLeft: 0
    });
  }

  

  render() {
    return (
      <section>
        {/* bind with arrow function toggleLocked */}
        <Dice dice={this.state.dice} locked={this.state.locked} handleClick={this.toggleLocked} />
        <button
          className="Game-reroll"
          disabled={this.state.locked.every(x => x)}
          onClick={this.roll}>
          {this.state.rollsLeft} Rerolls Left
        </button>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} upperTotal={this.state.upperTotal} lowerTotal={this.state.lowerTotal}/>
        <button 
          className={ this.state.end ? "Game-btn Game-flash" : "Game-btn" } 
          onClick={ this.resetGame }>
          Reset Game
        </button>
      </section >
    );
  }
}

export default Game;