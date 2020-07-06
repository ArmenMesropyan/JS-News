class NewsListUI {
    constructor() {
        this.container = document.querySelector('.news-list__list');
        [this.main] = document.getElementsByTagName('main');
    }

    showNews(articles) {
        this.main.classList.add('show-news');
        this.container.innerHTML = '';
        const html = articles.map(({
            title,
            description,
            urlToImage,
            url,
            author,
        }) => `
            <li class="news-list__item card">
                <div class="news-list__info card-image">
                    <img src="${urlToImage}" class="news-list__img">
                </div>
                <div class="news-list__info card-content">
                    <h3 class="news-list__title card-title">${title}</h3>
                    <p class="news-list__description">${description}</p>
                </div>
                <div class="news-list__actions card-action">
                    <p class="news-list__author">${author || 'Unknown source'}</p>
                    <a href="${url}" target="_blank" class="news-list__link">Read more</a>
                </div>
            </li>
        `);
        html.forEach((item) => this.container.insertAdjacentHTML('afterbegin', item));
    }

    clearNews() {
        this.main.classList.remove('show-news');
    }
}

const newsListUI = new NewsListUI();

export default newsListUI;