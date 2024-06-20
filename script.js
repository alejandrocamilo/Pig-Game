'use strict';

// Selecting Elements We Need

//Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Buttons
const btnRollEl = document.querySelector('.btn--roll');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');

//Both Scores
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

//Dice
const diceEl = document.querySelector('.dice');

//Current Scores
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let currentScore = 0;
let activePlayer = 0;
let gameOver = true;
let scores = [0, 0];

//Starting conditions

const resetGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  gameOver = false;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
};

resetGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//When user rolls dice

btnRollEl.addEventListener('click', function () {
  //Generate Random Dice Roll

  if (!gameOver) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //Display dice roll

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    //Is it a number 1?

    if (diceRoll !== 1) {
      //Add dice roll to current score

      currentScore += diceRoll;

      // Display New Score

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch Player
      switchPlayer();
    }
  }
});

// When user holds score

//Add current score to total score

btnHoldEl.addEventListener('click', function () {
  if (!gameOver) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // If The player wins

    if (scores[activePlayer] >= 100) {
      gameOver = true;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // If The player doesn't win
    else {
      switchPlayer();
    }
  }
});

//Player resets game
btnNewEl.addEventListener('click', function () {
  //Resetting all scores to 0

  resetGame();
});
