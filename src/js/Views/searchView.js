import { domElement } from '../base';
import {bookmarkController, controlCategorySearch } from '../index';
import { isBooked } from '../Model/Bookmark';

export const getInput = () => domElement.inputWord.value;

export const clearInput = () => domElement.inputWord.value = '';

export const loadSpin = () => domElement.contentBody.innerHTML = '<div class="p-3 text-center"><i class="fas fa-spinner fa-3x fa-spin"></i></div>';

export const removeSpin = () => domElement.contentBody.innerHTML = '';

const setdate = date => {
    const date1 = date.substr(0, 10);
    const date2 = date1.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];

    return `${date2[2]} ${months[parseInt(date2[1]) - 1]}, ${date2[0]}`;
};

const createList = values => {
    const markup = `
    <div class="card mb-2 mr-1">
        <div class="card-body">
            <img src="img/chuck-norris.png" alt="chucknorris"> <b>Post date:</b> ${setdate(values.created_at)} <i class="${isBooked(values.id) == -1 ? 'far' : 'fas'} fa-star book-star" title="bookmark" id="${values.id}"></i>
            <hr>
            ${values.value}
        </div>
    </div>`;
    domElement.contentBody.insertAdjacentHTML('beforeend', markup);

    // call event
    document.getElementById(values.id).addEventListener('click', (e) => {
        bookmarkController(values.id, setdate(values.created_at), values.value, e.target);
    });
};

export const resultView = data => {
    data.forEach(createList);
};

export const catresultView = data => {
    createList(data);

    domElement.contentBody.insertAdjacentHTML('beforeend', ` <button class="btn btn-block btn-secondary" id="reload-one"><i class="fas fa-redo-alt mr-2"></i>load another one</button>`);

    document.getElementById('reload-one').addEventListener('click', controlCategorySearch);
};