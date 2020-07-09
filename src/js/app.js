import '../css/main.css';
import {
    countriesUI,
    generateInput,
    categoriesUI,
    newsListUI,
    generateBack,
    loginNotifyUI,
    authenticationUI,
    authorizationUI,
} from './view';
import { countriesAPI, newsAPI, firebaseActions } from './services';

async function searchNewsByQuery({ key, target }) {
    if (key !== 'Enter') return;
    const articles = await newsAPI.getNewsByQuery(target.value);
    newsListUI.showNews(articles);
}

async function searchNewsByCategory(category) {
    try {
        const articles = await newsAPI.getNewsByCategory(category, countriesUI.selectValue);
        if (!articles.length) {
            // eslint-disable-next-line no-undef
            M.toast({ html: 'Your country doesn\'t supported!' });
            const user = JSON.parse(localStorage.getItem('isRegister'));

            if (!user) {
                loginNotifyUI.showNotify();
                loginNotifyUI.generateNotify();
                authenticationUI.generateAuthentication();
            }
        } else newsListUI.showNews(articles);
    } catch (error) {
        console.log(error);
        // on-error
    }
}

async function generateApplication(user) {
    try {
        localStorage.setItem('user', JSON.stringify(user));
        authorizationUI.generateNavigation(authenticationUI.showAuth);
        const countries = await countriesAPI.getAllCountries();
        countriesUI.generateCountries(countries);
        categoriesUI.generateCategories(searchNewsByCategory);
        generateBack(newsListUI.clearNews);
        const input = generateInput();
        input.addEventListener('keypress', searchNewsByQuery);
    } catch (error) {
        console.log(error);
        // on-error
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateApplication();
    firebaseActions.onUserChange(generateApplication);
});