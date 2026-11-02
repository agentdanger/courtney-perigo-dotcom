<script setup>
const featured = [
  {
    title: 'Move the Facts Out of the LLM',
    subtitle: 'How a beat writer for 10,000 ballclubs costs under $3 a club',
    meta: 'Medium, 2026',
    text: 'A production LLM system that never computes a fact: deterministic pre-computation, a critic that must cite the record, a repair loop that patches one paragraph, and the cost engineering that holds it at $2.33 per club per month.',
    image: '/assets/fig1_paper_thumb.jpg',
    alt: 'Masthead and headline of an Empire Legends newspaper edition written by the AI beat writer',
    link: 'https://courtney-perigo.medium.com/move-the-facts-out-of-the-llm-how-a-beat-writer-for-10-000-ballclubs-costs-under-3-a-club-503907dff454'
  },
  {
    title: 'Your Analytics Microservices Have a New Customer',
    subtitle: 'An MCP server for production analytics',
    meta: 'Medium, 2026',
    text: 'A sequel to the 2022 microservices article. The highest-volume consumer of a well-built analytics service is now an AI agent, and the communication cost the first article warned about is what the Model Context Protocol standardized. With an open-source demo.',
    image: '/assets/balloons_jesse_gardner_unsplash.jpg',
    alt: 'Hot air balloons in a blue sky. Credit to Jesse Gardner at Unsplash',
    link: 'https://courtney-perigo.medium.com/your-analytics-microservices-have-a-new-customer-6a97d8cc2cf2'
  },
  {
    title: 'Data Science at Home',
    subtitle: 'Solving the nanny schedule puzzle with Monte Carlo and genetic algorithms',
    meta: 'Towards Data Science, 2024',
    text: 'Workforce optimization at household scale: simulate the demand, evolve the schedule, and let the fitness function argue with the family calendar.',
    image: '/assets/rubiks_cube_unsplash.jpg',
    alt: 'A Rubik\'s cube on a black background. Credit to Nick Fewings at Unsplash',
    link: 'https://medium.com/towards-data-science/data-science-at-home-solving-the-nanny-schedule-puzzle-with-monte-carlo-and-genetic-algorithms-eb4b63ada9fe'
  }
]

const earlier = [
  {
    title: 'Get More Out of Your Data With Analytics Microservices',
    meta: 'Towards Data Science, 2022',
    link: 'https://medium.com/data-science/get-more-out-of-your-data-with-analytics-microservices-9a5a34a3ad2f'
  },
  {
    title: 'Risk Assessment of Daily Fantasy Baseball Games Using Monte Carlo Simulation',
    meta: 'HackerNoon, 2022',
    link: 'https://hackernoon.com/using-monte-carlo-simulation-to-determine-why-you-wont-win-daily-fantasy-baseball-games'
  }
]
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Writing</p>
      <h1>Articles</h1>
      <p class="lede">
        Long-form pieces on production LLM systems, analytics architecture, and applied data science.
        More on <a href="https://courtney-perigo.medium.com/" target="_blank" rel="noopener noreferrer">Medium</a>.
      </p>
      <div class="grid grid-3" style="margin-top: var(--s-5)">
        <article v-for="a in featured" :key="a.link" class="card">
          <div class="card-media">
            <img :src="a.image" :alt="a.alt" loading="lazy">
          </div>
          <p class="card-meta">{{ a.meta }}</p>
          <h3>{{ a.title }}</h3>
          <p class="small" style="color: var(--text)">{{ a.subtitle }}</p>
          <p>{{ a.text }}</p>
          <a class="card-link" :href="a.link" target="_blank" rel="noopener noreferrer">Read the article</a>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container prose">
      <h2>Earlier</h2>
      <ul>
        <li v-for="a in earlier" :key="a.link">
          <a :href="a.link" target="_blank" rel="noopener noreferrer">{{ a.title }}</a>
          <span class="muted small"> {{ a.meta }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
