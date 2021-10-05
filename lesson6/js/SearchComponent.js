// 1. Компонент поиск
Vue.component('search', {
    props: ['value'],
    template: `
                <form action="#" class="search-form" @submit.prevent="$emit('search')">
                <input type="text" class="search-field" 
                :value="value" @input="$emit('input', $event.target.value)">
                <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
})