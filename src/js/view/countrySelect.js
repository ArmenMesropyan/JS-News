import { generateMaterialize } from '../plugins';

// eslint-disable-next-line consistent-return
export default async function generateCountries(countries, selector) {
    try {
        const container = document.querySelector(selector);
        const user = await fetch('https://ipapi.co/json/').then((resp) => resp.json());
        const html = countries.map(({ alpha2Code, flag, name }) => `
            <option value="${alpha2Code}" data-icon="${flag}" class="countries-select__option">
                ${name}
            </option>
        `);
        container.insertAdjacentHTML('afterbegin', html);

        container.value = user.country;

        generateMaterialize();

        return user;
    } catch (error) {
        return Promise.reject(error);
    }
}