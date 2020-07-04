class CountriesAPI {
    constructor() {
        this.url = 'https://restcountries.eu/rest/v2';
    }

    // eslint-disable-next-line class-methods-use-this
    serializeCountries(countries) {
        return countries.map(({ name, alpha2Code, flag }) => ({ name, alpha2Code, flag }));
    }

    async getAllCountries() {
        try {
            const res = await fetch(`${this.url}/all`).then((resp) => resp.json());
            return this.serializeCountries(res);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const countriesAPI = new CountriesAPI();

export default countriesAPI;