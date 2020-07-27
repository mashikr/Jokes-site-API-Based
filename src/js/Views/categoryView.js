import { domElement } from '../base';

const createList = data => {
    const markup = `<li class="nav-item border-bottom"><a class="text-light nav-link text-capitalize" href="#${data}">${data}</a></li>`;

    domElement.categoryList.insertAdjacentHTML('beforeend', markup);
}

export const viewResult = data => {
    data.forEach(createList);
}

export const viewSpin = () => {
    const markup = `
    <div class="p-3 text-center">
        <i class="fas fa-spinner fa-2x fa-spin"></i>
    </div>`;

    domElement.categoryList.innerHTML = markup;
}

export const removeSpin = () => {
    domElement.categoryList.innerHTML = '';
}