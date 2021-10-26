const product = {
    props: ['product'],
    // Картинка товара каталога
    computed: {
        productImg() {
            return require(`../img/product-${this.product.id_product}.jpg`)
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
}

const products = {
    data() {
        return {
            products: [],
            filtered: [],
        }
    },
    components: {
        'product': product,
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        console.log('prod mount')
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        console.log(this.products)
    },
    template: `
    <div class="row">
        <product v-for="item of filtered" 
        :key="item.id_product" 
        :product="item">
        </product>
    </div>
    `
}

export default products