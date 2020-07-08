import { generateMaterialize } from '../plugins';
import { firebaseActions } from '../services';

// eslint-disable-next-line consistent-return
class CountriesUI {
    constructor(selector) {
        this.select = document.querySelector(selector);
    }

    get selectValue() {
        return this.select.value;
    }

    async generateCountries(countries, { uid } = {}) {
        try {
            const user = await fetch('https://ipapi.co/json/').then((resp) => resp.json());
            const html = countries.map(({ alpha2Code, flag, name }) => `
                <option value="${alpha2Code}" data-icon="${flag}" class="countries-select__option">
                    ${name}
                </option>
            `);
            this.select.insertAdjacentHTML('afterbegin', html);

            this.select.value = user.country;

            firebaseActions.getCountry((data) => {
                if (!uid) return;
                this.select.value = data[uid].value;
                generateMaterialize();
            });

            generateMaterialize();

            return user;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default new CountriesUI('.countries-select__select');