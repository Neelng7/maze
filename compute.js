import { updateRunner, drawRunner, runnerSpeed, generatenpc, modes, stopwatch } from './runner.js'
import { generateWalls } from './walls.js'

let lastRender = 0
const mazeCanvas = document.getElementById("maze-canvas");
export const audio = document.getElementById("gameplayAudio");
const volumeBtn = document.getElementById("volume-btn");
generateWalls(mazeCanvas);

function main(currenTime){
    window.requestAnimationFrame(main);
    let secondsSinceLastRender = (currenTime - lastRender)/1000
    if(secondsSinceLastRender < 1/runnerSpeed) return;
    lastRender = currenTime
    updateRunner();
    drawRunner();
    // updateNpc();
}

volumeBtn.addEventListener('click', volumeToggle);
function volumeToggle(){
    var iconClass = volumeBtn.children[0].classList    
    iconClass.toggle("fa-volume-high");
    iconClass.toggle("fa-volume-xmark");
    if(iconClass.contains("fa-volume-xmark")) audio.pause();
    else audio.play();
}

function start(){
    var NPCnumbers = [5, 7, 9];
    for(let i=1; i<NPCnumbers[modes]+1; i++) generatenpc(i);
    window.requestAnimationFrame(main);
}

//Modal Controls
const modalNext = document.getElementById("modal-next");
const modalBack = document.getElementById("modal-back");
const modalPlay = document.getElementById("modal-play");
const gameDiscriptionDialog = document.getElementById("gameDiscription-dialog");
const view1 = document.querySelector(".view1");
const view2 = document.querySelector(".view2");

modalNext.addEventListener('click', () => {
    view1.classList.toggle("hide", true);
    view2.classList.toggle("hide", false);
})

modalBack.addEventListener('click', () => {
    view1.classList.toggle("hide", false);
    view2.classList.toggle("hide", true);
})

modalPlay.addEventListener('click', () => {
    start();
    stopwatch();
    gameDiscriptionDialog.close();
})