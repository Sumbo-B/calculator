let display = document.getElementById("calc_display_digit");
let buttons = Array.from(document.querySelectorAll(".calc_keys"));

buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "RESET":
        display.innerText = "";
        break;
      case "DEL":
        if (display.innerText) {
          display.innerText = display.innerText.slice(0, -1);
        }
        break;
      case "=":
        try {
          display.innerText = eval(display.innerText);
        } catch {
          display.innerText = "Error! Try Again";
        }
        break;
      case "X":
        display.innerText += "*";
        break;
      default:
        display.innerText += e.target.innerText;
    }
  });
});
