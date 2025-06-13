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
  }
];

const container = document.getElementById('container');
const questionText = document.getElementById('question-text');
const buttons = document.querySelectorAll('.btn');
const answerBox = document.querySelector('.answer-box');
const explanation = document.getElementById('explanation');
const resultBtn = document.getElementById('result-btn');
const isCorrectH1 = document.getElementById('is-correct');
const explanationText = document.getElementById('explanation-text');
const continueBtn = document.getElementById('continue');

let currentQuestionIndex = 0;
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



function updateQuiz() {
  questionText.innerText = questions[currentQuestionIndex].question;
  buttons.forEach(btn => {
    btn.innerText = questions[currentQuestionIndex][`${btn.id}`];
  });

}

function updateAnswerBox(correctness, optionText) {
  if (correctness == "right") {
    resultBtn.classList.add('right');
    resultBtn.classList.remove('wrong');

    isCorrectH1.classList.add('right');
    isCorrectH1.classList.remove('wrong');
    isCorrectH1.innerText = "is RIGHT";
  } else {
    resultBtn.classList.add('wrong');
    resultBtn.classList.remove('right');

    isCorrectH1.classList.add('wrong');
    isCorrectH1.classList.remove('right');
    isCorrectH1.innerText = "is WRONG";
  }
  resultBtn.innerText = optionText;
  explanationText.innerText = questions[currentQuestionIndex].explanation;
}

function checkIfCorrectAnswer(e) {
  if (e.innerText == questions[currentQuestionIndex].answer) {
    return true;
  } else {
    return false;
  }
}