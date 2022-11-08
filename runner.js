import { getInputDirection, collided } from "./userInput.js";
import { wallPositions } from './walls.js'

export const runnerSpeed = 10
const mazeCanvas = document.getElementById("maze-canvas");
const runnerPos = {x: 1, y: 1}
const lastPos = {x: 1, y: 1}
var rows = 21, columns = 21, deleteNpc = false;

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
        // if(wallPositionsX.includes(runnerPos.x) && wallPositionsY.includes(runnerPos.y)){
        //     if(wallPositionsX.indexOf(runnerPos.x) == wallPositionsY.indexOf(runnerPos.y)){
        //         runnerPos.x = lastPos.x;
        //         runnerPos.y = lastPos.y;
        //         collided();
        //     }
        // }
        wallPositions.forEach(wall => {
            if(runnerPos.x == wall.x && runnerPos.y == wall.y){
                runnerPos.x = lastPos.x;
                runnerPos.y = lastPos.y;
                collided();
            }
        })

    }
}

export function draw(){
    var runnerTrail = document.querySelectorAll(".runner");
    if(runnerTrail.length > 0) runnerTrail[0].remove();
    const runnerElm = document.createElement('div');
    runnerElm.style.gridRowStart = runnerPos.x
    runnerElm.style.gridColumnStart = runnerPos.y
    runnerElm.classList.add("runner");
    mazeCanvas.appendChild(runnerElm)
}

export function generatenpc(){
    deleteNpc = false;
    var randX = Math.floor(Math.random()*21), randY = Math.floor(Math.random()*21);
    wallPositions.forEach(wall => {
        if(randX == wall.x && randY == wall.y){
            generatenpc();
            deleteNpc = true;
        }
    })
    if(!deleteNpc){
        const npc = document.createElement('div');
        npc.style.gridRowStart = randX;
        npc.style.gridColumnStart = randY;
        npc.classList.add("npc");
        mazeCanvas.appendChild(npc)
    }
}