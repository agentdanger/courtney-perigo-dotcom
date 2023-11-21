<template>
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
                            <div class="content has-text-white">
                                <div class="field has-addons">
                                    <div class="control is-expanded">
                                        <input class="input" v-on:keyup.enter="findNews(queryValue)" v-model="queryValue" type="text" placeholder="Enter a topic to find news">
                                    </div>
                                    <div class="control">
                                        <button class="button is-link" @click="findNews(queryValue)">
                                            <span class="icon">
                                                <i class="fas fa-search"></i>
                                            </span>
                                            <span>Find News</span>
                                        </button>
                                    </div>
                                    <div class="control">
                                        <button class="button is-link is-light" @click="removeCustomNews">
                                            <span class="icon">
                                                <i class="fas fa-times"></i>
                                            </span>
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- show message when articles are loading -->
                <div class="box p-1 mt-6" v-if="newsServiceLoading">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Loading Articles...
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                <progress class="progress is-primary" max="100">15%</progress>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- show first 25 articles retrieved -->
                <span v-for="(article, index) in articlesToDisplay" :key="index" v-if="!customNewsActive">
                    <div class="box p-1 mt-6">
                        <div class="card has-background-white">
                            <header class="card-header has-background-primary">
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
                                    <div class="media-content ">
                                        <p class="title is-size-5 has-text-grey-dark">{{ article.feed_title }}</p>
                                        <p class="subtitle is-size-6 has-text-grey-dark">{{ article.entry_summary }}</p>
                                        <div class="tags">
                                            <!-- show only first 4 tags where tag.scheme is not equal to "foxnews.com/metadata/dc.identifier" or 
                                                "foxnews.com/metadata/prism.channel" the split by "\" and show the last item -->
                                            <span v-for="(tag, index) in article.entry_tags.filter(tag => tag.scheme !== 'foxnews.com/metadata/dc.identifier' && tag.scheme !== 'foxnews.com/metadata/prism.channel' && tag.scheme !== 'foxnews.com/metadata/dc.source').slice(0, 4)" :key="index" class="tag is-info">
                                                <!-- split tag by "\" or "|" and show the last item -->
                                                {{ tag.term.split('\/').pop().split('|').pop().split('\\').pop() }}
                                            </span>
                                        </div>                                   
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div class="card-footer">
                                    <a :href="article.entry_link" target="_blank" rel="noopener noreferrer"
                                        class="card-footer-item has-background-link has-text-white">
                                        <span>Read More</span>
                                    </a>
                            </div>
                        </div>
                    </div>
                </span>
                <span v-for="(article, index) in customArticlesToDisplay" :key="index" v-if="customNewsActive">
                    <div class="box p-1 mt-6">
                        <div class="card has-background-white">
                            <header class="card-header has-background-primary">
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
                                    <div class="media-content ">
                                        <p class="title is-size-5 has-text-grey-dark">{{ article.feed_title }}</p>
                                        <p class="subtitle is-size-6 has-text-grey-dark">{{ article.entry_summary }}</p>
                                        <div class="tags">
                                            <!-- show only first 4 tags -->
                                            <span v-for="(tag, index) in article.entry_tags.slice(0, 4)" :key="index"
                                                class="tag is-info">
                                                {{ tag.term }}
                                            </span>  
                                        </div>                                   
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div class="card-footer">
                                    <a :href="article.entry_link" target="_blank" rel="noopener noreferrer"
                                        class="card-footer-item has-background-link has-text-white">
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
            queryValue: null,
            customNewsActive: false,
            defaultNewsServiceGet: null,
            articlesToDisplay: null,
            customArticlesToDisplay: null,
            newsServiceLoading: true,
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
    methods: {
        findNews(query) {
            console.log(query)
            this.customNewsActive = true
            this.newsServiceLoading = true
            this.defaultNewsServiceGet.getCustomNews(query).then((response) => {
                // show only first 25 articles in response
                this.customArticlesToDisplay = response.slice(0, 25)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.newsServiceLoading = false
            })
        },
        removeCustomNews() {
            this.customNewsActive = false
            this.customArticlesToDisplay = null
        },
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