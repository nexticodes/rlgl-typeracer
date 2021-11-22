// DELETE LATER
let lorem = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus fuga veniam quam nemo, eveniet odit quaerat ea dolor maxime voluptates quasi eligendi aliquid dolorum hic incidunt alias dolore architecto officiis.'




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

/*----- cached element references -----*/
// input element
const input = document.querySelector('#user-input');
// screen's p element.
const screenOutput = document.querySelector('#screen-output');
// game container (for changing color.)
const gameContainer = document.querySelector('game-container');
// light (for changing color);
const light = document.querySelector('light');
// heart container.
const heartContainer = document.querySelector('heart-container');
// start button.
// const startButton = document.querySelector('');
// rules button.
// const rulesButton = document.querySelector('');


/*----- event listeners -----*/
// start button
// rules button
// input element listener
// --> input
input.addEventListener('input', inputController);
// --> onFocus
// --> unfocus
// restart game button

/*----- functions -----*/
// init function initialize all variables.
function init() {
    // set timer.
    timer = 60;
    wordsToDisplay = lorem.split(' ');
    wordsArr= wordsToDisplay.map(e => e + ' ');
    wordsSwitch = wordsArr.map( e => 0);
    hearts = [1, 1, 1, 1, 1];
    currWordIdx = 0;
    isInputValid = true;
    isPlayerConnected = false;
    renderWords();
}
init();


// Render functions
// 1) Render function to render all of the words into screen.
function renderWords() {
    screenOutput.innerHTML = lorem;
};
// 2) controller / render function based on if the user input is valid
function inputController(e) {
    let playerInput = e.target.value;
    if (wordsArr[currWordIdx].includes(playerInput)){
        input.style.color = '#0fa';
        if (playerInput.includes(' ')){
            input.value = '';
        }
    } else {
        input.style.color = '#FE0300';
    }
}
// 3) render function for heart container, render hearts based on array.
// 4) render function for light change
// 5) FUN: render function for when user types while light is red. changes green neon to red and show creepy skin. maybe activate static effect.

