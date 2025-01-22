let display = document.getElementById("calc_display_digit");
let buttons = Array.from(document.querySelectorAll(".calc_keys button"));

// Helper Functions
function resetDisplay() {
  display.innerText = "";
}

function deleteLastCharacter() {
  display.innerText = display.innerText.slice(0, -1);
}

function calculateResult() {
  try {
    // Use `Function` for safer evaluation
    const result = Function(
      `'use strict'; return (${display.innerText.replace(/X/g, "*")})`
    )();
    display.innerText = result;
  } catch {
    display.innerText = "Error! Try Again";
  }
}

function appendCharacter(char) {
  const lastChar = display.innerText.slice(-1);

  // Prevent multiple operators in a row
  if (/[+\-*/.]/.test(lastChar) && /[+\-*/.]/.test(char)) return;

  display.innerText += char;
}

// Add Event Listeners
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
    calculateResult();
  } else if (key === "Backspace") {
    deleteLastCharacter();
  } else if (key.toUpperCase() === "C") {
    resetDisplay();
  }
});
