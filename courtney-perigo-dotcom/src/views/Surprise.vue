<script setup>
import genderService from '../service/GenderReveal.js'
import { ref } from 'vue'

const genderServ = new genderService()

const isLoading = ref(false)
const isLoaded = ref(false)
const theGender = ref('')

function getGender() {
    isLoading.value = true
    genderServ.getGenderRevealData()
        .then(response => {
            isLoading.value = false
            isLoaded.value = true
            theGender.value = response['gender'].toLowerCase()
        })
        .catch(() => {
            isLoading.value = false
        })
}
</script>

<template>
  <section class="section">
    <div class="container surprise">
      <p class="eyebrow">Family</p>
      <h1>A family surprise</h1>

      <div v-if="!isLoaded" class="card surprise-card">
        <p>Press the button to reveal the family surprise.</p>
        <div class="actions" style="justify-content: center">
          <button class="btn btn-primary" type="button" :disabled="isLoading" @click="getGender()">
            {{ isLoading ? 'Opening the envelope…' : 'Find out' }}
          </button>
        </div>
      </div>

      <div v-if="isLoaded && theGender === 'male'" class="card surprise-card">
        <img src="/assets/its_a_boy.jpg" alt="It's a boy!" width="450" height="450">
        <p class="reveal">It's a boy.</p>
      </div>

      <div v-if="isLoaded && theGender === 'female'" class="card surprise-card">
        <img src="/assets/its_a_girl.jpg" alt="It's a girl!" width="450" height="450">
        <p class="reveal">It's a girl.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.surprise {
  max-width: 560px;
  text-align: center;
}

.surprise-card {
  align-items: center;
}

.surprise-card img {
  width: 100%;
  max-width: 450px;
  height: auto;
  border-radius: var(--radius-sm);
  margin-bottom: var(--s-4);
}

.reveal {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  color: var(--text);
  margin: 0;
}
</style>
