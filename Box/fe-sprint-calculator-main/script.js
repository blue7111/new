const calculator = document.querySelector(".calculator"); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector(".calculator__buttons"); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector(".calculator__operend--left"); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector(".calculator__operator"); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector(".calculator__operend--right"); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector(".calculator__result"); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  operator === "*"
    ? (result = parseFloat(n1) * parseFloat(n2))
    : operator === "/"
    ? (result = parseFloat(n1) / parseFloat(n2))
    : operator === "+"
    ? (result = parseFloat(n1) + parseFloat(n2))
    : operator === "-"
    ? (result = parseFloat(n1) - parseFloat(n2))
    : console.log("Error");
  return String(result);
}

buttons.addEventListener("click", function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches("button")) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === "number") {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.
      console.log("숫자 " + buttonContent + " 버튼");
      firstOperend.textContent !== "0"
        ? (secondOperend.textContent = buttonContent)
        : (firstOperend.textContent = buttonContent);
    }

    if (action === "operator") {
      console.log("연산자 " + buttonContent + " 버튼");
      operator.textContent = buttonContent;
    }

    if (action === "decimal") {
      console.log(`소수점 ${buttonContent} 버튼`);
    }

    if (action === "clear") {
      console.log(`초기화 ${buttonContent} 버튼`);
      firstOperend.textContent = "0";
      secondOperend.textContent = "0";
      calculatedResult.textContent = "0";
      operator.textContent = "+";
    }

    if (action === "calculate") {
      console.log(`계산 ${buttonContent} 버튼`);
      let n1 = Number(firstOperend.textContent);
      let n2 = Number(secondOperend.textContent);
      let operator_n1n2 = operator.textContent;
      calculatedResult.textContent = calculate(n1, operator_n1n2, n2);
    }
  }
});

// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector(".calculator__display--for-advanced");
// 아래 조건에 truthy, falsy로 써주기 위해 undefined(falsy)로 설정
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener("click", function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.
  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  const buttonContainerArray = buttons.children;

  if (target.matches("button")) {
    for (let i = 0; i < buttonContainerArray.length; i++) {
      const childrenArray = buttonContainerArray[i].children;
      for (let j = 0; j < childrenArray.length; j++) {
        childrenArray[j].classList.remove("isPressed");
      }
    } // css 클래스 추가
    if (action === "number") {
      if (
        display.textContent === "0" ||
        previousKey === "operator" ||
        previousKey === "calculate"
      ) {
        display.textContent = buttonContent;
      } else {
        display.textContent = display.textContent + buttonContent;
      }
      previousKey = "number";
    }

    if (action === "operator") {
      // 숫자 값은 truthy!
      target.classList.add("isPressed");
      if (
        firstNum &&
        operatorForAdvanced &&
        previousKey !== "operator" &&
        previousKey !== "calculate"
      ) {
        display.textContent = calculate(
          firstNum,
          operatorForAdvanced,
          display.textContent
        );
      }
      firstNum = display.textContent;
      operatorForAdvanced = buttonContent;
      previousKey = "operator";
    }

    if (action === "decimal") {
      if (!display.textContent.includes(".") && previousKey !== "operator") {
        display.textContent = display.textContent + ".";
      } else if (previousKey === "operator") {
        display.textContent = "0.";
      }
      previousKey = "decimal";
    }

    if (action === "clear") {
      firstNum = undefined;
      operatorForAdvanced = undefined;
      previousNum = undefined;
      previousKey = "clear";
      display.textContent = "0";
    }

    if (action === "calculate") {
      if (firstNum) {
        if (previousKey === "calculate") {
          display.textContent = calculate(
            display.textContent,
            operatorForAdvanced,
            previousNum
          );
        } else {
          previousNum = display.textContent;
          display.textContent = calculate(
            firstNum,
            operatorForAdvanced,
            display.textContent
          );
        }
      }
      previousKey = "calculate";
    }
  }
});
