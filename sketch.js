var Ground,
    player,
    Space = "space",
    gameState = "start", score = 0,
    bulletImg, bulletGroup, boxGroup, bullets, weapon = 10,
    zombie1, zombie2, zombie3, zombie4, obstaclesGroup, jumpSlab, JumpGroup, powerJump = 5


function preload() {
    playerAnimaRight = loadAnimation("images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png")
    playerAnimaLeft = loadAnimation("images/1R.png", "images/2R.png", "images/3R.png", "images/4R.png", "images/5R.png", "images/6R.png")
    playerAnimaStop = loadAnimation("images/stop.png")
    boxImg = loadImage("images/box.png")
    bulletImg = loadImage("images/bullet.png")
    bg2 = loadImage("images/ground2.png")
    zombie1 = loadImage("images/zombie1.png")
    zombie2 = loadImage("images/zombie2.png")
    zombie3 = loadImage("images/zombie3.png")
    zombie4 = loadImage("images/zombie4.png")
    restartImg = loadImage("images/restart.png")
    gameOverImg = loadImage("images/gameOver.png")
    houseImg = loadImage("images/house.png")
}

function setup() {
    canvas = createCanvas(windowWidth, 600)

    boxGroup = new Group();
    bulletGroup = new Group();
    obstaclesGroup = new Group();
    JumpGroup = new Group();

    number = Math.round(random(1, 3))

    Ground = createSprite(windowWidth / 2, windowHeight / 2 + 165, windowWidth + 100, 20)
    Ground.addImage(bg2)

    Wall = createSprite(windowWidth / 2, 1, windowWidth, 15)
    Wall.visible = false

    house = createSprite(30000, 438 - 40);
    house.addImage(houseImg);
    house.scale = 1.7
    house.setCollider("rectangle", 0, 0, 250, 250)

    player = createSprite(100, 180, 20, 20)
    player.addAnimation("RunningRight", playerAnimaRight)
    player.addAnimation("RunningLeft", playerAnimaLeft)
    player.addAnimation("Stop", playerAnimaStop)
    player.scale = 0.7
    player.setCollider("rectangle", -250, 0, 50, 100)
    player.debug = false


    bullet1 = createSprite(player.x, player.y, 10, 10)
    bullet1.addImage(bulletImg)
    bullet1.scale = 0.2
    bullet1.visible = false

    gameOver = createSprite(width / 2, height / 2 - 50);
    gameOver.addImage(gameOverImg);



    restart = createSprite(width / 2, height / 2);
    restart.addImage(restartImg);

    gameOver.scale = 0.8;
    restart.scale = 0.8;

    gameOver.visible = false;
    restart.visible = false;

}
function draw() {
    background("skyBlue")

    if (gameState === "start") {
        textSize(20)
        fill("Black")
        text("Press 'p' to use powerjump", width / 2 - 200, height / 2 - 20)
        text("Press 'Space' to Shoot", width / 2 - 200, height / 2 + 20)
        text("Press 'Enter' to start th game", width / 2 + 200, height / 2 + 200)


        if (keyDown("Enter")) {
            gameState = "play"
        }
    }

    if (gameState === "play") {

        if (keyDown !== Space) {
            camera.x = player.x
            Wall.x = player.x
            bullet1.y = player.y - 10
        }

        score = score + Math.round(frameCount % 20 === 0)

        Ground.velocityX = 0
        player.velocityY += 0.5

        if (player.collide(Wall)) {
            player.velocityY = 20
        }

        if (frameCount % 80 === 0) {
            Ground.x = player.x + 500;
        }

        if (keyDown !== LEFT_ARROW) {
            player.scale = 1
            player.changeAnimation("Stop", playerAnimaStop)
            player.setCollider("rectangle", -270, 0, 50, 100)

        }
        if (obstaclesGroup.collide(player)) {
            gameState = "end"
            console.log(gameState)
        }
        move()
        spawnBullets()

        if (player.x < 29000) {
            spawnObstacles()
            spawnBox()
        }

        if (player.collide(house)) {
            gameState = "win"
        }
        if (obstaclesGroup.collide(house)) {
            obstaclesGroup.destroyEach()
        }

    }

    if (gameState === "end") {
        player.changeAnimation("Stop", playerAnimaStop)
        player.velocityY = 2
        Ground.velocityX = 0

        gameOver.visible = true;
        restart.visible = true;

        obstaclesGroup.setLifetimeEach(-1);
        obstaclesGroup.setVelocityXEach(0);
        boxGroup.setLifetimeEach(-1);

        if (mousePressedOver(restart)) {
            reset();
        }
        console.log("x: " + round(player.x))
    }

    if (gameState === "win") {
        player.changeAnimation("Stop", playerAnimaStop)
        player.velocityY = 2
        Ground.velocityX = 0

        if (obstaclesGroup.collide(house)) {
            obstaclesGroup.destroyEach()
        }


        fill("black")
        textSize(20)
        text("Great!!! You Won The Game", player.x - 400, Ground.y - 250)
        restart.visible = true;

        obstaclesGroup.setLifetimeEach(-1);
        obstaclesGroup.setVelocityXEach(0);
        boxGroup.setLifetimeEach(-1);

        if (mousePressedOver(restart)) {
            reset();
        }
        console.log("x: " + player.x)
    }

    if (gameState !== "start") {
        textSize(20)
        fill("White")
        text("Bullets = " + weapon, player.x - 400, Ground.y - 450)
        text("PowerJump = " + powerJump, player.x + -50, Ground.y - 450)
        text("Survivel Time: " + score + " sec", player.x + 200, Ground.y - 450);
        text("Total Distance = " + "30,000" + " m", player.x + 400, Ground.y - 400);
        text("Travelled = " + player.x + " m", player.x + 400, Ground.y - 350);
    }

    bounceFunction()
    drawSprites()

}
function move() {
    if (keyDown(LEFT_ARROW)) {
        player.changeAnimation("RunningLeft", playerAnimaLeft)
        player.x -= 10
    }
    if (keyDown(RIGHT_ARROW)) {
        player.x += 10
        gameOver.x = camera.x
        restart.x = camera.x
        player.changeAnimation("RunningRight", playerAnimaRight)
        player.setCollider("rectangle", -260, 0, 50, 100)

        Ground.velocityX = -2
    }
    if (keyWentDown(UP_ARROW) && player.collide(Ground) || JumpGroup.collide(player)) {
        player.velocityY -= 13
    }
    if (keyWentDown("p") && powerJump !== 0) {
        powerJump -= 1
        player.velocityY -= 20
    }

    if (keyWentDown(Space) && weapon !== 0) {
        weapon -= 1
        bullet1.visible = true
        bullet1.velocityX = 20
        console.log("y:" + player.y)

        console.log(bulletGroup)
        bulletGroup.xEach = player.x
        bulletGroup.setVelocityXEach(20)
        bulletGroup.setVisibleEach(true)
    }
    if (bulletGroup.isTouching(obstaclesGroup) || obstaclesGroup.isTouching(bullet1)) {
        obstaclesGroup.setLifetimeEach(0)
    }
}
function bounceFunction() {
    player.collide(Ground)
    boxGroup.bounceOff(player)
    boxGroup.bounceOff(Ground)
    obstaclesGroup.collide(Ground)
    obstaclesGroup.collide(boxGroup)
    JumpGroup.collide(boxGroup)

    obstaclesGroup.setVelocityYEach(2)
    boxGroup.setVelocityYEach(2)
    JumpGroup.setVelocityYEach(2)

    if (JumpGroup.collide(player)) {
        player.velocityY -= 10
    }
}
function reset() {
    player.x = 100
    player.y = 50
    gameState = "play";
    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup.destroyEach();
    boxGroup.destroyEach();
    JumpGroup.destroyEach()

    score = 0;
    weapon = 10
    powerJump = 5
}


