const scoreEl0 = document.getElementById("score--0");
const scoreEl1 = document.getElementById("score--1");
const currentEl0 = document.getElementById("current--0");
const currentEl1 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");

let score, currentScore, activePlayer, playing;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  diceEl.classList.add("hidden");
  playerEl0.classList.remove("layer--winner");
  playerEl1.classList.remove("layer--winner");
  playerEl0.classList.add("player--active");
  playerEl1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Change the background color when the player switch
  playerEl0.classList.toggle("player--active");
  playerEl1.classList.toggle("player--active");
};

// Roll the dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generate a number after rolling
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/d-${dice}.png`;

    // check roll one

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    diceEl.classList.add("hidden");
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // condition to be the winner (player's score is >=100)

    if (score[activePlayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      // switch the other player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
