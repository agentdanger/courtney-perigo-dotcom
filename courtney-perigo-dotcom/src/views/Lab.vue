<script setup>
import { RouterLink } from 'vue-router'

const tools = [
  {
    title: 'Wordle solver',
    text: 'An entropy-based solver over a public API, with a stats dashboard and the MCP server from the microservices article.',
    to: '/wordle',
    repo: 'https://github.com/agentdanger/nytimes-games'
  },
  {
    title: 'Optimal portfolio',
    text: 'A Monte Carlo portfolio optimizer over U.S. stocks, refreshed daily, with a backtest and a $500 minimum allocation per holding.',
    to: '/optimal-portfolio',
    repo: 'https://github.com/agentdanger/stock-portfolio-optimizer'
  },
  {
    title: 'News recommender',
    text: 'Data science articles from RSS feeds, ranked by a recommendation model trained on his reading preferences.',
    to: '/news-recommender',
    repo: 'https://github.com/agentdanger/news-retriever'
  }
]
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Lab</p>
      <h1>Live tools</h1>
      <p class="lede">Three small systems that run for real, each backed by its own service on App Engine.</p>
      <div class="grid grid-3" style="margin-top: var(--s-5)">
        <article v-for="t in tools" :key="t.to" class="card">
          <h3>{{ t.title }}</h3>
          <p>{{ t.text }}</p>
          <p class="small"><a :href="t.repo" target="_blank" rel="noopener noreferrer">Source on GitHub</a></p>
          <RouterLink class="card-link" :to="t.to">Open the tool</RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>
