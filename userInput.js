import { teleportUser } from "./runner.js";

const audio = document.getElementById("gameplayAudio");
const volumeBtn = document.getElementById("volume-btn");
var inputDirection = { x: 0, y: 0 }
var reset = false

//All keyboard controls and shortcuts
window.addEventListener('keydown', key => {
    switch(key.key){
        case 'ArrowUp':
        case 'w':
        case "W":
            inputDirection = { x: 0, y: -1 }
            break;
        case 'ArrowDown':
        case 's':
        case "S":
            inputDirection = { x: 0, y: 1 }
            break;
        case 'ArrowLeft':
        case 'a':
        case "A":
            inputDirection = { x: -1, y: 0 }
            break;
        case 'ArrowRight':
        case 'd':
        case "D":
            inputDirection = { x: 1, y: 0 }
            break;
        case " ":
            teleportUser();
            break;
        case "m":
        case "M":
            var iconClass = volumeBtn.children[0].classList    
            iconClass.toggle("fa-volume-high", false);
            iconClass.toggle("fa-volume-xmark", true);
            audio.pause();
            break;
        case "Escape":
            window.location.href = '/maze-chaser/';
            break;
        default:
            reset = false
            break;  
    }
})

//if runner collides with a wall, speed = 0
export function collided(){
    inputDirection = { x: 0, y: 0 }
}

//export speed direction to runner.js
export function getInputDirection(){
    return inputDirection
}