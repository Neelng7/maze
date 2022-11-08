var inputDirection = { x: 0, y: 0 }
var reset = false

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
        default:
            inputDirection = { x: 0, y: 0 }
            reset = false
            break;  
    }
})

export function collided(){
    inputDirection = { x: 0, y: 0 }
}

export function getInputDirection(){
    return inputDirection
}