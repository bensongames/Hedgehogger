var isRightArrowPressed = false;
var isLeftArrowPressed = false;
var isUpArrowPressed = false;
var isDownArrowPressed = false;

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
        case "KeyR":
            if (gameOver){
                window.location = "";
            }
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