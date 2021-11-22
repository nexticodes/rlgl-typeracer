/*----- constants -----*/
// Maybe word Class

/*----- app's state (variables) -----*/
// Timer
// array representation of the words need to be typed.
// [0,0,0,0,0] = array of 5 words, 0 meaning not completed yet. -1 wrong, 1 completed.
// array of words that will be rendered.
// Is the input valid.
// currentWord being validated.
// heart array [1, 1, 1, 1, 0] 4 HP left.
// isPlayerConnected (on focus!)

/*----- cached element references -----*/
// input element
// screen's p element.
// game container (for changing color.)
// light (for changing color);
// heart container.

/*----- event listeners -----*/
// start button
// rules button
// input element listener
// --> keyup
// --> onFocus
// --> unfocus
// restart game button

/*----- functions -----*/
// init function initialize all variables.

/*
Render functions
1) Render function to render all of the words into screen.
2) controller / render function based on if the user input is valid
3) render function for heart container, render hearts based on array.
4) render function for light change
5) FUN: render function for when user types while light is red. changes green neon to red and show creepy skin. maybe activate static effect.
*/

// input checker to see if the input value is equal to word needed to be typed.
// 