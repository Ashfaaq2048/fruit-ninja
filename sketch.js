var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword,swordimage;
var fruit,fruit1,fruit2,fruit3,fruit4;
var monster,monsterimage;
var score;
var gameover,gameoverimage;
var gameoversound,swordsound;

function preload(){
  swordimage = loadImage('sword.png');
 monsterimage = loadImage('alien1.png');
  fruit1 = loadImage('fruit1.png');
   fruit2 = loadImage('fruit2.png');
   fruit3 = loadImage('fruit3.png');
   fruit4 = loadImage('fruit4.png');
  gameoverimage = loadImage('gameover.png')
  gameoversound = loadSound('gameover.mp3');
  swordsound = loadSound('knifeSwooshSound.mp3');
}

function setup() {
  createCanvas(600,600);

  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordimage)
  sword.scale = 0.7;
  
  gameover = createSprite(300,300,20,20);
  gameover.addImage(gameoverimage);
  
  enemygroup = createGroup();
  fruitgroup = createGroup();
  
  score = 0;
}
function draw(){
 background(180);
  text("Score: "+ score, 500,50);
  if (gameState === PLAY){
    gameover.visible = false;
    sword.y = World.mouseY;
    sword.x = World.mouseX;
  }
  
  if (fruitgroup.isTouching(sword)){
    score = score + 1;
    fruitgroup.destroyEach();
    swordsound.play();
  }
  if(enemygroup.isTouching(sword)){
    gameState = END;
    gameoversound.play();
  }
  
  if (gameState === END){
    gameover.visible = true;
    fruitgroup.destroyEach();
    enemygroup.destroyEach();
    fruitgroup.velocityX = 0;
    enemygroup.velocityX = 0;
    
  }
  

  
  
  
  
  
  
  
  
fruits();
enemy();
  
drawSprites();  
}

function enemy(){
  if(World.frameCount%200===0){
    
    monster = createSprite(400,200,20,20);
    monster.addImage('moving',monsterimage);
    monster.velocityX = -(8+score/10);
    monster.y = Math.round(random(100,300));
    monster.setLifetime = 100;
    
    enemygroup.add(monster);
  }
}

function fruits(){
  if (World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2
    r = Math.round(random(1,4));
    if (r==1) {
      fruit.addImage(fruit1);
    } else if (r==2){
    fruit.addImage(fruit2);
    } else if (r==3){
    fruit.addImage(fruit3);
    } else{
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -(7+score/4);
    fruit.setLifetime = 100;
    
    fruitgroup.add(fruit);
    
    if (position ==1){
      fruit.x = 400;
      fruit.velocityX = -(7+score/4);
    } else{
      fruit.x = 0;
      fruit.velocityX = (7+score/4);
    }
  }
  
  
  
  
  
  
}