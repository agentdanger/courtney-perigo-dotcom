<script setup>
import { RouterLink } from 'vue-router'

const resume = '/assets/Perigo_James_Courtney_resume.pdf'

const proofs = [
  {
    title: 'Marketing mix platform',
    text: 'A hierarchical Bayesian MMM platform that replaced quarterly studies with continuously refreshed reads across 50-plus markets.',
    to: '/work',
    label: 'Read the case study'
  },
  {
    title: 'An AI beat writer for 10,000 ballclubs',
    text: 'A production LLM system that writes four grounded editions a week per club for $2.33 per club per month. Every number is computed before the model writes.',
    to: '/writing',
    label: 'Read the article'
  },
  {
    title: 'Turnaround and P&L',
    text: 'Owned the analytics P&L at Cramer-Krasselt across three offices; a 2018 turnaround expanded billable rates by 300%, and an attribution product added $5M in annual recurring revenue.',
    to: '/work',
    label: 'Read the case study'
  }
]

const articles = [
  {
    title: 'Move the Facts Out of the LLM',
    meta: 'Medium, 2026',
    text: 'How a beat writer for 10,000 ballclubs costs under $3 a club: deterministic pre-computation, a critic that must cite the record, and a repair loop.',
    image: '/assets/fig1_paper_thumb.jpg',
    alt: 'Front page of an Empire Legends edition',
    link: 'https://courtney-perigo.medium.com/move-the-facts-out-of-the-llm-how-a-beat-writer-for-10-000-ballclubs-costs-under-3-a-club-503907dff454'
  },
  {
    title: 'Your Analytics Microservices Have a New Customer',
    meta: 'Medium, 2026',
    text: 'The highest-volume consumer of a well-built analytics service is now an AI agent. An MCP server for production analytics, with an open-source demo.',
    image: '/assets/balloons_jesse_gardner_unsplash.jpg',
    alt: 'Hot air balloons',
    link: 'https://courtney-perigo.medium.com/your-analytics-microservices-have-a-new-customer-6a97d8cc2cf2'
  }
]
</script>

<template>
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">Data, Analytics &amp; AI Executive</p>
        <h1 class="display">Analytics and AI systems that executives trust, and the teams that ship them.</h1>
        <p class="lede">
          Transforming data into business value for more than twenty years: Courtney Perigo leads
          data science and analytics organizations in agencies and in-house, from Bayesian marketing
          mix platforms to production LLM systems built to a cost budget. Chicago.
        </p>
        <div class="actions">
          <a class="btn btn-primary" :href="resume" download>Download resume</a>
          <RouterLink class="btn btn-secondary" to="/work">See the work</RouterLink>
        </div>
      </div>
      <img class="headshot" src="/assets/lion_courtney.JPG" alt="Courtney Perigo" width="160" height="160">
    </div>
  </section>

  <section class="section">
    <div class="container">
      <p class="eyebrow">Proof</p>
      <div class="grid grid-3">
        <article v-for="p in proofs" :key="p.title" class="card">
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
          <RouterLink class="card-link" :to="p.to">{{ p.label }}</RouterLink>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Writing</h2>
        <RouterLink class="small" to="/writing">All writing</RouterLink>
      </div>
      <div class="grid grid-2">
        <article v-for="a in articles" :key="a.link" class="card">
          <div class="card-media">
            <img :src="a.image" :alt="a.alt" loading="lazy">
          </div>
          <p class="card-meta">{{ a.meta }}</p>
          <h3>{{ a.title }}</h3>
          <p>{{ a.text }}</p>
          <a class="card-link" :href="a.link" target="_blank" rel="noopener noreferrer">Read on Medium</a>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container prose">
      <h2>Working with me</h2>
      <p>
        Fractional CDAO, marketing measurement, audience models, and AI and automated systems,
        through Called Shot. Every engagement opens with the result named in advance.
      </p>
      <RouterLink class="btn btn-secondary btn-sm" to="/working-with-me">How an engagement starts</RouterLink>
    </div>
  </section>
</template>
