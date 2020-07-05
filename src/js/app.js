import '../css/main.css';
import { generateCountries, generateInput } from './view';
import countriesAPI from './services';

// eslint-disable-next-line consistent-return
async function generateApplication() {
    try {
        const countries = await countriesAPI.getAllCountries();
        generateCountries(countries, '.countries-select__select');
        const input = generateInput();
        console.log('input: ', input);
    } catch (error) {
        console.log(error);
        // on-error
    }
}

document.addEventListener('DOMContentLoaded', generateApplication);