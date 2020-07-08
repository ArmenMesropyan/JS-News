import { firebaseActions } from '../services';

const getValueById = (id) => document.getElementById(id).value;
class AuthenticationUI {
    constructor() {
        this.regExps = {
            userName: /^[a-zA-Z0-9]+$/,
            login: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        };
        this.showAuth = this.showAuth.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    get loginForm() {
        return document.querySelector('#login form');
    }

    // eslint-disable-next-line class-methods-use-this
    get registrateForm() {
        return document.querySelector('#registrate form');
    }


    validateInputs(inputs) {
        return Object.entries(inputs).every(([name, value]) => {
            if (this.regExps[name]) return this.regExps[name].test(value);
            return true;
        });
    }

    showLogin() {
        const form = this.loginForm;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = getValueById('login-email');
            const password = getValueById('login-password');

            const isValid = this.validateInputs({ email, password });

            if (!isValid) {
                // eslint-disable-next-line no-undef
                M.toast({ html: 'Invalid inputs, please retry!' });
                return;
            }
            const user = firebaseActions.signIn(email, password);
            user.then(() => {
                localStorage.setItem('isRegister', true);
                location.reload();
                // eslint-disable-next-line no-undef
            }).catch((err) => M.toast({ html: err }));
        });
    }

    showRegistrate() {
        const form = this.registrateForm;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const userName = getValueById('username');
            const email = getValueById('registrate-email');
            const password = getValueById('registrate-password');

            const isValid = this.validateInputs({ userName, email, password });

            if (!isValid) {
                // eslint-disable-next-line no-undef
                M.toast({ html: 'Invalid data, please retry!' });
                return;
            }
            firebaseActions.createUser(email, password);
            location.reload();
        });
    }

    showAuth() {
        const container = document.querySelector('.news-auth');
        container.classList.add('show-auth');
        container.addEventListener('click', ({ target }) => {
            if (target === container) container.classList.remove('show-auth');
        });
        this.showLogin();
        this.showRegistrate();
    }

    // eslint-disable-next-line class-methods-use-this
    generateAuthentication() {
        const authLinks = document.getElementsByClassName('auth');

        Object.values(authLinks).forEach((link) => link.addEventListener('click', this.showAuth));
    }
}

const authenticationUI = new AuthenticationUI();

export default authenticationUI;