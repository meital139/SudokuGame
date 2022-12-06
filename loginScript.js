//**** LOGIN PAGE *****/

//**user name & password validation**//
function loginButton() {

    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;

    if (username.length > 0 && password.length  > 0) {
        localStorage.setItem('user_name', username);
        window.location.href = './welcomeIndex.html'; //relative to domain
    }

    else{
        alert('please enter any username and any password!!')
    }

    //originally that was the validation for user://
    // if (username == 'abcd' && password == '1234') {
    //     localStorage.setItem('user_name', username);
    //     window.location.href = '../welcome/welcomeIndex.html'; //relative to domain
    // }
    // else if (username != 'abcd') {
    //     document.getElementById('validUserName').innerHTML = 'Please enter valid Username';
    // }
    // else if (password != '1234') {
    //     document.getElementById('validUserName').innerHTML = '';
    //     document.getElementById('validPassword').innerHTML = 'Please enter valid Password';
    // }
}
