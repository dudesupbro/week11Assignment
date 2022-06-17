
let gridX = [];
let gridO = [];
let players = ["X", "O"];
let turn = 0;
let turnBox = $('#turn');
let boxes = $('.box');
let alert = $('#alert');
let victoryConditions = ["012", "0248", "0236", "0356", "1467", "345", "678", "036", "147", "258", "048", "246"]


// Main Game Loop
boxes.on('click', function() {
    let pos = $(this).data("position");
    takeTurn(pos);
});


function showTurn() {
    turnBox.html(`It's ${players[turn % 2]}'s turn`)
};

function changeBox(pos, value) {
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        if ($(box).data('position') == pos) {
            $(box).html(value);
        }
    }
}

function takeTurn(pos) {
    if(turn % 2 == 0) {
        if(checkGrid(pos)) {
            turn++;
            gridX.push(pos);
            changeBox(pos, 'X');
        }
        showTurn();
        victoryChecker();
    } else {
        if(checkGrid(pos)) {
            turn++;
            gridO.push(pos);
            changeBox(pos, 'O');
        }
        showTurn();
        victoryChecker();
    }
}

function checkGrid(pos) {
    if (gridX.includes(pos)) {
        alert.html('X has already taken this spot.');
        return false;
    } else if (gridO.includes(pos)) {
        alert.html('O has already taken this spot.');
        return false;
    } else {
        return true;
    }
}

function victoryChecker() {
    let sortedXGrid=gridX.sort();
    let sortedOGrid=gridO.sort();
    console.log(sortedXGrid);
    console.log(sortedOGrid);
    sortedOGrid = sortedOGrid.toString().replaceAll(',','');
    sortedXGrid = sortedXGrid.toString().replaceAll(',','');
    for (let i = 0; i < victoryConditions.length; i++) {
        if (sortedXGrid.includes(victoryConditions[i])) {
            restartGame(players[0]);
        } else if (sortedOGrid.includes(victoryConditions[i])) {
            restartGame(players[1]);
        } else if (sortedXGrid.length == 5) {
            catsGame();
        }
    }
}

function restartGame(player) {
    console.log('Victory');
    let victory = new bootstrap.Modal('#victory', {
        keyboard: false
    });
    $('#victoryCondition').html(`${player} wins!`);
    victory.show();
}

function catsGame () {
    let draw = new bootstrap.Modal('#catsGame', {
        keyboard: false
    });
    $('#draw').html("No one wins");
    draw.show();
}