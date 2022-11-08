import { updateRunner, drawRunner, runnerSpeed, generatenpc, updateNpc, drawNpc } from './runner.js'
import { generateWalls } from './walls.js'

let lastRender = 0
const mazeCanvas = document.getElementById("maze-canvas");
const audio = document.getElementById("gameplayAudio");
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

for(let i=1; i<6; i++) generatenpc(i);
window.requestAnimationFrame(main);