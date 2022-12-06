//**** SUDOKU BOARD PAGE *****/

//function build solved sudoku board 9x9

function solveBoard(mat, row, col) {
    let cell = findEmptyCell(mat, row, col);
    row = cell[0];
    col = cell[1];

    //no more empty cells  
    if (row == -1) {
        return true;
    }

    for (var num = 1; num <= 9; num++) {
        if (numberIsGood(mat, row, col, num)) {
            mat[row][col] = num;

            if (solveBoard(mat, row, col)) { //recursion
                return true;
            }

            // the recursion flow failed , we need delete this number for back tracking   
            mat[row][col] = 0;
        }
    }

    // trigger back tracking
    return false;
}
//try to find empty cell (will find the first). if there is no any - returns [-1,-1] (board is solved)
function findEmptyCell(mat, row, col) {
    let allCellFull = false;
    let res = [-1, -1];

    while (allCellFull == false) {
        if (row == 9) {
            allCellFull = true;
        }
        else {
            if (mat[row][col] == 0) {
                res[0] = row;
                res[1] = col;
                allCellFull = true;
            }
            else {
                if (col < 8) {
                    col++;
                }
                else {
                    row++;
                    col = 0;
                }
            }
        }
    }
    return res;
}

//check if the number can be placed in the current cell (returns true/false)
function numberIsGood(mat, row, col, num) {
    return (checkNumberInRow(mat, row, col, num) && checkNumberInSquare(mat, row, col, num) && checkNumberInCol(mat, row, col, num));
}

//check if the number is already found in the row 
function checkNumberInRow(mat, i, j, num) {
    let counter = 0;
    for (col = 0; col < 9; col++) {
        if (num == mat[i][col]) {
            counter++;
        }
    }
    return counter == 0;
}

//check if the number is already found in the column 
function checkNumberInCol(mat, i, j, num) {
    let counter = 0;
    for (row = 0; row < 9; row++) {
        if (num == mat[row][j]) {
            counter++;
        }
    }
    return counter == 0;
}

//check if the number is already found in the square 
//   -------------------------
//   |   0   |   1   |   2   | 
//   -------------------------
//   |   3   |   4   |   5   |
//   -------------------------
//   |   6   |   7   |   8   | 
//   -------------------------

function checkNumberInSquare(mat, i, j, num) {
    let counter = 0;
    innerSquersStartingIndex = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6, 3], [6, 6]];
    let numberSquareInArr = Math.floor(Math.floor(i / 3) * 3 + j / 3);
    for (row = innerSquersStartingIndex[numberSquareInArr][0]; row <= innerSquersStartingIndex[numberSquareInArr][0] + 2; row++) {
        for (col = innerSquersStartingIndex[numberSquareInArr][1]; col <= innerSquersStartingIndex[numberSquareInArr][1] + 2; col++) {
            if (num == mat[row][col]) {
                counter++;
            }
        }
    }
    return counter == 0;
}

//drill random numbers for the first row in the mat (will help us to generate bigger range of different boards)
function drilNumbersFirstRow(mat) {
    for (j = 0; j < 9; j++) {
        num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        if (checkNumberInRow(mat, 0, j, num)) {
            mat[0][j] = num;
        }
    }
}

function loadMatToHtml(mat) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            idCell = (row + ',' + col);
            document.getElementById(idCell).innerHTML = mat[row][col];
        }
    }
}

var mat = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]];

//start the game and generate new random sudoku
function generateRandomSolvedSudoku() {
    drilNumbersFirstRow(mat);
    solveBoard(mat, 0, 0);
    console.log(mat);
    loadMatToHtml(mat);
    arrEmptyCells = clearCellsAcordingToLevel();
}

//Timer
var h1 = document.getElementsByTagName('h1')[0];
var startTimerBtn = document.getElementById('startTimerBtn');
var seconds = 0;
var minutes = 0;
var hours = 0;
var clockTik;

//add one second to game time
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    clockTik = setTimeout(add, 1000); // 1000 millis = 1 second
}

//create the AGAIN button on click the start game btn 
function createAgainBtn() {
    let btn = document.createElement('button');
    btn.innerHTML = 'Again';
    btn.setAttribute('class', 'finishAgainButtons');

    document.getElementById('againButtons').appendChild(btn);
    btn.addEventListener('click', function () {
        for (let i = 0; i < levelValue; i++) {
            emptyCellInput = (arrEmptyCells[i]);
            document.getElementById(emptyCellInput).innerHTML = '';
            document.getElementById(emptyCellInput).style.backgroundColor = 'white';

            createInput(emptyCellInput);
        }
    });
}

//create the FINISH button on click the start game btn 
function createFinishBtn() {
    let btn = document.createElement('button');
    btn.innerHTML = 'Finish';
    btn.setAttribute('class', 'finishAgainButtons');

    document.getElementById('finishButtons').appendChild(btn);
    btn.addEventListener('click', function () {
        stopTimer();
        chekIfSudokuSolutionIsRight(arrEmptyCells, solvingTime);
    });
}


