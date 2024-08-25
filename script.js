const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const multiplierDisplay = document.getElementById('multiplier');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let score = 0;
let multiplier = 1;
let time = 30;
let activeHole;
let moleTimer;
let gameTimer;

function randomHole() {
    return holes[Math.floor(Math.random() * holes.length)];
}

function showMole() {
    if (activeHole) {
        activeHole.classList.remove('up');
    }
    activeHole = randomHole();
    activeHole.innerHTML = '<div class="mole bounce"></div>';
    activeHole.querySelector('.mole').style.top = '0';
    
    setTimeout(() => {
        if (activeHole.querySelector('.mole')) {
            activeHole.querySelector('.mole').style.top = '100%';
        }
        activeHole.innerHTML = '';
        moleTimer = setTimeout(showMole, Math.random() * 1000 + 500);
    }, 800 / multiplier);
}

function startGame() {
    score = 0;
    multiplier = 1;
    time = 30;
    scoreDisplay.textContent = score;
    multiplierDisplay.textContent = multiplier;
    timeDisplay.textContent = time;
    gameOverScreen.classList.add('hidden');
    startButton.disabled = true;

    showMole();
    gameTimer = setInterval(countdown, 1000);
}

function countdown() {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) {
        endGame();
    } else if (time % 10 === 0) {
        multiplier += 1;
        multiplierDisplay.textContent = multiplier;
    }
}

function endGame() {
    clearInterval(gameTimer);
    clearTimeout(moleTimer);
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
    startButton.disabled = false;
}

function whack(event) {
    if (event.target.classList.contains('mole')) {
        score += 1 * multiplier;
        scoreDisplay.textContent = score;
        event.target.style.top = '100%';
        clearTimeout(moleTimer);
        moleTimer = setTimeout(showMole, Math.random() * 1000 + 500);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
darkModeToggle.addEventListener('click', toggleDarkMode);

holes.forEach(hole => hole.addEventListener('click', whack));
