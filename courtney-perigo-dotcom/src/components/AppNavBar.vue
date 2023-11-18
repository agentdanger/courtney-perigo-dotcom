<template>
    <nav class="navbar is-fixed-top is-primary">
        <div class="container">
            <div class="navbar-brand is-primary">
                <a class="navbar-item is-size-4" href="/">
                    Courtney Perigo
                </a>
                <span :class="navbarClass1" data-target="navbarMenuHeroA" @click="toggleDropdown('navbar')">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
            <div id='navbarMenuHeroA' :class="navbarClass0">
                <div class="navbar-end">
                    <span class="navbar-item">
                        <p class="buttons">
                            <!-- <a class="button is-primary">
                            <span class="icon-text">
                                <span class="icon">
                                    <i class="fas fa-rss"></i>
                                </span>
                                <span>data science news</span>
                            </span>
                        </a> -->
                            <a class="button is-primary" href="/news-recommender">
                                <span>news recommender</span>
                            </a>
                            <a class="button is-primary" href="/cv">
                                <span>CV</span>
                            </a>
                            <a class="button is-primary" href="/about">
                                <span>about</span>
                            </a>
                        </p>
                    </span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'AppNavBar',
    data() {
        return {
            navbarActive0: false
        }
    },
    methods: {
        toggleDropdown: function (dropdown) {
            if (dropdown === 'navbar') {
                this.navbarActive0 = !this.navbarActive0
            }
        }
    },
    computed: {
        navbarClass0: function () {
            if (this.navbarActive0) {
                return "navbar-menu is-active"
            } else {
                return "navbar-menu"
            }
        },
        navbarClass1: function () {
            if (this.navbarActive0) {
                return "navbar-burger is-active"
            } else {
                return "navbar-burger"
            }
        }
    },
}

</script>