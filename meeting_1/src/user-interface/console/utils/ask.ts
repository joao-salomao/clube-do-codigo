import readline from "readline-sync";

export const ask = (message: string) => readline.question(message);
