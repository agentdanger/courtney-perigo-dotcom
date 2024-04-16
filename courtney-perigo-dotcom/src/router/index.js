import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main, 
      meta: {
        title: 'Courtney Perigo | transforming data into business value'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
      meta: {
        title: 'Courtney Perigo | about'
      }
    },
    {
      path: '/wordle',
      name: 'wordle',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Wordle.vue'),
      meta: {
        title: 'Courtney Perigo | beating Wordle with entropy'
      }
    },
    {
      path: '/cv',
      name: 'cv',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Cv.vue'),
      meta: {
        title: 'Courtney Perigo | CV'
      }
    },
    {
      path: '/news-recommender',
      name: 'news-recommender',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/News.vue'),
      meta: {
        title: 'Courtney Perigo | news-recommender'
      }
    }
  ]
})

router.beforeEach((to, from) => {
  document.title = to.meta.title
})

export default router
