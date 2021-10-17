Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    template: `
    <div class="row">
        <product v-for="item of filtered" 
        :key="item.id_product" 
        :product="item">
        </product>
    </div>
    `
})

Vue.component('product', {
    props: ['product'],
    // Картинка товара каталога
    computed: {
        productImg() {
            return `../img/product-${this.product.id_product}.jpg`
        }
    },
    template: `
    <div class="col-4">
        <img :src="productImg" alt="Some img" />
        <h4>{{ product.product_name }}</h4>
        <p>\${{ product.price }}</p>
        <button class="btn" @click="$root.$refs.cart.addProduct(product)">Add to cart</button>
    </div>
    `
})