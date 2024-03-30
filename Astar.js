let N = 10

// This will be our internal board for calculating optimal route
let internalBoard = new Array(N);

for(let i = 0; i < N; i++) {
    //Initialize first row of internal board
    internalBoard[i] = [];
}

window.onload = function() {
    setBoard();
}

function setBoard() {
    // -- Set up clickable options --
    // Create START click option
    let clickOption = document.createElement("div");
    clickOption.id = "start";
    clickOption.innerText = "START";
    clickOption.classList.add("start");
    document.getElementById("clickOptions").append(clickOption);
    // Create END click option
    clickOption = document.createElement("div");
    clickOption.id = "end";
    clickOption.innerText = "END";
    clickOption.classList.add("end");
    document.getElementById("clickOptions").append(clickOption);
    // Create WALL click option
    clickOption = document.createElement("div");
    clickOption.id = "wall";
    clickOption.innerText = "WALL";
    clickOption.addEventListener();
    clickOption.classList.add("wall");
    document.getElementById("clickOptions").append(clickOption);

    // -- Set up visual board --
    for(let row = 0; row < N; row++) {
        for(let col = 0; col < N; col++) {
            //Initialize other rows of internal board
            internalBoard[row][col] = row.toString() + "-" + col.toString();

            // Create tile within board
            let tile = document.createElement("div");
            tile.id = row.toString() + "-" + col.toString();
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
    console.log(board);
}

function clickOption() {

}

function selectTile() {

}