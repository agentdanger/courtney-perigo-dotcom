<template>
  <section class="section">
    <div class="container prose">
      <p class="eyebrow">About</p>
      <h1>About Courtney</h1>
      <p class="lede">{{ about_me }}</p>
      <ul>
        <li v-for="(item, i) in about_me_interests_list" :key="i">{{ item.interest }}</li>
      </ul>
      <div class="actions">
        <a v-for="r in resume_resources" :key="r.link" class="btn btn-secondary btn-sm" :href="r.link" target="_blank" rel="noopener noreferrer">{{ r.name }}</a>
      </div>

      <h2>About this website</h2>
      <p>{{ about_website }}</p>
      <p>{{ about_lab }}</p>
      <p>
        <a :href="website_github_link.link" target="_blank" rel="noopener noreferrer">{{ website_github_link.name }}</a>
      </p>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            about_me: "Courtney lives in Chicago, IL, USA with his beautiful wife Emilie, their son Whitman, \
            their cat Roscoe, and their Brittany Spaniel, Oakley. He's an avid runner and tennis player, and \
            always up for a challenge. He can be reached via his LinkedIn profile so feel free to send a note.",
            about_website: "This website runs on Google Cloud Platform on App Engine. The front end is Vue, built with Vite, \
            and served as static files. Each Lab tool is backed by its own small service in Python or Go, also on App Engine. \
            The source code is on GitHub.",
            about_lab: "The Lab pages are real systems rather than demos: the Wordle solver runs against a public API with its own stats, \
            the portfolio optimizer refreshes daily, and the news recommender ranks articles with a sentence-transformer model. \
            Each has its own repository linked from its page.",
            about_me_interests_list: [
                {
                    interest: 'He has deep experience in marketing and product management - creating and executing on strategies to drive growth and profitability through product and business plans.'
                },
                {
                    interest: 'He has a passion for data science and machine learning, and has developed models that power innovative, award-winning business solutions for his clients.'
                },
                {
                    interest: 'There is so much untapped potential for data in business. He wants to help organizations he works for realize that value and turn it into amazing, profitable experiences for their customers.'
                },
                {
                    interest: 'He spends his weekends chasing a tennis ball, his son Whitman, and his Brittany Spaniel Oakley, in ascending order of difficulty.'
                },
                {
                    interest: 'His family holiday displays are *definitely* not powered by a Raspberry Pi and a Python script.'
                },
                {
                    interest: 'He would never let a fleet of AI agents run his home server, keep version-controlled diaries of everything they do, and brief the family with a weekly executive update.'
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
                },
                {
                    name: 'Called Shot',
                    link: 'https://calledshotadvisory.com'
                }
            ],
            website_github_link: {
                name: 'CourtneyPerigo.com on GitHub',
                link: 'https://github.com/agentdanger/courtney-perigo-dotcom'
            }
        }
    }
}
</script>
