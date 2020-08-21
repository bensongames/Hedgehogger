var scale = 0.8;
var canvasWidth = 1000;
var canvasHeight = 500;
var timerHeight = 30;
var minSpeed = 2;
var maxSpeed = 10;
var gameScreen;
var timerProgress;
var secondsRemaining = 0;
var startTime = new Date().getTime();
var playerSpeed = 2;
var horizontalSpeed = 0;
var verticalSpeed = 0;
var gameOver = false;
var player = new GameSprite(0, Math.floor((canvasHeight-32) / 2), 0, "images/hedgehog.png", 32, 32);
var goal = new GameSprite(canvasWidth - 32, player.y, 0, "images/Goal.png", 32, 32);
var backgroundImage = new Image();
var obstacles = [];

function PopulateObsticles(){
    for (i=0; i < 7; i++){
        let direction = (i<3? "Down":"Up")
        let carImage = "images/obstacles/Car" + GetRandomValue(1,3) + direction + ".png"; 
        obstacles.push(new GameSprite(
            (i+1) * 120, 
            GetRandomValue(0, canvasHeight), 
            GetRandomValue(minSpeed, maxSpeed), 
            carImage, 
            32, 64, 
            direction
        ));
    }
}

function GetRandomValue(minValue, maxValue){
    let returnValue = Math.ceil(Math.random() * maxValue);
    if (returnValue < minValue){
        return minValue;
    } else {
        return returnValue;
    }
}

function SetScale(object, width, height, scale){
    if (scale<=0) return;
    if (width>=0){
        object.width = Math.floor(width * scale);
        object.style.width = Math.floor(width * scale) + "px";
    }
    if (height>=0){
        object.height = Math.floor(height * scale);
        object.style.height = Math.floor(height * scale) + "px";    
    }
}

function GameOver(gameWin){
    gameOver = true;        
    if (gameWin){
        DisplayBanner("You scored " + 20 * secondsRemaining + " points!", "Press 'R' to restart");
    } else {
        DisplayBanner("Game Over!", "Press 'R' to restart");
    }    
}

function DisplayBanner(line1Text, line2Text){
    gameScreen.fillStyle = "green";
    gameScreen.fillRect(0, 125, canvasWidth, 200);    
    gameScreen.fillStyle = "black";
    gameScreen.font = "72px Arial";
    gameScreen.fillText(line1Text, (canvasWidth - gameScreen.measureText(line1Text).width) / 2, 200);
    gameScreen.fillText(line2Text, (canvasWidth - gameScreen.measureText(line2Text).width) / 2, 300);
}

function UpdateTimer(){
    let currentTime = new Date().getTime();
    secondsRemaining = 30 - Math.round((currentTime - startTime) / 1000, 0);
    if (secondsRemaining > 0){
        timerProgress.style.width = Math.round(100 / 30 * secondsRemaining, 0)  + "%";
    } else {
        timerProgress.style.width = "0%";
        GameOver(false);
    }
}

function DrawScreen(){
    gameScreen.clearRect(0, 0, canvasWidth, canvasHeight);
    gameScreen.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
    goal.Draw();
    player.Draw();
    obstacles.forEach(function(item){
        item.Draw();    
    });
}

function Update(){
    UpdateTimer();
    player.MoveHorizontal(horizontalSpeed);
    player.MoveVertical(verticalSpeed);
    obstacles.forEach(function(item){
        if (item.HasCollided(player)){
            GameOver(false);
        }
        item.Scroll();
    });
    if (goal.HasCollided(player)){            
        GameOver(true);
    }
}

function Step(){
    DrawScreen();
    Update();
    if (!gameOver){
        window.requestAnimationFrame(Step);
    } 
}

function StartGame(){
    let gameCanvas = document.getElementById("gameCanvas");
    SetScale(gameCanvas, canvasWidth, canvasHeight, scale);
    gameScreen = gameCanvas.getContext("2d");
    gameScreen.scale(scale,scale)
    let timer = document.getElementById("timer")
    SetScale(timer, canvasWidth, timerHeight, scale);
    timerProgress = document.getElementById("timerProgress");
    backgroundImage.src = "images/background.png";
    PopulateObsticles();
    Step();
}
