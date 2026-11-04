<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">CV</p>
      <h1>James "Courtney" Perigo</h1>
      <p class="lede">Data, Analytics &amp; AI Executive. Chicago.</p>
      <div class="actions">
        <a class="btn btn-primary" href="/assets/Perigo_James_Courtney_resume.pdf" download>Download resume (PDF)</a>
        <a v-for="r in resume_resources" :key="r.link" class="btn btn-secondary" :href="r.link" target="_blank" rel="noopener noreferrer">{{ r.name }}</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container cv-grid">
      <div class="cv-main">
        <h2>Profile</h2>
        <p class="prose">{{ resume_profile }}</p>

        <h2>Experience</h2>
        <article v-for="e in resume_experience" :key="e.title + e.company" class="cv-entry">
          <div class="cv-entry-head">
            <p class="cv-entry-company">{{ e.company }} <span class="muted">· {{ e.date }}</span></p>
            <h3>{{ e.title }}</h3>
          </div>
          <p>{{ e.description }}</p>
        </article>

        <h2>Publications</h2>
        <article v-for="p in resume_publications" :key="p.link" class="cv-pub">
          <div class="cv-pub-thumb">
            <img :src="p.image" :alt="p.image_alt" loading="lazy">
          </div>
          <div>
            <h3><a :href="p.link" target="_blank" rel="noopener noreferrer">{{ p.title }}</a></h3>
            <p class="muted small">{{ p.publication }} · {{ p.date }}</p>
          </div>
        </article>
      </div>

      <aside class="cv-side">
        <h2>Skills</h2>
        <div class="tag-row">
          <span v-for="s in resume_skills" :key="s.name" class="tag">{{ s.name }}</span>
        </div>

        <h2>Education</h2>
        <div v-for="ed in resume_education" :key="ed.degree + ed.date" class="cv-edu">
          <img :src="ed.image" :alt="ed.image_alt" width="48" height="48" loading="lazy">
          <div>
            <p class="cv-edu-degree">{{ ed.degree }}</p>
            <p class="muted small">{{ ed.name }} · {{ ed.date }}</p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            resume_profile: "Data, analytics, and AI executive with more than 20 years in agencies and in-house. \
            Leads the teams that ship production ML platforms, agentic AI systems, LLM features built to a per-user cost budget, \
            and the decision tools executives act on. Trained in Bayesian and frequentist inference, with a record of \
            turning around programs under executive scrutiny and owning an analytics P&L.",
            resume_education: [
                {
                    name: 'Northwestern University',
                    degree: 'Master of Science, Data Science',
                    date: '2020 - 2022',
                    image: '../assets/Northwestern_University_seal.png',
                    image_alt: 'Northwestern University Seal'
                },
                {
                    name: 'University of South Florida',
                    degree: 'Master of Business Administration',
                    date: '2007 - 2009',
                    image: '../assets/University_of_South_Florida_seal.svg',
                    image_alt: 'University of South Florida Seal'
                },
                {
                    name: 'University of South Florida',
                    degree: 'Bachelor of Arts, Advertising',
                    date: '1998 - 2003',
                    image: '../assets/University_of_South_Florida_seal.svg',
                    image_alt: 'University of South Florida Seal'
                }
            ],
            resume_resources: [
                {
                    name: 'LinkedIn',
                    link: 'https://www.linkedin.com/in/courtneyperigo/'
                },
                {
                    name: 'GitHub',
                    link: 'https://github.com/agentdanger'
                },
                {
                    name: 'Medium',
                    link: 'https://courtney-perigo.medium.com/'
                }
            ],
            resume_skills: [
                { name: 'Applied Data Science' },
                { name: 'Data Engineering' },
                { name: 'AI and ML Deployment' },
                { name: 'Bayesian Media Mix Modeling' },
                { name: 'AI and LLM Systems (Agentic, MCP)' },
                { name: 'Grounded LLM Generation' },
                { name: 'ML Platform Engineering' },
                { name: 'Analytics Governance & Data Quality' },
                { name: 'Business Intelligence Architecture' },
                { name: 'Servant Leadership' },
                { name: 'Python' },
                { name: 'R' },
                { name: 'SQL' },
                { name: 'GoLang' },
                { name: 'Javascript' },
                { name: 'SFMC (Salesforce)' },
                { name: 'GCP' },
                { name: 'AWS' }
            ],
            resume_experience: [
                {
                    title: 'SVP, Director of Data Science and Analytics',
                    company: 'Empower Ocean Media',
                    date: '2025 - Present',
                    description: 'Lead Empower\'s data science and analytics practice and set technical direction for the agency\'s broader analytics organization. Built a production hierarchical Bayesian marketing mix modeling platform that guides media investment decisions across 50+ markets for clients including Whataburger, JD Sports, PetSmart, and Sprouts Farmers Market. Turned around a flagship measurement program under C-suite scrutiny and returned it from executive escalation to stable in nine weeks. Shipped the team\'s agentic AI infrastructure: a production MCP server gives data scientists and analysts AI-assistant access to production models, and an asynchronous scenario-execution service powers self-service budget optimization for planning teams.'
                },
                {
                    title: 'CEO, Owner of Empire Sports Analytics (ESA)',
                    company: 'Empire Sports Analytics',
                    date: '2022 - Present',
                    description: 'Founded ESA to build data products for the sports industry. Empire Legends, its baseball simulation game, gives every subscribing club its own AI beat writer: four newspaper-style editions a week, every fact computed by code before the model writes, checked by a critic that must cite the record, delivered at $2.33 per club per month after a 50% cost reduction. He owns the simulation engine, data pipeline, model prompts, product, and economics end to end. The architecture is written up on Medium.'
                },
                {
                    title: 'SVP, Executive Director of Data Sciences',
                    company: 'Cramer-Krasselt',
                    date: '2018 - 2025',
                    description: 'Led a 15+ person analytics organization across the Chicago, New York, and Milwaukee offices. Created the agency\'s first advanced analytics team and its first production machine learning. Launched a curve-fit attribution microservice adopted by 8 enterprise clients that added $5M in annual recurring revenue and won a 2023 Drum Digital Advertising Award. Owned the analytics P&L, including product development and new business sales, and led a 2018 turnaround that expanded agency billable rates by 300%.'
                },
                {
                    title: 'VP, Director of Decision Sciences',
                    company: 'Publicis, Moxie',
                    date: '2014 - 2018',
                    description: 'Recruited and developed a 15+ person analytics and data science organization across two offices supporting eBay, Kohl\'s, and Verizon Wireless. Engineered a real-time Hidden Markov Model that scores millions of daily impressions to identify each Verizon prospect\'s funnel stage. Won the DMA Golden Echo Award for Best Use of Data.'
                },
                {
                    title: 'Director, Analytics',
                    company: 'Triad Retail Media, Walmart',
                    date: '2012 - 2014',
                    description: 'Built a PostgreSQL data warehouse and Tableau self-service dashboards that cut sales report turnaround from three days to on-demand. Co-developed an omnichannel attribution engine with @WalmartLabs that linked credit card transactions to shopper marketing touchpoints and gave CPG clients like P&G and Pepsi SKU-level ROI on retail media.'
                },
                {
                    title: 'Market Research Manager, Mobile Healthcare Solutions',
                    company: 'Sage Software',
                    date: '2010 - 2012',
                    description: 'Authored the product roadmap for the company\'s first mobile electronic health records solution for ambulatory practices, grounded in provider surveys, conjoint analysis, and price elasticity studies. Managed the feature backlog so development focused on the capabilities research showed users valued.'
                },
                {
                    title: 'Manager, Analytics',
                    company: 'Triad Retail Media, Walmart',
                    date: '2009 - 2010',
                    description: 'Built the processes for business intelligence for the start-up, helping the sales team achieve $200 million in annual billings.'
                },
                {
                    title: 'Sr. Marketing Analyst',
                    company: 'Media General, The Tampa Tribune',
                    date: '2005 - 2009',
                    description: 'Conducted statistical analysis and developed data visualizations in support of news and sales teams with emphasis on geographic information systems and mapping.'
                }
            ],
            resume_publications: [
                {
                    title: 'Move the Facts Out of the LLM: How a Beat Writer for 10,000 Ballclubs Costs Under $3 a Club',
                    publication: 'Medium',
                    date: '2026',
                    link: 'https://courtney-perigo.medium.com/move-the-facts-out-of-the-llm-how-a-beat-writer-for-10-000-ballclubs-costs-under-3-a-club-503907dff454',
                    image: '../assets/fig1_paper_thumb.jpg',
                    image_alt: 'Masthead and headline of an Empire Legends newspaper edition written by the AI beat writer'
                },
                {
                    title: 'Your Analytics Microservices Have a New Customer',
                    publication: 'Medium',
                    date: '2026',
                    link: 'https://courtney-perigo.medium.com/your-analytics-microservices-have-a-new-customer-6a97d8cc2cf2',
                    image: '../assets/balloons_jesse_gardner_unsplash.jpg',
                    image_alt: 'Hot air balloons in a blue sky, Credit to Jesse Gardner @ Unsplash'
                },
                {
                    title: 'Data Science at Home: Solving the Nanny Schedule Puzzle with Monte Carlo and Genetic Algorithms',
                    publication: 'Towards Data Science',
                    date: '2024',
                    link: 'https://medium.com/towards-data-science/data-science-at-home-solving-the-nanny-schedule-puzzle-with-monte-carlo-and-genetic-algorithms-eb4b63ada9fe',
                    image: '../assets/rubiks_cube_unsplash.jpg',
                    image_alt: 'A Rubik’s cube on a black background. Credit to Nick Fewings @ Unsplash'
                },
                {
                    title: 'Get More Out of Your Data With Analytics Microservices',
                    publication: 'Towards Data Science',
                    date: '2022',
                    link: 'https://medium.com/data-science/get-more-out-of-your-data-with-analytics-microservices-9a5a34a3ad2f',
                    image: '../assets/balloons_unsplash.jpg',
                    image_alt: 'Balloons Floating in the Sky, Credit to Kyle Hinkson @ Unsplash'
                },
                {
                    title: 'Risk Assessment of Daily Fantasy Baseball Games Using Monte Carlo Simulation',
                    publication: 'Hackernoon',
                    date: '2022',
                    link: 'https://hackernoon.com/using-monte-carlo-simulation-to-determine-why-you-wont-win-daily-fantasy-baseball-games',
                    image: '../assets/baseball_diamond_hackernoon.jpeg',
                    image_alt: 'Baseball Home Plate, Credit to Mark Duffel @ Unsplash'
                }
            ]
        }
    }
}
</script>

