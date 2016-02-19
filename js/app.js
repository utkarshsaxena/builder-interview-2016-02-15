'use strict'

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var CANVAS_HEIGHT = canvas.height;
var CANVAS_WIDTH = canvas.width;
var TRACK_HEIGHT = CANVAS_HEIGHT/2;
var TRACK_WIDTH = CANVAS_WIDTH;
var TRACK_Y = CANVAS_WIDTH/8;
var TRACK_X = 0;
var CAR_WIDTH = 100;
var CAR_HEIGHT = 50;
var carOne = {
  x: TRACK_X + 10,
  y: TRACK_Y + 40
};
var carTwo = {
  x: TRACK_X + 10,
  y: TRACK_Y + 220
};
var dx = 2;
var dy = -2;
var rightKeyPressed = false;
var leftKeyPressed = false;
var upKeyPressed = false;
var downKeyPressed = false;
var dKeyPressed = false;
var aKeyPressed = false;
var wKeyPressed = false;
var sKeyPressed = false;
var raceStarted = false;
var COUNT = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
  if(event.keyCode === 39) {
    rightKeyPressed = true;        
  }

  if(event.keyCode === 37) {
    leftKeyPressed  = true;        
  }
  
  // Allow the car to turn only when moving fordwards or backwards
  if(event.keyCode === 38 && (rightKeyPressed || leftKeyPressed)) {
    upKeyPressed = true;        
  }
  // Allow the car to turn only when moving fordwards or backwards
  if(event.keyCode === 40 && (rightKeyPressed || leftKeyPressed)) {
    downKeyPressed  = true;        
  }
  
  if(event.keyCode === 68) {
    dKeyPressed = true;        
  }

  if(event.keyCode === 65) {
    aKeyPressed  = true;        
  }
  // Allow the car to turn only when moving fordwards or backwards
  if(event.keyCode === 87 && (dKeyPressed || aKeyPressed)) {
    wKeyPressed = true;        
  }
  // Allow the car to turn only when moving fordwards or backwards
  if(event.keyCode === 83 && (dKeyPressed || aKeyPressed)) {
    sKeyPressed  = true;        
  }
  
  // Pause game
  if (event.keyCode === 80) {
    raceStarted = ! raceStarted;
  }
}

function keyUpHandler(event) {
  if(event.keyCode === 39) {
    rightKeyPressed = false;        
  }

  if(event.keyCode === 37) {
    leftKeyPressed  = false;        
  }
  
  if(event.keyCode === 38) {
    upKeyPressed = false;        
  }

  if(event.keyCode === 40) {
    downKeyPressed  = false;        
  }
  
  if(event.keyCode === 68) {
    dKeyPressed = false;        
  }

  if(event.keyCode === 65) {
    aKeyPressed  = false;        
  }
  
  if(event.keyCode === 87) {
    wKeyPressed = false;        
  }

  if(event.keyCode === 83) {
    sKeyPressed  = false;        
  }
}


function drawCarOne(x, y) {
  var carOneImage = new Image();
  carOneImage.src="images/player-one-car.png";
  ctx.drawImage(carOneImage, x, y);
}


function drawCarTwo(x, y) {
  var carTwoImage = new Image();
  carTwoImage.src="images/player-two-car.png";
  ctx.drawImage(carTwoImage, x, y);
}


function drawRaceTrack() {
  ctx.beginPath();
  ctx.rect(TRACK_X, TRACK_Y, TRACK_WIDTH, TRACK_HEIGHT);
  ctx.fillStyle = "#4f4f4f";
  ctx.fill();
  ctx.closePath();
  for(var i=0, l=15; i<l; i++) {
    ctx.beginPath();
    ctx.rect(100 * i, 2 * TRACK_Y, 70, 10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
  // Finish line
  ctx.beginPath();
  ctx.moveTo(canvas.width - CAR_WIDTH - 20, TRACK_Y);
  ctx.lineTo(canvas.width - CAR_WIDTH - 20, TRACK_Y + TRACK_HEIGHT);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.closePath();
  
  // Start line
  ctx.beginPath();
  ctx.moveTo(TRACK_X + 10 + CAR_WIDTH, TRACK_Y);
  ctx.lineTo(TRACK_X + 10 + CAR_WIDTH, TRACK_Y + TRACK_HEIGHT);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "green";
  ctx.stroke();
  ctx.closePath();
}

// Detect collision between cars by checking
// if the rectangles representing both cars overlap
function detectCollision() {
  if (carOne.x < carTwo.x + CAR_WIDTH - 10 &&
      carOne.x + CAR_WIDTH - 10 > carTwo.x &&
      carOne.y < carTwo.y + CAR_HEIGHT - 10 &&
      CAR_HEIGHT - 10 + carOne.y > carTwo.y) {
    alert('Cars met with an accident. Starting a new race.');
    document.location.reload(); 
  }
}

function drawPauseText() {
  ctx.font="45px Arial";
  ctx.fillStyle = "#E53935";
  ctx.textAlign = "center";
  ctx.fillText("Game Paused. Press 'P' to resume." , canvas.width/2, canvas.height/2);
}

// Render all game components
function renderGame() {
  // Clear canvas before rendering
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw components
  drawRaceTrack();
  drawCarOne(carOne.x, carOne.y);
  drawCarTwo(carTwo.x, carTwo.y);
  detectCollision();
  if (! raceStarted) {
    drawPauseText();
  }
  if (raceStarted) {
    // Player one controls
    if (rightKeyPressed && carOne.x < canvas.width - CAR_WIDTH) {
      carOne.x += 4;
    }
    if (leftKeyPressed && carOne.x > 0) {
      carOne.x -= 4;
    }
    if (upKeyPressed && carOne.y > TRACK_Y) {
      carOne.y -= 4;
    }
    if (downKeyPressed && carOne.y < TRACK_Y + TRACK_HEIGHT - CAR_HEIGHT) {
      carOne.y += 4;
    }

    // Player two controls
    if (dKeyPressed && carTwo.x < canvas.width - CAR_WIDTH) {
      carTwo.x += 4;
    }
    if (aKeyPressed && carTwo.x > 0) {
      carTwo.x -= 4;
    }
    if (wKeyPressed && carTwo.y > TRACK_Y) {
      carTwo.y -= 4;
    }
    if (sKeyPressed && carTwo.y < TRACK_Y + TRACK_HEIGHT - CAR_HEIGHT) {
      carTwo.y += 4;
    }

    // End of ther race results
    if ((carOne.x > canvas.width - CAR_WIDTH - 20) && (carTwo.x > canvas.width - CAR_WIDTH - 20)) {
      alert('It is a draw. Starting a new race.');
      document.location.reload();
    } else if (carOne.x > canvas.width - CAR_WIDTH - 20) {
      alert('Player One wins. Starting a new race.');
      document.location.reload();
    } else if (carTwo.x > canvas.width - CAR_WIDTH - 20) {
      alert('Player Two wins. Starting a new race.');
      document.location.reload();
    }    
  }
  
  requestAnimationFrame(renderGame);    
}

// Count down before the race begins
function countDown(ctx, COUNT) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font="45px Arial";
  ctx.fillStyle = "#E53935";
  ctx.textAlign = "center";
  ctx.fillText("Race starts in.." + COUNT, canvas.width/2, canvas.height/2);
  if(COUNT === 0){
    clearInterval(beginGame);
    raceStarted = true;
    renderGame();   
  }
}

var beginGame =  setInterval(function(){ countDown(ctx, COUNT--); }, 1000);















