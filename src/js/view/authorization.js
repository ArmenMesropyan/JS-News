import { showAccount } from '.';

class AuthorizationUI {
    constructor() {
        [this.container] = document.getElementsByClassName('auth');
    }

    generateNavigation(user, cb) {
        this.container.innerHTML = `
            <button class="auth__btn">${user ? 'Account Settings' : 'Log In'}</button>   
        `;

        const btn = document.querySelector('.auth__btn');

        if (!user) btn.addEventListener('click', cb);
        else btn.addEventListener('click', showAccount);
    }
}

const authorizationUI = new AuthorizationUI();

export default authorizationUI;