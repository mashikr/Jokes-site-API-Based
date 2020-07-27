import Category from './Model/loadCategory';
import Search from './Model/Search';
import * as Bookmark from './Model/Bookmark'
import * as categoryView from './Views/categoryView';
import * as searchView from './Views/searchView';
import * as bookmarkView from './Views/bookmarkView';
import { domElement } from './base'

export const database = {};
window.obj = database;

//window.obj = database;
/// search controller
const searchControl = async () => {

    database.search = new Search();

    // take input
    const token = searchView.getInput();
    //clear input field
    searchView.clearInput();

    // spin loader
    searchView.loadSpin();

    try {
        await database.search.getqueryResult(token);

        // remove spin loader
        searchView.removeSpin();

        searchView.resultView(database.search.queryResult);


    } catch(e) {
        alert(e);
    }
}


// eventlistener for search form
domElement.inputForm.addEventListener('submit', e => {
    e.preventDefault();
    searchControl();

});

/// bookmark event listenr
export const bookmarkController = (id, date, content, target) => {

    //console.log(Bookmark.isBooked(id));
    const index = Bookmark.isBooked(id);

    if(index === -1){
        // add data bookmark
        Bookmark.addBookmark(id, date, content);

        // change star
        target.classList.remove('far');
        target.classList.add('fas');

        // add to dom
        bookmarkView.bookView(id, date, content);
    } else {
        // delete data bookmark
        Bookmark.deletebook(index);

        // change star
        target.classList.remove('fas');
        target.classList.add('far');


        // delete dom element
        bookmarkView.removeBook(id);
    }
}

/// bookmar delete btn controller
export const removeBtnController = (condition) => {
    if(condition == 'add') {
        if(!document.getElementById('clearBtnDiv')){
            bookmarkView.clearAllbtn();
        }
    } else if(condition == 'del') {
        if(database.bookmarks.length === 0){
            bookmarkView.clearBtnDiv();
        }
    } else if (condition == 'clear') {
        Bookmark.deleteAll();
        bookmarkView.clearAllList();
    }
}


/// load category on page load
const controlCategory = async () => {

    database.category = new Category();

    // load spin
    categoryView.viewSpin();
    try {
        // search category
        await database.category.getCategory();

        // remove spin
        categoryView.removeSpin();

        //view category
        if(database.category.result) categoryView.viewResult(database.category.result);
    } catch(e) {
        alert(e);
    }
}

window.addEventListener('load', () => {
    controlCategory();
    database.bookmarks = new Array();

    const storage = JSON.parse(localStorage.getItem('bookmarks'));

    // restoring likes from local storage
    if (storage.length) {
        database.bookmarks = storage;

        database.bookmarks.forEach(el => {
            bookmarkView.bookView(el.id, el.date, el.content);
        });

        bookmarkView.clearAllbtn();
    }
});


//// control Category search
export const controlCategorySearch = async () => {
    const token = window.location.hash.replace('#', '');
    
    if(token) {
        searchView.loadSpin();

        try {
            database.catSearch = new Search();
            await database.catSearch.getcatResult(token);

            searchView.removeSpin();

            searchView.catresultView(database.catSearch.queryResult);

        } catch(e) {
            alert(e);
        }
    }
}

window.addEventListener('hashchange', controlCategorySearch);














/// for css property
var toogle_cat = document.getElementById('toggle-cat');
var toggle_book = document.getElementById('toggle-book');

toogle_cat.addEventListener('click', function() {
    document.getElementById('category').style.left = '0';
    document.getElementById('bookmark').style.right = '-40%';
});

document.getElementById('cat-close').addEventListener('click', function() {
    document.getElementById('category').style.left = '-40%';
});

toggle_book.addEventListener('click', function() {
    document.getElementById('bookmark').style.right = '0';
    document.getElementById('category').style.left = '-40%';
});

document.getElementById('book-close').addEventListener('click', function() {
    document.getElementById('bookmark').style.right = '-40%';
});

document.getElementById('category').addEventListener('click', (e) => {
    document.getElementById('bookmark').style.right = '-40%';
});
document.getElementById('content-body').addEventListener('click', (e) => {
    if(!e.target.matches('#toggle-book, #toggle-book *')) {
        document.getElementById('bookmark').style.right = '-40%';
    }
    
    if(!e.target.matches('#toggle-cat, #toggle-cat *')) {
        document.getElementById('category').style.left = '-40%';
    }
    
});