import '../css/main.css';
// import { generateMaterialize } from './plugins';
import countriesAPI from './services';

document.addEventListener('DOMContentLoaded', () => {
    console.log(countriesAPI.getAllCountries());
    // generateMaterialize();
});