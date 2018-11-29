const difficulty = document.getElementById("difficulty");
const category = document.getElementById("category");
const startPage = document.getElementById("startPage");
const gameScreen = document.getElementById("gameScreen");
const scoreScreen = document.getElementById("scoreScreen");
const question = document.getElementById("question");
const buttons = document.querySelectorAll(".answer_button");
const _score = document.getElementById("score");
let iteration = 0;
let questions;
let score = 0;

function getData(e) {
  e.disabled = true;
  let diff = "";
  let cate = "";
  const diffvalue = difficulty.options[difficulty.selectedIndex].value;
  const catevalue = category.options[category.selectedIndex].value;
  if (diffvalue !== "Any") {
    diff = `&difficulty=${diffvalue}`;
  }
  if (catevalue !== "Any") {
    cate = `&category=${catevalue}`;
  }
  link = `https://opentdb.com/api.php?amount=10${cate}${diff}&type=multiple`;
  console.log(link);
  fetch(`${link}`)
    .then(response => response.json())
    .then(response => {
      questions = response.results;
      startPage.hidden = true;
      gameScreen.hidden = false;
      createGameScreen();
    })
    .catch(err => console.log(err));
}

function createGameScreen() {
  console.log("Diff:", questions[iteration].difficulty, "Score:", score);
  let answers = [
    questions[iteration].correct_answer,
    questions[iteration].incorrect_answers[0],
    questions[iteration].incorrect_answers[1],
    questions[iteration].incorrect_answers[2]
  ];
  console.log("Answer:", answers[0]);
  //gameScreen.innerHTML = `${questions[iteration].question}`;
  console.log(questions[iteration]);

  question.innerHTML = questions[iteration].question;
  buttons.forEach(btn => {
    btn.disabled = false;
    btn.style = "background-color: #132238;";
    let rnmb = Math.floor(Math.random() * 2);
    if (rnmb == 1) {
      const value = answers.shift();
      btn.value = `${value}`;
      btn.innerHTML = `${value}`;
    } else {
      const value = answers.pop();
      btn.value = `${value}`;
      btn.innerHTML = `${value}`;
    }
    btn.addEventListener("click", btnClick);
  });
}

function createScoreScreen() {
  gameScreen.hidden = true;
  _score.innerHTML = score;
  scoreScreen.hidden = false;
}

function btnClick(e) {
  console.log("TEST", e.target.value, questions[iteration].correct_answer);
  if (e.target.value == questions[iteration].correct_answer) {
    console.log("Win");
    e.target.style = "background-color: #1ec81e;";
    addScore();
  } else {
    console.log("Loose");
    e.target.style = "background-color: #c81414;";
  }
  buttons.forEach(btn => {
    btn.disabled = true;
  });
  iteration += 1;
  if (iteration >= 10) {
    console.log("Score");
    createScoreScreen();
  } else {
    setTimeout(createGameScreen, 500);
  }
}

function addScore() {
  let iteration_difficulty = questions[iteration].difficulty;
  if (iteration_difficulty == "easy") {
    score += 50;
  } else if (iteration_difficulty == "medium") {
    score += 100;
  } else {
    score += 200;
  }
}
