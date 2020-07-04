import '../css/main.css';
import { generateCountries } from './view';
import countriesAPI from './services';

// eslint-disable-next-line consistent-return
async function generateApplication() {
    try {
        const countries = await countriesAPI.getAllCountries();
        generateCountries(countries, '.countries-select__select');
    } catch (error) {
        console.log(error);
        // on-error
    }
}

document.addEventListener('DOMContentLoaded', generateApplication);