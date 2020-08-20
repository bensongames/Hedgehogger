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
        if (this.scrollDirection == "Down"){
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
