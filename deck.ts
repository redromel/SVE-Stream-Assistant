export type deckCards = Record<string, number>;

class Deck {
  public deckLog: string;
  public deckName: string;
  public craft: string;
  cards?: deckCards;

  constructor(
    deckLog?: string,
    deckName?: string,
    craft?: string,
    cards?: deckCards,
  ) {
    this.deckLog = deckLog ?? "";
    this.deckName = deckName ?? "";
    this.craft = craft ?? "Neutral";
    this.cards = cards ?? {};
  }
}
