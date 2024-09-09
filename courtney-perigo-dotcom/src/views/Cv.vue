<template>
    <AppNavBar />
    <section class="hero is-fullheight is-primary">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Profile
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                {{ resume_profile }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box p-1 mt-1">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Resources
                            </p>
                        </header>
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
                                <a href="../assets/Perigo_James_Courtney_resume.pdf" download class="button is-link">
                                    <span class="icon">
                                        <i class="fas fa-file-pdf"></i>
                                    </span>
                                    <span>Download Resume</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box p-1 mt-1 ">
                    <div class="card has-background-primary ">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Skills
                            </p>
                        </header>
                        <div class="card-content ">
                            <div class="content">
                                <div class="buttons is-centered ">
                                    <div v-for="skill in resume_skills">
                                        <button class="button is-primary">
                                            <span class="icon">
                                                <i :class="skill.icon"></i>
                                            </span>
                                            <span>{{ skill.name }}</span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box p-1 mt-1">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Education
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                <div class="columns">
                                    <div v-for="education in resume_education">
                                        <div class="column">
                                            <article class="media">
                                                <figure class="media-left">
                                                    <figure class="image is-96x96">
                                                        <img :src="education.image" :alt="education.image_alt">
                                                    </figure>
                                                </figure>
                                                <div class="media-content">
                                                    <div class="content">
                                                        <p class="title is-4 has-text-white">{{ education.degree }}</p>
                                                        <p class="subtitle is-6 has-text-white">{{ education.name }}
                                                        </p>
                                                        <p class="subtitle is-6 has-text-white">{{ education.date }}</p>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box p-1 mt-1">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Experience
                            </p>
                        </header>
                        <div v-for="experience in resume_experience">
                            <header class="card-header">
                                <p class="card-header-title has-text-white">
                                    <span class="has-text-info mr-1">{{ experience.title }}</span> | {{ experience.company }}
                                    | {{ experience.date }}
                                </p>
                            </header>
                            <div class="card-content">
                                <div class="content has-text-white">
                                    {{ experience.description }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box p-1 mt-1">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Publications
                            </p>
                        </header>
                        <div class="card-content">
                            <div v-for="publication in resume_publications">
                                <article class="media">
                                    <figure class="media-left">
                                        <figure class="image is-128x128 center-cropped">
                                            <img :src="publication.image" :alt="publication.image_alt">
                                        </figure>
                                    </figure>
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="title is-4 has-text-white">{{ publication.title }}</p>
                                            <p class="subtitle is-6 has-text-white">{{ publication.publication }} |
                                                {{ publication.date }}</p>
                                            <a :href="publication.link" target="_blank" rel="noopener noreferrer"
                                                class="subtitle is-6 has-text-white has-text-link">Read Article</a>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AppNavBar from '../components/AppNavBar.vue'

export default {
    components: {
        AppNavBar
    },
    data() {
        return {
            resume_profile: "Data science leader and practitioner with decades of experience \
            turning data into insights that drive ROI. An innovator, building proprietary solutions \
            that use machine learning and data engineering to generate millions in value for business. \
            My goal is to affect operations, sales, and marketing through innovative, powerful, \
            and scaled decision analytics product.",
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
            resume_skills: [
                { 
                    name: 'Applied Data Science',
                    icon: 'fas fa-flask'
                },
                { 
                    name: 'Data Engineering',
                    icon: 'fas fa-wrench'
                },
                { 
                    name: 'AI and ML Deployment',
                    icon: 'fas fa-robot'
                },
                { 
                    name: 'Business Intelligence Architecture',
                    icon: 'fas fa-chart-line'
                },
                { 
                    name: 'Servant Leadership',
                    icon: 'fas fa-battery-full'
                },
                { 
                    name: 'Python',
                    icon: 'fab fa-python'
                },
                { 
                    name: 'R',
                    icon: 'fas fa-chart-bar'
                },
                { 
                    name: 'SQL',
                    icon: 'fas fa-database'
                },
                { 
                    name: 'GoLang',
                    icon: 'fas fa-laptop-code'
                },
                { 
                    name: 'Javascript',
                    icon: 'fab fa-js'
                },
                { 
                    name: 'SFMC (Salesforce)',
                    icon: 'fas fa-cloud'
                },
                { 
                    name: 'GCP',
                    icon: 'fab fa-google'
                },
                { 
                    name: 'AWS',
                    icon: 'fab fa-amazon'
                },
            ],
            resume_experience: [
                {
                    title: 'SVP, Executive Director of Marketing and Data Sciences',
                    company: 'Cramer-Krasselt',
                    date: '2021 - Present',
                    description: 'Lead the agency\'s global data science and analytics capabilities with an integrated team across three offices. Build data products, architect analytics microservices, and develop data-driven models for marketing optimization and personalization - creating $5MM+ in annual recurring revenue for the agency. Won the Drum Digital Advertising Award for our novel curve-fit optimization model for marketing attribution.'
                },
                {
                    title: 'SVP, Director of Data Strategy and Utilization',
                    company: 'Cramer-Krasselt',
                    date: '2018 - 2021',
                    description: 'Re-aligned an analytics team, and the tech stack, for an agile analytics approach progressing the agency through a digital transformation for shared intelligence across finance, operations and delivery. Built a predictive benchmarking capability that automates analysis for C-K\'s performance marketing teams - generating a consistent 5-10% increase in paid marketing performance.'
                },
                {
                    title: 'VP, Director of Decision Sciences',
                    company: 'Publicis, Moxie',
                    date: '2014 - 2018',
                    description: 'Recruited and developed top analytics and data science talent to serve the agency\'s largest accounts including eBay, Kohl\'s, and Verizon Wireless. Engineered a real-time Hidden Markov Model that estimates the position of a prospect in the sales funnel for Verizon Wireless. Won a Golden Echo Award for Best Use of Data.'
                },
                {
                    title: 'Director, Analytics',
                    company: 'Triad Retail Media, Walmart',
                    date: '2012 - 2014',
                    description: 'Streamlined reporting and business intelligence, reducing report turnaround times from three days to on-demand by implementing Tableau and a PostgreSQL Data Warehouse in support of the sales department. Helped @WalmartLabs in the development of attribution solutions that link credit card transactions to omni-channel shopper marketing efforts - helping companies like P&G and Pepsi understand the ROI of their retail marketing efforts.'
                },
                {
                    title: 'Market Research Manager, Mobile Healthcare Solutions',
                    company: 'Sage Software',
                    date: '2010 - 2012',
                    description: 'Developed the product roadmap for the company\'s first mobile electronic health records solution for ambulatory care practices. Curated the backlog of product features for software developers, helping the team focus on key features suggested from conjoint-analysis and pricing exercises in primary market research and survey analyses.'
                },
                {
                    title: 'Manager, Analytics',
                    company: 'Triad Retail Media, Walmart',
                    date: '2009 - 2010',
                    description: 'Built the processes for business intelligence for the start-up, helping the sales team achieve $200 million in annual billings.'
                },
                {
                    title: 'Sr. Market Analyst',
                    company: 'Media General, The Tampa Tribune',
                    date: '2005 - 2009',
                    description: 'Conducted statistical analysis, and developed data visualizations in support of news and sales teams with emphasis on geographic information systems and mapping.'
                }
            ],
            resume_publications: [
                {
                    title: 'Data Science at Home: Solving the Nanny Schedule Puzzle with Monte Carlo and Genetic Algorithms',
                    publication: 'Towards Data Science',
                    date: '2024',
                    link: 'https://medium.com/towards-data-science/data-science-at-home-solving-the-nanny-schedule-puzzle-with-monte-carlo-and-genetic-algorithms-eb4b63ada9fe',
                    image: '../assets/rubiks_cube_unsplash.jpg',
                    image_alt: 'A Rubik’s cube on a black background., Credit to Nick Fewings @ Unsplash'
                },
                {
                    title: 'Get More Out of Your Data With Analytics Microservices',
                    publication: 'Towards Data Science',
                    date: '2022',
                    link: 'https://towardsdatascience.com/get-more-out-of-your-data-with-analytics-microservices-9a5a34a3ad2f',
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