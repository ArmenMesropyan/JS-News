import '../css/main.css';
import { generateCountries, generateInput } from './view';
import { countriesAPI, newsAPI } from './services';

async function searchNews({ key, target }) {
    if (key !== 'Enter') return;
    const articles = await newsAPI.getNewsByQuery(target.value);
    console.log('articles: ', articles);
}

// eslint-disable-next-line consistent-return
async function generateApplication() {
    try {
        const countries = await countriesAPI.getAllCountries();
        generateCountries(countries, '.countries-select__select');
        const input = generateInput();

        input.addEventListener('keypress', searchNews);
    } catch (error) {
        console.log(error);
        // on-error
    }
}

document.addEventListener('DOMContentLoaded', generateApplication);