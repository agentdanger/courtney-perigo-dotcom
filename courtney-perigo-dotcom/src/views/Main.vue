<template>
    <AppNavBar />

    <div class="hero is-fullheight-with-navbar is-primary">
        <div id="particles-js"></div>
        <div class="hero-body" id="particles-js">
            <div class="container">
                <div class="columns">
                    <div class="column"></div>
                    <div class="column is-6">
                        <div class="columns">
                            <div class="column"></div>
                            <div class="column is-6">
                                <figure class="image">
                                    <img class="is-rounded has-ratio" src="../assets/lion_courtney.JPG">
                                </figure>
                            </div>
                            <div class="column"></div>
                        </div>
                        <div class="content has-text-centered">
                            <h1 class="title is-size-1 is-relative">
                                Tranforming data into business value.
                            </h1>
                            {{ main_intro }}
                        </div>
                        <div class="content has-text-centered">
                            <a href="#running_stats" class="icon is-size-1 is-white is-large">
                                <i class="fas fa-caret-down"></i>
                            </a>
                        </div>
                    </div>
                    <div class="column"></div>
                </div>
            </div>
        </div>
    </div>
    
    <section id="running_stats" class="hero is-large is-primary">
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

    <section id="featured_projects" class="hero is-large is-black">
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
import '../particles.js-master/particles.js'
import AppNavBar from '../components/AppNavBar.vue'

export default {
    components: {
        AppNavBar
    },
    data() {
        return {
            main_intro: "I'm a data science leader in Chicago, IL, USA.  \
            I have significant experience leading teams working on applications \
            of machine learning in retail, healthcare, financial, and consumer \
            packaged goods industries.  I love working on challenging problems, \
            working with creative people, using state-of-the-art technologies, \
            and building amazing products.  Interested in working together?  \
            Feel free to contact me."
        }
    },
    mounted() {
        this.initParticles()
    },
    methods: {
        initParticles() {
            particlesJS('particles-js')
        }
    }
}
</script>

<style></style>