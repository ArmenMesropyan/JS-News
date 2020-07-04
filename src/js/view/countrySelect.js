import { generateMaterialize } from '../plugins';

// eslint-disable-next-line consistent-return
export default function generateCountries(countries, selector) {
    try {
        const container = document.querySelector(selector);
        const html = countries.map(({ alpha2Code, flag, name }) => `
            <option value="${alpha2Code}" data-icon="${flag}" class="countries-select__option">
                ${name}
            </option>
        `);
        container.insertAdjacentHTML('afterbegin', html);

        generateMaterialize();
    } catch (error) {
        return Promise.reject(error);
    }
}