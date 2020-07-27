import { database, removeBtnController } from '../index';

export const addBookmark = (id, date, content) => {
    const book = { id, date, content };
    database.bookmarks.push(book);

    saveData();
    removeBtnController('add');
}

export const isBooked = (id) => {
    return database.bookmarks.findIndex(el => el.id == id);
}

export const deletebook = (index) => {
    database.bookmarks.splice(index, 1);
    
    saveData();
    removeBtnController('del');
}

const saveData = () => {
    localStorage.setItem('bookmarks', JSON.stringify(database.bookmarks));
}

export const deleteAll = () => {
    database.bookmarks = [];
    saveData();
    removeBtnController('del');
};