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
                                {{ aboutMachinaNova }}
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
                <!-- show paginated articles -->
                <span v-for="(article, index) in paginatedArticles" :key="index" v-if="!customNewsActive">
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
                                            <span 
                                                v-for="(tag, index) in article.entry_tags.filter(tag => tag.scheme !== 'foxnews.com/metadata/dc.identifier' && tag.scheme !== 'foxnews.com/metadata/prism.channel' && tag.scheme !== 'foxnews.com/metadata/dc.source').slice(0, 4)" 
                                                :key="index" 
                                                :class="['tag', selectedTags.includes(tag.term) ? 'is-black' : 'is-info']"
                                                @click="toggleTagFilter(tag.term)">
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

                <!-- Pagination Controls -->
                <div class="pagination is-centered" v-if="totalPages > 1">
                    <a 
                        class="pagination-previous" 
                        @click="prevPage" 
                        :class="{ 'is-disabled': currentPage === 1 }"
                        :style="{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }"
                    >Previous</a>
                    <a 
                        class="pagination-next" 
                        @click="nextPage" 
                        :class="{ 'is-disabled': currentPage === totalPages }"
                        :style="{ pointerEvents: currentPage === totalPages ? 'none' : 'auto' }"
                    >Next</a>
                    <ul class="pagination-list">
                        <li v-for="page in totalPages" :key="page">
                            <a 
                                class="pagination-link" 
                                @click="setPage(page)" 
                                :class="{ 'is-current': currentPage === page }"
                            >{{ page }}</a>
                        </li>
                    </ul>
                </div>

                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                About The Model
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                <p>{{ aboutModel }}</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="buttons is-centered ">
                                    <a :href="modelLink.link" target="_blank" rel="noopener noreferrer"
                                        class="button is-link">
                                        <span class="icon">
                                            <i :class="modelLink.icon"></i>
                                        </span>
                                        <span>{{ modelLink.name }}</span>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import defaultNewsService from '../service/DefaultNewsService'
import AppNavBar from '../components/AppNavBar.vue';

const queryValue = ref(null);
const customNewsActive = ref(false);
const defaultNewsServiceGet = ref(null);
const allArticles = ref([]);
const customArticlesToDisplay = ref([]);
const newsServiceLoading = ref(true);
const aboutMachinaNova = ref("This is a simple application that fetches recommended, recent data science and analytics news.");
const aboutModel = ref("The News Fetcher Machine Learning Model leverages a pre-built sentence transformer to create embeddings for news articles. The embeddings are then used to find recent articles using euclidean distance. More information about the underlying model can be found on its repo.");
const modelLink = ref({
    name: 'MachinaNova: A news retriever service',
    icon: 'fab fa-github',
    link: 'https://github.com/agentdanger/news-retriever'
});

const selectedTags = ref([]);
const currentPage = ref(1);
const articlesPerPage = 25;

const toggleTagFilter = (tag) => {
    if (selectedTags.value.includes(tag)) {
        selectedTags.value = selectedTags.value.filter(t => t !== tag);
    } else {
        selectedTags.value.push(tag);
    }
    currentPage.value = 1;  // Reset to first page when filters change
};

const filteredArticles = computed(() => {
    if (selectedTags.value.length === 0) {
        return allArticles.value;
    }
    return allArticles.value.filter(article =>
        article.entry_tags.some(tag => selectedTags.value.includes(tag.term))
    );
});

const totalPages = computed(() => {
    return Math.ceil(filteredArticles.value.length / articlesPerPage);
});

const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    return filteredArticles.value.slice(start, end);
});

const setPage = (page) => {
    currentPage.value = page;
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const findNews = (query) => {
    console.log(query);
    customNewsActive.value = true;
    newsServiceLoading.value = true;
    defaultNewsServiceGet.value.getCustomNews(query)
        .then((response) => {
            customArticlesToDisplay.value = response.slice(0, 25);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            newsServiceLoading.value = false;
        });
};

const removeCustomNews = () => {
    customNewsActive.value = false;
    customArticlesToDisplay.value = null;
};

onMounted(() => {
    defaultNewsServiceGet.value = new defaultNewsService();
    defaultNewsServiceGet.value.getDefaultNews()
        .then((response) => {
            allArticles.value = response;  // Store all articles
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            newsServiceLoading.value = false;
        });
});
</script>



