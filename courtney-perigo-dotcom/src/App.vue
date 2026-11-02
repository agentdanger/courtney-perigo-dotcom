<script setup>
import { RouterView } from 'vue-router'
import AppNavBar from './components/AppNavBar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <AppNavBar />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>
