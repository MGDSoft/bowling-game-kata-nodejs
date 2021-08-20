const Game = require("./index");

describe("Game", () => {
  describe("roll", () => {
    // it("should fail if game has ended", () => {
    //   const g = new Game();
    //   for (let i = 0; i < 20; i++) {
    //     g.roll(1);
    //   }
    //   expect(g.roll(1)).toThrowError(new Error());
    // });
  });

  it("should return 0 at first", () => {
    const g = new Game();

    expect(g.score()).toEqual(0);
  });

  it("should return the correct score without bonus", () => {
    const g = new Game();

    g.roll(8);
    g.roll(1);
    g.roll(2);
    g.roll(4);

    expect(g.score()).toEqual(15);
  });

  it("should return the correct score with spare bonus", () => {
    const g = new Game();

    g.roll(9);
    g.roll(1);
    g.roll(2);

    expect(g.score()).toEqual(14);
  });

  it("should return the correct score with strike bonus", () => {
    const g = new Game();

    g.roll(10);
    g.roll(2);
    g.roll(7);

    expect(g.score()).toEqual(28);
  });

  it("should return the correct score with strike bonus", () => {
    const g = new Game();

    g.roll(10);
    g.roll(2);
    g.roll(7);
    
    // 10 + 2 + 7 + 2 + 7
    expect(g.score()).toEqual(28);
  });

  it("should return the correct score with double strike bonus", () => {
    const g = new Game();

    g.roll(10);
    g.roll(10);
    g.roll(7);
    g.roll(5);

    // First round 10 + 10 + 7 = 27
    // Second Round 10 + 7 + 5 = 22 49
    // Third Round 7 + 5       = 12
    expect(g.score()).toEqual(61);
  });

  it("should return the correct score with strike & spare", () => {
    const g = new Game();

    g.roll(10);
    g.roll(6);
    g.roll(4);
    g.roll(5);
    g.roll(2);

    // First round 10 + 6 + 4 = 20
    // Second Round 6 + 4 + 5 = 15
    // Third Round 5 + 2      = 7
    expect(g.score()).toEqual(42);
  });

  it("lastRound two normal throws", () => {
    const g = new Game();

    simulateStateStartOnLastRound(g)
    g.roll(3);
    g.roll(6);

    // First throw 10 + 10 + 5 = 25
    // Second throw 10 + 5     = 15
    // Third throw 5           = 5
    expect(g.score()).toEqual(9);
  });

  it("lastRound two strikes", () => {
    const g = new Game();

    simulateStateStartOnLastRound(g)
    g.roll(10);
    g.roll(10);
    g.roll(5);

    // First throw 10 + 10 + 5 = 25
    // Second throw 10 + 5     = 15
    // Third throw 5           = 5
    expect(g.score()).toEqual(45);
  });

  it("lastRound two strikes", () => {
    const g = new Game();

    simulateStateStartOnLastRound(g)
    g.roll(10);
    g.roll(10);
    g.roll(5);

    // First throw 10 + 10 + 5 = 25
    // Second throw 10 + 5     = 15
    // Third throw 5           = 5
    expect(g.score()).toEqual(45);
  });

  it("lastRound spare", () => {
    const g = new Game();

    simulateStateStartOnLastRound(g)
    g.roll(3);
    g.roll(7);
    g.roll(5);

    // First throw  3      = 3
    // Second throw 7 + 5  = 12
    // Third throw  5      = 5
    expect(g.score()).toEqual(20);
  });

  it("lastRound normal exceed limit throws", () => {
    const g = new Game();

    simulateStateStartOnLastRound(g)
    g.roll(3);
    g.roll(4);
    expect(() => g.roll(5)).toThrow('Max rounds are 10')
  });

  it("lastRound spare exceed limit throws", () => {
    const g = new Game();

    simulateStateStartOnLastRound(g)
    g.roll(3);
    g.roll(7);
    g.roll(5);
    expect(() => g.roll(5)).toThrow('Max rounds are 10')
  });

});

function simulateStateStartOnLastRound(g) {
  g.roll(0);g.roll(0);
  g.roll(0);g.roll(0);
  g.roll(0);g.roll(0);
  g.roll(0);g.roll(0);
  g.roll(0);g.roll(0);
  g.roll(0);g.roll(0);
  g.roll(0);g.roll(0);
  g.roll(0);g.roll(0);
  g.roll(0);g.roll(0); // 9
}