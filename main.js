// create an array of cards objects
const cards = [
  {
    imageUrl: "images/car.jpg",
    id: 3,
  },
  {
    imageUrl: "images/laptop.png",
    id: 5,
  },
  {
    imageUrl: "images/apple.jpg",
    id: 1,
  },
  {
    imageUrl: "images/house.png",
    id: 4,
  },

  {
    imageUrl: "images/banana.png",
    id: 2,
  },
  {
    imageUrl: "images/laptop.png",
    id: 5,
  },

  {
    imageUrl: "images/apple.jpg",
    id: 1,
  },
  {
    imageUrl: "images/car.jpg",
    id: 3,
  },
  {
    imageUrl: "images/lemon.jpg",
    id: 6,
  },
  {
    imageUrl: "images/house.png",
    id: 4,
  },

  {
    imageUrl: "images/lemon.jpg",
    id: 6,
  },

  {
    imageUrl: "images/banana.png",
    id: 2,
  },
];

// shufflecards when load the page
const shuffleArray = (array) => {
  const random = Math.floor(Math.random() * array.length);

  array.sort((a, b) => {
    if (a.id < array[random].id) {
      return -1;
    } else {
      return 1;
    }
  });
};
shuffleArray(cards);

// starter elements
const body = document.querySelector("body");

const gameContainer = document.querySelector(".container");

const scoreEl = document.querySelector(".score").lastElementChild;

const triesEl = document.querySelector(".tries").lastElementChild;

const winScreen = document.querySelector(".win");


const gameInfo = document.querySelector(".game-info");

gameInfo.style.display = 'none';
// play Game button
const playGame = document.createElement("button");
playGame.classList.add("play");
playGame.innerText = "Play Game";
gameContainer.append(playGame);

// creat audio
const clickSound = document.createElement("audio");
clickSound.src = "sounds/click.wav";

const failedSound = document.createElement("audio");
failedSound.src = "sounds/failed.wav";

const sucessSound = document.createElement("audio");
sucessSound.src = "sounds/success.wav";

const gameOverSound = document.createElement("audio");
gameOverSound.src = "sounds/gameover.wav";

const winSound = document.createElement("audio");
winSound.src = "sounds/win.wav"

const startGameSound = document.createElement("audio");
startGameSound.src = "sounds/startgame.mp3"

const startPlaying = () => {
  gameInfo.style.display = 'flex';
  startGameSound.play();
  // check card function
  let activeId;
  let activeCard;
  let failedAttempts = 0;
  let isActive = false;
  let score = 0;
  let level = 1;

  const checkCard = (e) => {
    clickSound.play();
    const curruntCard = e.target.parentElement;

    // if not any card is active
    if (!isActive) {
      activeCard = curruntCard;
      activeId = curruntCard.id;

      console.log("Active now");
      isActive = true;
      curruntCard.removeEventListener("click", checkCard);
    } // if we have choosen the first card
    else {
      // check if the current card equals the first card
      if (curruntCard.id == activeId && curruntCard != activeCard) {

        sucessSound.play();

        // increase score
        score += 10;
        scoreEl.innerText = score;

        // delete cards from cards array
        cards.splice(cards.indexOf(curruntCard), 1);
        cards.splice(cards.indexOf(activeCard), 1);
        console.log(cards);

        // disappear the two elements from the screen
        activeCard.style.display = "none";
        curruntCard.style.display = "none";

        // you win
        if (cards.length === 0) {
          gameInfo.style.display = "none";
          gameContainer.style.display = "none";
          winSound.play();
        }
        console.log("correct answer");
        isActive = false;
      } else {
        failedSound.play();
        failedAttempts += 1;
        triesEl.innerText = failedAttempts;

        // Game over
        if (failedAttempts === 3) {
          body.style.display = "none";
          gameOverSound.play();
        }
        console.log(failedAttempts);
      }
    }
  };

  // render cards elements

  cards.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    const img = document.createElement("img");

    cardDiv.id = card.id;
    cardDiv.classList.add("hide");
    img.src = card.imageUrl;

    cardDiv.append(img);

    gameContainer.append(cardDiv);

    cardDiv.addEventListener("click", checkCard);
  });

  playGame.style.display = "none";
};

playGame.addEventListener("click", startPlaying);
