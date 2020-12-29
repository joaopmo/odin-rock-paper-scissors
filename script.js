// Return computer's play
function computerPlay() {
    let moves = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * 4)];
}

// Check round winner
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    if (playerSelection !== 'rock' &&
    playerSelection !== 'paper' &&
    playerSelection !== 'scissors') {
        return;
    } else if (playerSelection === computerSelection) {
        return 0;
    } else if(playerSelection === 'rock') {
        return (computerSelection === 'paper' ? -1 : 1);
    } else if (playerSelection === 'paper') {
        return (computerSelection === 'scissors' ? -1 : 1);
    } else if (playerSelection === 'scissors') {
        return (computerSelection === 'rock' ? -1 : 1);
    }
}

// Play the game
function game() {
    let countPlayer = 0;
    let countComputer = 0;

    while ((countPlayer < 5) && (countComputer < 5)) {
        let result = playRound(prompt('Your weapon'), computerPlay());

        if (result === null) {
            continue;
        } else if (result === 0) {
            countPlayer++;
            countComputer++;
        } else if (result === 1) {
            countPlayer++;
        } else if (result === -1) {
            countComputer++;
        }

        console.log(`You: ${countPlayer} x Computer: ${countComputer}`);
    }

    if (countPlayer == countComputer) {
        return `Tie! You: ${countPlayer} x Computer: ${countComputer}`;
    } else if (countPlayer === 5) {
        return `You won! You: ${countPlayer} x Computer: ${countComputer}`;
    } else {
        return `You lose! You: ${countPlayer} x Computer: ${countComputer}`;
    }
}







console.log(game());