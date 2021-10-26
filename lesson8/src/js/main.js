import cart from './CartComp'
import products from './ProductComp';
import searchform from './SearchComp';
import error from './ErrorComp';

const app = {
    el: '#app',
    data: {
        showMenu: true,
    },
    components: {
        cart,
        products,
        error,
        searchform,
    },
    methods: {
        async getJson(url) {
            try {
                const result = await fetch(url);
                return await result.json();
            } catch (error) {
                // console.log(error);
                this.$refs.error.text = error;
            }
        },
        async postJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                return await result.json();
            } catch (error) {
                // console.log(error);
                this.$refs.error.text = error;
            }
        },
        async putJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                return await result.json();
            } catch (error) {
                // console.log(error5);
                this.$refs.error.text = error;
            }
        },
        async deleteJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                return await result.json();
            } catch (error) {
                // console.log(error);
                this.$refs.error.text = error;
            }
        },
    },
}

export default app