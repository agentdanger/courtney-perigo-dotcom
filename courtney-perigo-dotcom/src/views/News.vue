<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Lab</p>
      <h1>MachinaNova: a news recommender</h1>
      <p class="lede">
        Recent data science and analytics articles from RSS feeds, ranked by a recommendation
        model. A pre-built sentence transformer embeds each article and the service returns the
        nearest recent pieces by Euclidean distance. The front end is Vue; the back end is Python
        and Go on App Engine.
        <a href="https://github.com/agentdanger/news-retriever" target="_blank" rel="noopener noreferrer">Source on GitHub</a>.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container" ref="articleContainer">
      <p v-if="newsServiceLoading" class="muted" aria-live="polite">Loading articles…</p>

      <p v-if="selectedTags.length" class="small muted filter-line">
        Filtering by
        <button v-for="t in selectedTags" :key="t" type="button" class="tag tag-btn is-on" @click="toggleTagFilter(t)">
          {{ shortTag(t) }} ×
        </button>
      </p>

      <div v-if="!customNewsActive" class="article-list">
        <article v-for="(article, index) in paginatedArticles" :key="index" class="card article">
          <div :class="['article-thumb', { 'is-fallback': article._useFallback || article.entry_image.url === fallbackImage }]">
            <img
              :src="article._useFallback ? fallbackImage : article.entry_image.url"
              :style="{ objectFit: (article._useFallback || article.entry_image.url === fallbackImage) ? 'contain' : 'cover' }"
              @error="() => { article._useFallback = true; }"
              alt=""
              loading="lazy"
            >
          </div>
          <div class="article-body">
            <p class="card-meta">{{ article.feed_title }}</p>
            <h3>
              <a :href="article.entry_link" target="_blank" rel="noopener noreferrer">{{ article.entry_title }}</a>
            </h3>
            <p>{{ plainText(article.entry_summary) }}</p>
            <div class="tag-row">
              <button
                v-for="(tag, i) in visibleTags(article)"
                :key="i"
                type="button"
                :class="['tag', 'tag-btn', { 'is-on': selectedTags.includes(tag.term) }]"
                @click="toggleTagFilter(tag.term)"
              >
                {{ shortTag(tag.term) }}
              </button>
            </div>
          </div>
        </article>
      </div>

      <nav v-if="totalPages > 1" class="pager" aria-label="Pagination">
        <button type="button" class="btn btn-secondary btn-sm" :disabled="currentPage === 1" @click="prevPage">Previous</button>
        <ul>
          <li><button type="button" class="page" :class="{ current: currentPage === 1 }" @click="setPage(1)">1</button></li>
          <li v-if="currentPage > 4"><span class="muted">…</span></li>
          <li v-for="page in pagesBeforeCurrent" :key="page">
            <button type="button" class="page" @click="setPage(page)">{{ page }}</button>
          </li>
          <li v-if="currentPage !== 1 && currentPage !== totalPages">
            <button type="button" class="page current" aria-current="page">{{ currentPage }}</button>
          </li>
          <li v-for="page in pagesAfterCurrent" :key="page">
            <button type="button" class="page" @click="setPage(page)">{{ page }}</button>
          </li>
          <li v-if="currentPage < totalPages - 3"><span class="muted">…</span></li>
          <li v-if="totalPages > 1">
            <button type="button" class="page" :class="{ current: currentPage === totalPages }" @click="setPage(totalPages)">{{ totalPages }}</button>
          </li>
        </ul>
        <button type="button" class="btn btn-secondary btn-sm" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
      </nav>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import defaultNewsService from '../service/DefaultNewsService';

const fallbackImage = 'https://courtneyperigo.com/assets/brittany.png';
const queryValue = ref(null);
const customNewsActive = ref(false);
const defaultNewsServiceGet = ref(null);
const allArticles = ref([]);
const customArticlesToDisplay = ref([]);
const newsServiceLoading = ref(true);

const selectedTags = ref([]);
const currentPage = ref(1);
const articlesPerPage = 25;
const articleContainer = ref(null);

const hiddenSchemes = [
    'foxnews.com/metadata/dc.identifier',
    'foxnews.com/metadata/prism.channel',
    'foxnews.com/metadata/dc.source'
];

const visibleTags = (article) =>
    (article.entry_tags || []).filter(tag => !hiddenSchemes.includes(tag.scheme)).slice(0, 4);

const shortTag = (term) => term.split('/').pop().split('|').pop().split('\\').pop();

// Some feeds ship HTML in the summary; show it as text.
const plainText = (html) => {
    if (!html) return '';
    const el = document.createElement('div');
    el.innerHTML = html;
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
};

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

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
}

.article {
  flex-direction: row;
  gap: var(--s-5);
  padding: var(--s-4);
}

.article-thumb {
  flex: 0 0 112px;
  width: 112px;
  height: 112px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--border);
}

.article-thumb img {
  width: 100%;
  height: 100%;
}

/* The fallback is a black silhouette on a transparent background; it needs white behind it in both modes. */
.article-thumb.is-fallback {
  background: #FFFFFF;
  padding: var(--s-2);
}

.article-body {
  min-width: 0;
}

.article-body h3 {
  margin-bottom: var(--s-2);
}

.article-body h3 a {
  color: var(--text);
  text-decoration: none;
}

.article-body h3 a:hover {
  color: var(--accent);
}

.article-body p {
  margin-bottom: var(--s-2);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
  margin-top: var(--s-2);
}

.tag-btn {
  cursor: pointer;
  background: transparent;
  font-family: var(--font-body);
  transition: border-color var(--transition), color var(--transition);
}

.tag-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.tag-btn.is-on {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-2);
  margin-bottom: var(--s-4);
}

.pager {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--s-3);
  margin-top: var(--s-6);
}

.pager ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: var(--s-1);
}

.page {
  min-width: 36px;
  height: 36px;
  padding: 0 var(--s-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--fs-small);
  cursor: pointer;
}

.page:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.page.current {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}

.btn:disabled {
  opacity: 0.45;
  cursor: default;
}

@media (max-width: 600px) {
  .article {
    flex-direction: column;
  }

  .article-thumb {
    width: 100%;
    height: 160px;
    flex-basis: auto;
  }
}
</style>
