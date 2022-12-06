
var mistakesNumber = localStorage.getItem('mistakes'); //get the value of the mistakes

document.getElementById("mistake").innerHTML = `YOU LOST, ${mistakesNumber} MISTAKES`;

function tryAgainButton() {
    window.location.href = './welcomeIndex.html';
}

