require("dotenv").config();
const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
// JSON data parser in the request body
app.use(express.json());
// allow cross-domain queries
app.use(cors());

const PORT = process.env.PORT || 8080;
const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString });
// Connect to Postgres
client.connect();

app.get("/api/players", async (_, res) => {
  try {
    const players = await client.query("select * from players");
    res.status(200).json(players.rows);
    // res.json({
    //   status: "success",
    //   code: 200,
    //   data: players.rows,
    // });
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/players", async (req, res) => {
  const { name, score } = req.body;
  //   console.log(name, score);
  try {
    // Insert a row into Postgres table
    const newPlayer = await client.query("INSERT INTO players (name, score) VALUES ($1, $2) RETURNING *", [
      name,
      score,
    ]);
    res.status(201).json(newPlayer.rows[0]);
    // res.json({
    //   status: "success",
    //   code: 201,
    //   data: newPlayer.rows[0]
    // });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});

module.exports = app;
