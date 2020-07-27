import { domElement } from '../base';
import { bookmarkController, removeBtnController } from '../index';

const limitContent= (title, limit = 40) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
}

const createList = (id, date, content) => {
    const markup = `
    <div class="card mb-2 mr-1">
        <div class="card-body">
            <img src="img/chuck-norris.png" alt="chucknorris"> <b>Post date:</b> ${date} <i class="fas fa-star book-star" title="bookmark" id="${id}"></i>
            <hr>
            ${content}
        </div>
    </div>`;

    domElement.contentBody.innerHTML = '';
    domElement.contentBody.insertAdjacentHTML('beforeend', markup);

    // call event
    document.getElementById(id).addEventListener('click', (e) => {
        bookmarkController(id, date, content, e.target);
    });
};

export const bookView = (id, date, content) => {
    const markup = `
    <li class="nav-item border-bottom" id="list-${id}">
        <a class="text-light nav-link" href="#" id="book-${id}">
            <img src="img/chuck-norris.png" alt="chuck-norris"> 
            <span class="text-right">${limitContent(content)}</span>
        </a>
    </li>
    `;
    domElement.bookList.insertAdjacentHTML('beforeend', markup);
    document.getElementById('book-' + id).addEventListener('click', () => {
        createList(id, date, content);
    });
}

export const removeBook = id => {
    var list = document.getElementById('list-' + id);
    list.parentElement.removeChild(list);
}

export const clearAllbtn = () => {
    const markup = `
    <div id="clearBtnDiv">
    <hr>
    <button class="btn btn-block btn-outline-light mb-2" id="clear-all"><i class="fas fa-trash" title="bookmark" id="book-star"></i> Clear all</button>
    </div>`;

    domElement.bookmark.insertAdjacentHTML('beforeend', markup);
    document.getElementById('clear-all').addEventListener('click', () => {
        removeBtnController('clear');
    });
}

export const clearBtnDiv = () => {
   const clear =  document.getElementById('clearBtnDiv');
   clear.parentElement.removeChild(clear);
}

export const clearAllList = () => {
    domElement.bookList.innerHTML = '';
    domElement.contentBody.innerHTML = '';
}