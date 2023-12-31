import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "world",
//   password: "123456",
//   port: 5432,
// });

// db.connect();

// db.query("SELECT * FROM capitals", (err, res) => {
//   if (err) {
//     console.error("Error executing query", err.stack);
//   } else {
//     quiz = res.rows;
//   }
//   db.end();
// });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let currentQuestion = {};

// GET home page
app.get("/tetris", (req, res) => {
  res.render("tetris_sim.ejs", { theTitle: "Tetris Simulator" });
});

app.get("/", (req, res) => {
  res.redirect("/tetris");
});

app.get("/polyominos", (req, res) => {
  res.render("polyominos.ejs", { theTitle: "Polyominos Generator" });
});

app.get("/algorit", (req, res) => {
  res.render("algorit.ejs", { theTitle: "The Algorithm Explorer" });
});

// POST a new post
// app.post("/submit", (req, res) => {
//   let answer = req.body.answer.trim();
//   let isCorrect = false;
//   if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
//     totalCorrect++;
//     console.log(totalCorrect);
//     isCorrect = true;
//   }

//   nextQuestion();
//   res.render("index.ejs", {
//     question: currentQuestion,
//     wasCorrect: isCorrect,
//     totalScore: totalCorrect,
//   });
// });

// async function nextQuestion() {
//   const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

//   currentQuestion = randomCountry;
// }

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
