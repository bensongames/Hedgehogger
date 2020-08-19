function HedgehoggerGame(){
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const minSpeed = 2;
    const maxSpeed = 10;
    var gameCanvas = document.getElementById("gameCanvas");
    var gameScreen = gameCanvas.getContext("2d");
    var playerSpeed = 2;
    var isRightArrowPressed = false;
    var isLeftArrowPressed = false;
    var isUpArrowPressed = false;
    var isDownArrowPressed = false;
    var horizontalSpeed = 0;
    var verticalSpeed = 0;
    var gameOver = false;

    class GameSprite{
        constructor(x, y, scrollSpeed, spriteUrl, width, height, scrollDirection){
            this.x = x;
            this.y = y;
            this.scrollSpeed = scrollSpeed;
            if (spriteUrl != null){
                this.sprite = new Image();
                this.sprite.src = spriteUrl;
                this.sprite.width = width;
                this.sprite.height = height;
            }
            this.width = width;
            this.height = height;
            this.scrollDirection = scrollDirection;
        }

        HasCollided(gameSprite){
             return this.x < gameSprite.x + gameSprite.width 
                    && this.x + this.width > gameSprite.x
                    && this.y < gameSprite.y + gameSprite.height
                    && this.y + this.height > gameSprite.y; 
         }

        MoveHorizontal(amount){            
            if (this.x < this.width){
                this.x = this.width;
            } else if (this.x > canvasWidth - this.width){
                this.x = canvasWidth - this.width;
            }
            else{
                this.x += amount;
            }
        }

        MoveVertical(amount){
            if (this.y < this.height){
                this.y = this.height;
            } else if (this.y > canvasHeight - this.height){
                this.x = canvasHeight - this.height;
            }
            else{
                this.y += amount;
            }
        }

        Scroll(){
            if (this.scrollDirection == "Up"){
                if (this.y <= canvasHeight - this.height){
                    this.y += this.scrollSpeed;
                } else{
                    this.y = 0;
                    this.scrollSpeed = GetRandomValue(minSpeed, maxSpeed);
                }    
            } else {
                if (this.y >= 0){
                    this.y -= this.scrollSpeed;
                } else{
                    this.y = canvasHeight - this.height;
                    this.scrollSpeed = GetRandomValue(minSpeed, maxSpeed);
                }    
            }
        }

        Draw(){
            if (this.sprite != null){
                gameScreen.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            } else {
                gameScreen.fillStyle = "rgb(0, 0, 0)";
                gameScreen.fillRect(this.x, this.y, this.width, this.height);    
            }
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

    var player = new GameSprite(0, Math.floor((canvasHeight-32) / 2), 0, "images/hedgehog.png", 32, 32);
    var obsticles = [
        new GameSprite(120, GetRandomValue(0, canvasHeight), GetRandomValue(minSpeed, maxSpeed), "images/RedCar.png", 32, 64, "Down"),
        new GameSprite(240, GetRandomValue(0, canvasHeight), GetRandomValue(minSpeed, maxSpeed), "images/BlueCar.png", 32, 64, "Down"),
        new GameSprite(360, GetRandomValue(0, canvasHeight), GetRandomValue(minSpeed, maxSpeed), "images/RedCar.png", 32, 64, "Down"),
        new GameSprite(480, GetRandomValue(0, canvasHeight), GetRandomValue(minSpeed, maxSpeed), "images/RedStripedCar.png", 32, 64, "Up"),
        new GameSprite(600, GetRandomValue(0, canvasHeight), GetRandomValue(minSpeed, maxSpeed), "images/RedCar.png", 32, 64, "Up"),
        new GameSprite(720, GetRandomValue(0, canvasHeight), GetRandomValue(minSpeed, maxSpeed), "images/BlueCar.png", 32, 64, "Up"),
        new GameSprite(840, GetRandomValue(0, canvasHeight), GetRandomValue(minSpeed, maxSpeed), "images/RedCar.png", 32, 64, "Up"),
    ];
    var goal = new GameSprite(canvasWidth - 32, player.y, 0, "images/Goal.png", 32, 32);
    
    document.onkeydown = function(event){
        switch (event.code){
            case "ArrowRight":
                isRightArrowPressed = true;
                horizontalSpeed = playerSpeed;
                break;
            case "ArrowLeft":
                isLeftArrowPressed = true;
                horizontalSpeed = -playerSpeed;
                break;
            case "ArrowUp":
                isUpArrowPressed = true;
                verticalSpeed = -playerSpeed;
                break;
            case "ArrowDown":
                isDownArrowPressed = true;
                verticalSpeed = playerSpeed;
                break;
            }
    }

    document.onkeyup = function(event){
        switch (event.code){
            case "ArrowRight":
                isRightArrowPressed = false;
                if (isLeftArrowPressed){
                    horizontalSpeed = -playerSpeed;
                } else {
                    horizontalSpeed = 0;
                }
                break;
            case "ArrowLeft":
                isLeftArrowPressed = false;
                if (isRightArrowPressed){
                    horizontalSpeed = playerSpeed;
                } else {
                    horizontalSpeed = 0;
                }
                break;
            case "ArrowUp":
                isUpArrowPressed = false;
                if (isDownArrowPressed){
                    verticalSpeed = playerSpeed;
                } else {
                    verticalSpeed = 0;
                }
                break;
            case "ArrowDown":
                isDownArrowPressed = false;
                if (isUpArrowPressed){
                    verticalSpeed = +playerSpeed;
                } else {
                    verticalSpeed = 0;
                }
                break;
        }
    }

    function DrawScreen(){
        gameScreen.clearRect(0, 0, canvasWidth, canvasHeight);
        goal.Draw();
        player.Draw();
        obsticles.forEach(function(item){
            item.Draw();    
        });
    }

    function Update(){
        player.MoveHorizontal(horizontalSpeed);
        player.MoveVertical(verticalSpeed);
        obsticles.forEach(function(item){
            if (item.HasCollided(player)){
                GameOver(false);
            }
            item.Scroll();
        });
        if (goal.HasCollided(player)){            
            GameOver(true);
        }
    }

    function GameOver(gameWin){
        gameOver = true;
        if (gameWin){
            alert("You Win!");
        } else {
            alert("You loose");
        }
        window.location = "";
    }

    function Step(){
        DrawScreen();
        Update();
        if (!gameOver){
            window.requestAnimationFrame(Step);
        } 
    }

    Step();
}
