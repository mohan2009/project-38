var boundary,player,invisibleGround,player2,cash,diamonds,jwellery, obstacleGroup1, obstacle1Img,obstacleGroup2, obstacle2Img, obstacleGroup3, obstacle3Img,crashSound,gameOver,gameOverImg,cashImg,diamondsImg,jwelleryImg,player,playerImg

var cashG,diamondsG,jwelleryG,swordGroup

var PLAY=1
var END=0
var gameState=1;

var score=0;

var array

function preload(){
boundaryImg=loadImage("Road.png");
playerImg=loadAnimation("mainPlayer1.png","mainPlayer2.png");


obstacle1Img= loadImage("obstacle1-1.png")
obstacle2Img= loadImage("obstacle2.png") 
obstacle3Img= loadImage("obstacle3.png") 
gameOverImg=loadImage("gameOver-1.png")  
crashSound=loadSound("Audio.mp3")  
 cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  player2Img=loadAnimation("playerFalling.png")
}

function setup() {
 
createCanvas(windowWidth,windowHeight)
  
boundary= createSprite(width/2,100,400,300)
boundary.addImage("boundaryMoving",boundaryImg);
boundary.scale=0.9  
boundary.velocityX=-3
  
player= createSprite(150,450,200,100)
player.addAnimation("cyclistRunning",playerImg);
player.scale=0.2

invisibleGround = createSprite(200,height-100 ,400,10);
  invisibleGround.visible = false;
    
obstacleGroup1= createGroup();  
obstacleGroup2= createGroup();
obstacleGroup3= createGroup(); 
  
 gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  
  cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
}

function draw() {
 
 
   textSize(20);
  fill(255);
  text("Score: "+ score,150,30);
  
  background("white")
  
  
  if(gameState===PLAY){
  
 boundary.velocityX = -(6 + 2*score/150);
 
   gameOver.visible = false;

    
    if(touches.array<=1){
      player.y=World.mouseY;
      touches.array=0
    }
  
if(boundary.x<40){
   boundary.x=300
   }  
  
  player.y = World.mouseY;
 
 createCash();
    createDiamonds();
    createJwellery();
  
  var select_obstacle= Math.round(random(1,3)) 
 
 if (World.frameCount%80==0){
   if(select_obstacle==1){
     spawnObstacles1();
   } else if (select_obstacle==2) {
     spawnObstacles2();
   }else{
     spawnObstacles3();
   }
 } 
  if (cashG.isTouching(player)) {
      cashG.destroyEach();
      score=score+50;
      
    }
    else if (diamondsG.isTouching(player)) {
      diamondsG.destroyEach();
      score=score+100;
     
      
    }else if(jwelleryG.isTouching(player)) {
      jwelleryG.destroyEach();
      score= score + 150;
    }
  edges= createEdgeSprites();
   player.collide(edges);
  
   if(obstacleGroup1.isTouching(player)){
      gameState=END;
      obstacleGroup1.velocityX=0;
      crashSound.play();
    }
    
    if(obstacleGroup2.isTouching(player)){
      gameState=END;
      obstacleGroup2.velocityX=0;
      crashSound.play();
    }
    
    if(obstacleGroup3.isTouching(player)){
      gameState=END;
      obstacleGroup3.velocityX=0;
      crashSound.play();
    }
    
  
}else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", width/2,height/2);
  
  cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
       
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
       
      player.addAnimation("Sahil_Running",player2Img)
  
    boundary.velocityX = 0;
    player.velocityY = 0;
  
  
    obstacleGroup1.setVelocityXEach(0);
    obstacleGroup1.setLifetimeEach(-1);  
  
  
  
  obstacleGroup2.setVelocityXEach(0);
  obstacleGroup2.setLifetimeEach(-1);
  
  obstacleGroup3.setVelocityXEach(0);
  obstacleGroup3.setLifetimeEach(-1);
    
    
    
    if(keyDown("up")) {
      reset();
    }
}
  
  drawSprites(); 
  textSize(40);
  fill(255);
  text("Score: "+ score,150,30);
  
  player.debug=false
  player.setCollider("circle",0,0,1)
  
}

function spawnObstacles1(){
 var obstacle1= createSprite(1100, Math.round(random(55,650)),20,20)
obstacle1.scale=0.2;
obstacle1.velocityX=-(6+2*score/150)  
obstacle1.addImage(obstacle1Img)
 obstacle1.lifetime=200; 
 obstacleGroup1.add(obstacle1)
}

function spawnObstacles2(){
 var obstacle2= createSprite(1100, Math.round(random(70,650)),20,20)
obstacle2.scale=0.2;
obstacle2.velocityX=-(6+2*score/150)  
obstacle2.addImage(obstacle2Img)
 obstacle2.lifetime=200; 
 obstacleGroup2.add(obstacle2)
}

function spawnObstacles3(){
 var obstacle3= createSprite(1100,Math.round(random(50, 650)))
obstacle3.scale=0.2;
obstacle3.velocityX=-(6+2*score/150)  
obstacle3.addImage(obstacle3Img)
 obstacle3.lifetime=200; 
 obstacleGroup3.add(obstacle3)
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  player.addAnimation("SahilRunning",player);
  
  obstaclesGroup1.destroyEach();
  obstaclesGroup2.destroyEach();
  obstaclesGroup3.destroyEach();
  
  score = 0;
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(650, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.2;
  cash.velocityX = -3;
  cash.lifetime = 300;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(650, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.12;
  diamonds.velocityX = -3;
  diamonds.lifetime = 300;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(650, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.2;
  jwellery.velocityX = -3;
  jwellery.lifetime = 300;
  jwelleryG.add(jwellery);
  }
}
