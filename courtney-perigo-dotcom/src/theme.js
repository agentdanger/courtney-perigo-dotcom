import { ref } from 'vue'

const KEY = 'theme'

function stored() {
  try {
    const t = localStorage.getItem(KEY)
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// The current theme. Follows the system unless the visitor has chosen.
export const theme = ref(stored() || systemTheme())

export function setTheme(t) {
  theme.value = t
  document.documentElement.dataset.theme = t
  try {
    localStorage.setItem(KEY, t)
  } catch {
    // storage unavailable; the choice lasts for this page only
  }
}

export function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

// Keep following the system until the visitor makes a choice.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!stored()) theme.value = e.matches ? 'dark' : 'light'
})
