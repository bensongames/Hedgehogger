var isRightArrowPressed = false;
var isLeftArrowPressed = false;
var isUpArrowPressed = false;
var isDownArrowPressed = false;

document.onkeydown = function(event){
    switch (event.code){
        case "KeyW":
            isUpArrowPressed = true;
            verticalSpeed = -playerSpeed;
            break;
        case "KeyA":
            isLeftArrowPressed = true;
            horizontalSpeed = -playerSpeed;
            break;
        case "KeyS":
            isDownArrowPressed = true;
            verticalSpeed = playerSpeed;
            break;
        case "KeyD":
            isRightArrowPressed = true;
            horizontalSpeed = playerSpeed;
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
        case "KeyW":
            isUpArrowPressed = false;
            if (isDownArrowPressed){
                verticalSpeed = playerSpeed;
            } else {
                verticalSpeed = 0;
            }
            break;
        case "KeyA":
            isLeftArrowPressed = false;
            if (isRightArrowPressed){
                horizontalSpeed = playerSpeed;
            } else {
                horizontalSpeed = 0;
            }
            break;
        case "KeyS":
            isDownArrowPressed = false;
            if (isUpArrowPressed){
                verticalSpeed = +playerSpeed;
            } else {
                verticalSpeed = 0;
            }
            break;
        case "KeyD":
            isRightArrowPressed = false;
            if (isLeftArrowPressed){
                horizontalSpeed = -playerSpeed;
            } else {
                horizontalSpeed = 0;
            }
            break;
    }
}