'use strict';
// 1. Point to HTML ids
// 2. create a constructor function for the Product list
// 3. make a random number generator (copy from salmon cookies)
// 4. add event listener for when an image is clicked
// 5. acp after each step
var first = document.getElementById('left');
var second = document.getElementById('center');
var third = document.getElementById('right');
var containerElement = document.getElementById('image_container');
var resultElement = document.getElementById('tally');
var allProducts = [];
var renderCounter = 24;

function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
  // this.renderProducts();
  // this.makeRandom();
}
function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  //create an array to hold unique indexes
  var uniquePicsArray = [];
  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();
  //assign values to indexes and check for duplicates
  if (uniquePicsArray[0] === uniquePicsArray[1] || uniquePicsArray[0] === uniquePicsArray[2]) {
    console.error('Duplicate found, Re-rolling!');
    uniquePicsArray[0] = makeRandom();
  } else if (uniquePicsArray[1] === uniquePicsArray[2]){
    uniquePicsArray[1] = makeRandom();
  } else if (uniquePicsArray[0] === uniquePicsArray[2]) {
    uniquePicsArray[2] = makeRandom();
  }
  //add views here
  allProducts[uniquePicsArray[0]].views++;
  //get a random index
  //display a product whose index is the random number
  first.src = allProducts[uniquePicsArray[0]].path;
  first.name = allProducts[uniquePicsArray[0]].name;
  first.title = allProducts[uniquePicsArray[0]].name;

  allProducts[uniquePicsArray[1]].views++;
  second.src = allProducts[uniquePicsArray[1]].path;
  second.name = allProducts[uniquePicsArray[1]].name;
  second.title = allProducts[uniquePicsArray[1]].name;
  //add views here
  allProducts[uniquePicsArray[2]].views++;
  third.src = allProducts[uniquePicsArray[2]].path;
  third.name = allProducts[uniquePicsArray[2]].name;
  third.title = allProducts[uniquePicsArray[2]].name;
}

function resultFunction() {
  for (var i = 0; i < allProducts.length; i++) {
    var votes = document.createElement('li');
    votes.setAttribute('id', 'list-item');
    votes.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes and ${allProducts[i].views}!`;
    resultElement.appendChild(votes);
  }

}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');

function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
      renderCounter--;
    }
  }
  renderProducts();
  console.log(renderCounter);
  if (renderCounter === 0) {
    resultFunction();
    containerElement.removeEventListener('click', handleClick);
  }
}
containerElement.addEventListener('click', handleClick);
var refresh = document.getElementById('reset');
function resetSurvey(){
  window.location.reload();
}
refresh.addEventListener('click', resetSurvey);
//Run render last
renderProducts();
