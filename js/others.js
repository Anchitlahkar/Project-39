function spawnBox(){
    if (frameCount % 80 === 0){
        var y = Math.round(random(700,1500));
        box = createSprite(camera.x+y,447,10,40);
        jumpSlab = createSprite(0,420,30,10);
        
        box.addImage(boxImg);

        box.debug=false; 
        box.setCollider("rectangle",0,-5,50,50)

        jumpSlab.x=box.x
        jumpSlab.visible=false

        box.scale = 1.15;
        box.lifetime = 10000;
        jumpSlab.lifetime = 500;
      
        boxGroup.add(box);
        JumpGroup.add(jumpSlab);
    }
}








function spawnBullets(){
    if (keyDown("space")){
        bullets = createSprite(player.x-150,windowHeight/2+130,10,80);
        bullets.addImage(bulletImg);
        bullets.debug = false; 
        bullets.setCollider("rectangle",0,0,50,50)
        bullets.y = player.y-15
        bullets.visible=false

        bullets.scale = 0.2
        bullets.lifetime = 500;
      
        bulletGroup.add(bullets);
    }
}









function spawnObstacles(){
    if (frameCount % 80 === 0){
      var y = Math.round(random(700,1500));
      var obstacle = createSprite(camera.x+y,447,10,40);
      obstacle.velocityX = 0;
      
       //generate random obstacles
       var rand = Math.round(random(1,4));
       switch(rand) {
         case 1: obstacle.addImage(zombie1);
                 break;
         case 2: obstacle.addImage(zombie2);
                 break;
         case 3: obstacle.addImage(zombie3);
                 break;
         case 4: obstacle.addImage(zombie4);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.4;
       obstacle.lifetime = 1000;
       obstacle.debug=false
       obstacle.velocityX=-2
       obstacle.setCollider("rectangle",0,-6,180,280)
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }