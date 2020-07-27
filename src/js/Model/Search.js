import axios from 'axios';

export default class Search {

    async getqueryResult(token) {
        try {
            const response = axios(`https://api.chucknorris.io/jokes/search?query=${token}`)
            this.queryResult = (await response).data.result;
        } catch(e) {
            alert(e);
        }
    }

    async getcatResult(token) {
        try {
            const response = axios(`https://api.chucknorris.io/jokes/random?category=${token}`)
            this.queryResult = (await response).data;
        } catch(e) {
            alert(e);
        }
    }
}