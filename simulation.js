//Create function created by Professors.
var create = function () {
  // random x and y
  var width = window.innerWidth;
  var height = window.innerHeight;
  var x = Math.floor(Math.random() * width);
  var y = Math.floor(Math.random() * height);
  if (x > width - 50) x = width - 50;
  if (y > height - 50) y = height - 50;

  // random color
  var r = Math.floor(255 * Math.random());
  var g = Math.floor(255 * Math.random());
  var b = Math.floor(255 * Math.random());
  var color = "rgb(" + r + ", " + g + ", " + b + ")";

  // set div attributes
  var div = document.createElement("div");
  div.id = "ball";
  div.style.zIndex = "1";
  div.style.position = "absolute";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.borderRadius = "50%";
  div.style.background = color;

  // Then append the whole thing onto the body
  document.getElementsByTagName("body")[0].appendChild(div);

  // default start position
  div.x = x;
  div.y = y;

  // Add default reverse attribute to div to make keeping track easier
  div.reverseX = false;
  div.reverseY = false;

  return div;
};

function changeRandomColor(div) {
  let r = Math.floor(255 * Math.random());
  let g = Math.floor(255 * Math.random());
  let b = Math.floor(255 * Math.random());
  let color = "rgb(" + r + ", " + g + ", " + b + ")";
  div.style.background = color;
}

function arrayOfCircles() {
  let circArray = [];
  for (let i = 0; i < 10; i++) {
    let circle = create();
    circArray.push(circle);
  }

  console.log("Circ Array: " + circArray);

  return circArray;
}

//Function to create random velocites for a given number of circles
function velocityArray(arrayLength) {
  let velArray = [];
  for (let i = 0; i < arrayLength; i++) {
    let x = Math.floor(Math.random() * 25);
    let y = Math.floor(Math.random() * 25);
    velArray.push([x, y]);
  }
  return velArray;
}

//Function to begin moving circles with edge detection
function moveCircles(circArray, velArray) {
  let minX = 0;
  let minY = 0;
  let maxX = window.innerWidth - 50;
  let maxY = window.innerHeight - 50;

  //Loop though circles and calculate new position
  for (let i = 0; i < velArray.length; i++) {
    if (circArray[i].reverseX) {
      circArray[i].x = circArray[i].x - velArray[i][0];
    } else {
      circArray[i].x = circArray[i].x + velArray[i][0];
    }

    if (circArray[i].reverseY) {
      circArray[i].y = circArray[i].y - velArray[i][1];
    } else {
      circArray[i].y = circArray[i].y + velArray[i][1];
    }

    circArray[i].style.left = circArray[i].x + "px";
    circArray[i].style.top = circArray[i].y + "px";

    //Edge detection for each circle
    if (circArray[i].x < minX || circArray[i].x > maxX) {
      circArray[i].reverseX = !circArray[i].reverseX;
      changeRandomColor(circArray[i]);
    }
    if (circArray[i].y < minY || circArray[i].y > maxY) {
      circArray[i].reverseY = !circArray[i].reverseY;
      changeRandomColor(circArray[i]);
    }
  }
}

//Main function to run my simulation
function main() {
  let circArray = arrayOfCircles();
  let velArray = velocityArray(10);

  setInterval(moveCircles, 100, circArray, velArray);
}
