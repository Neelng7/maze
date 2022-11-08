import { getInputDirection, collided } from "./userInput.js";
import { wallPositions } from './walls.js'

export const runnerSpeed = 10
const mazeCanvas = document.getElementById("maze-canvas");
const caughtOneAudio = document.getElementById("caught-one-audio");
const caughtAllAudio = document.getElementById("caught-all-audio");
const runnerPos = {x: 1, y: 1}
const lastPos = {x: 1, y: 1}
const AllNpcPos = [];
var rows = 21, columns = 21, deleteNpc = false, gameOver = false;

export function updateRunner(){
    lastPos.x = runnerPos.x;
    lastPos.y = runnerPos.y;
    const inputDirection = getInputDirection()
    runnerPos.x += inputDirection.y;
    runnerPos.y += inputDirection.x;
    const npcCount = document.querySelectorAll(".npc").length;

    if(npcCount == 0 && !gameOver){
        gameOver = true;
        console.log("Game Over");
        caughtAllAudio.play();
    }

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
    AllNpcPos.forEach(npc => {
        if(runnerPos.x == npc.x && runnerPos.y == npc.y){
            const collidedNpc = document.querySelector(`.${npc.id}`);
            if(collidedNpc){
                collidedNpc.remove();
            if(npcCount > 0){
                caughtOneAudio.play();    
            }
            }
        }
    })
}

export function drawRunner(){
    var runnerTrail = document.querySelectorAll(".runner");
    if(runnerTrail.length > 0) runnerTrail[0].remove();
    const runnerElm = document.createElement('div');
    runnerElm.style.gridRowStart = runnerPos.x
    runnerElm.style.gridColumnStart = runnerPos.y
    runnerElm.classList.add("runner");
    mazeCanvas.appendChild(runnerElm)
}

export function generatenpc(index){
    deleteNpc = false;
    var randX = Math.floor(Math.random()*21), randY = Math.floor(Math.random()*21);
    wallPositions.forEach(wall => {
        if(randX == wall.x && randY == wall.y){
            generatenpc(index);
            deleteNpc = true;
        }
    })
    if(!deleteNpc){
        const npc = document.createElement('div');
        npc.style.gridRowStart = randX;
        npc.style.gridColumnStart = randY;
        npc.classList.add("npc");
        npc.classList.add(`npc-${index}`);
        AllNpcPos.push({x: randX, y: randY, id: `npc-${index}`});
        mazeCanvas.appendChild(npc)
    }
}

export function updateNpc(){
    const NPCElms = document.querySelectorAll(".npc");
    NPCElms.forEach(e => {
        const NPCpos = {x: 1, y: 1};
        const lastNPCpos = {x: 1, y: 1};
        const elmClass = e.classList[1];

        lastNPCpos.x = NPCpos.x;
        lastNPCpos.y = NPCpos.y;
        let inputDirectionX = Math.floor(Math.random()*2)/1.2;
        let inputDirectionY = inputDirectionX > 0 ? 0: 1/1.2;
        NPCpos.x += inputDirectionX;
        NPCpos.y += inputDirectionY;

        if(NPCpos.x < 0 || NPCpos.y < 0 || NPCpos.x > rows || NPCpos.y > columns){
            NPCpos.x = 0;
            NPCpos.y = 0;
            return;
        }else{
            wallPositions.forEach(wall => {
                if(NPCpos.x == wall.x && NPCpos.y == wall.y){
                    NPCpos.x = 0;
                    NPCpos.y =0;
                    return;
                }
            })

        }
        
        var npcTrail = document.querySelectorAll(elmClass);
        console.log(npcTrail)
        if(npcTrail.length > 0) npcTrail[0].remove();
        const npc = document.createElement('div');
        npc.style.gridRowStart = NPCpos.x
        npc.style.gridColumnStart = NPCpos.y
        npc.classList.add("npc");
        npc.classList.add(elmClass);
        mazeCanvas.appendChild(npc)
    })
}

export function drawNpc(){
}   
