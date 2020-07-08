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
        console.log('loginForm: ', form);

        // loginForm.addEventListener('submit', () => {// });
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
        });
    }

    showAuth() {
        document.querySelector('.news-auth').classList.add('show-auth');
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