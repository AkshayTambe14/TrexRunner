var trex, trex_running, edges;
var groundImage,ground;
var trexCollided;

var invisibleGround;

var cloudImage;

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6

var PLAY = 1;
var END = 0;

var gameState = PLAY;

var score;
var gameOver,gameOverImage
var restart,restartImage


var jumpSound, dieSound, checkPointSound


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  trexCollided = loadAnimation("trex_collided.png")
  
}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  score = 0;
  
  
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  
  ground = createSprite(0,170,400,20)
  ground. addImage(groundImage)
  
  gameOver = createSprite(300,100)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.6
  restart = createSprite(300,140)
  restart.addImage(restartImage)
  restart.scale = 0.5

  
    invisibleGround = createSprite(0,190,400,15)
    invisibleGround.visible = false
  
  gameOver.visible = false
  restart.visible = false
  

  obstacleGroup = createGroup();
  cloudGroup = createGroup();
  
  trex.setCollider("rectangle",0,0,100,trex.height)
  trex.debug= false 

}


function draw(){
  //set background color 
  background("white");
  
  if (gameState == PLAY ){

      //logging the y position of the trex
    //console.log(ground.x)

    //jump when space key is pressed
    if(keyDown("space")&&trex.collide(invisibleGround)){
      trex.velocityY = -10;
      jumpSound.play();
    }

  //if(trex.y > 150){
    //console.warn("you are going too high");
    //trex.collide(invisibleGround);
  //}
    
    score = score+Math.round(frameCount/100);
    
    text("SCORE " +score , 520,30)
    
    if(score % 100 === 0 && score >= 100 ){
      checkPointSound.play(); 
       }
    

    
    
    

 // console.time();

    trex.velocityY = trex.velocityY + 0.5;



    ground.velocityX = -5
    if (ground.x < 0){
      ground.x = ground.width/2

     // if (ground.x < 33){
      //console.info("the ground has started repeating")
     // }


    }

    
    spawnClouds();
    spawnObstacle();

    if (trex.isTouching(obstacleGroup)){
      dieSound.play();
      trex.changeAnimation("trexCollided",trexCollided)
      gameState = END
      //trex.velocityY = -8;
      //jumpSound.play();
        }

   // var randomNumber = Math.round(random(50,100))
   // console.log(randomNumber)

    //console.timeEnd();

    
  }

  if (gameState == END ){
    
    gameOver.visible = true
    restart.visible = true
    
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    // trex.velocityX = 0;
    trex.velocityY=0
    //dieSound.play();
    if (mousePressedOver(restart)){
      reset();
      
    }
    
  
  }

  //stop trex from falling down
  trex.collide(invisibleGround)
  drawSprites();
}

function reset(){
  gameState = PLAY
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
}

function spawnClouds(){
  if(frameCount % 35 == 0){
      var cloud = createSprite(600,100,50,10)
  cloud.addImage(cloudImage)
  cloud.velocityX = -6
  cloud.y = Math.round(random(30,130))
  cloud.scale = Math.random(0.3,0.9);
  trex.depth = cloud.depth
  trex.depth += 1;
    
    cloudGroup.add(cloud);
  }

  
}
 
function spawnObstacle (){
 if (frameCount % 60 == 0){
   var obstacle = createSprite(600,160,20,50);
   obstacle.velocityX = -6
   
   var randomObstacle = Math.round(random(1,6));
   switch(randomObstacle){
     case 1:
       obstacle.addImage(obstacle1);
       break;
       
     case 2:
       obstacle.addImage(obstacle2);
       break;
       
     case 3:
       obstacle.addImage(obstacle3);
       break;
       
     case 4:
       obstacle.addImage(obstacle4);
       break;
       
     case 5:
       obstacle.addImage(obstacle5);
       break;
       
     case 6:
       obstacle.addImage(obstacle6);
       break;
       
       default:
       //statement
       break;
       
       
          
          
          }
   
   obstacle.scale = 0.6;
   
   obstacle.lifetime = 180;
   
   
   obstacleGroup.add(obstacle);
   
 }
  
}