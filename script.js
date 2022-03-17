import Grid from "./Grid.js";
import Tile from "./Tile.js";

const gameBoard = document.getElementById("game-board");
const grid = new Grid(gameBoard);

grid.rendomEmptyCells().tile = new Tile(gameBoard);
grid.rendomEmptyCells().tile = new Tile(gameBoard);

handleSetup();

function handleSetup() {
  window.addEventListener("keydown", handleMove, { once: true });
}

function handleMove(e) {
  switch (e.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      handleSetup();
      return;
  }


  handleSetup();
}

function moveUp(){
    slideTail(grid.cellsByColumn);
}

function slideTail(grid){
    grid.forEach(group => {
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            let lastValidCell;
            for (let j = i - 1; j > 0; j--) {
                const moveToCell = group[j];
                if(!moveToCell.canAccept(cell.tile)) break;
                lastValidCell = moveToCell
            }

            if(lastValidCell != null){
                if(lastValidCell.tile != null){
                    lastValidCell.mergeTile = lastValidCell.tile
                }else{
                    lastValidCell.tile = cell.tile;
                }
            }
        }
    })
}
