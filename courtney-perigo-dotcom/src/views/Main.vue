<template>
    <AppNavBar />

    <section class="hero is-fullheight-with-navbar is-primary">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-size-1">
                    Courtney Perigo
                </h1>
                <h2 class="subtitle is-size-3 has-text-info">
                    Data Scientist Extraordinaire
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
import AppNavBar from '../components/AppNavBar.vue'

export default {
    components: {
        AppNavBar
    }
}
</script>