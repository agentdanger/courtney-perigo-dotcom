<template>
    <AppNavBar />

    <div class="hero is-fullheight is-primary">
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
                            <a href="#featured_projects" class="icon is-size-1 is-white is-large">
                                <i class="fas fa-caret-down"></i>
                            </a>
                        </div>
                    </div>
                    <div class="column"></div>
                </div>
            </div>
        </div>
    </div>

    <section id="featured_projects" class="hero is-medium is-primary">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Featured Projects
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="columns ">
                                <div v-for="project in featured_projects" class="column is-flex">
                                    <div class="card has-background-white">
                                        <div class="card-image ">
                                            <figure class="image is-3by2">
                                                <img :src="project.image" alt="Placeholder image">
                                            </figure>
                                        </div>
                                        <header class="card-header ">
                                            <p class="card-header-title is-size-6">
                                                {{ project.title }}
                                            </p>
                                        </header>
                                        <div class="card-content">
                                            <div class="content ">
                                                {{ project.description }}
                                            </div>
                                        </div>
                                        <footer class="card-footer">
                                            <a :href="project.link" target="_blank" rel="noopener noreferrer"
                                                class="card-footer-item ">
                                                View
                                            </a>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="featured_projects" class="hero is-medium is-black">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                My Running Stats
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                GRAPHIC HERE
                            </div>
                        </div>
                    </div>
                </div>
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
            Feel free to contact me.",
            featured_projects: [
                {
                    title: "Chicago Data Portal Analyst Microservices",
                    description: "A collection of Chicago Data Portal microservices \
                    using GoLang, Kubernetes, Docker, and Amazon Web Services.",
                    image: "../assets/chicago_crime.png",
                    link: "https://github.com/agentdanger/chicago-data-public"
                },
                {
                    title: "Advertising Forecasts in Google Cloud Platform",
                    description: "A demonstration of a forecasting pipeline in \
                    Google Cloud Platform using BigQuery ML, Cloud Storage, \
                    and Google App Engine",
                    image: "../assets/gcp_diagram.png",
                    link: "https://github.com/agentdanger/ad-forecasting-gcp"
                },
                {
                    title: "Predicting Top MLB Batters of All Time",
                    description: "A demonstration of a statistical analysis using R of \
                    Major League Baseball players looking for the best batters of all time.",
                    image: "../assets/ops_corr.jpeg",
                    link: "https://github.com/agentdanger/project_peanutsandcrackerjack"
                }
            ]
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