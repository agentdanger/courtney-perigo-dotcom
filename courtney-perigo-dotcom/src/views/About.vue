<template>
    <AppNavBar />

    <div class="hero is-fullheight is-primary">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                About Me
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                {{ about_me }}
                                <div v-for="interest in about_me_interests_list">
                                    <ul>
                                        <li class="has-text-white">
                                        {{ interest.interest }}
                                        </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="buttons is-centered ">
                                <div v-for="resource in resume_resources">
                                    <a :href="resource.link" target="_blank" rel="noopener noreferrer"
                                        class="button is-link">
                                        <span class="icon">
                                            <i :class="resource.icon"></i>
                                        </span>
                                        <span>{{ resource.name }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hero is-small is-black">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                About This Website
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                <p>{{ about_website }}</p>
                                <p>{{ about_running }}</p>
                                <p>{{ about_news }}</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="buttons is-centered ">
                                    <a :href="website_github_link.link" target="_blank" rel="noopener noreferrer"
                                        class="button is-link">
                                        <span class="icon">
                                            <i :class="website_github_link.icon"></i>
                                        </span>
                                        <span>{{ website_github_link.name }}</span>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavBar from '../components/AppNavBar.vue'

export default {
    components: {
        AppNavBar
    },
    data() {
        return {
            about_me: "Courtney lives in Chicago, IL, USA with his beautiful fiance and cat Roscoe. \
            He's an avid runner, and always up for a challenge. He can be reached via his LinkedIn profile \
            so feel free to send a note.",
            about_website: "This website runs on Google Cloud Platform leveraging their Google App Engine product. \
            The front-end is built with Vue.js and the back-end is built with Python or GoLang (depending on what you're looking at). \
            The source code is available on Github.",
            about_running: "The running data visualization is a Python script that pulls data from Strava's API and \
            generates an ApexChart data viz. Credentials are cycled using a cron job within Google App Engine.",
            about_news: "The news page is a work in progress. It leverages a pre-trained recommendation model based on my data science news preferences \
            and pulls interesting data science articles from an RSS feed. The front-end is built with Vue.js and the back-end is built with Python and GoLang.",
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
                    interest: 'His family holiday displays are *definitely* not powered by a Raspberry Pi and a Python script.'
                },
                {
                    interest: 'He would never over-engineer his home server with a Kubernetes cluster and a bunch of Docker containers handling way too much automation for his family.'
                }   
            ],
            resume_resources: [
                {
                    name: 'Github',
                    icon: 'fab fa-github',
                    link: 'https://github.com/agentdanger'
                },
                {
                    name: 'Medium',
                    icon: 'fab fa-medium',
                    link: 'https://courtney-perigo.medium.com/'
                },
                {
                    name: 'LinkedIn',
                    icon: 'fab fa-linkedin',
                    link: 'https://www.linkedin.com/in/courtneyperigo/'
                }
            ],
            website_github_link: {
                name: 'CourtneyPerigo.com on Github',
                icon: 'fab fa-github',
                link: 'https://github.com/agentdanger/courtney-perigo-dotcom'
            }
        }
    }
}
</script>