// Color change
function changeColor() {
    for(let i = 0, len = radios.length; i < len; i++) {
        const label = document.querySelector(`label[for="${radios[i].id}"]`);
        const svg = label.querySelector('.foreground');
        const player = document.querySelector('#displayPlayer').style;
        

        if (radios[i].checked === true) {
            svg.setAttribute('fill', '#f5d6e6');  
        } else {
            svg.setAttribute('fill', 'white'); 
        }

        if (this.id === 'rock') {
            player.setProperty('--background', 'url(img/rock.svg)');
        } else if(this.id === 'paper') {
            player.setProperty('--background', 'url(img/paper.svg)');
        } else if (this.id === 'scissors') {
            player.setProperty('--background', 'url(img/scissors.svg)');
        }
    }
}

function checkComputer(play) {
    const computer = document.querySelector('#displayComputer').style;
    
    if (play === 'rock') {
        computer.setProperty('--background', 'url(img/rock.svg)');
    } else if(play === 'paper') {
        computer.setProperty('--background', 'url(img/paper.svg)');
    } else if (play === 'scissors') {
        computer.setProperty('--background', 'url(img/scissors.svg)');
    }
}

// Return computer's play
function computerPlay() {
    let moves = ['rock', 'paper', 'scissors'];
    const playResult = moves[Math.floor(Math.random() * 3)];

    setTimeout(checkComputer, 500, playResult);

    return playResult;
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

let roundCounter = {
    countPlayer: 0,
    countComputer : 0,
    roundWinner : function(result) {
        if (result === null) {
        return;
        } else if (result === 0) {
            return;
        } else if (result === 1) {
            this.countPlayer++;
        } else if (result === -1) {
            this.countComputer++;
        }
    },
    count: function() {
        return (Math.max(this.countPlayer, this.countComputer) < 5);
    },
    player: function() {
        return this.countPlayer;
    },
    computer: function() {
        return this.countComputer;
    },
    reset: function() {
        this.countPlayer = 0;
        this.countComputer = 0;
    }
};

function displayWinner() {
    let player = document.getElementById('player');
    let computer = document.getElementById('computer');

    if (roundCounter.player() === 5) {
        player.classList.add('winner');
    } else if (roundCounter.computer() === 5) {
        computer.classList.add('winner');
    }
}

function game(player) {
    let result = playRound(player, computerPlay());
    let displayPlayer = document.getElementById('displayPlayer');
    let displayComputer = document.getElementById('displayComputer');

    roundCounter.roundWinner(result);

    setTimeout(function(){
        displayPlayer.textContent = roundCounter.player();
        displayComputer.textContent = roundCounter.computer();

        if (!roundCounter.count()) {
            displayWinner();
        }
    }, 2000);
}

function uncheckAll(selectors) {
    for (let i = 0, len = radios.length; i < len; i++) {
        selectors[i].checked = false;

        const label = document.querySelector(`label[for="${radios[i].id}"]`);
        const svg = label.querySelector('.foreground');
        svg.setAttribute('fill', 'white'); 

        const player = document.querySelector('#displayPlayer').style;
        player.setProperty('--background', '#');
        const computer = document.querySelector('#displayComputer').style;
        computer.setProperty('--background', '#');
    }
}

function resetGame() {
    let displayPlayer = document.getElementById('displayPlayer');
    let displayComputer = document.getElementById('displayComputer');
    let player = document.getElementById('player');
    let computer = document.getElementById('computer');

    uncheckAll(radios);
    roundCounter.reset();

    displayPlayer.textContent = roundCounter.player();
    displayComputer.textContent = roundCounter.computer();

    player.classList.remove('winner');
    computer.classList.remove('winner');
}

function startSubmit() {
    const weapon = this.querySelector('input[type=radio]:checked')

    if (roundCounter.count()) {
        if (weapon === null){
            return;
        }

        game(weapon.value);
        setTimeout(uncheckAll, 3000, radios);
    } else {
        resetGame();
    }

    
}

const radios = document.querySelectorAll(`input[name="weapon"]`);
radios.forEach(radio => radio.addEventListener('click', changeColor))

const submitForm  = document.getElementById('weapon-btn-container');
submitForm.addEventListener('submit', startSubmit);