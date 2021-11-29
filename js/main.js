/*----- constants -----*/
// Maybe word Class
const articles = [`I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand. It's when you know you're licked before you begin, but you begin anyway and see it through no matter what.`,
    `To the well-organized mind, death is but the next great adventure. You know, the Stone was really not such a wonderful thing. As much money and life as you could want! The two things most human beings would choose above all; the trouble is, humans do have a knack of choosing precisely those things that are worst for them.`,
    `Hello babies. Welcome to Earth. It's hot in the summer and cold in the winter. It's round and wet and crowded. On the outside, babies, you've got a hundred years here. There's only one rule that I know of, babies: "God damn it, you've got to be kind."`,
    `Because it is my name! Because I cannot have another in my life! Because I lie and sign myself to lies! Because I am not worth the dust on the feet of them that hang! How may I live without my name? I have given you my soul; leave me my name!`];


/*----- app's state (variables) -----*/
// Timer
let timer;
// array of words that will be rendered.
let wordsArr;
// array representation of the words need to be typed.
// [0,0,0,0,0] = array of 5 words, 0 meaning not completed yet. -1 wrong, 1 completed.
// let wordsSwitch;
// Is the input valid.
let isInputValid;
// is game active;
let isGameActive;
// currentWord being validated.
let currWordIdx;
// heart array [1, 1, 1, 1, 0] 4 HP left.
let hearts;
// isPlayerConnected (on focus!)
let isPlayerConnected;
// light (red, yellow, or green);
let lightColors;
// light index;'
let lightIndex;
// number of words completed.
let numWordsCompleted;
// timer interval.
let timerInterval;
// time passed.
let timePassed;
// randomLightSec that will hold value representing secs light will display.
let randomLightSec;
// current words per minute
let currWPM;
// intervals
let intervals;

/*----- cached element references -----*/
// input element
const inputEl = document.querySelector('#user-input');
// screen element.
const screenEl = document.querySelector('#screen');
// screen's p element.
const screenOutputEl = document.querySelector('#screen-output');
// game container (for changing color.)
const gameContainerEl = document.querySelector('.game-container');
// light (for changing color);
const lightEl = document.querySelector('.light');
// timer element.
const timerEl = document.querySelector('#timer');

// current word element. DYNAMIC.
let currentWordEl;
// start button.
// const startButton = document.querySelector('');
// rules button.
// const rulesButton = document.querySelector('');


/*----- event listeners -----*/
// start button
// rules button
// input element listener
// --> input
inputEl.addEventListener('input', inputController);
// --> onFocus
inputEl.addEventListener('focusin', handleFocus);
// --> unfocus
inputEl.addEventListener('focusout', handleFocus);
// restart game button

/*----- functions -----*/
// init function initialize all variables.
function init() {
    time = 0;
    currWPM = 0;
    wordsToDisplay = articles[Math.floor(Math.random() * 4)].split(' ');
    // wordsToDisplay = articles[1].split(' '); // Testing
    wordsArr = wordsToDisplay.map(e => e + ' ');
    hearts = [1, 1, 1, 1, 1];
    lightColors = [
        {
            color: 'green',
            timeMin: 3,
            timeMax: 6
        },
        {
            color: 'yellow',
            timeMin: 1,
            timeMax: 4
        },
        {
            color: 'red',
            timeMin: 2,
            timeMax: 5
        }
    ]
    lightIndex = 0;
    currColor = lightColors[lightIndex];
    randomLightSec = getRandomSec(currColor);
    currWordIdx = 0;
    numWordsCompleted = 0;
    isInputValid = false;
    isPlayerConnected = false;
    isGameActive = false;
    timePassed = 0;
};


// Render functions
// 1) Render function to render all of the words into screen.
function renderWords() {
    let outputHTML = wordsToDisplay.reduce((htmlString, word, i) => {
        htmlString += `<span id=w${i}>${word}</span> `;
        return htmlString;
    }, '')
    screenOutputEl.innerHTML = outputHTML;
    updateCurrentWord();
};

