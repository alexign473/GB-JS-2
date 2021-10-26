class List {
    constructor() {
        this.goods = []
        this._fetchProducts()
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }
    // 2. Подсчет суммы товаров
    getSum() {
        return this.goods.reduce((sum, curr) => sum + curr.price, 0)
    }
}

class ProductList extends List {
    constructor(container = '.products') {
        super()
        this.container = container;
        this.render();//вывод товаров на страницу
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //           block.innerHTML += item.render();
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

//1. Класс корзины и товара корзины
class Cart extends List {
    constructor(container = '.cart') {
        super()
        this.container = container
        this.render()
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'ONE', price: 2000 },
            { id: 2, title: 'TWO', price: 20 },
            { id: 3, title: 'THREE', price: 200 },
            { id: 4, title: 'FOUR', price: 50 },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new CartProduct(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
        block.insertAdjacentHTML("beforeend", this.renderSum());
    }
    findItem(good) { // Поиск товара

    }
    addItem(good) { // Добавить товар в корзину

    }
    removeItem(good) { // Удалить товар из корзины

    }
    renderSum() {
        return `Суммарная стоимость: ${this.getSum()}`
    }
}

class CartProduct extends ProductItem {
    constructor(id, title, price, img) {
        super(id, title, price, img)
        this.count = 1
    }
    render() {
        const { title, price, count } = this
        return `<span>Товар: ${title}, цена: ${price}, кол-во: ${count}</span>`
    }
    renderMinusBtn() { // Рендер кнопки удалить товар
    }
    renderPlusBtn() { // Рендер кнопки добавить товар
    }
}

let list = new ProductList();

let cart = new Cart()



//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);