class NewsAPI {
    constructor() {
        this.url = 'https://newsapi.org/v2';
        this.apiKey = '13c71a05e9ed48d5993b74dbba88a0f6';
    }

    // eslint-disable-next-line class-methods-use-this
    async fetchData(endpoint) {
        try {
            return await fetch(endpoint).then((resp) => resp.json());
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getNewsByQuery(query) {
        try {
            const endpoint = `${this.url}/everything?q=${query}&apiKey=${this.apiKey}`;
            const { articles } = await this.fetchData(endpoint);

            return articles;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getNewsByCategory(category = 'general', country = 'us') {
        try {
            const endpoint = `${this.url}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
            const { articles } = await this.fetchData(endpoint);

            return articles;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const newsAPI = new NewsAPI();

export default newsAPI;