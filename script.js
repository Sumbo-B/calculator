const display = document.getElementById("calc_display_digit");
const buttons = Array.from(document.querySelectorAll(".calc_keys"));

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
    // Sanitize input (remove commas)
    const sanitizedInput = display.innerText
      .replace(/,/g, "")
      .replace(/X/g, "*");

    // Evaluate the expression
    const result = Function(`'use strict'; return (${sanitizedInput})`)();
    if (Number.isFinite(result)) {
      // Format the result with commas for readability
      display.innerText = result.toLocaleString("en");
    } else {
      display.innerText = "Error! Try Again";
    }
  } catch {
    display.innerText = "Error! Try Again";
  }
};

const appendCharacter = (char) => {
  // Remove commas before appending new characters
  display.innerText = display.innerText.replace(/,/g, "");

  const lastChar = display.innerText.slice(-1);

  // Allow starting with `-` or a digit/parenthesis
  if (!display.innerText && !/[0-9(]/.test(char)) return;

  // Prevent multiple consecutive operators
  if (/[+\-*/.]/.test(lastChar) && /[+\-*/.]/.test(char)) return;

  display.innerText += char;

  // Add commas back for better readability
  display.innerText = display.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  const validKeys = /[0-9+\-*/().]/;
  const key = e.key;

  if (validKeys.test(key)) {
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
