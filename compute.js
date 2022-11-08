import { update as updateRunner, draw as drawRunner, runnerSpeed, generatenpc } from './runner.js'
import { generateWalls } from './walls.js'

let lastRender = 0
const mazeCanvas = document.getElementById("maze-canvas");
const audio = document.querySelector(".audio");
const volumeBtn = document.getElementById("volume-btn");
generateWalls(mazeCanvas);

function main(currenTime){
    window.requestAnimationFrame(main);
    let secondsSinceLastRender = (currenTime - lastRender)/1000
    if(secondsSinceLastRender < 1/runnerSpeed) return;
    lastRender = currenTime

    updateRunner();
    drawRunner();
}
audio.play();

volumeBtn.addEventListener('click',  () => {
    var iconClass = volumeBtn.children[0].classList    
    iconClass.toggle("fa-volume-high");
    iconClass.toggle("fa-volume-xmark");
    if(iconClass.contains("fa-volume-xmark")) audio.pause();
    else audio.play();
})

for(let i=0; i<5; i++) generatenpc();
window.requestAnimationFrame(main);