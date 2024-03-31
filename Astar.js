var optionSelected = null;
var tileSelected = null;
var startSet = false;
var endSet = false;
// The board will be N x N size
let N = 10

// This will be our internal board for calculating optimal route
let internalBoard = new Array(N);

for(let i = 0; i < N; i++) {
    //Initialize first row of internal board
    internalBoard[i] = [];
}

window.onload = function() {
    SetClickOptions();
    setBoard();
}

function setBoard() {
    // -- Set up visual board --
    for(let row = 0; row < N; row++) {
        for(let col = 0; col < N; col++) {
            //Initialize remaining rows of internal board
            internalBoard[row][col] = row.toString() + "-" + col.toString();

            // Create tile within board
            let tile = document.createElement("div");
            tile.id = row.toString() + "-" + col.toString();
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
    console.log(board);
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
    }
    optionSelected = this;
    optionSelected.classList.add("optionSelected");
}

function selectTile() {
    if(tileSelected != null) {
        tileSelected.classList.remove("tileSelected");
    }
    tileSelected = this;
    tileSelected.classList.add("tileSelected");
}