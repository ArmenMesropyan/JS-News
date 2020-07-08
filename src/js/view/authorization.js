class AuthorizationUI {
    constructor() {
        [this.container] = document.getElementsByClassName('auth');
    }

    generateNavigation(user, cb) {
        this.container.innerHTML = `
            <button class="auth__btn">${user ? 'Account Settings' : 'Log In'}</button>   
        `;

        if (!user) document.querySelector('.auth__btn').addEventListener('click', cb);
    }
}

const authorizationUI = new AuthorizationUI();

export default authorizationUI;