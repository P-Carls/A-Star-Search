var optionSelected = null;
var tileSelected = null;
var startTile = null;
var endTile = null;
// The board will be N x N size
let N = 20
// This will be our internal board for calculating optimal route
let internalBoard = [];

// Initialize internal board
for(let i = 0; i < N; i++) {
    internalBoard[i] = [];
    for(let k = 0; k < N; k++) {
        internalBoard[i][k] = "-";
    }
}

window.onload = function() {
    SetClickOptions();
    setBoard();
}

function setBoard() {
    // -- Set up visual and internal board --
    for(let row = 0; row < N; row++) {
        for(let col = 0; col < N; col++) {
            //Initialize remaining rows of internal board
            internalBoard[row][col] = "-";

            // Create tile within board
            let tile = document.createElement("div");
            tile.id = row.toString() + "-" + col.toString();
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
    console.log(internalBoard);
}

function SetClickOptions() {
    // -- Set up clickable options --
    // Create START click option
    let clickOption = document.createElement("div");
    clickOption.id = "start";
    clickOption.innerText = "START";
    clickOption.addEventListener("click", selectOption);
    clickOption.classList.add("start");
    document.getElementById("clickOptions").append(clickOption);
    // Create END click option
    clickOption = document.createElement("div");
    clickOption.id = "end";
    clickOption.innerText = "END";
    clickOption.addEventListener("click", selectOption);
    clickOption.classList.add("end");
    document.getElementById("clickOptions").append(clickOption);
    // Create WALL click option
    clickOption = document.createElement("div");
    clickOption.id = "wall";
    clickOption.innerText = "WALL";
    clickOption.addEventListener("click", selectOption);
    clickOption.classList.add("wall");
    document.getElementById("clickOptions").append(clickOption);
    // Create RUN click option
    clickOption = document.createElement("div");
    clickOption.id = "run";
    clickOption.innerText = "RUN";
    clickOption.addEventListener("click", selectOption);
    clickOption.classList.add("runClear");
    document.getElementById("clickOptions").append(clickOption);
    // Create CLEAR click option
    clickOption = document.createElement("div");
    clickOption.id = "clear";
    clickOption.innerText = "CLEAR";
    clickOption.addEventListener("click", selectOption);
    clickOption.classList.add("runClear");
    document.getElementById("clickOptions").append(clickOption);
}

function selectOption() {
    if(optionSelected != null) {
        optionSelected.classList.remove("optionSelected");
        if(optionSelected == this) {
            optionSelected = null;
            return;
        }
    }
    optionSelected = this;
    optionSelected.classList.add("optionSelected");

    // If run is selected while a start and end tile are set, then we run the algorithm on the board
    if(optionSelected.id == "run") {
        optionSelected.classList.remove("optionSelected");
        if(startTile != null && endTile != null) {
            traceTile = AStarSearch();

            // If the algorithm has found a successful path, we then trace our path and render it on screen
            if(traceTile != null) {
                stack = [];

                while(traceTile.id != startTile.id) {
                    stack.push(traceTile.id);

                    if(traceTile.parent == null) {
                        break;
                    }

                    traceTile = traceTile.parent;
                }
                console.log(stack);
                while(stack.length > 0) {
                    // Animate the path on the visual board
                    element = stack.pop();
                    if(element != startTile.id && element != endTile.id) {
                        //setTimeout(function() {
                            document.getElementById(element).classList.add("path");
                        //}, 1000)
                        console.log(stack);
                    }
                }
            }else {
                console.log("No successful path found");
            }
        }
    }
}

function selectTile() {
    if(tileSelected != null) {
        tileSelected.classList.remove("tileSelected");
        if(optionSelected == null && tileSelected == this) {
            tileSelected = null;
            return;
        }
    }
    tileSelected = this;
    if (optionSelected != null) {
        let tArray = {};
        switch(optionSelected.id) {
            case "start":
                if(startTile != null) 
                    removeTileProperties(startTile);
                removeTileProperties(this);
                startTile = tileSelected;
                // add visual board properties
                tileSelected.classList.add("start");
                // add internal board properties
                tArray = getPosition(tileSelected);
                internalBoard[tArray.row][tArray.col] = "S";
                break;
            case "end":
                if(endTile != null) 
                    removeTileProperties(endTile);
                removeTileProperties(tileSelected);
                endTile = tileSelected;
                // add visual board properties
                tileSelected.classList.add("end");
                // add internal board properties
                tArray = getPosition(tileSelected);
                internalBoard[tArray.row][tArray.col] = "E";
                break;
            case "wall":
                removeTileProperties(tileSelected);
                // add visual board properties
                tileSelected.classList.add("wall");
                // add internal board properties
                tArray = getPosition(tileSelected);
                internalBoard[tArray.row][tArray.col] = "W";
                break;
            case "clear":
                removeTileProperties(tileSelected);
                break;
            default:
        }
        tileSelected = null;
    }else {
        tileSelected.classList.add("tileSelected");
    }
}

function removeTileProperties(tile) {
    // Remove all properties from visual board
    tile.classList.remove("tileSelected");
    tile.classList.remove("start");
    tile.classList.remove("end");
    tile.classList.remove("wall");
    // Remove all properties from internal board
    let tArray = getPosition(tile);
    internalBoard[tArray.row][tArray.col] = "-";
}

// Utility function that returns the positon of a cell as an Array[Row, Col]
function getPosition(object) {
    arr = object.id.split("-");
    obj = {
        row : parseInt(arr[0]), 
        col : parseInt(arr[1])
    }
    return obj;
}

class node {
// Class to contain all relevant cell information
    constructor() {
        this.parent = null;
        //id is same as the position of the cell in string format
        this.id = null;
        this.f = 10000000;
        this.g = 0;
        this.h = 0;
    }
}

// Utility function to check if cell is valid
// Checks boundaries of the cell id: 0 > id > N
function isValid(id) {
    return (id.row >= 0) && (id.row < N) && (id.col >= 0) && (id.col < N);
}

// Utility function to get the key of a map by its value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key =>
        object[key] === value);
}

