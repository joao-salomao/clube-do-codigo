import { Database as SQLite3Driver } from "sqlite3";
import { open, Database } from "sqlite";

export interface Player {
  name: string;
  wonCount: number;
}

export interface DatabaseInterface {
  getWinners(): Promise<Player[]>;
  addPlayer(player: Player): Promise<void>;
  incrementPlayerWonCount(name: Player["name"]): void;
  updatePlayer(player: Player): Promise<void>;
}

export class PlayerScoresDatabase implements DatabaseInterface {
  async getWinners(): Promise<Player[]> {
    const db = await this.getDatabase();

    const players = await db.all<Player[]>(
      "SELECT * FROM players ORDER BY wonCount DESC"
    );

    await db.close();

    return players;
  }

  async addPlayer(player: Player): Promise<void> {
    const db = await this.getDatabase();

    await db.run("INSERT INTO players (name, wonCount) VALUES(?, ?)", [
      player.name,
      player.wonCount,
    ]);

    await db.close();
  }

  async incrementPlayerWonCount(name: Player["name"]): Promise<void> {
    const db = await this.getDatabase();

    await db.run("UPDATE players SET wonCount = wonCount + 1 WHERE name = ?", [
      name,
    ]);

    await db.close();
  }

  async updatePlayer(player: Player): Promise<void> {
    const db = await this.getDatabase();

    await db.run("UPDATE players SET wonCount = ? WHERE name = ?", [
      player.wonCount,
      player.name,
    ]);

    await db.close();
  }

  private async getDatabase(): Promise<Database> {
    return open({
      filename: "src/database/database.db",
      driver: SQLite3Driver,
    });
  }
}
