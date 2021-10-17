Vue.component('search-form', {
    data() {
        return {
            userSearch: '',
        }
    },
    template: `
    <form action="#" class="search-box" 
    @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <button class="btn-search"><i class="fas fa-search"></i></button>
        <input type="text" class="input-search" placeholder="Type to Search..."
        v-model="userSearch">
        <input type="submit" hidden />
    </form>
    `
})