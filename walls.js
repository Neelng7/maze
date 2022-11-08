export const wallPositions = []

export function generateWalls(mazeCanvas){
    mazeCanvas.innerHTML = ""

    for(let i= 1; i < 150; i++){
        const wall = document.createElement('div');
        wall.style.gridRowStart = Math.ceil(Math.random()*21);
        wall.style.gridColumnStart = Math.ceil(Math.random()*21);
        if(wall.style.gridRowStart+wall.style.gridColumnStart == 0) return;
        wall.classList.add("wall");
        mazeCanvas.appendChild(wall)
        wallPositions.push({x: wall.style.gridRowStart, y: wall.style.gridColumnStart})
    }
}