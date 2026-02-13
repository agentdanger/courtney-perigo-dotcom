<template>
    <AppNavBar />
    <div class="hero is-fullheight is-primary" ref="articleContainer">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header">
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
                        <header class="card-header">
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
                                            <img
                                                :src="article._useFallback ? fallbackImage : article.entry_image.url"
                                                :style="{ height: '100%', objectFit: (article._useFallback || article.entry_image.url === fallbackImage) ? 'contain' : 'cover' }"
                                                @error="() => { article._useFallback = true; }"
                                                alt="Placeholder image"
                                            >
                                        </figure>
                                    </div>
                                    <div class="media-content">
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
                    <ul class="pagination-list">
                        <!-- Always show the first page -->
                        <li>
                            <a 
                                class="pagination-link" 
                                @click="setPage(1)" 
                                :class="{ 'is-current': currentPage === 1 }"
                            >1</a>
                        </li>

                        <!-- Show ellipses if there are pages between the first and the current - 2 -->
                        <li v-if="currentPage > 4"><span class="pagination-ellipsis">&hellip;</span></li>

                        <!-- Show 2 pages before the current page -->
                        <li v-for="page in pagesBeforeCurrent" :key="page">
                            <a 
                                class="pagination-link" 
                                @click="setPage(page)" 
                                :class="{ 'is-current': currentPage === page }"
                            >{{ page }}</a>
                        </li>

                        <!-- Show the current page -->
                        <li v-if="currentPage !== 1 && currentPage !== totalPages">
                            <a 
                                class="pagination-link is-current" 
                            >{{ currentPage }}</a>
                        </li>

                        <!-- Show 2 pages after the current page -->
                        <li v-for="page in pagesAfterCurrent" :key="page">
                            <a 
                                class="pagination-link" 
                                @click="setPage(page)" 
                                :class="{ 'is-current': currentPage === page }"
                            >{{ page }}</a>
                        </li>

                        <!-- Show ellipses if there are pages between the current + 2 and the last -->
                        <li v-if="currentPage < totalPages - 3"><span class="pagination-ellipsis">&hellip;</span></li>

                        <!-- Always show the last page -->
                        <li>
                            <a 
                                class="pagination-link" 
                                @click="setPage(totalPages)" 
                                :class="{ 'is-current': currentPage === totalPages }"
                            >{{ totalPages }}</a>
                        </li>
                    </ul>
                    <a 
                        class="pagination-next" 
                        @click="nextPage" 
                        :class="{ 'is-disabled': currentPage === totalPages }"
                        :style="{ pointerEvents: currentPage === totalPages ? 'none' : 'auto' }"
                    >Next</a>
                </div>

                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header">
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
                            <div class="buttons is-centered">
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
import defaultNewsService from '../service/DefaultNewsService';
import AppNavBar from '../components/AppNavBar.vue';

const fallbackImage = 'https://courtneyperigo.com/assets/brittany.png';
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
const articleContainer = ref(null);

const toggleTagFilter = (tag) => {
    if (selectedTags.value.includes(tag)) {
        selectedTags.value = selectedTags.value.filter(t => t !== tag);
    } else {
        selectedTags.value.push(tag);
    }
    currentPage.value = 1;  // Reset to first page when filters change
    scrollToTop();
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Calculate the pages to show before and after the current page
const pagesBeforeCurrent = computed(() => {
    const start = Math.max(currentPage.value - 2, 2);
    const end = currentPage.value - 1;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const pagesAfterCurrent = computed(() => {
    const start = currentPage.value + 1;
    const end = Math.min(currentPage.value + 2, totalPages.value - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const setPage = (page) => {
    currentPage.value = page;
    scrollToTop();
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        scrollToTop();
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        scrollToTop();
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
            scrollToTop();
        });
};

const removeCustomNews = () => {
    customNewsActive.value = false;
    customArticlesToDisplay.value = null;
    scrollToTop();
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


