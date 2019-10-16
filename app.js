'use strict';
//put names into an array
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dragon', 'dog-duck', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Product.h1El = document.getElementById('instructions');
Product.containerElement = document.getElementById('image_container');
Product.resetButton = document.getElementById('reset');
Product.allProducts = [];
Product.uniquePicsArray = [];
Product.renderCounter = 25;
Product.pics = [
  document.getElementById('left'),
  document.getElementById('center'),
  document.getElementById('right')
];
Product.showClicks = document.getElementById('click_counter');
Product.ctx = document.getElementById('myChart');
Product.ctx.style.display = 'none'; //hide chart
//constructor function
function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  Product.allProducts.push(this);
}
//create instances of Product constructor for each image
for (var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}
// console.log(Product.allProducts);
//random number prototype
Product.prototype.makeRandom = function() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

//generate a unique array or pics so none are repeated back to back
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
//Button refreshes page
Product.prototype.refreshSurvey = function() {
  window.location.reload();
}
// -----------------------------------------------------------------------
Product.prototype.handleClick = function(event) {
  Product.chosenImage = event.target.title;
  // console.log('chosenImage: ', chosenImage);
  for (var i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].name === Product.chosenImage) {
      Product.allProducts[i].votes++;
      Product.renderCounter--;
    }
    Product.showClicks.innerHTML = `${Product.renderCounter} choices remaining`;
  }

  Product.prototype.renderProducts();
    // console.log(Product.renderCounter);
  if (Product.renderCounter === 0) {
    Product.h1El.innerHTML = 'Survey Results';
    Product.containerElement.removeEventListener('click', Product.prototype.handleClick);
    Product.containerElement.style.display = 'none';
    //call chart function
    Product.prototype.makeChart();
  }

}
//----------------------- local storage -----------------------------------
Product.productsStringified = JSON.stringify(Product.allProducts);
// console.log(Product.productsStringified);
localStorage.setItem('productData', Product.productsStringified);

Product.storedProducts = localStorage.getItem('productData');

// console.log(Product.storedProducts);

Product.parsedProducts = JSON.parse(Product.storedProducts);

console.log(Product.parsedProducts);
for (var i = 0; i < Product.parsedProducts.length; i++) {
  new Product(Product.parsedProducts[i].name);
}

console.log(Product.allProducts);
//-----------------------------------------------------------------------
// Product.prototype.chooseChartType = function() {

// }
//make chart 
Product.prototype.makeChart = function() {
  Product.prototype.getChartData();
  Product.ctx.style.display = 'block';
  Product.ctx.getContext('2d');
  var canvas = new Chart(Product.ctx, {
    type: 'bar',
    data: {
      labels: Product.namesData,
      datasets: [{
        label: '# of Votes',
        data: Product.votesData,
        backgroundColor: [
          'rgba(66, 133, 244 , 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderColor: [
          'rgba(280, 39, 95, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
Product.resetButton.addEventListener('click', Product.prototype.refreshSurvey);
Product.containerElement.addEventListener('click', Product.prototype.handleClick);


//push all data into separate arrays
Product.namesData = [];
Product.votesData = [];
Product.viewsData = [];

Product.prototype.getChartData = function() {
  for(var i = 0; i < Product.allProducts.length; i++) {
    Product.namesData.push(Product.allProducts[i].name);
    Product.votesData.push(Product.allProducts[i].votes);
    Product.viewsData.push(Product.allProducts[i].views);
  }
}
//Run render last
Product.prototype.renderProducts();
