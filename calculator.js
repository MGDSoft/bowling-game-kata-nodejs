// Interface Bonus {
// mustApply
//
// }

class AbstractBonusCalc {
  rounds = []
  currentRound
  parentBonus

  constructor(parentBonus) {
    this.parentBonus = parentBonus
  }

  setState(rounds, currentRound) {
    this.rounds = rounds;
    this.currentRound = currentRound;

    if (this.parentBonus) {
      this.parentBonus.setState(rounds, currentRound)
    }
  }

  calcBonusTotal() {
    let bonus = 0
    if (this.mustApply()) {
      bonus+=this.calcBonus()
    }
    if (this.parentBonus) {
      bonus+=this.parentBonus.calcBonusTotal()
    }
    return bonus
  }

  nextRound(round){
    round = round || this.currentRound
    return this.rounds[round.roundNumber] || null
  }
}

class BonusSpareCalc extends AbstractBonusCalc {

  mustApply(){
    return this.currentRound.isSpare() && !this.currentRound.isLastRound()
  }

  calcBonus(){
    let nextRound = this.nextRound()
    if (!nextRound) {
      return 0
    }

    return nextRound.firstThrow
  }
}

class BonusStrikeCalc extends AbstractBonusCalc {

  mustApply(){
    return this.currentRound.isStrike() && !this.currentRound.isLastRound()
  }

  calcBonus(){
    let nextRound = this.nextRound()

    if (!nextRound) {
      return 0
    }

    let bonus = nextRound.firstThrow
    let nextNextRound = this.nextRound(nextRound)

    if (nextRound.isStrike() && nextNextRound) {
      bonus += nextNextRound.firstThrow
    } else {
      bonus += nextRound.secondThrow
    }
    return bonus
  }
}

class BonusLastRoundCalc extends AbstractBonusCalc {

  mustApply(){
    return this.currentRound.isLastRound()
  }

  calcBonus(){

    let bonus = 0
    if (this.currentRound.isStrike()) {
      bonus += this.currentRound.secondThrow + this.currentRound.thridThrow
    }

    if (this.currentRound.isSpare() || this.currentRound.secondThrow === 10) {
      bonus += this.currentRound.thridThrow
    }

    return bonus
  }
}

module.exports = {BonusLastRoundCalc, BonusSpareCalc, BonusStrikeCalc};