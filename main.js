// create an array of cards objects
let cards = [
  {
    imageUrl: "images/car.jpg",
    id: 3,
  },
  {
    imageUrl: "images/laptop.png",
    id: 5,
  },
  {
    imageUrl: "images/orange.png",
    id: 8,
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
    imageUrl: "images/book.png",
    id: 7,
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
    imageUrl: "images/book.png",
    id: 7,
  },
  {
    imageUrl: "images/lemon.jpg",
    id: 6,
  },
  {
    imageUrl: "images/orange.png",
    id: 8,
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
const select = (element) => {
  return document.querySelector(element);
};

const body = select("body");
const gameContainer = select(".container");
const scoreEl = select(".score");
const triesEl = select(".tries");
const winScreen = select(".win-div");
const gameInfo = select(".game-info");
const gameOverScreen = select(".gameover-div");

gameInfo.classList.add("hide");

// creat audio for the game
const createAudio = (src) => {
  const element = document.createElement("audio");
  element.src = src;
  return element;
};

const clickSound = createAudio("sounds/click.wav");
const failedSound = createAudio("sounds/failed.wav");
const sucessSound = createAudio("sounds/success.wav");
const gameOverSound = createAudio("sounds/gameover.wav");
const winSound = createAudio("sounds/win.wav");
const startGameSound = createAudio("sounds/startgame.mp3");

// play Game button
const playGame = document.createElement("button");
playGame.classList.add("play");
playGame.innerText = "Play Game";
body.append(playGame);

// timer before start
const timerEl = document.querySelector(".timer-div");
const time = document.querySelector(".timer");
timerEl.classList.add("hide");

winScreen.classList.add("hide");
gameOverScreen.classList.add("hide");
gameContainer.classList.add("hide");

// playagain button functionality
const refresh = () => {
  location.reload();
  localStorage.clear();
  scoreEl.getElementsByTagName("p")[1].innerText = 0;
};

const playAgainButtons = document.querySelectorAll(".play-again");
playAgainButtons.forEach((button) => {
  button.addEventListener("click", refresh);
});

const tryButton = document.querySelector(".try");
tryButton.classList.add("hide");

// Game over function
let isLoose = false;
const gameOver = () => {
  isLoose = true;
  tryButton.classList.add("hide");
  timerEl.classList.add("hide");
  gameContainer.classList.add("hide");
  winScreen.classList.add("hide");
  gameInfo.classList.add("hide");
  gameOverScreen.classList.remove("hide");
  gameOverSound.play();
};

// win function
let isWin = false;
const youWin = () => {
  isWin = true;
  tryButton.classList.add("hide");
  gameInfo.classList.add("hide");
  gameContainer.classList.add("hide");
  gameInfo.classList.add("hide");
  winScreen.classList.remove("hide");
  timerEl.classList.add("hide");
  winSound.play();
};

let score = 0;
let numberOfTries = 7;
let timer = 60;

// default setting when reload the page and local storage
window.onload = () => {
  // get last tries data from llocal storage
  numberOfTries = JSON.parse(localStorage.getItem("tries"));
  triesEl.getElementsByTagName("p")[1].innerText = numberOfTries;
  // if we clear date from storage set the default value to 7
  if (!numberOfTries) {
    numberOfTries = 7;
    triesEl.getElementsByTagName("p")[1].innerText = 7;
  }

  // // get last timer from local storage
  // timer = JSON.parse(localStorage.getItem("timer"));
  // time.innerText = timer;
  // if (!timer) {
  //   timer = 60;
  //   time.innerText = 60;
  // }

  // // get last cards remines in the local storage
  // cards = JSON.parse(localStorage.getItem("cards"));
  // console.log(cards);

  // get last score data from local storage
  score = JSON.parse(localStorage.getItem("score"));
  scoreEl.getElementsByTagName("p")[1].innerText = score;
  // if we clear date from storage set the default value to 0
  if (!score) {
    scoreEl.getElementsByTagName("p")[1].innerText = 0;
  }
};
// start playing function
const startPlaying = () => {
  tryButton.classList.remove("hide");
  gameContainer.classList.remove("hide");
  timerEl.classList.remove("hide");
  gameInfo.classList.remove("hide");
  startGameSound.play();

  // starter conditions

  let activeId;
  let activeCard;
  let isActive = false;

  // let score = localStorage.setItem("score", JSON.stringify(score));
  // console.log(score);
  //score = JSON.parse(localStorage.getItem("score"));

  // set timer for the game
  time.innerText = timer;

  const refId = setInterval(() => {
    timer--;
    // localStorage.setItem("timer", JSON.stringify(timer));
    time.innerText = timer;
    console.log(timer);
  }, 1000);

  setTimeout(() => {
    clearInterval(refId);
    if (!isWin && !isLoose) {
      gameOver();
    }
  }, 60000);

  const checkCard = (e) => {
    clickSound.play();
    const curruntCard = e.target.parentElement;
    const originalImage = curruntCard.firstChild;
    const fakeImage = curruntCard.getElementsByTagName("img")[1];

    // if not any card is active
    if (!isActive) {
      activeCard = curruntCard;
      activeId = curruntCard.id;
      isActive = true;

      // show the image and hide the fake image
      originalImage.classList.remove("hide");
      fakeImage.classList.add("hide");

      //curruntCard.removeEventListener("click", checkCard);
    } // if we have choosen the first card
    else {
      // success move
      if (curruntCard.id == activeId && curruntCard != activeCard) {
        // increase score

        score += 10;
        scoreEl.getElementsByTagName("p")[1].innerText = score;

        localStorage.setItem("score", JSON.stringify(score));

        if (score === 30 || score === 50) {
          numberOfTries += 1;
          localStorage.setItem("tries", JSON.stringify(numberOfTries));
        }

        // show the image
        originalImage.classList.remove("hide");
        fakeImage.classList.add("hide");

        // delete cards from cards array

        cards.splice(cards.indexOf(curruntCard), 1);
        cards.splice(cards.indexOf(activeCard), 1);
        // localStorage.setItem("cards", JSON.stringify(cards));

        // Hide the two elements from the screen
        setTimeout(() => {
          activeCard.style.visibility = "hidden";
          curruntCard.style.visibility = "hidden";
          // activeCard.classList.add("hide");
          // curruntCard.classList.add("hide");
          sucessSound.play();
        }, 500);

        isActive = false;
        // you win
        if (cards.length === 0) {
          youWin();
        }
      } else {
        originalImage.classList.remove("hide");
        fakeImage.classList.add("hide");
        setTimeout(() => {
          // hide the current element
          originalImage.classList.add("hide");
          fakeImage.classList.remove("hide");

          // hide the active element
          activeCard.firstChild.classList.add("hide");
          activeCard.getElementsByTagName("img")[1].classList.remove("hide");
          isActive = false;
        }, 1000);
        failedSound.play();
        numberOfTries -= 1;
        localStorage.setItem("tries", JSON.stringify(numberOfTries));
        triesEl.getElementsByTagName("p")[1].innerText = numberOfTries;

        // Game over
        if (numberOfTries === 0) {
          gameOver();
        }
      }
    }
  };

  // render cards elements

  cards.forEach((card, index) => {
    // create card element with img and id
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-div");
    cardDiv.id = card.id;

    const img = document.createElement("img");
    img.src = card.imageUrl;

    cardDiv.append(img);
    gameContainer.append(cardDiv);

    // create the anonmes image to start
    const starterImage = document.createElement("img");
    starterImage.src = "images/questionmark.jpg";

    // hide images after 2 seconds when the the game is starting
    setTimeout(() => {
      img.classList.add("hide");
      cardDiv.append(starterImage);
    }, 2000);

    cardDiv.addEventListener("click", checkCard);
  });
  playGame.classList.add("hide");
};

// click play game and strt the game
playGame.addEventListener("click", startPlaying);
