console.log(
  "%cDon't cheat!😡",
  "color:red;font-family:sans-serif;font-size:1.5rem;font-weight:bold"
);

const questions = [
  {
    question: "2 + 2 = ?",
    option1: "a) 3",
    option2: "b) 22",
    option3: "c) 0",
    option4: "d) 4",
    answer: "d) 4",
  }
];

const container = document.getElementById('container');

container.innerHTML = `
  <h1 class="question">${questions[0].question}</h1>
  <div class="options">
    <button class="btn">${questions[0].option1}</button>
    <button class="btn">${questions[0].option2}</button>
    <button class="btn">${questions[0].option3}</button>
    <button class="btn">${questions[0].option4}</button>
  </div>
`;