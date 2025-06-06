const equationHover = document.getElementById('equation-hover');
const resultsOutput = document.getElementById('results-output');

const numBtns = document.querySelectorAll('.num');
const acBtn = document.getElementById('ac-btn');
const positiveNegativeBtn = document.getElementById('positive-negative-btn');
const percentBtn = document.getElementById('percent-btn');

const divideBtn = document.getElementById('divide-btn');
const timesBtn = document.getElementById('times-btn');
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');
const decimalBtn = document.getElementById('decimal-btn');
const equalsBtn = document.getElementById('equals-btn');

let equalsResultString = '';

acBtn.addEventListener('click', () => {
  resultsOutput.innerText = "0";
  equationHover.innerText = "";
  equalsResultString = '';
});

numBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (resultsOutput.innerText == "0") {
      resultsOutput.innerText = btn.innerText;

    }
    else {
      resultsOutput.innerText += btn.innerText;
    }
  })
});

divideBtn.addEventListener('click', () => {
   //Regex checks if the user already has put the symbol, 
   //to prevent from putting it again.
  const alreadyHasDivide = /[0-9]+[\u{00F7}]+$/gu;
  if (resultsOutput.innerText == "0" || 
    alreadyHasDivide.test(resultsOutput.innerText)) {
    return;
  }
 
  resultsOutput.innerText += divideBtn.innerText;
  

});

equalsBtn.addEventListener('click', () => {
  //checks to see if text ends with a number
  const anyNum = /\d+$/g;
  if (resultsOutput.innerText == "0" ||
    !anyNum.test(resultsOutput.innerText)
  ) {
    return;
  }
  equationHover.innerText = resultsOutput.innerText;
  resultsOutput.innerText = performOperations(resultsOutput.innerText);

});



function returnOperator(string) {
  const operators = {
    '\u00F7': '/',
    '\u00D7': '*',
    '\u2212': '-',
    '\u002B': '+',
    
  }
  let result = string;
  const keys = Object.keys(operators);
  for (const key of keys) {
    const regex = new RegExp(`[${key}]`, "gu");
    let operator = operators[key];
    result = result.replace(regex, operator);
    
  }

  return result;

}



function performOperations(str) {
  const validString = returnOperator(str);
  const result = eval(validString);
  
  return result;
}

