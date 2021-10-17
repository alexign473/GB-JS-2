Vue.component('nav-menu', {
    data() {
        return {
            navItems: ['Home', 'Products', 'About', 'Contact', 'Account'],
            show: true,
        }
    },
    template: `    
    <nav>
          <ul v-show="show">
            <nav-menu-item v-for="item of navItems"
            :item="item"></nav-menu-item> 
          </ul>
    </nav>
    `
})

Vue.component('nav-menu-item', {
    props: ['item'],
    template: `    
    <li><a href="index.html">{{item}}</a></li>
    `
})

Vue.component('m-nav-btn', {
    methods: {
        showMenu() {
            let show = this.$root.$refs['nav-menu']
            show.show = !show.show
        }
    },
    template: `
    <img src="img/menu.png" alt="" class="menu-icon" @click="showMenu" />
    `
})