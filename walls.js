export const wallPositions = []
// export const wallPositionsX = [], wallPositionsY = [];

export function generateWalls(mazeCanvas){
    mazeCanvas.innerHTML = ""

    for(let i= 0; i < 150; i++){
        var randX = Math.ceil(Math.random()*21), randY = Math.ceil(Math.random()*21);
        const wall = document.createElement('div');
        if(randX == 1 && randY == 1){
            console.log("stopped");
            randX = Math.ceil(1 + Math.random()*20);
            randY = Math.ceil(1 + Math.random()*20);
        }
        wall.style.gridRowStart = randX;
        wall.style.gridColumnStart = randY;
        wall.classList.add("wall");
        mazeCanvas.appendChild(wall)
        // wallPositionsX.push(wall.style.gridRowStart);
        // wallPositionsY.push(wall.style.gridColumnStart);
        wallPositions.push({x: wall.style.gridRowStart, y: wall.style.gridColumnStart})
    }
}