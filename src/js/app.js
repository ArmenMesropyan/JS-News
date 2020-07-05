import '../css/main.css';
import { countriesUI, generateInput, categoriesUI } from './view';
import { countriesAPI, newsAPI } from './services';

async function searchNewsByQuery({ key, target }) {
    if (key !== 'Enter') return;
    const articles = await newsAPI.getNewsByQuery(target.value);
    console.log('articles: ', articles);
}

async function searchNewsByCategory(category) {
    try {
        const articles = await newsAPI.getNewsByCategory(category, countriesUI.selectValue);
        console.log('articles: ', articles);
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

        input.addEventListener('keypress', searchNewsByQuery);
    } catch (error) {
        console.log(error);
        // on-error
    }
}

document.addEventListener('DOMContentLoaded', generateApplication);