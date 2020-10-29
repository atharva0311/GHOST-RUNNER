var tower,towerimage;
var door,doorimage,doorGroup;
var climber,climberimage,climberGroup;
var ghost,ghostimage;
var invisibleground,invisibleGroup;
var gamestate="play";


function preload()
{
  towerimage=loadImage("tower.png")
  
  doorimage=loadImage("door.png")
  
  climberimage=loadImage("climber.png")
  
  ghostimage=loadImage("ghost-standing.png")
  
}
function setup()
{
  createCanvas(600,600);
  
  tower = createSprite(300,300,600,600);
  tower.addImage("to add background",towerimage)
  tower.velocityY=6
  
  ghost=createSprite(300,300,0,0);
  ghost.addImage(ghostimage);
  ghost.scale=0.3; 
  
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw()
{
  
  if (gamestate === "play")
    {
  
  if(tower.y>600)
    {
     tower.y=300
    }
  if(keyDown("space"))
     {
      ghost.velocityY=-3
     }
  
    ghost.velocityY=ghost.velocityY+1;
  
  if(keyDown("right_arrow"))
      {
      ghost.x= ghost.x+2
      }
  
   if(keyDown("left_arrow"))
       {
      ghost.x= ghost.x-2
       }
  
  if(climberGroup.isTouching(ghost))
    {
      
      ghost.velocityY=0;
      
    }
   
   if(invisibleGroup.isTouching(ghost) || ghost.y>600)
    {
      ghost.destroy();
      gamestate="end"
    } 
  
  spawndoor();
  drawSprites();
    }
    
  if (gamestate==="end")
    {
      fill("yellow")
      textSize(40)
      text("GAMEOVER",200,300)
    }
}
function spawndoor()
{
  if(frameCount%190===0)
    {
      door = createSprite(Math.round(random(100,500)),10)
      door.addImage(doorimage)
      door.velocityY=6
      door.lifetime=150;
      doorGroup.add(door)
      
        climber=createSprite(door.x,door.y+60);
        climber.velocityY=6;
        climber.lifetime=150;
        climber.addImage(climberimage);
      
      invisibleground = createSprite(door.x,climber.y+5,0,2);
      invisibleground.width=climber.width;
      invisibleground.velocityY=6;
      invisibleground.debug=true;
      invisibleGroup.add(invisibleground)
      
      ghost.depth=door.depth;
      ghost.depth=ghost.depth+1;
      
    }
}
