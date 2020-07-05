class CategoriesUI {
    constructor() {
        this.elements = document.getElementsByClassName('categories__item');
    }

    // eslint-disable-next-line class-methods-use-this
    onCategoriesClick({ target }, cb) {
        const { category } = target.closest('.categories__item').dataset;
        cb(category);
    }

    generateCategories(cb = () => {}) {
        Object.values(this.elements).forEach((elem) => {
            elem.addEventListener('click', (e) => this.onCategoriesClick(e, cb));
        });
    }
}

const categoriesUI = new CategoriesUI();

export default categoriesUI;