<style scoped>
.cv-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s-7);
}

@media (min-width: 900px) {
  .cv-grid {
    grid-template-columns: minmax(0, 1fr) 300px;
  }
}

.cv-main h2,
.cv-side h2 {
  margin-top: var(--s-6);
  padding-bottom: var(--s-2);
  border-bottom: 1px solid var(--border);
}

.cv-main h2:first-child,
.cv-side h2:first-child {
  margin-top: 0;
}

.cv-main > p.prose {
  max-width: var(--measure);
}

.cv-entry {
  max-width: var(--measure);
  padding: var(--s-5) 0 var(--s-5) var(--s-4);
  border-left: 2px solid var(--border);
}

.cv-entry + .cv-entry {
  border-top: 1px solid var(--border);
}

.cv-entry-head {
  position: relative;
  margin-bottom: var(--s-3);
}

.cv-entry-head::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--s-4) - 2px);
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent);
}

.cv-entry-company {
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--text);
  margin: 0 0 var(--s-1);
}

.cv-entry-head h3 {
  margin: 0;
}

.cv-entry > p:last-child {
  margin-bottom: 0;
  color: var(--muted);
}

.cv-pub {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--s-4);
  align-items: center;
  margin-bottom: var(--s-4);
  max-width: var(--measure);
}

.cv-pub h3 {
  font-size: var(--fs-body);
  margin-bottom: var(--s-1);
}

.cv-pub h3 a {
  color: var(--text);
  text-decoration: none;
}

.cv-pub h3 a:hover {
  color: var(--accent);
}

.cv-pub p {
  margin: 0;
}

.cv-pub-thumb {
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--border);
}

.cv-pub-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

.cv-edu {
  display: flex;
  gap: var(--s-3);
  align-items: center;
  margin-bottom: var(--s-4);
}

.cv-edu img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  flex: 0 0 48px;
}

.cv-edu p {
  margin: 0;
}

.cv-edu-degree {
  font-weight: 600;
}

@media (max-width: 600px) {
  .cv-pub {
    grid-template-columns: 1fr;
  }
}
</style>
