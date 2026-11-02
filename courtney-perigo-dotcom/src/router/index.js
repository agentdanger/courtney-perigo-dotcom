import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const SITE = 'Courtney Perigo'
const DEFAULT_DESCRIPTION =
  'Courtney Perigo is a data, analytics, and AI executive in Chicago. Analytics and AI systems that executives trust, and the teams that ship them.'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      title: `${SITE} | transforming data into business value`,
      description: DEFAULT_DESCRIPTION
    }
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('../views/Work.vue'),
    meta: {
      title: `${SITE} | work`,
      description: 'Case studies: a Bayesian marketing mix platform, a measurement turnaround, agentic AI infrastructure, an AI beat writer, and an attribution product.'
    }
  },
  {
    path: '/writing',
    name: 'writing',
    component: () => import('../views/Writing.vue'),
    meta: {
      title: `${SITE} | writing`,
      description: 'Articles on production LLM systems, analytics microservices and MCP, and applied data science.'
    }
  },
  {
    path: '/lab',
    name: 'lab',
    component: () => import('../views/Lab.vue'),
    meta: {
      title: `${SITE} | lab`,
      description: 'Live tools: a Wordle solver, a portfolio optimizer, and a news recommender, each backed by its own service.'
    }
  },
  {
    path: '/working-with-me',
    name: 'working-with-me',
    component: () => import('../views/WorkingWithMe.vue'),
    meta: {
      title: `${SITE} | working with me`,
      description: 'Called Shot Advisory: fractional CDAO, marketing mix and measurement, and AI and LLM systems.'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: `${SITE} | about`,
      description: 'About Courtney Perigo and this website.'
    }
  },
  {
    path: '/cv',
    name: 'cv',
    component: () => import('../views/Cv.vue'),
    meta: {
      title: `${SITE} | CV`,
      description: 'Curriculum vitae: experience, education, skills, and publications.'
    }
  },
  {
    path: '/lab/wordle',
    name: 'wordle',
    component: () => import('../views/Wordle.vue'),
    meta: {
      title: `${SITE} | beating Wordle with entropy`,
      description: 'An entropy-based Wordle solver with a stats dashboard.'
    }
  },
  {
    path: '/lab/optimal-portfolio',
    name: 'optimal-portfolio',
    component: () => import('../views/Portfolio.vue'),
    meta: {
      title: `${SITE} | optimal portfolio of U.S. stocks`,
      description: 'A Monte Carlo portfolio optimizer over U.S. stocks, refreshed daily.'
    }
  },
  {
    path: '/lab/news-recommender',
    name: 'news-recommender',
    component: () => import('../views/News.vue'),
    meta: {
      title: `${SITE} | daily data science news and information`,
      description: 'Data science articles ranked by a recommendation model.'
    }
  },
  // Old tool URLs, linked from the articles and LinkedIn.
  { path: '/wordle', redirect: '/lab/wordle' },
  { path: '/optimal-portfolio', redirect: '/lab/optimal-portfolio' },
  { path: '/news-recommender', redirect: '/lab/news-recommender' },
  {
    path: '/surprise',
    name: 'surprise',
    component: () => import('../views/Surprise.vue'),
    meta: {
      title: `${SITE} | a positive, surprise addition to the family`,
      description: 'A family announcement.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || SITE
  const tag = document.querySelector('meta[name="description"]')
  if (tag) tag.setAttribute('content', to.meta.description || DEFAULT_DESCRIPTION)
})

export default router
