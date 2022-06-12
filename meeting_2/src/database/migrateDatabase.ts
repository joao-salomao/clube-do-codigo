import { Database as SQLite3Driver } from "sqlite3";
import { open } from "sqlite";
import fs from "fs/promises";

const migrate = async (migrationFile: string) => {
  const db = await open({
    filename: "src/database/database.db",
    driver: SQLite3Driver,
  });

  const sql = await fs.readFile(migrationFile);

  db.run(sql.toString());
};

const run = async () => {
  const migrationFile = process.argv[2];

  console.log(`Migrando o arquivo: ${migrationFile}`);

  migrate(migrationFile)
    .then(() => {
      console.log("Migração executada com sucesso");
    })
    .catch((err) => {
      console.log("Algo deu errado: " + err.message);
    });
};

run();
