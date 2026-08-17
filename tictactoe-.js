let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // O starts the game
let count = 0; // To track draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// When a box is clicked
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O
      box.innerText = "O";
      turnO = false;
    } else {
      // Player X
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    // Check for draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Display draw message
const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Display winner
const showWinner = (winner) => {
  msg.innerText = `${winner} Wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }

  return false;
};

// New Game button
newGameBtn.addEventListener("click", resetGame);

// Reset Game button
resetBtn.addEventListener("click", resetGame);
