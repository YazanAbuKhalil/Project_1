// create an array of images objects
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

// play game button
const playGame = document.createElement("button");
playGame.innerText = "Play Game";
body.append(playGame);

const startPlaying = () => {
  // creat audio
  const clickSound = document.createElement("audio");
  clickSound.src = "sounds/click.wav";

  const failedSound = document.createElement("audio");
  failedSound.src = "sounds/failed.wav";

  const sucessSound = document.createElement("audio");
  sucessSound.src = "sounds/success.wav";

  // check card function
  let activeId;
  let activeCard;
  let failedAttempts = 0;
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
        // disappear the two elements from the screen
        sucessSound.play();
        activeCard.style.display = "none";
        curruntCard.style.display = "none";

        console.log("correct answer");
        isActive = false;
      } else {
        failedSound.play();
        failedAttempts += 1;
        if (failedAttempts === 3) {
          body.style.display = "none";
        }
        console.log(failedAttempts);
      }
    }
  };

  // render cards elements
  let isActive = false;
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
};

playGame.addEventListener("click", startPlaying);
