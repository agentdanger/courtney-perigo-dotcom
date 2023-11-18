<template>
    <div v-if="newsServiceLoading">
        <div class="modal-background has-background-white"></div>
        <div class="modal-content">
            <p class="image is-128x128">
                <img src="/assets/brittany.jpg" alt="">
            </p>
        </div>
    </div>
    <AppNavBar />

    <div class="hero is-fullheight is-primary">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                MachinaNova: An AI News Recommender
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                {{ about_machinanova }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- show first 25 articles retrieved -->
                <span v-for="(article, index) in articlesToDisplay" :key="index">
                    <div class="box p-1 mt-6">
                        <div class="card has-background-primary">
                            <header class="card-header">
                                <p class="card-header-title is-size-4 has-text-white">
                                    {{ article.entry_title }}
                                </p>
                            </header>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-128x128">
                                            <img :src="article.entry_image.url" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content has-text-white">
                                        <p>{{ article.entry_summary }}</p>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="card-footer">
                                    <a :href="article.entry_link" target="_blank" rel="noopener noreferrer"
                                        class="card-footer-item has-text-white">
                                        <span>Read More</span>
                                    </a>
                            </div>
                        </div>
                    </div>
                </span>
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                About The Model
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                <p>{{ about_model }}</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="buttons is-centered ">
                                    <a :href="model_link.link" target="_blank" rel="noopener noreferrer"
                                        class="button is-link">
                                        <span class="icon">
                                            <i :class="model_link.icon"></i>
                                        </span>
                                        <span>{{ model_link.name }}</span>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import defaultNewsService from '../service/DefaultNewsService'
import AppNavBar from '../components/AppNavBar.vue'

export default {
    components: {
        AppNavBar
    },
    data() {
        return {
            defaultNewsServiceGet: null,
            articlesToDisplay: null,
            newsServiceLoading: false,
            about_machinanova: "This is a simple application that fetches recommended, recent data science news. \
            You can also type in your own data science topic and the model will pull recommended news in \
            your topic area.",
            about_model: "The News Fetcher Machine Learning Model leverages a pre-built sentence transformer \
            to create embeddings for news articles. The embeddings are then used to find recent articles using \
            euclidean distance. More information about the underlying model can be found on its repo.",
            model_link: {
                name: 'MachinaNova: A news retriever service',
                icon: 'fab fa-github',
                link: 'https://github.com/agentdanger/news-retriever'
            }
        }
    },
    mounted() {
        this.defaultNewsServiceGet = new defaultNewsService(),
        this.defaultNewsServiceGet.getDefaultNews().then((response) => {
            this.newsServiceLoading = true
            // show only first 25 articles in response
            this.articlesToDisplay = response.slice(0, 25)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.newsServiceLoading = false
        })
    },
    // load data in template when mounted

}
</script>