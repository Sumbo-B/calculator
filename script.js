const display = document.getElementById("calc_display_digit");
const buttons = Array.from(document.querySelectorAll(".calc_keys"));

const resetDisplay = () => {
  display.innerText = "0";
};

const deleteLastCharacter = () => {
  display.innerText =
    display.innerText.length > 1 ? display.innerText.slice(0, -1) : "0";
};

const calculateResult = () => {
  try {
    const sanitizedInput = display.innerText.replace(/X/g, "*");
    const result = Function(`'use strict'; return (${sanitizedInput})`)();
    display.innerText = Number.isFinite(result) ? result : "Error";
  } catch {
    display.innerText = "Error";
  }
};

const appendCharacter = (char) => {
  if (display.innerText === "0" && !/[+\-*/.%]/.test(char)) {
    display.innerText = char;
  } else {
    display.innerText += char;
  }
};

const handleAdvancedOperation = (char) => {
  let currentValue = parseFloat(display.innerText);
  switch (char) {
    case "%":
      display.innerText = currentValue / 100;
      break;
    case "√":
      display.innerText = Math.sqrt(currentValue);
      break;
    case "x²":
      display.innerText = currentValue ** 2;
      break;
    case "±":
      display.innerText = currentValue * -1;
      break;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const char = e.target.innerText;

    if (!isNaN(char) || char === ".") {
      appendCharacter(char);
    } else if (char === "RESET") {
      resetDisplay();
    } else if (char === "DEL") {
      deleteLastCharacter();
    } else if (char === "=") {
      calculateResult();
    } else if (["%", "√", "x²", "±"].includes(char)) {
      handleAdvancedOperation(char);
    } else {
      appendCharacter(char);
    }
  });
});
