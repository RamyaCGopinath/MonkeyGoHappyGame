var bgImage,bg;
var player, player_running;
var ground,ground_img;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;

var gameState = "play";

function preload(){
  bgImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  player_collided = loadAnimation("Monkey_03.png")
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  bg=createSprite(0,0,800,400);
  bg.addImage(bgImage);
  bg.scale=1.5;
  bg.x=bg.width/2;
  
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("Collided",player_collided);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
  if(gameState == "play"){
    ground.velocityX=-4;
    bg.velocityX=-4;
    if(ground.x<0) {
      ground.x=ground.width/2;
    }
    if(bg.x<100){
      bg.x=bg.width/2;
    }
    
      if(bananaGroup.isTouching(player)){
        bananaGroup.destroyEach();
        score = score + 2;
        player.scale+=0.01;
      }
    
      if(keyDown("space") ) {
        player.velocityY = -12;
      }
      player.velocityY = player.velocityY + 0.8;

      Bananas();
      spawnObstacles();
 
      if(obstaclesGroup.isTouching(player)){ 
        gameState = "end";
      }
      drawSprites();
  }
  else if(gameState == "end"){
    ground.velocityX=0;
    bg.velocityX=0;
    player.visible = false;
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    //bananaGroup.setVelocityXEach(0);
    //obstaclesGroup.setVelocityXEach(0);
    //bananaGroup.setLifetimeEach(-1);
    //obstaclesGroup.setLifetimeEach(-1);
    //player.changeAnimation("Collided",player_collided);
    drawSprites();
    stroke("white");
    textSize(70);
    fill(255);
    text("Game Over !",220,220);
  }
    
  
   
    player.collide(ground);
    
  
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function Bananas() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