// render time.
function startTimer() {
    time = 60;
    timerEl.innerText = time;
    let timerInterval = setInterval(function () {
        if (countdownToGame <= 0) {
            lightHelper();
        }
        time--;
        timePassed++;
        timerEl.innerText = time;
        if (time <= 0) {
            renderEndGame('lost')
            clearInterval(timerInterval);
        }
    }, 1000);
    intervals.push(timerInterval);
};

// 3) controller / render function based on if the user input is valid
function inputController(e) {
    if (currColor.color !== 'red' && isGameActive) {
        let playerInput = e.target.value;
        isInputValid = wordsArr[currWordIdx].includes(playerInput) && wordsArr[currWordIdx][0] === playerInput[0];
        if (isInputValid) {
            inputEl.style.color = '#0fa';
            currentWordEl.classList.remove('invalid');
            gameContainerEl.classList.replace('neon-invalid', 'neon-valid');
            if (playerInput.includes(' ')) {
                inputEl.value = '';
                currentWordEl.classList.remove('current');
                currentWordEl.classList.add('valid');
                updatePoints();
                updateCurrentWord();
            }
        } else {
            gameContainerEl.classList.replace('neon-valid', 'neon-invalid');
            inputEl.style.color = '#FE0300';
            currentWordEl.classList.replace('valid', 'invalid');
        }
    } else {
        inputEl.value = '';
        if (isGameActive){
            takeDamage();
            renderDamageTaken();
        }
    };
};

// helper function for ease of typing.
function updateCurrentWord() {
    currentWordEl = document.querySelector(`#w${currWordIdx}`);
    if (currentWordEl){
        currentWordEl.classList.add('current');
        if (numWordsCompleted >= 15){
            screenEl.scrollTop = currentWordEl.offsetTop;
        }
    }
};

// 4) render function for heart container, render hearts based on array.
function renderHearts() {
    hearts.forEach((h, i) => {
        let heart = document.querySelector(`#h${i}`);
        if (h) {
            heart.classList.replace('none', 'full');
        } else {
            heart.classList.replace('full', 'none');
        };
    });
};
// 5) render function for light change
function renderLight() {
    // green light for 4-8 seconds.
    // yellow light for 1 - 1.5 seconds.
    // set red light between 3-6 seconds.
    lightEl.classList.remove('red', 'yellow', 'green', 'white', 'blue');
    lightEl.classList.add(currColor.color);
};
// 6) FUN: render function for when user types while light is red. changes green neon to red. maybe activate static effect.
function renderDamageTaken() {
    gameContainerEl.classList.replace('neon-valid', 'neon-invalid');
    let blinkTimer = 0;
    let shakeTimer = 0;
    let damageInterval = setInterval(function () {
        if (blinkTimer === 4 && shakeTimer === 1000) {
            gameContainerEl.classList.toggle('neon-invalid');
            screenEl.classList.toggle('shake');
            clearInterval(damageInterval);
        };
        blinkTimer++;
        shakeTimer += 250;
        screenEl.classList.toggle('shake');
        gameContainerEl.classList.toggle('neon-invalid');

    }, 250);
    renderHearts();
}

// Helper function that checks on timePassed global variable.
// Certain things will trigger as time passes.
// NOTE timePassed variable is more like timePassed since light switch.
function lightHelper() {
    // if light is green and timePassed is equal to random switch time.
    if (randomLightSec === timePassed) {
        if (lightIndex === 0 || lightIndex === 1) {
            lightIndex++;
        } else {
            lightIndex = 0;
        }
        // set a different random secs based on light index.
        currColor = lightColors[lightIndex];
        randomLightSec = getRandomSec(currColor);
        // reset time passed;
        timePassed = 0;
    }
    renderLight();
};

// helper function get random between two values based on color;
function getRandomSec(color) {
    return Math.floor(Math.random() * (color.timeMax - color.timeMin) + color.timeMin);
};

