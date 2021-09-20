class Hamburger {
    list = []
    constructor(size, stuffing, toppings) {
        this.fetch()
        this.size = this.findListing(size)
        this.stuffing = this.findListing(stuffing)
        this.toppings = this.getToppings(toppings)
    }
    fetch() {
        this.list = [
            { value: 'big', price: 100, cal: 40 },
            { value: 'small', price: 50, cal: 20 },
            { value: 'cheese', price: 10, cal: 20 },
            { value: 'salad', price: 20, cal: 5 },
            { value: 'free', price: 15, cal: 10 },
            { value: 'pepper', price: 15, cal: 0 },
            { value: 'mayo', price: 20, cal: 5 },
        ]
    }
    findListing(searchTerm) {
        let listing = this.list.find(el => el.value === searchTerm)
        console.log(listing)
        return listing
    }
    getToppings(toppings) {
        const arr = this.list.filter(el => toppings.includes(el.value))
        console.log(arr)
        return arr
    }
    getList() {
        const arr = [this.size, this.stuffing, ...this.toppings]
        return arr
    }
    calcPrice() {
        let res = this.getList().reduce((sum, curr) => sum + curr.price, 0)
        console.log(res)
        return res
    }
    calcCalories() {
        let res = this.getList().reduce((sum, curr) => sum + curr.cal, 0)
        console.log(res)
        return res
    }
}

function getSelectedRadioValues(name) {
    const radio = document.querySelectorAll(`input[name="${name}"]:checked`)
    return radio[0].value
}

function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = []
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value)
    });
    return values;
}

const btn = document.querySelector('#btn')
btn.addEventListener('click', (event) => {
    event.preventDefault()
    hamburger = new Hamburger(getSelectedRadioValues('size'), getSelectedRadioValues('stuffing'), getSelectedCheckboxValues('topping'))
    console.log(hamburger)
    alert(`Итоговая цена: ${hamburger.calcPrice()}\nКалорийность: ${hamburger.calcCalories()}`)
});


let hamburger = new Hamburger(getSelectedRadioValues('size'), getSelectedRadioValues('stuffing'), getSelectedCheckboxValues('topping'))
// console.log(hamburger)



