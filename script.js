const display = document.getElementById("calc_display_digit");
const buttons = Array.from(document.querySelectorAll(".calc_keys"));

let memory = 0;

const resetDisplay = () => (display.innerText = "0");

const deleteLastCharacter = () =>
  (display.innerText = display.innerText.slice(0, -1) || "0");

const calculateResult = () => {
  try {
    const result = Function(
      `'use strict'; return (${display.innerText.replace(/X/g, "*")})`
    )();
    display.innerText = Number.isFinite(result) ? result : "Error";
  } catch {
    display.innerText = "Error";
  }
};

const handleAdvancedOperation = (char) => {
  const value = parseFloat(display.innerText);

  switch (char) {
    case "%":
      display.innerText = value / 100;
      break;
    case "√":
      display.innerText = Math.sqrt(value);
      break;
    case "xⁿ":
      const power = prompt("Enter the power:");
      display.innerText = Math.pow(value, parseFloat(power) || 1);
      break;
    case "n!":
      const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
      display.innerText = factorial(value);
      break;
    case "±":
      display.innerText = value * -1;
      break;
  }
};

const handleMemoryOperation = (char) => {
  const value = parseFloat(display.innerText);
  switch (char) {
    case "MC":
      memory = 0;
      break;
    case "MR":
      display.innerText = memory;
      break;
    case "M+":
      memory += value;
      break;
    case "M-":
      memory -= value;
      break;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const char = e.target.innerText;

    if (!isNaN(char) || char === ".") {
      display.innerText =
        display.innerText === "0" ? char : display.innerText + char;
    } else if (["RESET", "DEL", "="].includes(char)) {
      char === "RESET"
        ? resetDisplay()
        : char === "DEL"
        ? deleteLastCharacter()
        : calculateResult();
    } else if (["%", "√", "xⁿ", "n!", "±"].includes(char)) {
      handleAdvancedOperation(char);
    } else if (["MC", "MR", "M+", "M-"].includes(char)) {
      handleMemoryOperation(char);
    } else {
      display.innerText += char;
    }
  });
});
