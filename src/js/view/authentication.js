// import { firebaseActions } from '../services';

function showAuth() {
    document.querySelector('.news-auth').classList.add('show-auth');
}

function showLogin() {
    showAuth();
    const loginForm = document.querySelector('#login form');
    console.log('loginForm: ', loginForm);

    // loginForm.addEventListener('submit', () => {

    // });
}

function showRegistrate() {
    showAuth();
    const registrateForm = document.querySelector('#registrate form');
    console.log('registrateForm: ', registrateForm);
}

export default function generateAuthentication() {
    const loginLinks = document.getElementsByClassName('login');
    const registrateLinks = document.getElementsByClassName('registrate');

    Object.values(loginLinks).forEach((link) => link.addEventListener('click', showLogin));
    Object.values(registrateLinks).forEach((link) => link.addEventListener('click', showRegistrate));
}