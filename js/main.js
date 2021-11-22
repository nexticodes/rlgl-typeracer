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
// light (red, yellow, or green);
let lightColor;
// number of words completed.
let numWordsCompleted;

/*----- cached element references -----*/
// input element
const inputEl = document.querySelector('#user-input');
// screen's p element.
const screenOutputEl = document.querySelector('#screen-output');
// game container (for changing color.)
const gameContainerEl = document.querySelector('game-container');
// light (for changing color);
const lightEl = document.querySelector('light');
// heart container.
const heartContainerEl = document.querySelector('heart-container');

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
    numWordsCompleted = 0;
    isInputValid = false;
    isPlayerConnected = false;
    renderWords();
    updateQS();
}
init();


// Render functions
// 1) Render function to render all of the words into screen.
function renderWords() {
    let outputHTML = wordsToDisplay.reduce((htmlString, word, i) => {
        htmlString += `<span id=w${i}>${word}</span> `;
        return htmlString;
    }, '')
    screenOutputEl.innerHTML = outputHTML;
};
// 2) controller / render function based on if the user input is valid
function inputController(e) {
    let playerInput = e.target.value;
    isInputValid = wordsArr[currWordIdx].includes(playerInput);
    if (isInputValid){
        inputEl.style.color = '#0fa';
        currentWordEl.classList.remove('invalid');
        if (playerInput.includes(' ')){
            wordsSwitch[currWordIdx] = 1;
            updateWordsOnScreen();
            inputEl.value = '';
            currentWordEl.classList.add('valid');
            currWordIdx++;
            numWordsCompleted++;
            updateQS();
        }
    } else {
        inputEl.style.color = '#FE0300';
        currentWordEl.classList.add('invalid');
        currentWordEl.classList.remove('valid');
        wordsSwitch[currWordIdx] = -1;
    }
}
// 3) render function for heart container, render hearts based on array.
// 4) render function for light change
function renderLight() {
    // green light for 4-8 seconds.
    // yellow light for 1 - 1.5 seconds.
    // set red light between 3-6 seconds.
}
// 5) FUN: render function for when user types while light is red. changes green neon to red and show creepy skin. maybe activate static effect.


// update word on screen function based on wordsSwitch.
function updateWordsOnScreen(){

}

// helper function for ease of typing.
function updateQS(){
    currentWordEl = document.querySelector(`#w${currWordIdx}`);
}

// helper function that returns random number of milliseconds based on argument.
// 'green' -- 4000 to 8000 ms;
// 'yellow' -- 1000 to 1500 ms;
// 'red' -- 3000 to 6000 ms;