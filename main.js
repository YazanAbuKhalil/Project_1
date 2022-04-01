// create an array of images objects
const images = [
<<<<<<< HEAD
  {
    imageUrl: "images/car.jpg",
    class: 3,
  },
  {
    imageUrl: "images/laptop.png",
    class: 5,
  },
  {
    imageUrl: "images/apple.jpg",
    class: 1,
  },
  {
    imageUrl: "images/house.png",
    class: 4,
  },

  {
    imageUrl: "images/banana.png",
    class: 2,
  },
  {
    imageUrl: "images/laptop.png",
    class: 5,
  },

  {
    imageUrl: "images/apple.jpg",
    class: 1,
  },
  {
    imageUrl: "images/car.jpg",
    class: 3,
  },
  {
    imageUrl: "images/lemon.jpg",
    class: 6,
  },
  {
    imageUrl: "images/house.png",
    class: 4,
  },

  {
    imageUrl: "images/lemon.jpg",
    class: 6,
  },

  {
    imageUrl: "images/banana.png",
    class: 2,
  },
];

const shuffleArray = (array) => {
  const random = Math.floor(Math.random() * array.length);

  array.sort((a, b) => {
    if (a.class < array[random].class) {
      return -1;
    } else {
      return 1;
    }
  });
};

shuffleArray(images);
//"images/apple.jpg",
//"images/apple.jpg",
//"images/banana.png",
//"images/banana.png",
//"images/car.jpg",
//"images/car.jpg",
//"images/house.png",
//"images/house.png",
//"images/laptop.png",
//"images/laptop.png",
//"images/lemon.jpg",
//"images/lemon.jpg"
=======
    {
        imageUrl: "images/apple.jpg",
        class: 1
    },
    {
        imageUrl: "images/apple.jpg",
        class: 1
    },
    {
        imageUrl: "images/banana.png",
        class: 2
    },
    {
        imageUrl: "images/banana.png",
        class: 2
    },
    {
        imageUrl: "images/car.jpg",
        class: 3
    },
    {
        imageUrl: "images/car.jpg",
        class: 3
    },
    {
        imageUrl: "images/house.png",
        class: 4
    },
    {
        imageUrl: "images/house.png",
        class: 4
    },
    {
        imageUrl: "images/laptop.png",
        class: 5
    },
    {
        imageUrl: "images/laptop.png",
        class: 5
    },
    {
        imageUrl: "images/lemon.jpg",
        class: 6
    },
    {
        imageUrl: "images/lemon.jpg",
        class: 6
    }
];


  //"images/apple.jpg",
  //"images/apple.jpg",
  //"images/banana.png",
  //"images/banana.png",
  //"images/car.jpg",
  //"images/car.jpg",
  //"images/house.png",
  //"images/house.png",
  //"images/laptop.png",
  //"images/laptop.png",
  //"images/lemon.jpg",
  //"images/lemon.jpg"

>>>>>>> cb3f82ef61f73218a3d6f6b313e192d8977b0c3e

// starter elements
const body = document.querySelector("body");

const gameContainer = document.createElement("div");

body.append(gameContainer);

const renderCards = (image) => {
  // create a new card
  const card = document.createElement("div");
  card.classList.add(image.class);
<<<<<<< HEAD
  card.style.border = "2px solid black";
  gameContainer.append(card);
  // set iintial width and height values for card
  card.style.width = "60px";
  card.style.height = "60px";
=======
  card.style.border = '2px solid black';
  gameContainer.append(card);
  // set iintial width and height values for card
  card.style.width = '60px';
  card.style.height = '60px'
>>>>>>> cb3f82ef61f73218a3d6f6b313e192d8977b0c3e

  // create image element
  const img = document.createElement("img");
  img.src = image.imageUrl;
<<<<<<< HEAD
=======
  
>>>>>>> cb3f82ef61f73218a3d6f6b313e192d8977b0c3e

  // set height and width for image
  img.style.width = "60px";
  img.style.height = "60px";

  card.append(img);
};

images.forEach((image) => {
  renderCards(image);
});
