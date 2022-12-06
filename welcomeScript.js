//**** WELCOME PAGE *****/
//hello+username
function getUsernameFromLocalStoreg() {
    document.getElementById('welcome').innerHTML = `Welcome ${localStorage.getItem('user_name')}`;
}

function selectLevelButton(cellsToHide) {
    localStorage.setItem('level', cellsToHide);
    window.location.href = './sudokuGameIndex.html';
}

