import { firebaseActions, countriesAPI, supportedCountries } from '../services';
import { generateMaterialize } from '../plugins';
import { newsListUI, authenticationUI } from '.';

export default function showAccount(user) {
    authenticationUI.clearAuth();
    const container = document.querySelector('.account-settings');
    container.innerHTML = `
        <section class="news__account news-account">
            <div class="news-account__wrapper card">
                <ul class="news-account__settings card-content">
                    <li class="news-accout__setting icons">
                        <select class="news-account__countries">
                            <option value="" disabled selected>Choose your country</option>
                        </select>
                    </li>
                    <li class="news-accout__setting news-accout__setting--favorites">
                        <button class="news-account__favorites btn waves-effect waves-light green">Show Favorites</button>
                    </li>
                    <li class="news-account__setting">
                        <button class="news-account__save btn waves-effect waves-light">Save</button>
                        <button class="news-account__logout btn waves-effect waves-light red">Log Out</button>
                    </li>
                </ul>
            </div>
        </section>
    `;
    const logOut = document.querySelector('.news-account__logout');
    const saveBtn = document.querySelector('.news-account__save');
    const favoritesBtn = document.querySelector('.news-account__favorites');
    const select = document.querySelector('.news-account__countries');
    const supported = supportedCountries.toString();
    const countries = countriesAPI.last.filter(({ alpha2Code }) => supported.match(alpha2Code));

    const html = countries.map(({ alpha2Code, flag, name }) => `
                <option value="${alpha2Code}" data-icon="${flag}" class="countries-select__option">
                    ${name}
                </option>
            `);

    select.insertAdjacentHTML('afterbegin', html);

    generateMaterialize();

    saveBtn.addEventListener('click', () => {
        const country = select.value;
        if (!country) return;
        firebaseActions.updateCountry(user.uid, country);
    });

    logOut.addEventListener('click', () => {
        firebaseActions.logOut();
        container.innerHTML = '';
    });

    favoritesBtn.addEventListener('click', () => {
        firebaseActions.getNews((data) => {
            if (!data) return;
            container.innerHTML = '';
            newsListUI.generateNews(data[user.uid].value, data[user.uid]);
        });
    });

    container.addEventListener('click', ({ target }) => {
        if (target.classList.contains('news__account')) container.innerHTML = '';
    });
}