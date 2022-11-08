import { getInputDirection, collided } from "./userInput.js";
import { wallPositions } from './walls.js'
import { audio } from './compute.js'

let gameMode = sessionStorage.getItem("gameMode")
if(gameMode == null) window.location.href = "/maze-chaser/";
export var modes = ['Easy', 'Medium', 'Hard'].indexOf(gameMode);
var runnerSpeeds = [7, 10, 15];
export const runnerSpeed = runnerSpeeds[modes];
const mazeCanvas = document.getElementById("maze-canvas");
const caughtOneAudio = document.getElementById("caught-one-audio");
const caughtAllAudio = document.getElementById("caught-all-audio");
const runnerPos = {x: 1, y: 1}
const lastPos = {x: 1, y: 1}
const AllNpcPos = [];
var rows = 21, columns = 21;
var deleteNpc = false, gameOver = false, deleteUser = false;
const gameoverDialog = document.getElementById("gameover-dialog");
const timeSpan = document.querySelector("span.time");
gameoverDialog.close();

//Stopwatch
const StopwatchElm = document.querySelector(".stopwatch");
var StopwatchMin = 0, StopwatchSec = 0, StopwatchMiliSec = 0;
var StopWatchcount = 0, StopWatchDisplay, winTimes = [];
StopwatchElm.textContent = "00:00:00";
export function stopwatch(){
    globalThis.stopWatchInterval = setInterval(() => { 
        StopWatchcount += 5;
        StopwatchMiliSec = StopWatchcount%100;
        StopwatchSec = ((StopWatchcount - StopwatchMiliSec)/100)%60;
        StopwatchMin = ((StopWatchcount - StopwatchSec*100 - StopwatchMiliSec)/6000);
        StopwatchMiliSec = StopwatchMiliSec<10 ? "0"+StopwatchMiliSec : StopwatchMiliSec;
        StopwatchSec = StopwatchSec<10 ? "0"+StopwatchSec : StopwatchSec;
        StopwatchMin = StopwatchMin<10 ? "0"+StopwatchMin : StopwatchMin;
        StopWatchDisplay = `${StopwatchMin}:${StopwatchSec}:${StopwatchMiliSec}`;
        StopwatchElm.textContent = StopWatchDisplay;
    }, 50)
}

//constantly update runner position with controls
export function updateRunner(){
    lastPos.x = runnerPos.x;
    lastPos.y = runnerPos.y;
    const inputDirection = getInputDirection()
    runnerPos.x += inputDirection.y;
    runnerPos.y += inputDirection.x;
    const npcCount = document.querySelectorAll(".npc").length;

    if(npcCount == 0 && !gameOver){
        gameOver = true;
        gameOverState();
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

//display updated controls
export function drawRunner(){
    var runnerTrail = document.querySelectorAll(".runner");
    if(runnerTrail.length > 0) runnerTrail[0].remove();
    const runnerElm = document.createElement('div');
    runnerElm.style.gridRowStart = runnerPos.x
    runnerElm.style.gridColumnStart = runnerPos.y
    runnerElm.classList.add("runner");
    mazeCanvas.appendChild(runnerElm)
}

const teleportAudio = document.getElementById("teleport-audio");

//Teleport User to Random place on pressing space bar
export function teleportUser(){
    deleteUser = false;
    var randX = Math.floor(Math.random()*21), randY = Math.floor(Math.random()*21);
    let runner = document.querySelector(".runner");
    if(runner) runner.remove();
    wallPositions.forEach(wall => {
        if(randX == wall.x && randY == wall.y){
            teleportUser();
            deleteUser = true;
        }
    })
    if(!deleteUser){
        const runnerElm = document.createElement('div');
        runnerPos.x = randX;
        runnerPos.y = randY;
        runnerElm.style.gridRowStart = runnerPos.x
        runnerElm.style.gridColumnStart = runnerPos.y
        runnerElm.classList.add("runner");
        mazeCanvas.appendChild(runnerElm)
        teleportAudio.play();
    }
}

//generate pink npc circles randomly around the map
export function generatenpc(index){
    deleteNpc = false;
    var randX = Math.floor(1+Math.random()*20), randY = Math.floor(1+Math.random()*20);
    wallPositions.forEach(wall => {
        if(randX == wall.x && randY == wall.y){
            generatenpc(index);
            deleteNpc = true;
        }
    })
    if(!deleteNpc){
        if(document.querySelectorAll(`.npc-${index}`).length > 0) return;
        const npc = document.createElement('div');
        npc.style.gridRowStart = randX;
        npc.style.gridColumnStart = randY;
        npc.classList.add("npc");
        npc.classList.add(`npc-${index}`);
        AllNpcPos.push({x: randX, y: randY, id: `npc-${index}`});
        mazeCanvas.appendChild(npc)
    }
    teleportContainer();
}

//GameOver
function gameOverState(){
    caughtAllAudio.play();
    clearInterval(stopWatchInterval);
    clearInterval(npcTimer);
    collided();
    audio.pause();
    gameoverDialog.showModal();
    timeSpan.textContent = StopWatchDisplay;
    window.localStorage.setItem("bestTime", StopWatchcount)
    document.querySelectorAll("audio").forEach(e => {
        e.setAttribute("muted", true);
    })
}

//Teleport NPCs to random positions every 15sec
function teleportContainer(){
    var npcTeleportIntervalsArray = [11, 8, 5];
    var npcTeleportInterval = npcTeleportIntervalsArray[modes];
    globalThis.npcTimer = setInterval(teleportNpc, npcTeleportInterval*1000);
    function teleportNpc(){
        const NPCElms = document.querySelectorAll(".npc");
        NPCElms.forEach(e => e.remove());
        for(let i=1; i<NPCElms.length+1; i++) generatenpc(i);
        teleportAudio.play();
    }
}

//Randomly Move Npcs Around
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
        if(npcTrail.length > 0) npcTrail[0].remove();
        const npc = document.createElement('div');
        npc.style.gridRowStart = NPCpos.x
        npc.style.gridColumnStart = NPCpos.y
        npc.classList.add("npc");
        npc.classList.add(elmClass);
        mazeCanvas.appendChild(npc)
    })
}
