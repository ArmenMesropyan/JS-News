import { firebaseActions } from '../services';

export default function showAccount() {
    const container = document.querySelector('.account-settings');
    container.innerHTML = `
        <section class="news__account news-account">
            <div class="news-account__wrapper card">
                <ul class="news-account__settings card-content">
                    <li class="news-account__setting">
                        <button class="news-account__logout btn waves-effect waves-light red">Log Out</button>
                    </li>
                </ul>
            </div>
        </section>
    `;
    const logOut = document.querySelector('.news-account__logout');

    logOut.addEventListener('click', () => {
        firebaseActions.logOut();
        location.reload();
    });

    container.addEventListener('click', ({ target }) => {
        if (target.classList.contains('news__account')) container.innerHTML = '';
    });
}