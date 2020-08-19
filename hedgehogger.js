function HedgehoggerGame(){
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const spriteWidth = 50;
    const spriteHeight = 50;
    var midXCanvas = Math.floor((canvasWidth-spriteHeight) / 2);
    var midYCanvas = Math.floor((canvasHeight-spriteHeight) / 2);
    var gameCanvas = document.getElementById("gameCanvas");
    var gameScreen = gameCanvas.getContext("2d");
    var playerSpeed = 2;
    var gameWin = false;
    var gameOver = false;

    class GameCharacter{
        constructor(x, y, width, height, color, speed){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.speed = speed;
        }

         HasCollided(gameCharacter){
             return this.x < gameCharacter.x + gameCharacter.width 
                    && this.x + this.width > gameCharacter.x
                    && this.y < gameCharacter.y + gameCharacter.height
                    && this.y + this.height > gameCharacter.y; 
         }

        MoveHorizontal(){            
            if (this.x < spriteWidth){
                this.x = spriteWidth;
            } else if (this.x > canvasWidth - spriteWidth * 2){
                this.x = canvasWidth - spriteWidth * 2
            }
            else{
                this.x += this.speed;
            }
        }

        MoveVertical(){
            if (this.y < spriteHeight || this.y > canvasHeight - spriteHeight * 2){
                this.speed = -this.speed;
            }
            this.y += this.speed;
        }

        Draw(){
            gameScreen.fillStyle = this.color;
            gameScreen.fillRect(this.x, this.y, this.width, this.height);    
        }
    }

    var player = new GameCharacter(spriteWidth, midYCanvas, spriteWidth, spriteHeight, "rgb(139,69,19)", 0);
    var obsticles = [
        new GameCharacter(spriteWidth * 3, spriteHeight, spriteWidth, spriteHeight, "rgb(0,0,255)", 2),
        new GameCharacter(midXCanvas, midYCanvas, spriteWidth, spriteHeight, "rgb(0,0,255)", 3),
        new GameCharacter(canvasWidth - spriteWidth * 4, spriteHeight, spriteWidth, spriteHeight, "rgb(0,0,255)", 4)        
    ];
    var goal = new GameCharacter(canvasWidth - spriteWidth * 2, midYCanvas, spriteWidth, spriteHeight, "rgb(255,255,0)", 0)

    document.onkeydown = function(event){
        switch (event.code){
            case "ArrowRight":
                player.speed = playerSpeed;
                break;
            case "ArrowLeft":
                player.speed = -playerSpeed;
                break;
        }
    }

    document.onkeyup = function(event){
        player.speed = 0;
    }

    function HasCollided(object1, object2){
        //let xOverlap = Math.abs(object1.x - object2.x) <= Math.max(object1.width, object2.width);
        //let yOverlap = Math.abs(object1.y - object2.y) <= Math.max(object1.height, object2.height);
        //return xOverlap && yOverlap;
        
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
        player.MoveHorizontal();
        obsticles.forEach(function(item){
            if (item.HasCollided(player)){
                gameOver = true;
                gameWin - false;
            }
            item.MoveVertical();
        });
        if (goal.HasCollided(player)){
            gameOver = true;
            gameWin = true;
        }
    }

    function GameOver(){
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
        } else {
            GameOver();
        }
    }

    Step();
}
