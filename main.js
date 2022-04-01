// create an array of images objects
const images = [
  "images/apple.jpg",
  "images/banana.png",
  "images/car.jpg",
  "images/house.png",
  "images/laptop.png",
  "images/lemon.jpg",
];

// starter elements
const body = document.querySelector("body");

const gameContainer = document.createElement("div");

body.append(gameContainer);

const renderCards = (image) => {
  // create a new card
  const card = document.createElement("div");
  gameContainer.append(card);

  // create image element
  const img = document.createElement("img");
  img.src = image;

  // set height and width for image
  img.style.width = "60px";
  img.style.height = "60px";

  card.append(img);
};

images.forEach((image) => {
  renderCards(image);
});
