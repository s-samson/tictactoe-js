const statusDisplay = document.querySelector('.game--status');



let gameActive = true;
let currentPlayer ="X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// dit zijn de winningconditions in het veld.
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


statusDisplay.innerHTML = currentPlayerTurn();


function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// hier maak ik gebruikt van de (ternary operator) het is kort gezegd een shortcut voor een if statement.
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// In mijn loop ga ik door elke cell heen, en check ik of de elementen gelijk staan aan mijn condities. als ze gelijk zijn dan wint de speler.
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    // als de speler de ronde wint geeft hij hier de winning Message af
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    // als de speler gelijk speelt geeft hij hier de message af.
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}


function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    
    // hier pakken we de data-cell-index attribute van de geklikte cell zo kan je identifiseren welke cell het is  en getAttribute returnt een string en ik wil een int hebben dus moet hem converten.
    const clickedCellIndex = parseInt (
        clickedCell.getAttribute('data-cell-index')
    );


    // Hier check ik of de cell al gespeeld is of dat de game op pause staat. als deze condities waar zijn dan wordt de click genegeerd.
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    // als alles in orde is dan gaat het spel verder.
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);