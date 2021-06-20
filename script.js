const statusDisplay = document.querySelector('.game--status');



let gameActive = true;

let currentPlayer ="X";

let gameState = ["", "", "", "", "", "", "", "", ""];


statusDisplay.innerHTML = currentPlayerTurn();


function handleCellPlayed() {

}

function handlePlayerChange() {

}

function handleResultValidation() {

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    
    // hier pakken we de data-cell-index attribute van de geklikte cell zo kan je identifiseren welke cell het is  en getAttribute returnt een string en ik wil een int hebben dus moet hem converten.
    const clickedCellIndex = parseInt (
        clickedCell.getAttribute('data-cell-index')
    );


    // Hier check ik of de cell al gespeeld is of dat de game op pause staat. als deze condities waar zijn dan wordt de click genegeerd.
    if (gameState[clickedCellIndex] !=="" || !gameActive){
     return;
    }
    // als alles in orde is dan gaat het spel verder.
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {

}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);