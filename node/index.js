const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Joao Victor');`;
connection.query(sql);

app.get("/", (req, res) => {
  const query = `SELECT name FROM people;`;
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      connection.end();
      res.send(
        "<h1>Full Cycle Rocks!</h1><br>" + "Erro ao buscar dados na tabela"
      );
    } else {
      console.log(results);
      res.send(
        "<h1>Full Cycle Rocks!</h1><br>" +
          results.map((r) => `- ${r.name}`).join("<br>")
      );
    }
  });
});

app.listen(port, () => {
  console.log("Rodando na porta" + port);
});
