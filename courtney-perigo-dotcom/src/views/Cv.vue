<template>
    <AppNavBar />

    <section class="hero is-fullheight is-primary">
        
        <div class="hero-body">
            <section class="section">
                <div class="container">
                    <h1 class="title">Section</h1>
                <h2 class="subtitle">
                    A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading.
                </h2>

                </div>
                
            </section>
            <div class="container">
                <h1 class="title">
                    James "Courtney" Perigo
                </h1>
                <h2 class="subtitle has-text-info">
                    Expert Data Science Leader Driving Innovation for Business Success
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