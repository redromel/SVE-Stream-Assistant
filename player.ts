class Player {
  public isGoingFirst: boolean;
  public health: number;
  public turn: number;
  public maxPP: number;
  public currentPP: number;
  public evoPoints: number;
  public superEvo: boolean;

  constructor(isGoingFirst: boolean) {
    this.isGoingFirst = isGoingFirst;
    this.health = 20;
    this.turn = 0;
    this.maxPP = 0;
    this.currentPP = 0;
    this.evoPoints = isGoingFirst ? 0 : 3;
    this.superEvo = false;
  }

}