// Utility function to calculate the H value of a cell, defined by the diagonal distance.
// It is the maximum of absolute values of differences in the endtiles x and y coordinates
// and the current cells x and y coordinates.
function calcH(currentCell) {
    currentCellPos = getPosition(currentCell);
    endTilePos = getPosition(endTile);

    /*dx = Math.abs(currentCellPos.col - endTilePos.col);
    dy = Math.abs(currentCellPos.row = endTilePos.row);

    h = (dx + dy) + (Math.sqrt(2) - 2) * Math.min(dx, dy);

    return h;*/
    return Math.sqrt((endTilePos.row - currentCellPos.row) * (endTilePos.row - currentCellPos.row) + (endTilePos.col - currentCellPos.col) * (endTilePos.col - currentCellPos.col));
}

function AStarSearch() {
    // Open list is: <f, Node>
    let openList = new Map();

    // Utility set for verification <Node.id, f>
    let openListById = new Map();

    // Closed list is: <id, node>
    let closedList = new Map();

    startingNode = new node();
    startingNode.id = startTile.id;
    openList.set(10000000, startingNode);
    openListById.set(startingNode.id, 0);

    while(openList.size > 0) {
        // Pop next lowest f value node off open list
        q = openList.entries().next().value[1];
        openList.delete(q.f);
        openListById.delete(q.id);
        // Add node to closed list
        closedList.set(q.id, q);
    
        // Store g, h, and f values of successors
        let gNew, hNew, fNew;

        for(let i = 0; i < 8; i++) {
            // This will hold the position of our new cell to test if it's valid
            newPos = getPosition(q);
            successorCell = new node();

            switch (i) {
                // North cell
                case 0:
                    newPos.row -= 1;
                    break;
                // North East cell
                case 1:
                    newPos.row -= 1;
                    newPos.col += 1;
                    break;
                // East cell
                case 2:
                    newPos.col += 1;
                    break;
                // South East cell
                case 3:
                    newPos.row += 1;
                    newPos.col += 1;
                    break;
                // South cell
                case 4:
                    newPos.row += 1;
                    break;
                // South West cell
                case 5:
                    newPos.row += 1;
                    newPos.col -= 1;
                    break;
                // West cell
                case 6:
                    newPos.col -= 1;
                    break;
                // North West cell
                case 7:
                    newPos.row -= 1;
                    newPos.col -= 1;
                    break;
                default:
            }
            // check if successor cell is valid
            if(isValid(newPos)) {
                successorCell.id = newPos.row.toString() + "-" + newPos.col.toString();
                // Check if successor cell is our end tile
                if(internalBoard[newPos.row][newPos.col] == "E") {
                    successorCell.parent = q;
                    return successorCell;
                }
                
                // check if successor cell is a wall or already in closed list
                else if(internalBoard[newPos.row][newPos.col] != "W" && !closedList.has(successorCell.id)) {
                    gNew = q.g + 1;
                    hNew = calcH(successorCell);
                    fNew = gNew + hNew;

                    // Check if successor cell is on the open list, if not then add it
                    // with current cell as the parent. If it is on the open list check
                    // if this path to that cell is better.
                    if(!openListById.has(successorCell.id)) {
                        successorCell.f = fNew;
                        successorCell.g = gNew;
                        successorCell.h = hNew;
                        successorCell.parent = q;
                        document.getElementById(successorCell.id).classList.add("thinking");
                        openList.set(fNew, successorCell);
                        openListById.set(successorCell.id, fNew);
                    }else {
                        f = openListById.get(successorCell.id);
                        if(f > fNew) {

                            //openList.delete(f);
                            //openListById.delete(obj.id);

                            successorCell.f = fnew;
                            successorCell.g = gNew;
                            successorCell.h = hNew;
                            successorCell.parent = q;
                            document.getElementById(successorCell.id).classList.add("thinking");
                            openList.set(fnew, successorCell);
                            openListById.set(successorCell.id, fnew);
                        }
                    }
                }
            }
        }
        console.log(openList);
    }
    return null;
}