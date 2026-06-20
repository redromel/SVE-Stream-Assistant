class Player {
  public isPlayer1: boolean;
  public health: number;
  public turn: number;
  public maxPP: number;
  public currentPP: number;
  public evoPoints: number;
  public superEvo: boolean;
  public deck: Deck;

  constructor(isPlayer1: boolean, deck?: Deck) {
    this.isPlayer1 = isPlayer1;
    this.health = 20;
    this.turn = 0;
    this.maxPP = 0;
    this.currentPP = 0;
    this.evoPoints = isPlayer1 ? 0 : 3;
    this.superEvo = false;
    this.deck = deck ?? new Deck();
  }

  static initWithDeck(isPlayer1: boolean, decklog: string) {
    let deck = Deck.getDeckLog(decklog);
    return new Player(isPlayer1, deck);
  }
}
class Deck {
  public deckLog: string;
  public deckName: string;
  public craft: string;
  public cards: Card[];

  constructor(
    deckLog?: string,
    deckName?: string,
    craft?: string,
    cards?: Card[],
  ) {
    this.deckLog = deckLog ?? "";
    this.deckName = deckName ?? "";
    this.craft = craft ?? "Neutral";
    this.cards = cards ?? [];
  }

  static getDeckLog(deckLog) {
    // Decklog API Stuff to get deck info
    return new Deck();
  }
}

class Card {
  public cardName: string;
  public language: string;
  public cardSet: string;
  public cardId: string;

  constructor(cardName: string, cardId: string) {
    this.cardName = cardName;
    this.cardId = cardId;
  }

  getCard() {
    return `https://cdn.dingdongdb.me/images/${this.language}/${this.cardSet}/${this.cardId}.png`;
  }
  getBushiCard() {
    if ((this.language = "en")) {
      return `https://en.shadowverse-evolve.com/wordpress/wp-content/images/cardlist/${this.cardSet}/${this.cardId}.png`;
    }
    return `https://shadowverse-evolve.com/wordpress/wp-content/images/cardlist/${this.cardSet}/${this.cardId}.png`;
  }
}
