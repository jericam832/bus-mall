'use strict';
// 1. Point to HTML ids
// 2. create a constructor function for the Product list
// 3. make a random number generator (copy from salmon cookies)
// 4. add event listener for when an image is clicked
// 5. acp after each step
// 6. add 
Product.names = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dragon.jpg', 'dog-duck', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];
// var first = document.getElementById('left');
// var second = document.getElementById('center');
// var third = document.getElementById('right');
Product.h1El = document.getElementById('instructions');
Product.containerElement = document.getElementById('image_container');
Product.resultElement = document.getElementById('tally');
Product.allProducts = [];
Product.uniquePicsArray = [];
Product.renderCounter = 9;
Product.pics = [
  document.getElementById('left'),
  document.getElementById('center'),
  document.getElementById('right')
];

function Product(name) {
  this.name = name;
  this.path = `img/${name}`;
  this.views = 0;
  this.votes = 0;
  Product.allProducts.push(this);
}
for (var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}

Product.prototype.makeRandom = function() {
  return Math.floor(Math.random() * Product.allProducts.length);
}
Product.prototype.uniquePicsArrayGenerator = function() {
  while(Product.uniquePicsArray.length < 6) {
    var random = Product.prototype.makeRandom();
    while(!Product.uniquePicsArray.includes(random)) {
      // console.log('building uniquqPicsArray', uniquePicsArray);
      Product.uniquePicsArray.push(random);
    }
  }
}

Product.prototype.renderProducts = function() {
  //create an array to hold unique indexes
  Product.prototype.uniquePicsArrayGenerator();
  for(var i = 0; i < 3; i++) {
    var temp = Product.uniquePicsArray.shift();
    // console.log('Temp is #', temp);
    Product.pics[i].src = Product.allProducts[temp].path;
    Product.pics[i].name = Product.allProducts[temp].name;
    Product.pics[i].title = Product.allProducts[temp].name;
    Product.allProducts[temp].views++;
  }
}

Product.prototype.resultFunction = function() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    Product.votes = document.createElement('li');
    Product.votes.setAttribute('id', 'list-item');
    Product.votes.textContent = `${Product.allProducts[i].name} had ${Product.allProducts[i].votes} votes and ${Product.allProducts[i].views} views.`;
    Product.resultElement.appendChild(Product.votes);
  }
}

//put names into an array
// new Product('bag');
// new Product('banana');
// new Product('bathroom');
// new Product('boots');
// new Product('breakfast');
// new Product('bubblegum');
// new Product('chair');
// new Product('cthulhu');
// new Product('dog-duck');
// new Product('dragon');
// new Product('pen');
// new Product('pet-sweep');
// new Product('scissors');
// new Product('shark');
// new Product('tauntaun');
// new Product('unicorn');
// new Product('usb');
// new Product('water-can');
// new Product('wine-glass');


Product.prototype.handleClick = function(event) {
  Product.chosenImage = event.target.title;
  // console.log('chosenImage: ', chosenImage);
  for (var i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].name === Product.chosenImage) {
      Product.allProducts[i].votes++;
      Product.renderCounter--;
    }
  }
  Product.prototype.renderProducts();
  console.log(Product.renderCounter);
  if (Product.renderCounter === 0) {
    Product.h1El.innerHTML = 'Survey Results';
    Product.prototype.resultFunction();
    Product.containerElement.removeEventListener('click', Product.prototype.handleClick);
    Product.containerElement.style.display = 'none';

  }
//call chart function
  // makeChart();
}
Product.containerElement.addEventListener('click', Product.prototype.handleClick);
// Product.namesData = [];
// Product.votesData = [];
// Product.viewsData = [];
// //push all data into separate arrays
// var getChartData = function() {
//   for(var i = 0; i < Product.allProducts.length; i++) {
//     Product.namesData.push(Product.allProducts[i].name);
//     Product.votesData.push(Product.allProducts[i].votes);
//     Product.viewsData.push(Product.allProducts[i].views);
//   }
// };
// debugger;
// Product.data = {
//   labels: Product.namesData,
//   datasets: [
//     {
//       fullColor: 'rgba(220,220,220, 0.80)',
//       strokeColor: 'rgba(220,220,220,1)',
//       data: Product.votesData
//     }

//   ]
// }
// //make chart function
// function makeChart() {
//   getChartData();
//   Product.getChart = document.getElementById('myChart').getContext('2d');
//  var canvas = new getChartData(Product.getChart).Bar(Product.data);
// }

//refresh screen and start over
var refresh = document.getElementById('reset');
refresh.addEventListener('click', resetSurvey);
function resetSurvey(){
  window.location.reload();
}

//Run render last
Product.prototype.renderProducts();
