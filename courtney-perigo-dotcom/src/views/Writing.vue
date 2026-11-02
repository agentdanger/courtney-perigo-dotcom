<script setup>
const featured = [
  {
    title: 'Move the Facts Out of the LLM: How a Beat Writer for 10,000 Ballclubs Costs Under $3 a Club',
    meta: 'Medium, 2026',
    link: 'https://courtney-perigo.medium.com/move-the-facts-out-of-the-llm-how-a-beat-writer-for-10-000-ballclubs-costs-under-3-a-club-503907dff454'
  },
  {
    title: 'Your Analytics Microservices Have a New Customer',
    meta: 'Medium, 2026',
    link: 'https://courtney-perigo.medium.com/your-analytics-microservices-have-a-new-customer-6a97d8cc2cf2'
  },
  {
    title: 'Data Science at Home: Solving the Nanny Schedule Puzzle with Monte Carlo and Genetic Algorithms',
    meta: 'Towards Data Science, 2024',
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
    <div class="container prose">
      <p class="eyebrow">Writing</p>
      <h1>Articles</h1>
      <ul>
        <li v-for="a in featured" :key="a.link">
          <a :href="a.link" target="_blank" rel="noopener noreferrer">{{ a.title }}</a>
          <span class="muted small"> {{ a.meta }}</span>
        </li>
      </ul>
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
