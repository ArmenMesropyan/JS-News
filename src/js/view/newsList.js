/* eslint-disable class-methods-use-this */
import { firebaseActions } from '../services';

class NewsListUI {
    constructor() {
        this.container = document.querySelector('.news-list__list');
        [this.main] = document.getElementsByTagName('main');
        this.clearNews = this.clearNews.bind(this);
    }

    onFavoriteBtnClick({ target }, likedNews) {
        const { uid } = JSON.parse(localStorage.getItem('user'));

        const btn = target.closest('.news-list__favorite-btn');
        btn.classList.toggle('active');

        const item = target.closest('.news-list__item');
        const urlToImage = item.querySelector('.news-list__img').src;
        const title = item.querySelector('.news-list__title').innerText;
        const description = item.querySelector('.news-list__description').innerText;
        const author = item.querySelector('.news-list__author').innerText;
        const url = item.querySelector('.news-list__link').href;

        const news = {
            urlToImage,
            title,
            description,
            author,
            url,
        };

        const newsList = likedNews ? [...likedNews.value, news] : [news];

        const isAdd = btn.classList.contains('active');
        if (isAdd) firebaseActions.addNews(uid, newsList);
        else firebaseActions.removeNews(uid, news, likedNews.value);
    }

    checkNews(likedNews, news) {
        if (likedNews) return likedNews.value.find((article) => article.title === news.title && article.description === news.description);

        return false;
    }

    generateNews(articles, likedNews = null) {
            const user = JSON.parse(localStorage.getItem('user'));

            this.main.classList.add('show-news');
            this.container.innerHTML = '';
            const html = articles.map((news) => {
                        const {
                            title,
                            description,
                            urlToImage,
                            url,
                            author,
                        } = news;
                        return `
                    <li class="news-list__item card">
                        <div class="news-list__info card-image">
                            <img src="${urlToImage}" class="news-list__img">
                        </div>
                        <div class="news-list__info card-content">
                            <h3 class="news-list__title card-title">${title}</h3>
                            <p class="news-list__description">${description}</p>
                        </div>
                        <div class="news-list__actions card-action">
                            ${user ? `
                                <button class="news-list__favorite-btn ${this.checkNews(likedNews, news) ? 'active' : ''}">
                                    <i class="fas fa-heart"></i>
                                </button>
                            ` : ''}
                            <p class="news-list__author">${author || 'Unknown source'}</p>
                            <a href="${url}" target="_blank" class="news-list__link">Read more</a>
                        </div>
                    </li>
                `;
            });
        html.forEach((item) => this.container.insertAdjacentHTML('afterbegin', item));

        const favoriteBtns = document.getElementsByClassName('news-list__favorite-btn');

        if (!favoriteBtns) return;

        Object.values(favoriteBtns).forEach((btn) => btn.addEventListener('click', (e) => this.onFavoriteBtnClick(e, likedNews)));
    }

    showNews(articles) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                firebaseActions.getNews((data) => {
                    if (data) this.generateNews(articles, data[user.uid]);
                    else this.generateNews(articles);
                });
                return;
            }
            this.generateNews(articles);
    }

    clearNews() {
        this.container.innerHTML = '';
        this.main.classList.remove('show-news');
    }
}

const newsListUI = new NewsListUI();

export default newsListUI;