<script setup>
const proofs = [
  {
    id: 'next-to-buy',
    title: 'Days to next tire purchase, down 5 to 10% against a holdout',
    text: 'A survival model for Belle Tire that predicts each customer\'s next purchase and brings it forward. In production since November 2024, read against a holdout the whole way.'
  },
  {
    id: 'mmm-platform',
    title: 'Hundreds of millions in annual media spend, read continuously',
    text: 'A hierarchical Bayesian marketing mix platform serving multiple clients, with every model release versioned and the reads used directly by planning teams.'
  },
  {
    id: 'beat-writer',
    title: 'An AI beat writer at $2.33 per club per month',
    text: 'Four grounded editions a week for 10,000 ballclubs, after a 50% cost reduction, with every draft checked before it publishes.'
  }
]
</script>

<template>
  <section class="section">
    <div class="container cs-hero">
      <div class="cs-hero-copy">
        <p class="eyebrow">Working with me</p>
        <h1 class="cs-title">Called Shot names the result before the work starts.</h1>
        <p class="lede">
          Every engagement opens with a one-page scope: the result, how it will be read, the
          date of the read that settles it, and the price. Then the work.
        </p>
      </div>
      <aside class="card cs-firm">
        <span class="cs-lockup" role="img" aria-label="Called Shot"></span>
        <p class="cs-firm-name">Called Shot LLC, Chicago</p>
        <p>
          Courtney Perigo's practice for fractional CDAO work, marketing measurement,
          audience models, and AI systems.
        </p>
        <p class="cs-firm-tagline">Results named in advance.</p>
        <div class="actions">
          <a href="https://calledshotadvisory.com" class="btn btn-primary" target="_blank" rel="noopener noreferrer">calledshotadvisory.com</a>
          <a href="https://www.linkedin.com/in/courtneyperigo/" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </aside>
    </div>
  </section>

  <section class="section">
    <div class="container cs-layout">
      <div class="cs-main">
        <h2>How it works</h2>
        <ol class="cs-steps">
          <li>A short conversation about the one result you need, by when, and how you measure it today.</li>
          <li>A one-page scope that names the result, the measure, the date, and the price. If the data you have cannot support a called shot, the scope says what would make one possible instead.</li>
          <li>The work, with a read on a fixed cadence against a holdout, the group the program leaves untouched so the result has a baseline. Each read is reviewed with your team before it travels.</li>
          <li>The handover. You hold what was built: the IP, the pipelines, and the results.</li>
        </ol>

        <h2>What Called Shot does</h2>
        <ul class="cs-services">
          <li><strong>Fractional CDAO.</strong> Stands up or resets a data, analytics, and AI function: the hires, the platform, the governance, and the operating cadence with the executive team. You hold the function, its platform, and its cadence, running without Called Shot.</li>
          <li><strong>Marketing mix and measurement.</strong> Builds or audits the marketing mix model, the MMM that reads what each channel returned, and the attribution program behind the media plan: the data standards, the refresh pipeline, the holdout design, and the readout the executive team acts on. You hold the model, the pipeline, and the readout.</li>
          <li><strong>Audience models and activation.</strong> Builds the models that say who to reach and when: days to next purchase, likelihood to churn, likelihood to become a high-value customer. Scores every customer on a schedule and pushes the audiences into the places the money is spent, the CRM program, digital media, CTV, and social, timed to each customer's window. You hold the model, the scoring pipeline, the audiences in your own platforms, and the holdout that shows what they moved.</li>
          <li><strong>AI and automated systems.</strong> Designs the AI features and automated workflows that run in production: LLM features grounded in your own data, multi-step pipelines that act on a schedule, each reviewable by the people accountable for it and built to a cost per user set in advance. You hold the system, the tests it is judged against, and its cost per user, in writing.</li>
        </ul>

        <h2>Who it is for</h2>
        <p>
          Marketing and analytics leaders at brands and agencies who need a senior operator for a
          defined stretch rather than a permanent hire. Executives who want a second opinion on a
          measurement or AI program before committing to it. Teams with a number to move next year
          and no one yet willing to name it.
        </p>
      </div>

      <aside class="cs-aside">
        <div class="card cs-scope-card">
          <p class="eyebrow">What a scope looks like</p>
          <h3>One page, signed before the work</h3>
          <dl class="cs-scope">
            <dt>Result named</dt>
            <dd>Days to next purchase down 5% across every store.</dd>
            <dt>Measured by</dt>
            <dd>A 10% holdout, read monthly, every model release versioned.</dd>
            <dt>By</dt>
            <dd>The read of YYYY-MM-DD.</dd>
            <dt>Price</dt>
            <dd>Fixed for the scope, built from $250 to $400 an hour; fractional work on a monthly retainer. Half at signature, half at the first read that clears the result.</dd>
            <dt>You hold</dt>
            <dd>The IP, the pipelines, and the results.</dd>
          </dl>
          <p class="cs-scope-note">An example. Every engagement gets its own page.</p>
          <div class="actions cs-scope-actions">
            <a href="https://calledshotadvisory.com" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Start a scope</a>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Three results, named and read</h2>
        <router-link to="/work" class="card-link">All six case studies</router-link>
      </div>
      <div class="grid grid-3">
        <article v-for="p in proofs" :key="p.id" class="card">
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
          <router-link :to="{ path: '/work', hash: '#' + p.id }" class="card-link">Read the case</router-link>
        </article>
      </div>
    </div>
  </section>
</template>
