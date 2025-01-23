const display = document.getElementById("calc_display_digit");
const buttons = Array.from(document.querySelectorAll(".calc_keys button"));

// Helper Functions
const resetDisplay = () => {
  display.innerText = "";
};

const deleteLastCharacter = () => {
  if (display.innerText.length > 0) {
    display.innerText = display.innerText.slice(0, -1);
  }
};

const calculateResult = () => {
  try {
    const sanitizedInput = display.innerText.replace(/X/g, "*");
    const result = Function(`'use strict'; return (${sanitizedInput})`)();
    display.innerText = Number.isFinite(result) ? result : "Error! Try Again";
  } catch {
    display.innerText = "Error! Try Again";
  }
};

const appendCharacter = (char) => {
  const lastChar = display.innerText.slice(-1);

  // Prevent multiple operators or invalid initial input
  if (
    (!display.innerText && /[+\-*/.]/.test(char)) || // Prevent starting with an operator
    (/[+\-*/.]/.test(lastChar) && /[+\-*/.]/.test(char)) // Prevent consecutive operators
  ) {
    return;
  }

  display.innerText += char;
};

// Add Event Listeners to Buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const char = e.target.innerText;

    switch (char) {
      case "RESET":
        resetDisplay();
        break;
      case "DEL":
        deleteLastCharacter();
        break;
      case "=":
        calculateResult();
        break;
      case "X":
        appendCharacter("*");
        break;
      default:
        appendCharacter(char);
    }
  });
});

// Add Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[0-9+\-*/().]/.test(key)) {
    appendCharacter(key);
  } else if (key === "Enter") {
    e.preventDefault(); // Prevent accidental form submissions
    calculateResult();
  } else if (key === "Backspace") {
    deleteLastCharacter();
  } else if (key.toUpperCase() === "C") {
    resetDisplay();
  }
});
