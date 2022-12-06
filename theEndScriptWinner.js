

var winnersTable = localStorage.getItem('topFiveWinnersTable');
var currentGameTime = localStorage.getItem('currentGameTime');

document.getElementById("winner").innerHTML = ('Great job !!! You are a Winner!<br> Your time is ' + currentGameTime);

var regexp = /\d{2}:\d{2}:\d{2}/g;

let arr = [...winnersTable.matchAll(regexp)];

let counter = 0;
for (let indx = 0; indx < arr.length; indx++) {
    if (currentGameTime == arr[indx][0] && counter == 0) {
        document.getElementById("time" + indx).innerHTML = (arr[indx][0] + '&#8592');
        counter++;
    }
    else {
        document.getElementById("time" + indx).innerHTML = arr[indx][0];
    }
}

//play again button - should be linked to the welcome page
function playAgainButton(){
    window.location.href = './welcomeIndex.html';
}


