const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this.allProducts = []
        this._getProducts()
            .then(data => {
                this.goods = [...data]
                this.render()
            })
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error)
            })
    }
    getSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.append(productObj.render());
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        const wrapper = document.createElement('div')
        wrapper.innerHTML =
            `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                </div>
            </div>`

        const placeToBtn = wrapper.querySelector('.desc')
        placeToBtn.append(this.getBuyBtn())
        return wrapper
    }
    getBuyBtn() {
        const btn = document.createElement('button')
        btn.classList.add('buy-btn')
        btn.innerHTML = 'Купить'
        btn.addEventListener('click', () => {
            const CartInstance = new Cart()
            CartInstance.add(this)
        })
        return btn
        // return `<button class="buy-btn">Купить</button>`
    }
}

class Cart {
    constructor(container = '.cart') {
        if (Cart._instance) {
            return Cart._instance
        }
        this.container = container
        this.goods = []
        this._getProducts()
            .then(data => {
                this.goods = [...data.contents]
                this.render()
            })
        Cart._instance = this
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const block = document.querySelector(this.container);
        block.innerHTML = ''
        for (let product of this.goods) {
            const productObj = new CartProduct(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        block.insertAdjacentHTML('beforeend', this.getSumTemplate())
    }

    getSumTemplate() {
        const sum = this.goods.reduce((sum, curr) => {
            return sum + curr.price * curr.quantity
        }, 0)
        return `Суммарная цена: ${sum}`
    }

    add(item) { // Добавление товара в корзину
        const product = {
            id_product: item.id,
            product_name: item.title,
            price: item.price,
            quantity: 1
        }
        const index = this.findProductIndex(product)
        if (index >= 0) {
            this.goods[index].quantity++
        } else {
            this.goods.push(product)
        }
        console.log(this.goods)
        this.render()
    }
    findProductIndex(product) { // Поиск индекса элемента в корзине
        return this.goods.findIndex(item => item.id_product === product.id_product)
    }
    findProduct(product) { // Поиск элемента в корзине
        return this.goods.filter(item => item.id_product === product.id_product)[0]
    }
}

class CartProduct extends ProductItem {
    constructor(product) {
        super(product)
        this.quantity = product.quantity
    }

    render() {
        const { title, price, quantity } = this
        return `<span>Товар: ${title}, цена: ${price}, кол-во: ${quantity}</span>`
    }
    renderMinusBtn() { // Рендер кнопки удалить товар
    }
    renderPlusBtn() { // Рендер кнопки добавить товар
    }
}

let list = new ProductsList();
// console.log(list.allProducts);

let cart = new Cart()

let btn = document.querySelector('.btn-cart')
btn.addEventListener('click', () => {
    document.querySelector('.cart')
        .classList.toggle('d-flex')
})

