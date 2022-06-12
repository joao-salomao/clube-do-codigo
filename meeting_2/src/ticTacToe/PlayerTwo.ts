import { PlayerInterface, Symbol } from "./types";

export class PlayerTwo implements PlayerInterface {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getSymbol(): Symbol {
    return Symbol.O;
  }
}
