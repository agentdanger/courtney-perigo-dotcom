<script setup>
const logos = {
  whataburger: { name: 'Whataburger', src: '/assets/clients/whataburger.svg', h: 36 },
  jdsports: { name: 'JD Sports', src: '/assets/clients/jd-sports.svg', h: 26 },
  petsmart: { name: 'PetSmart', src: '/assets/clients/petsmart.svg', h: 20 },
  sprouts: { name: 'Sprouts Farmers Market', src: '/assets/clients/sprouts.svg', h: 30 },
  hometap: { name: 'Hometap', src: '/assets/clients/hometap.svg', h: 22 },
  cedarfair: { name: 'Cedar Fair', src: '/assets/clients/cedar-fair.png', h: 18 },
  belletire: { name: 'Belle Tire', src: '/assets/clients/belle-tire.png', h: 22 },
  edwardjones: { name: 'Edward Jones', src: '/assets/clients/edward-jones.svg', h: 16 },
  esa: { name: 'Empire Sports Analytics', src: '/assets/clients/empire-sports.png', h: 32 }
}

const cases = [
  {
    id: 'mmm-platform',
    eyebrow: 'Measurement at scale',
    title: 'A Bayesian marketing mix platform that replaced quarterly studies',
    where: 'Empower Ocean Media, 2025 to present.',
    clients: ['whataburger', 'jdsports', 'petsmart', 'sprouts'],
    situation:
      'Enterprise clients were planning media against static marketing mix studies refreshed once a quarter. By the time a read arrived, the plan it described had moved on, and every refresh was a new project with its own data wrangling and its own judgment calls.',
    built:
      'A production hierarchical Bayesian MMM platform serving multiple clients across markets, regional footprints, and national programs. Model releases are versioned. Refresh pipelines and quality gates run automatically, governed by data-delivery SLAs and input standards, so a new read is a scheduled event rather than a study. An asynchronous scenario-execution service with job submission APIs, a self-healing runner, and a self-service web app lets planning teams run large budget optimizations on demand.',
    result:
      'Continuously updated reads that planning teams use directly, helping optimize hundreds of millions of dollars in annual media spend across those clients. Recommendations from the platform have informed seven-figure media reallocations, an account defense win, and new business pitches. Findings are presented to client executive teams and briefed to the agency CEO weekly.'
  },
  {
    id: 'turnaround',
    eyebrow: 'Leadership under scrutiny',
    title: 'A flagship measurement program returned from escalation to stable in nine weeks',
    where: 'Empower Ocean Media, 2025.',
    clients: ['whataburger'],
    situation:
      'A flagship client\'s measurement program was under C-suite scrutiny. The client was expanding into new markets, and the off-the-shelf modeling approach credited the opening ramp of each new market to media, which produced reads nobody could defend in the room.',
    built:
      'Rebuilt the modeling approach around how new markets actually behave: pre-launch weeks are handled explicitly rather than zero-padded, the baseline is gated on activation, and where several model specifications fit the data equally well, the read is chosen on credibility rather than fit. Set an operating cadence with the client team to walk through each read and adjust the new-market plans.',
    result:
      'Decision-defensible reads in new markets, holdout error cut to a fraction of where it started, and the program back from executive escalation to stable in nine weeks. The agency retained the new modeling capabilities as proprietary IP.'
  },
  {
    id: 'agentic-ai',
    eyebrow: 'Agentic AI',
    title: 'Giving analysts an AI assistant that reads the real models',
    where: 'Empower Ocean Media, 2025 to present. Public demo: the Wordle MCP server.',
    clients: ['jdsports', 'hometap'],
    situation:
      'Analysts were already asking AI assistants about the models. Without access to the production systems, the assistant answered confidently from nothing, and every real question became an interrupt for a data scientist.',
    built:
      'A production Model Context Protocol server that exposes the MMM platform, the reporting API, and the scenario engine as tools an AI assistant can call. A version-controlled knowledge base is served alongside the tools so AI-drafted analysis stays reviewable, and model artifacts are versioned so the assistant answers from a known release. The same pattern, built in public: an open-source MCP server over the Wordle stats API from the Lab, written up in "Your Analytics Microservices Have a New Customer."',
    result:
      'Analysts self-serve what used to be data-scientist interrupts. The assistant reads real model outputs instead of inventing them, and the review loop got faster without getting looser.',
    links: [
      { label: 'Wordle MCP server on GitHub', href: 'https://github.com/agentdanger/wordle-mcp-server' },
      { label: 'The article on Medium', href: 'https://courtney-perigo.medium.com/your-analytics-microservices-have-a-new-customer-6a97d8cc2cf2' }
    ]
  },
  {
    id: 'beat-writer',
    eyebrow: 'Production LLM system',
    title: 'An AI beat writer for 10,000 ballclubs at $2.33 per club per month',
    where: 'Empire Sports Analytics, founder and owner, 2022 to present.',
    clients: ['esa'],
    situation:
      'Empire Legends, a subscription baseball simulation, needed every subscribing club to have its own beat writer: four newspaper-style editions a week, written from the game record, at a cost the subscription price could carry. A language model that computes its own facts gets the score wrong, and one that reads an entire season gets expensive.',
    built:
      'A three-part architecture, owned end to end. A deterministic layer does every piece of arithmetic before the model reads a word and names what the model may never compute. A second, cheaper model acts as a cited critic: an issue does not count unless it quotes the record, and repair patches only the paragraph at fault. Prompt caching, batch inference, and a regression set measured after every change keep the cost budget honest.',
    result:
      'Four grounded editions a week per club at $2.33 per club per month after a 50% cost reduction, with the first-draft pass rate up from one in four to three in four. The architecture is published as a reference pattern for any narrative generated from a system of record.',
    links: [
      { label: 'Move the Facts Out of the LLM', href: 'https://courtney-perigo.medium.com/move-the-facts-out-of-the-llm-how-a-beat-writer-for-10-000-ballclubs-costs-under-3-a-club-503907dff454' }
    ]
  },
  {
    id: 'next-to-buy',
    eyebrow: 'Predictive CRM',
    title: 'Next to Buy Tire: a model that predicts each customer\'s next purchase and brings it forward',
    where: 'Cramer-Krasselt, for Belle Tire. Built November 2024, in production since.',
    clients: ['belletire'],
    situation:
      'Tires are a low-frequency purchase that customers put off until they have to make it. Belle Tire already held the signal that says when, because every service visit records the vehicle and its wear. The retailer wanted to bring each customer\'s next purchase forward and keep improving that cycle.',
    built:
      'Next to Buy Tire, a proportional hazards survival model that predicts the days until each customer\'s next tire purchase from technician inputs at service, mileage and tire-wear notes, previous transactions, vehicle year, make, and model, and what changed between visits for that customer and VIN. It scores every customer across the entire Belle Tire footprint, more than 180 stores in Michigan, Ohio, Indiana, and Illinois. He designed and built the model hands-on, handed it to the data science team, and led the engineering team through deployment. The prediction runs two programs: retargeting in The Trade Desk, CTV, and social, timed to each customer\'s window, and the CRM program that reaches customers as the window approaches.',
    result:
      'Against a holdout, a consistent 5 to 10% acceleration in days to next purchase, and millions of dollars in incremental revenue and new tire purchases. In production since November 2024, the cycle is now a number the business manages and keeps improving.'
  },
  {
    id: 'attribution-product',
    eyebrow: 'Product and P&L',
    title: 'An attribution product that added $5M in recurring revenue',
    where: 'Cramer-Krasselt, SVP, Executive Director of Data Sciences, 2018 to 2025. Chicago, New York, and Milwaukee.',
    clients: ['cedarfair', 'belletire', 'edwardjones'],
    situation:
      'The agency\'s analytics function was a reporting cost center across three offices. Media clients wanted attribution they could act on, and the analytics P&L, including product development and new business, was his to own.',
    built:
      'Created the agency\'s first advanced analytics team and its first production machine learning. Launched a curve-fit attribution microservice as a product: independently deployable, replicated per client, sold as part of the media offering. Realigned the team and modernized the stack around agile ways of working.',
    result:
      'Adopted by eight enterprise clients across retail, financial services, and CPG, the product added $5M in annual recurring revenue and won a 2023 Drum Digital Advertising Award. A 2018 turnaround of the practice expanded billable rates by 300%.'
  }
]
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Work</p>
      <h1>Case studies</h1>
      <p class="lede">
        Six case studies from across the career. The <RouterLink to="/cv">CV</RouterLink> carries the full record.
      </p>
      <nav class="case-nav" aria-label="Case studies">
        <a v-for="c in cases" :key="c.id" :href="'#' + c.id">{{ c.eyebrow }}</a>
      </nav>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <article v-for="c in cases" :key="c.id" :id="c.id" class="case">
        <div class="case-head">
          <p class="eyebrow">{{ c.eyebrow }}</p>
          <h2>{{ c.title }}</h2>
          <p class="muted small">{{ c.where }}</p>
          <p v-if="c.clients" class="client-logos-label">Clients served</p>
          <ul v-if="c.clients" class="client-logos" aria-label="Clients served">
            <li v-for="k in c.clients" :key="k">
              <img
                :src="logos[k].src"
                :alt="logos[k].name"
                :title="logos[k].name"
                :style="{ height: logos[k].h + 'px' }"
                loading="lazy"
                decoding="async"
              >
            </li>
          </ul>
        </div>
        <div class="case-body">
          <h3>Situation</h3>
          <p>{{ c.situation }}</p>
          <h3>What he built</h3>
          <p>{{ c.built }}</p>
          <h3>Result</h3>
          <p>{{ c.result }}</p>
          <p v-if="c.links" class="small">
            <template v-for="(l, i) in c.links" :key="l.href">
              <span v-if="i > 0"> · </span>
              <a :href="l.href" target="_blank" rel="noopener noreferrer">{{ l.label }}</a>
            </template>
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.case-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2) var(--s-4);
  margin-top: var(--s-4);
}

.case-nav a {
  font-size: var(--fs-small);
  font-weight: 600;
  text-decoration: none;
}

.case {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s-4) var(--s-7);
  padding: var(--s-6) 0;
  border-top: 1px solid var(--border);
  scroll-margin-top: var(--s-5);
}

.case:last-child {
  border-bottom: 1px solid var(--border);
}

.case-head h2 {
  margin-bottom: var(--s-2);
}

.case-body {
  max-width: var(--measure);
}

.case-body h3 {
  font-family: var(--font-body);
  font-size: var(--fs-eyebrow);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin: var(--s-4) 0 var(--s-2);
}

.case-body h3:first-child {
  margin-top: 0;
}

@media (min-width: 900px) {
  .case {
    grid-template-columns: 1fr 1.6fr;
  }
}
</style>
