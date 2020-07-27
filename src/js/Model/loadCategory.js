import axios from 'axios';

export default class Category {

    async getCategory() {
        try {
            const response = axios('https://api.chucknorris.io/jokes/categories')
            this.result = (await response).data;
        } catch(e) {
            alert(e);
        }
    }
}