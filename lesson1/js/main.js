const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
    { id: 5, title: 'Sans', price: 9000, img: "sans.jpg" },
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
    { id: 5, title: 'Sans', price: 9000, img: "sans.jpg" },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    let img = item.img ? item.img : "inu.png"

    return `<div class="col">
                <div class="product-item">
                    <img class="product-item_img" src=${img} alt="">
                    <div class="product-item_list">
                        <h3>${item.title}</h3>
                        <span class="price">${item.price}</span>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    document.querySelector('.products').innerHTML = productsList
};

renderPage(products);