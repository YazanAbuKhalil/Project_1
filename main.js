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
const select = (element) => {
  return document.querySelector(element);
};

const body = select("body");
const gameContainer = select(".container");
const scoreEl = select(".score");
const triesEl = select(".tries");
const winScreen = select(".win");
const gameInfo = select(".game-info");
gameInfo.style.display = "none";

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
gameContainer.append(playGame);

const startPlaying = () => {
  gameInfo.style.display = "flex";
  startGameSound.play();
  
  // starter conditions
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
      isActive = true;
      const originalImage = activeCard.firstChild;
      const fakeImage = activeCard.getElementsByTagName('img')[1]
      // show the image and hide the fake image
      originalImage.classList.remove('hide')
      fakeImage.classList.add('hide');

      curruntCard.removeEventListener("click", checkCard);
    } // if we have choosen the first card
    else {
      // check if the current card equals the first card
      if (curruntCard.id == activeId && curruntCard != activeCard) {

   

        // increase score
        score += 10;
        scoreEl.innerText = score;

        // show the image
        const originalImage = curruntCard.firstChild;
        const fakeImage =curruntCard.getElementsByTagName('img')[1]
        originalImage.classList.remove('hide');
        fakeImage.classList.add('hide')
        console.log(originalImage);
        console.log(fakeImage);
        // delete cards from cards array
        cards.splice(cards.indexOf(curruntCard), 1);
        cards.splice(cards.indexOf(activeCard), 1);
      

        // Hide the two elements from the screen
        setTimeout(() => {
          activeCard.style.display = "none";
          curruntCard.style.display = "none";
          sucessSound.play();
        }, 1000);
  

        // you win
        if (cards.length === 0) {
          gameInfo.style.display = "none";
          gameContainer.style.display = "none";
          winSound.play();
        }
        isActive = false;
      } else {
        const originalImage = curruntCard.firstChild;
        const fakeImage =curruntCard.getElementsByTagName('img')[1]
        originalImage.classList.remove('hide');
        fakeImage.classList.add('hide');
        setTimeout (() => {
          originalImage.classList.add('hide');
          fakeImage.classList.remove('hide')
        }, 2000);
        
        failedSound.play();
        failedAttempts += 1;
        triesEl.innerText = failedAttempts;

        // Game over
        if (failedAttempts === 3) {
          body.style.display = "none";
          gameOverSound.play();
          
        }
      }
    }
  };

  // render cards elements

  cards.forEach((card, index) => {
    // create card element with img and id 
    const cardDiv = document.createElement("div");
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
  playGame.classList.add('hide');
};

// click play game and strt the game
playGame.addEventListener("click", startPlaying);
