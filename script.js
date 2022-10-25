const output = document.querySelector(".results");
const allClearBtn = document.querySelector(".allClear");
const deleteBtn = document.querySelector(".delete");
const percentageBtn = document.querySelector(".percentage");
const operatorBtn = document.querySelectorAll(".operator");
const numberBtn = document.querySelectorAll(".number");
const equalsBtn = document.querySelector(".equality");
const negategeBtn = document.querySelector(".negate");
const audio = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3"
);
const audio1 = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
);
const audio2 = new Audio("audio/086386_approving-hmwav-40089.mp3");

let currNum = "",
  pervNum = "",
  operator = undefined;

const add = (firstOperand, secondOperand) => {
  return firstOperand + secondOperand;
};

const subtract = (firstOperand, secondOperand) => {
  return firstOperand - secondOperand;
};

const multiply = (firstOperand, secondOperand) => {
  return firstOperand * secondOperand;
};

const divide = (firstOperand, secondOperand) => {
  if (secondOperand === 0) {
    audio2.play();
    return "sneaky! no!";
  }
  return firstOperand / secondOperand;
};

const operate = (op, firstOperand, secondOperand) => {
  let result;
  const firstOp = parseFloat(firstOperand);
  const secondOp = parseFloat(secondOperand);
  if (op === undefined) {
    return;
  }
  switch (op) {
    case "+":
      result = add(firstOp, secondOp);
      break;
    case "-":
      result = subtract(firstOp, secondOp);
      break;
    case "x":
      result = multiply(firstOp, secondOp);
      break;
    case "÷":
      result = divide(firstOp, secondOp);
      break;
    default:
      break;
  }
  currNum = result;
  pervNum = "";
  operator = undefined;
};

const clear = () => {
  currNum = "";
  pervNum = "";
  operator = undefined;
};

const deletion = () => {
  currNum = currNum.toString().slice(0, -1);
};

const inputNumber = (number) => {
  if (number === "." && currNum.includes(".")) return;
  currNum = currNum.toString() + number.toString();
};

const inputOperator = (op) => {
  if (currNum === "") return;
  if (pervNum !== "") {
    operate(op, currNum, pervNum);
  }
  operator = op;
  pervNum = currNum;
  currNum = "";
};

const negation = () => {
  currNum = (currNum * -1).toString();
};

const percent = () => {
  currNum = (currNum / 100).toString();
};

const updateScreen = () => {
  output.innerText = currNum;
  if (operator != undefined) {
    output.innerText = `${pervNum} ${operator} ${currNum}`;
  }
};

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    inputNumber(button.innerText);
    updateScreen();
  });
});

document.addEventListener("mousedown", () => {
  audio.play();
});

document.addEventListener("mouseup", () => {
  audio1.play();
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    inputOperator(button.innerText);
    updateScreen();
  });
});

equalsBtn.addEventListener("click", () => {
  operate(operator, pervNum, currNum);
  updateScreen();
});

allClearBtn.addEventListener("click", () => {
  clear();
  updateScreen();
});

deleteBtn.addEventListener("click", () => {
  deletion();
  updateScreen();
});

percentageBtn.addEventListener("click", () => {
  percent();
  updateScreen();
});

negategeBtn.addEventListener("click", () => {
  negation();
  updateScreen();
});
