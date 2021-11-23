// DELETE LATER
let lorem = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus fuga veniam quam nemo, eveniet odit quaerat ea dolor maxime voluptates quasi eligendi aliquid dolorum hic incidunt alias dolore architecto officiis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit.';

/*----- constants -----*/
// Maybe word Class

/*----- app's state (variables) -----*/
// Timer
let timer;
// array of words that will be rendered.
let wordsArr;
// array representation of the words need to be typed.
// [0,0,0,0,0] = array of 5 words, 0 meaning not completed yet. -1 wrong, 1 completed.
let wordsSwitch;
// Is the input valid.
let isInputValid;
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
    wordsToDisplay = lorem.split(' ');
    wordsArr = wordsToDisplay.map(e => e + ' ');
    wordsSwitch = wordsArr.map(e => 0);
    hearts = [1, 1, 1, 1, 1];
    lightColors = [
        {
            color: 'green',
            timeMin: 4,
            timeMax: 8
        },
        {
            color: 'yellow',
            timeMin: 1,
            timeMax: 4
        },
        {
            color: 'red',
            timeMin: 3,
            timeMax: 6
        }
    ]
    lightIndex = 0;
    currColor = lightColors[lightIndex];
    randomLightSec = getRandomSec(currColor);
    currWordIdx = 0;
    numWordsCompleted = 0;
    isInputValid = false;
    isPlayerConnected = false;
    timePassed = 0;
    startTimer();
    renderLight();
    renderWords();
    renderHearts();
};


// Render functions
// 1) Render function to render all of the words into screen.
function renderWords() {
    let outputHTML = wordsToDisplay.reduce((htmlString, word, i) => {
        htmlString += `<span id=w${i}>${word}</span> `;
        return htmlString;
    }, '')
    screenOutputEl.innerHTML = outputHTML;
    updateQS();
};

// render time.
function startTimer() {
    time = 60;
    timerEl.innerText = time;
    timerInterval = setInterval(function () {
        lightHelper();
        time--;
        timePassed++;
        timerEl.innerText = time;
        if (time === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
};

// 3) controller / render function based on if the user input is valid
function inputController(e) {
    let playerInput = e.target.value;
    isInputValid = wordsArr[currWordIdx].includes(playerInput);
    if (currColor.color !== 'red') {
        if (isInputValid) {
            inputEl.style.color = '#0fa';
            currentWordEl.classList.remove('invalid');
            gameContainerEl.classList.replace('neon-invalid', 'neon-valid');
            if (playerInput.includes(' ')) {
                wordsSwitch[currWordIdx] = 1;
                inputEl.value = '';
                currentWordEl.classList.remove('current');
                currentWordEl.classList.add('valid');
                currWordIdx++;
                numWordsCompleted++;
                updateQS();
            }
        } else {
            gameContainerEl.classList.replace('neon-valid', 'neon-invalid');
            inputEl.style.color = '#FE0300';
            currentWordEl.classList.replace('valid', 'invalid');
            wordsSwitch[currWordIdx] = -1;
        }
    } else {
        gameContainerEl.classList.replace('neon-valid', 'neon-invalid');
        takeDamage();
        renderHearts();
    };
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
// 6) FUN: render function for when user types while light is red. changes green neon to red and show creepy skin. maybe activate static effect.


// helper function for ease of typing.
function updateQS() {
    currentWordEl = document.querySelector(`#w${currWordIdx}`);
    currentWordEl.classList.add('current');
};

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
    if (inputEl.getAttribute('placeholder') === 'CONNECT') {
        setTimeout(function () {
            init();
            gameContainerEl.classList.replace('neon-loading', 'neon-valid');
        }, 6000);
        power();
        inputEl.setAttribute('placeholder', '');
    } else {
        inputEl.setAttribute('placeholder', 'CONNECT');
        gameContainerEl.classList.replace('neon-valid', 'neon-unloading');
        clearTimeout();
        clearInterval(timerInterval);
    }
}


// Power up function that will apply all styles signifying power up.
function power() {
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
}

function startCountdownToGame() {
    countdownToGame = 5;
    screenOutputEl.innerHTML = `<h3 id="ready">GET READY!</h3> <h1 id="countdown">${(countdownToGame)}</h1>`;
    let countdownEl = document.querySelector('#countdown');
    let cdInterval = setInterval(function () {
        countdownToGame--;
        countdownEl.innerText = countdownToGame;
        if (countdownToGame === 0) {
            document.querySelector('#ready').innerText = '';
            countdownEl.innerHTML = '<h1 id="countdown">START</h1>';
        } else if (countdownToGame < 0) {
            clearInterval(cdInterval);
        }
    }, 1000);
}

function takeDamage(){
    let blinkTimer = 0;
    let blink = setInterval(function(){
        if (blinkTimer === 4){
            gameContainerEl.classList.toggle('neon-invalid');
            clearInterval(blink);
        };
        blinkTimer++;
        gameContainerEl.classList.toggle('neon-invalid');
    }, 250);
    let numLives = hearts.reduce((a, c) => {
        a += c;
        return a;
    }, 0);
    hearts[numLives - 1] = 0;
}