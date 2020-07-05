import '../css/main.css';
import { generateCountries, generateInput, categoriesUI } from './view';
import { countriesAPI, newsAPI } from './services';

async function searchNewsByQuery({ key, target }) {
    if (key !== 'Enter') return;
    const articles = await newsAPI.getNewsByQuery(target.value);
    console.log('articles: ', articles);
}

async function searchNewsByCategory(category) {
    console.log(category);
}

// eslint-disable-next-line consistent-return
async function generateApplication() {
    try {
        const countries = await countriesAPI.getAllCountries();
        generateCountries(countries, '.countries-select__select');
        const input = generateInput();
        categoriesUI.generateCategories(searchNewsByCategory);

        input.addEventListener('keypress', searchNewsByQuery);
    } catch (error) {
        console.log(error);
        // on-error
    }
}

document.addEventListener('DOMContentLoaded', generateApplication);