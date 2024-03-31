var optionSelected = null;
var tileSelected = null;
var startTile = null;
var endTile = null;
// The board will be N x N size
let N = 10
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
        let tArray = [];
        switch(optionSelected.id) {
            case "start":
                if(startTile != null) 
                    removeTileProperties(startTile);
                removeTileProperties(this);
                startTile = tileSelected;
                // add visual properties
                tileSelected.classList.add("start");
                // add internal board properties
                tArray = tileSelected.id.split("-");
                internalBoard[parseInt(tArray[0])][parseInt(tArray[1])] = "S";
                break;
            case "end":
                if(endTile != null) 
                    removeTileProperties(endTile);
                removeTileProperties(tileSelected);
                endTile = tileSelected;
                // add visual properties
                tileSelected.classList.add("end");
                // add internal board properties
                tArray = tileSelected.id.split("-");
                internalBoard[parseInt(tArray[0])][parseInt(tArray[1])] = "E";
                break;
            case "wall":
                removeTileProperties(tileSelected);
                // add visual properties
                tileSelected.classList.add("wall");
                // add internal board properties
                tArray = tileSelected.id.split("-");
                internalBoard[parseInt(tArray[0])][parseInt(tArray[1])] = "W";
                break;
            case "clear":
                removeTileProperties(tileSelected);
                break;
            default:
        }
        tileSelected = null;
        console.log(internalBoard);
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
    let tArray = tile.id.split("-");
    internalBoard[parseInt(tArray[[0]])][parseInt(tArray[1])] = "-";
}

function AStarSearch() {
    
}