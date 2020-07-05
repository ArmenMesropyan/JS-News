class NewsAPI {
    constructor() {
        this.url = 'https://newsapi.org/v2';
        this.apiKey = '13c71a05e9ed48d5993b74dbba88a0f6';
    }

    async getNewsByQuery(query) {
        try {
            const { articles } = await fetch(`${this.url}/everything?q=${query}&apiKey=${this.apiKey}`)
                .then((resp) => resp.json());

            return articles;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const newsAPI = new NewsAPI();

export default newsAPI;