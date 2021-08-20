const {BonusSpareCalc, BonusLastRoundCalc, BonusStrikeCalc} = require("./calculator")

class Game {
  rolls = []
  
  roll(pinsKnocked) {
    if (
      this.rolls.length === 0 ||
      this.getCurrentRoll().isFinished()
    ) {
      this.createNewRoll()
    }
    
    this.getCurrentRoll().setNextPinsKnocked(pinsKnocked)
  }

  score() {
    let score = 0
    const bonusCalculator = new BonusLastRoundCalc(new BonusSpareCalc(new BonusStrikeCalc()))
    this.rolls.forEach((roll) => {
      bonusCalculator.setState(this.rolls, roll)

      score += roll.getAllPinsKnocked()
      score += bonusCalculator.calcBonusTotal()
    })
    
    return score
  }

  createNewRoll() {
    if (this.rolls.length >= 10) {
      throw new Error('Max rounds are 10')
    }

    this.rolls.push(new Roll(this.rolls.length + 1))
  }

  getCurrentRoll() {
    return this.rolls[this.rolls.length - 1]
  }
}

class Roll {
  roundNumber = null

  firstThrow = null
  secondThrow = null
  thridThrow = null

  constructor(roundNumber) {
    this.roundNumber = roundNumber
  }

  isSpare() {
    return this.firstThrow + this.secondThrow === 10 && !this.isStrike()
  }

  isStrike() {
    return this.firstThrow === 10
  }

  isFinished() {
    if (this.isLastRound()) {
      return this.isFinishedLastRound()
    } else {
      return this.isFinishedNormalRound()
    }
  }

  isFinishedNormalRound() {
    if (this.isStrike()) {
      return true
    } else if (this.secondThrow !== null ) {
      return true
    }

    return false
  }

  isFinishedLastRound() {
    if ((this.isStrike() || this.isSpare())) {
      if (this.thridThrow !== null) {
        return true
      }
    } else if (this.secondThrow !== null) {
      return true
    }

    return false
  }

  isLastRound() {
    return this.roundNumber === 10
  }

  getAllPinsKnocked() {
    return this.firstThrow + this.secondThrow + this.thridThrow
  }
  
  setNextPinsKnocked(pinsKnocked) {
    if (this.firstThrow === null) {
      this.firstThrow = pinsKnocked
    } else if (this.secondThrow  === null) {
      this.secondThrow = pinsKnocked
    } else if (this.isLastRound() && this.thridThrow === null) {
      this.thridThrow = pinsKnocked
    } else {
      throw new Error('Max 2/3 throws allowed per round')
    }
  }
}

module.exports = Game