var solvingTime = 0;
function stopTimer() {
    clearTimeout(clockTik);
    //take the time in the end of the game- onclick finish
    solvingTime = document.getElementById("timer").innerText;
}

//only one click on start button

function disabledStartButton() {
    //disable the button
    document.getElementById("startTimerBtn").disabled = true;

}

var levelValue = localStorage.getItem('level'); //get the value of the button the click in WELCOME page
var arrEmptyCells = [];
var arrDeleteCells = [];
var arrDeleteCellsValue = [];


function clearCellsAcordingToLevel() {
    let howManyCellsDrilledSoFar = 0;

    while (howManyCellsDrilledSoFar != levelValue) {
        let rowInput = Math.floor(Math.random() * 9);
        let colInput = Math.floor(Math.random() * 9);
        let emptyCellInput = (rowInput + ',' + colInput);

        if (!arrDeleteCells.includes(emptyCellInput)) {
            let emptyCellInputValue = document.getElementById(emptyCellInput).innerText;


            document.getElementById(emptyCellInput).innerHTML = '';
            arrDeleteCells.push(emptyCellInput);//מכניס למערך את התאים שנמחקו
            arrDeleteCellsValue.push(emptyCellInputValue);//מכניס למערך את הערך של התאים שנמחקו

            createInput(emptyCellInput);
            howManyCellsDrilledSoFar++
        }
    }
    return arrDeleteCells;
}

var inpt = '';

//push input element in the empty cell
function createInput(emptyCellInput) {
    let inpt = document.createElement('input');

    //css
    inpt.style.color = ' #23d5ab';
    inpt.style.fontSize = '20px';
    inpt.style.fontWeight = 'bold';
    inpt.style.fontFamily = 'Baloo 2', 'cursive';

    inpt.setAttribute('oninput',"this.value=this.value.replace(/[^1-9]/g,'');");   
    inpt.setAttribute('maxlength',"1");   

    document.getElementById(emptyCellInput).appendChild(inpt);
}

function chekIfSudokuSolutionIsRight(arrDeleteCells, solvingTime) {
    let correctAnsCounter = 0;

    for (let i = 0; i < arrDeleteCells.length; i++) {
        let index = arrDeleteCells[i].split(',');
        let row = index[0];
        let col = index[1];
        let userInput = document.getElementById(arrDeleteCells[i]).lastElementChild.value;
        if (userInput == mat[row][col]) {
            correctAnsCounter++;
        }
    }
    if (correctAnsCounter == arrDeleteCells.length) {
        sortTheTopFive(solvingTime);
        window.location.href = './theEndWinner.html';
    }
    else {
        localStorage.setItem('mistakes', arrDeleteCells.length - correctAnsCounter);
        window.location.href = './theEndLoser.html';
    }
}
// localStorage.removeItem('topFiveWinnersTable'); //clear winners table from storage

//sort and push the table winner to storage
function sortTheTopFive(currentGameTime) {
    var regexp = /\d{2}:\d{2}:\d{2}/g;

    let topFiveWinnersTableFromStorage = localStorage.getItem('topFiveWinnersTable');
    let arrTopFiveWinnersTable = [];

    if (topFiveWinnersTableFromStorage != null) { // not the first time 

        let arr = [...topFiveWinnersTableFromStorage.matchAll(regexp)];

        for (let indx = 0; indx < arr.length; indx++) {
            arrTopFiveWinnersTable[indx] = arr[indx][0];
        }
    }

    if (arrTopFiveWinnersTable.length < 5) {
        arrTopFiveWinnersTable.push(currentGameTime);
        arrTopFiveWinnersTable.sort();
    }
    else if (arrTopFiveWinnersTable[4] > currentGameTime) {
        arrTopFiveWinnersTable.push(currentGameTime);
        arrTopFiveWinnersTable.sort();
        arrTopFiveWinnersTable.pop();
    }
    localStorage.setItem('topFiveWinnersTable', JSON.stringify(arrTopFiveWinnersTable));
    localStorage.setItem('currentGameTime', currentGameTime);
}

//hints//
//hiding and showing hints

//hiding and showing hints button
document.getElementById('hints').style.display = 'none';
function createHintsButton() {
    document.getElementById('hints').style.display = 'flex';
}

//hiding and showing hints
document.getElementById('keyboard').style.display = 'none';
function createHintsKeyboard() {
    document.getElementById('keyboard').style.display = 'flex';
    document.getElementById('only1Hint').style.display = 'flex';
}

//hiding and showing only1Hint
document.getElementById('only1Hint').style.display = 'none';

//clicking hints
function getHintButton(hintNumber) {
    for (let c = 0; c < arrDeleteCellsValue.length; c++) {
        if (arrDeleteCellsValue[c] == hintNumber) {

            document.getElementById(arrDeleteCells[c]).lastElementChild.value = hintNumber;

            //hintNumbers css
            document.getElementById(arrDeleteCells[c]).style.backgroundColor = '#23a6d5';
            //Hiding hints after 1 click
            document.getElementById('keyboard').style.display = 'none';
            document.getElementById('hints').style.display = 'none';
            document.getElementById('only1Hint').style.display = 'none';
        }
    }
}