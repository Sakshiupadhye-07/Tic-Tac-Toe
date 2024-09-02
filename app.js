let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Player X turn
let turn_X = true;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],   
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    enableBoxes();
    turn_X = true;
    msgContainer.classList.add("hide");
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const show_Winner = (winner) => {
    msg.innerText = `Congratulations!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                show_Winner(pos1);
                winnerFound = true;
                break;
            }
        }
    }

    // Check for a tie only if no winner is found
    if (!winnerFound) {
        let isTie = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                isTie = false;
                break;
            }
        }

        if (isTie) {
            msg.innerText = "Game is a tie!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn_X) {
            box.innerText = "X";
            turn_X = false;
        } else {
            box.innerText = "O";
            turn_X = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
