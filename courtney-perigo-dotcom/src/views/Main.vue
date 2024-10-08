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
                                    <img class="is-rounded has-ratio" :src="main_image">
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
                                My Running Stats | Last 30 Activities
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="columns">
                                <div class="column is-8">
                                    <div class="content">
                                        <apexchart height="250" id='running-stats-pace' type="line" :options="options_pace" :series="this.chartSeries_pace" />
                                        <apexchart height="250" id='running-stats-miles' type="area" :options="options_miles" :series="this.chartSeries_miles" />
                                    </div>
                                </div>
                                <div class="column is-4">
                                    <div class="content">
                                        <h1 class="title is-size-4">
                                            Total Distance Covered: {{ total_miles }} miles
                                        </h1>
                                        <h1 class="title is-size-4">
                                            Longest Run: {{ longest_run }} miles
                                        </h1>
                                        <h1 class="title is-size-4">
                                            Fastest Pace: {{ fastest_time }} min/mile
                                        </h1>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import stravaService from '../service/StravaService'
import '../particles.js-master/particles.js'
import AppNavBar from '../components/AppNavBar.vue'
import VueApexCharts from 'vue3-apexcharts';

export default {
    
    components: {
        AppNavBar,
        apexchart: VueApexCharts
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
            main_image: "../assets/lion_courtney.JPG",
            longest_run: null,
            fastest_time: null,
            total_miles: null,
            activities: null,
            miles_list: [0, 0, 0],
            dates_list: [1,2,3],
            stravaServiceGet: null,
            stravaDataLoading: false,
            chartSeries_miles: [{
                name: "Miles",
                data: [[0,0]]
            }],
            chartSeries_pace: [{
                name: "Pace (min/mile)",
                data: [[0,0]]
            }],
            options_miles: {
                title: {
                    text: 'Miles',
                    align: 'left',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#F5F9FF'
                    },
                },
                chart: {
                    foreColor: '#F5F9FF',
                    fontFamily: "'Play', sans-serif'",
                    id: 'running-stats-miles',
                    group: 'running-stats',
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                colors: ['#BE861F'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                grid: {
                    row: {
                        colors: ['#F5F9FF', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.1
                    },
                },
                xaxis: {
                    type: 'datetime',
                    tickAmount: 'dataPoints'
                },
                yaxis: {
                    type: 'numeric',
                    forceNiceScale: true,
                    title: [{
                        text: 'Pace (min/mile)'
                    }
                ],
                    min: 0,
                    decimalsInFloat: 1,
                    formatter: function (value) {
                            return value.toFixed(1)
                    }
                }
            },
            options_pace: {
                title: {
                    text: 'Pace (min/mile)',
                    align: 'left',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#F5F9FF'
                    },
                },
                chart: {
                    foreColor: '#F5F9FF',
                    fontFamily: "'Play', sans-serif'",
                    id: 'running-stats-pace',
                    group: 'running-stats',
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                colors: ['#09A2CD'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                grid: {
                    row: {
                        colors: ['#F5F9FF', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.1
                    },
                },
                xaxis: {
                    type: 'datetime',
                    tickAmount: 'dataPoints',
                    tooltip: {
                        enabled: false
                    }
                },
                yaxis: {
                    type: 'numeric',
                    forceNiceScale: true,
                    title: [{
                        text: 'Miles'
                    }
                ],
                    min: 0,
                    decimalsInFloat: 1,
                    formatter: function (value) {
                            return value.toFixed(1)
                    }
                }
            },
            featured_projects: [
                {
                    title: "Workforce Optimization with Genetic Algorithms",
                    description: "Optimizing a nanny schedule using simulation and genetic algorithms in Python.",
                    image: "../assets/optimal_nanny.png",
                    link: "https://github.com/agentdanger/nanny-simulation"
                },
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
        this.initParticles(),
        this.stravaServiceGet = new stravaService(),
        this.stravaServiceGet.getStravaData().then((response) => {
            this.stravaDataLoading = true
            this.longest_run = response.longest_run_string
            this.fastest_time = response.fastest_time_string
            this.total_miles = response.total_miles
            this.activities = response.data
            this.options_miles.xaxis.categories = Array.from(response.dates_list)
            this.options_pace.xaxis.categories = Array.from(response.dates_list)
            this.chartSeries_miles[0].data = response.graph_data
            this.chartSeries_pace[0].data = response.graph_data_pace
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.stravaDataLoading = false
        })
    },
    methods: { 
        initParticles() {
            particlesJS('particles-js')
        },
    }
}
</script>

<style></style>
