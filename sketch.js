var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceShip
var missile
var bg
var ufo

var score=0;

var gameOver, restart;
var lbg;


function preload(){

bg2 =loadImage("bg.jpg")
spaceShip1=loadImage("spaceship.png")
missile1=loadImage("missile.png")
ufo1=loadImage("ufo.png")
gameOverImage=loadImage("gameover.jpg")

}


function setup() {

  createCanvas(1250,500);

  
 
bg=createSprite(0,0,1250,500)
bg.addImage(bg2)
bg.x=bg.width/2
bg.velocityX=-4

  //gameOver=createSprite(550,250,20,10) 
 //gameOver.addImage(gameOverImage)
 // gameOver.scale=1


 spaceShip=createSprite(200,150,50,10)
 spaceShip.addImage(spaceShip1)
 spaceShip.scale=0.3



 ufosGroup=new Group()
 missilesGroup=new Group()

 score = 0;

}

function draw() {
  background(0); 
  bg.velocityX=-2
 
 if(gameState===PLAY){
  //score = score + Math.round(getFrameRate()/60);

  
    //gameOver.visible=false;
  if(missilesGroup.isTouching(ufosGroup)){
    score=score+50;
  }
    if (bg.x < 500){
      bg.x = bg.width/2;
    }

    if(keyDown("Space")){
     spawnMissiles()
    }

    
    if(keyDown("UP_ARROW")){
      spaceShip.velocityY=-4
    }
  
    if(keyDown("DOWN_ARROW")){
      spaceShip.velocityY=4
    }

    if(spaceShip.isTouching(ufosGroup)){
      gameState = END;

     //gameOver.visible=false;
}

  }

 if(gameState===END){
  background(0)
    bg.velocityX=0
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 500,250)
    gameOver.visible=true;
    ufosGroup.setVelocityXEach(0)
    ufosGroup.destroyEach();
    missilesGroup.destroyEach()
  
    missilesGroup.setVelocityXEach(0)
   spaceShip.setVelocityX=0
    spaceShip.destroy()

   //textSize(50)
    //fill("white")
    //text("GAME OVER!",500,250)

    
   
  }

 
  edges=createEdgeSprites()
  spaceShip.bounce(edges)

spawnObstacles()
//spawnMissiles()

  drawSprites();
  textSize(25)
  fill("white")
 
  text("Score: "+ score, windowWidth-300,50);
}

function spawnObstacles(){
  if (frameCount % 120 === 0) {
    var ufo = createSprite(1200,50,10,10);
    ufo.y = Math.round(random(50,250));
    ufo.addImage(ufo1);
    ufo.scale = 0.3;
    ufo.velocityX = -3;
    
    ufo.lifetime = 500;
    
  
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    
    ufosGroup.add(ufo);
    
  }
}

function spawnMissiles(){

  
  missile=createSprite(200,150,20,20)
  missile.addImage(missile1)
  missile.scale=0.1
  missile.velocityX=5
  missile.y=spaceShip.y

    missilesGroup.add(missile)
    
  
}




