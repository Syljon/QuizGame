const difficulty = document.getElementById("difficulty");
const category = document.getElementById("category");
const startPage = document.getElementById("startPage");
let iteration = 0;
let questions;
function getData(e) {
  e.disabled = true;
  const diffvalue = difficulty.options[difficulty.selectedIndex].value;
  const catevalue = category.options[category.selectedIndex].value;
  let diff = "";
  let cate = "";
  if (diffvalue !== "Any") {
    diff = `&difficulty=${diffvalue}`;
  }
  if (catevalue !== "Any") {
    cate = `&category=${catevalue}`;
  }
  link = `https://opentdb.com/api.php?amount=10${cate}${diff}&type=multiple`;
  console.log(link);
  startPage.hidden = true;
  fetch(`${link}`)
    .then(response => response.json())
    .then(response => {
      questions = response.results;
      createGameScreen();
    })
    .catch(err => console.log(err));
}

function createGameScreen() {
  console.log(questions[iteration]);
}
