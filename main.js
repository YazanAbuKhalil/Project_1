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

// check card function
let activeId;
let activeCard;
const checkCard = (e) => {
  const curruntCard = e.target.parentElement;

  // if not any card is active
  if (!isActive) {
    activeCard = curruntCard;
    activeId = curruntCard.id;
    console.log(activeId);
    isActive = true;
  } // if we have choosen the first card
  else {
    // check if the current card equals the first card
    if (curruntCard.id == activeId && curruntCard != activeCard) {
      console.log("correct answer");
      isActive = false;
    }
  }
};

// render cards elements
let isActive = false;
cards.forEach((card, index) => {
  const cardDiv = document.createElement("div");
  const img = document.createElement("img");

  cardDiv.id = card.id;
  img.src = card.imageUrl;

  cardDiv.append(img);

  gameContainer.append(cardDiv);

  cardDiv.addEventListener("click", checkCard);
});

/*
const renderCards = (image) => {
  // create a new card
  const card = document.createElement("div");
  card.classList.add(image.class);

  card.style.border = "2px solid black";
  gameContainer.append(card);
  // set iintial width and height values for card
  card.style.width = "60px";
  card.style.height = "60px";

 

  card.style.border = "2px solid black";
  gameContainer.append(card);
  // set iintial width and height values for card
  card.style.width = "60px";
  card.style.height = "60px";
  card.style.transformStyle = 'preserve-3d';
  card.style.transition = 'all 0.5s'

  // create image element
   // create the front side
  
  const backImage = document.createElement("img");
  img.src = image.imageUrl;

  // set height and width for image
  backImage.style.width = "60px";
  backImage.style.height = "60px";

  card.append(backImage);
};

images.forEach((image) => {
  renderCards(image);
});
*/
