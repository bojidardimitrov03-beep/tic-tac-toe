const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const resetBtn = document.querySelector("#resetBtn");

let positions = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = true;

const changeThemeBtn = document.getElementById("changeThemeBtn")
let theme = "light"


const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWinner() {
    winConditions.forEach((condition) => {
        cellA = positions[condition[0]];
        cellB = positions[condition[1]];
        cellC = positions[condition[2]];
        if (cellA !== "" && cellA === cellB && cellB === cellC) {
            gameRunning = false;
            statusText.textContent = `${cellA} wins!`;

        }
    })
    if (!positions.includes("") && gameRunning) {
        gameRunning = false;
        statusText.textContent = "It's a Draw!";

    }

}

function cellClicked(event) {
    const clickedCell = event.target;
    const index = Number(clickedCell.getAttribute("cellIndex"));

    if (gameRunning && positions[index] === "") {
        positions[index] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        checkWinner();

        if (gameRunning) {
            changePlayer();
        }
    }

}

function changePlayer(){
    if (currentPlayer === "X") {
        currentPlayer = "O";
        statusText.textContent = `${currentPlayer}'s Move!`
    } else {
        currentPlayer = "X";
        statusText.textContent = `${currentPlayer}'s Move!`
    }
}

function startGame() {
    // Reset game state
    positions = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameRunning = true;
    statusText.textContent = `${currentPlayer}'s turn`;

    // Add event listeners to cells
    cells.forEach(cell => {
        cell.addEventListener("click", cellClicked);
    });

    // Add event listener to reset button
    resetBtn.addEventListener("click", resetGame);
}

function resetGame() {
    positions = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameRunning = true;
    statusText.textContent = `${currentPlayer}'s turn`;

    // Clear all cells visually
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

startGame();



const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", changeTheme);

function changeTheme() {
    document.body.classList.toggle("dark-theme");
}