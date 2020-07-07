import '../css/main.css';
import {
    countriesUI,
    generateInput,
    categoriesUI,
    newsListUI,
    generateBack,
    loginNotifyUI,
} from './view';
import { countriesAPI, newsAPI } from './services';

async function searchNewsByQuery({ key, target }) {
    if (key !== 'Enter') return;
    const articles = await newsAPI.getNewsByQuery(target.value);
    newsListUI.showNews(articles);
}

async function searchNewsByCategory(category) {
    try {
        const articles = await newsAPI.getNewsByCategory(category, countriesUI.selectValue);
        if (!articles.length) {
            loginNotifyUI.showNotify();
            // eslint-disable-next-line no-undef
            M.toast({ html: 'Your country doesn\'t supported!' });
            loginNotifyUI.generateNotify(() => console.log('registrate'));
            return;
        }
        newsListUI.showNews(articles);
    } catch (error) {
        console.log(error);
        // on-error
    }
}

async function generateApplication() {
    try {
        const countries = await countriesAPI.getAllCountries();
        countriesUI.generateCountries(countries);
        const input = generateInput();
        categoriesUI.generateCategories(searchNewsByCategory);
        generateBack(newsListUI.clearNews);
        // firebaseActions.signIn();
        input.addEventListener('keypress', searchNewsByQuery);
    } catch (error) {
        console.log(error);
        // on-error
    }
}

document.addEventListener('DOMContentLoaded', generateApplication);