import countriesAPI from './services';

document.addEventListener('DOMContentLoaded', () => {
    console.log(1);
    countriesAPI.getAllCountries();
});