// helper function that will handle focus.
function handleFocus() {
    isPlayerConnected = !isPlayerConnected;
    inputEl.classList.toggle('disconnected');
    let currentAttribute = inputEl.getAttribute('placeholder');
    if (currentAttribute === 'CONNECT' || currentAttribute === 'PLAY AGAIN') {
        init();
        power();
        inputHelper('');
    } else {
        inputHelper('CONNECT');
        gameContainerEl.classList.replace('neon-valid', 'neon-unloading');
        isGameActive = false;
        clearTimeout();
        clearIntervals();
    }
}


// Power up function that will apply all styles signifying power up.
function power() {
    intervals = [];
    screenEl.classList.add('active');
    gameContainerEl.classList.add('neon-loading');
    flickerGoLight();
    fillHearts();
    startCountdownToGame();
}

function fillHearts() {
    let hIdx = 0;
    const heartFillInterval = setInterval(function () {
        if (hIdx === 4) {
            clearInterval(heartFillInterval);
        }
        document.querySelector(`#h${hIdx}`).classList.replace('none', 'full');
        hIdx++;
    }, 500);
}


function flickerGoLight() {
    let increment = 0;
    lightEl.classList.add('white');
    const lightFlickInterval = setInterval(function () {
        if (increment >= 16) {
            lightEl.classList.remove('blue');
            lightEl.classList.remove('white');
            clearInterval(lightFlickInterval);
        };
        lightEl.classList.toggle('white');
        lightEl.classList.toggle('blue');
        increment++;
    }, 250);
    intervals.push(lightFlickInterval);
}

function startCountdownToGame() {
    countdownToGame = 5;
    screenOutputEl.innerHTML = `<h3 id="ready">GET READY!</h3> <h1 class="countdown">${(countdownToGame)}</h1>`;
    let countdownEl = document.querySelector('.countdown');
    let cdInterval = setInterval(function () {
        countdownToGame--;
        countdownEl.innerText = countdownToGame;
        if (countdownToGame === 0) {
            document.querySelector('#ready').innerText = '';
            countdownEl.innerHTML = '<h1 id="start" class="countdown">START</h1>';
            isGameActive = true;
        } else if (countdownToGame < 0) {
            startTimer();
            renderLight();
            renderWords();
            renderHearts();
            gameContainerEl.classList.replace('neon-loading', 'neon-valid');
            clearInterval(cdInterval);
        }
    }, 1000);
    intervals.push(cdInterval);
}

function takeDamage() {
    let numLives = hearts.reduce((a, c) => {
        a += c;
        return a;
    }, 0);
    hearts[numLives - 1] = 0;
    if ( numLives == 1 ){
        renderEndGame('lost');
    }
}

function updatePoints() {
    numWordsCompleted++;
    currWordIdx++;
    if (numWordsCompleted === wordsArr.length) {
        renderEndGame('won');
    }
}

// render end game function will:
// should clear all intervals in the game. Ideally.
// display how many words they have completed.
function renderEndGame(cond) {
    isGameActive = false;
    screenOutputEl.innerHTML = `
        <div id="result-screen">
            <h2>YOU ${cond.toUpperCase()}!</h2>
                <h5>you typed </h5>
                <h1 id="score">${numWordsCompleted}</h1>
                <h5>words per minute!</h5>
                </div>`;
    let scoreEl = document.querySelector('#score');
    screenEl.scrollTop = scoreEl.offsetTop;
    inputHelper('PLAY AGAIN');
    // gameContainerEl.classList.replace('neon-valid', 'neon-unloading');
    // Stop the timer
    clearIntervals();
}

function clearIntervals() {
    intervals.forEach(i => clearInterval(i));
}

function inputHelper(ph) {
    if (ph === 'PLAY AGAIN'){
        inputEl.blur();
        inputEl.setAttribute('placeholder', 'PLAY AGAIN');
    } else {
        inputEl.setAttribute('placeholder', ph);
    }
}