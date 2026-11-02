<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { theme, toggleTheme } from '../theme.js'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/writing', label: 'Writing' },
  { to: '/lab', label: 'Lab' },
  { to: '/cv', label: 'CV' },
  { to: '/about', label: 'About' },
  { to: '/working-with-me', label: 'Working with me' }
]

const open = ref(false)
const route = useRoute()
watch(() => route.path, () => { open.value = false })
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <RouterLink class="nav-brand" to="/">Courtney Perigo</RouterLink>
      <nav aria-label="Primary">
        <ul class="nav-links">
          <li v-for="l in links" :key="l.to">
            <RouterLink :to="l.to">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </nav>
      <div class="nav-tools">
        <button
          class="icon-btn"
          type="button"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
        <button
          class="icon-btn nav-menu-btn"
          type="button"
          :aria-expanded="open ? 'true' : 'false'"
          aria-controls="nav-mobile"
          aria-label="Menu"
          @click="open = !open"
        >
          <svg v-if="!open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="open" id="nav-mobile" class="nav-mobile">
      <div class="container">
        <ul>
          <li v-for="l in links" :key="l.to">
            <RouterLink :to="l.to">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
