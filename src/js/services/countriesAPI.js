class CountriesAPI {
    constructor() {
        this.url = 'https://restcountries.eu/rest/v2';
    }

    // serializeCountries() {
    //     <img src="https://www.countryflags.io/be/flat/64.png"></img>
    // }

    async getAllCountries() {
        try {
            const res = await fetch(`${this.url}/all`).then((resp) => resp.json());
            console.log('res: ', res);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const countriesAPI = new CountriesAPI();

export default countriesAPI;