'use strict';
//Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const dieButton = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//Starting Conditions
let scores, currentScore, activePlayer, playing;
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  document.querySelector(`current--${(activePlayer = 0)}`);

  diceEl.classList.add(`hidden`);
}
init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
//Rolls Dice
dieButton.addEventListener('click', function () {
  //1. Generate die roll
  if (playing) {
    const dieResult = Math.trunc(Math.random() * 6) + 1;
    console.log(dieResult);
    //2.Display die
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dieResult}.png`;
    //3.Check for rolled die ...if 1, switch to next player
    if (dieResult !== 1) {
      //Add to current score
      currentScore += dieResult;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  } else {
    playing = false;
  }
});
btnHold.addEventListener('click', function () {
  //1.Add score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores[activePlayer]);
    //2. Check if player's score is >=100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`score--${activePlayer}`).textContent = 100;
    }
    //Switch to next player
    else {
      switchPlayer();
    }
  } else {
    playing = false;
  }
});
btnNew.addEventListener('click', init);
