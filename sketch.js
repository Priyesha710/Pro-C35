var balloon, balloonAnimation, balloonHeight;
var cityImg;
var database;
function preload() {
  cityImg = loadImage("images/cityImage.png");
  balloonAnimation = loadAnimation("images/HotAirBallon-01.png", "images/HotAirBallon-02.png", "images/HotAirBallon-03.png")
}
function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("balloonAnimation", balloonAnimation);
  
  
  var balloonPosRef = database.ref('balloon/position');
  balloonPosRef.on("value", function (data) {
    balloonHeight = data.val();
    balloon.x = balloonHeight.x;
    balloon.y = balloonHeight.y;
    balloon.scale = 0.5*balloonHeight.y/300;
  }, showError);
}
function draw() {
  background(cityImg);
  text("**Use arrow keys to move the Hot Air Balloon!",20,20);
  if (keyDown(LEFT_ARROW)) {
    updateHeight(-10, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    updateHeight(10, 0);
  }
  else if (keyDown(UP_ARROW)) {
    updateHeight(0, -10);
  }
  else if (keyDown(DOWN_ARROW)) {
    updateHeight(0,10);
  }

  drawSprites();
}

function updateHeight(x, y) {
  console.log(balloonHeight);
  database.ref("balloon/position").set({
    x: balloonHeight.x + x,
    y: balloonHeight.y + y
  })
}
function showError() {
  console.log("Error in writing to the database");
}