import { PlayerInterface, Symbol } from "./types";

export class PlayerOne implements PlayerInterface {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getSymbol(): Symbol {
    return Symbol.X;
  }
}
