import { update as updateRunner, draw as drawRunner, runnerSpeed } from './runner.js'
import { generateWalls } from './walls.js'

let lastRender = 0
const mazeCanvas = document.getElementById("maze-canvas");
generateWalls(mazeCanvas);

function main(currenTime){
    window.requestAnimationFrame(main);
    let secondsSinceLastRender = (currenTime - lastRender)/1000
    if(secondsSinceLastRender < 1/runnerSpeed) return;
    lastRender = currenTime

    updateRunner();
    drawRunner(mazeCanvas);
}

window.requestAnimationFrame(main);