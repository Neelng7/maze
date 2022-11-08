import { getInputDirection, collided } from "./userInput.js";
import { wallPositions } from './walls.js'

export const runnerSpeed = 10
const runnerPos = {x: 1, y: 1}
const lastPos = {x: 1, y: 1}
var rows = 21, columns = 21

export function update(){
    lastPos.x = runnerPos.x;
    lastPos.y = runnerPos.y;
    const inputDirection = getInputDirection()
    runnerPos.x += inputDirection.y;
    runnerPos.y += inputDirection.x;

    if(runnerPos.x < 0 || runnerPos.y < 0 || runnerPos.x > rows || runnerPos.y > columns){
        runnerPos.x = lastPos.x;
        runnerPos.y = lastPos.y;
        collided();
    }else{
        wallPositions.forEach(wall => {
            if(runnerPos.x == wall.x && runnerPos.y == wall.y){
                runnerPos.x = lastPos.x;
                runnerPos.y = lastPos.y;
                collided();
            }
        })
    }
}

export function draw(mazeCanvas){
    var runnerTrail = document.querySelectorAll(".runner");
    if(runnerTrail.length > 0) runnerTrail[0].remove();
    const runnerElm = document.createElement('div');
    runnerElm.style.gridRowStart = runnerPos.x
    runnerElm.style.gridColumnStart = runnerPos.y
    runnerElm.classList.add("runner");
    mazeCanvas.appendChild(runnerElm)
}