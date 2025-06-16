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
    explanation: "2+2 = 4 because two adds to two, giving four.",
    gotright: 'wrong',
    fontsize: '35px'
  },
  {
    question: "if f(x) = x(7-4)^2, what is f(3)?",
    option1: "a) -27",
    option2: "b) 81",
    option3: "c) 27",
    option4: "d) 99",
    answer: "c) 27",
    explanation: "Following order of operations, 3(7-4)^2 = 3(3)^2, which leaves us with 3 * 3^2 = 3 * 9 = 27",
    gotright: 'wrong',
    fontsize: '25px'
  },
];

const container = document.getElementById('container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const buttons = document.querySelectorAll('.btn');
const finalResultsContainer = document.getElementById('final-results-container');
const answerBox = document.querySelector('.answer-box');
const explanation = document.getElementById('explanation');
const resultBtn = document.getElementById('result-btn');
const isCorrectH1 = document.getElementById('is-correct');
const explanationText = document.getElementById('explanation-text');
const continueBtn = document.getElementById('continue');

let currentQuestionIndex = 0;
let finalScore = 0;
updateQuiz();

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    answerBox.classList.toggle('hidden');
    if (checkIfCorrectAnswer(btn)) {
      updateAnswerBox("right", questions[currentQuestionIndex][`${btn.id}`])
    } else {
      updateAnswerBox("wrong", questions[currentQuestionIndex][`${btn.id}`])
    }

  });
});

continueBtn.addEventListener('click', () => {
  if (questions[currentQuestionIndex + 1]) {
    currentQuestionIndex++;
    answerBox.classList.toggle('hidden');
    updateQuiz();
  } else {
    answerBox.classList.toggle('hidden');
    showFinalResults();
  }
});

function updateQuiz() {
  questionText.innerText = questions[currentQuestionIndex].question;
  questionText.style.fontSize = questions[currentQuestionIndex].fontsize;
  buttons.forEach(btn => {
    btn.innerText = questions[currentQuestionIndex][`${btn.id}`];
  });
}

function showFinalResults() {
  const finalScorePercent = Math.round((finalScore/questions.length) * 100);
  questionText.style.fontSize = '30px';
  questionText.innerText = `You got ${finalScorePercent}% right`;
  optionsContainer.style.display = 'none';

  for (const question of questions) {
    const gotRight = question.gotright == "RIGHT" ? "1/1" : "0/1";
    const scoreStyle = question.gotright == "RIGHT" ? "right" : "wrong";
    finalResultsContainer.innerHTML += `
    <div class="question-panel">
    <span class="q-num">Question #${questions.indexOf(question) + 1}</span>
    <span class="q-score ${scoreStyle}">${gotRight}</span>
    </div>
    `;
  }
  container.style.height = '80vh';
  finalResultsContainer.style.display = 'block';
  
}

function updateAnswerBox(correctness, optionText) {
  if (correctness == "right") {
    resultBtn.classList.add('right');
    resultBtn.classList.remove('wrong');

    isCorrectH1.classList.add('h1-right');
    isCorrectH1.classList.remove('h1-wrong');
    isCorrectH1.innerText = "is RIGHT";

    finalScore++;
  } else {
    resultBtn.classList.add('wrong');
    resultBtn.classList.remove('right');

    isCorrectH1.classList.add('h1-wrong');
    isCorrectH1.classList.remove('h1-right');
    isCorrectH1.innerText = "is WRONG";
  }
  resultBtn.innerText = optionText;
  explanationText.innerText = questions[currentQuestionIndex].explanation;
}

function checkIfCorrectAnswer(e) {
  if (e.innerText == questions[currentQuestionIndex].answer) {
    questions[currentQuestionIndex].gotright = 'RIGHT';
    return true;
  } else {
    questions[currentQuestionIndex].gotright = 'WRONG';
    return false;
  }
}

