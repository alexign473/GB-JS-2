Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            showCart: false,
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    })
            }
        },
    },
    template: `
    <div>
        <button class="btn-cart"><img src="img/cart.png" alt="cart img" 
        width="30px" height="30px" @click="showCart = !showCart" /></button>
        <div class="cart-block" v-show="showCart">
            <p v-if="!cartItems.length">Cart is empty</p>
            <cart-item class="cart-item" 
            v-for="item of cartItems" 
            :key="item.id_product"
            :cart-item="item"             
            @remove="remove">
            </cart-item>
        </div>
    </div>
    `
})
Vue.component('cart-item', {
    props: ['cartItem'],
    // Картинка товара корзины
    computed: {
        CartProductImg() {
            return `../img/product-${this.cartItem.id_product}.jpg`
        }
    },
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="CartProductImg" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$&nbsp{{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$&nbsp{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});