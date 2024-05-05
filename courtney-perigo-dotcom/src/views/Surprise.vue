<!-- An app that helps users play Wordle -->

<script setup>
import AppNavBar from '../components/AppNavBar.vue'
import genderService from '../service/GenderReveal.js'
import { ref, watch } from 'vue'

const genderServ = new genderService()

var isLoading = ref(false)
var isLoaded = ref(false)

var theGender = ref('')

function getGender() {
    isLoading.value = true
    genderServ.getGenderRevealData()
        .then(response => {
            console.log(response)
            isLoading.value = false
            isLoaded.value = true
            theGender.value = response['gender'].toLowerCase()
        })
}

</script>

<template>
    <AppNavBar />
    <div class="hero is-fullheight is-primary">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6" v-if="!isLoaded">
                    <div class="card has-background-primary">
                        <header class="card-header">
                            <p class="card-header-title has-text-white is-centered is-size-4">
                                A Family Surprise
                            </p>
                        </header>
                        <div class="card-content is-centered">
                            <div class="content has-text-white is-centered">
                                <p class="has-text-centered">
                                    <span class="is-underlined has-text-weight-bold">Directions:
                                    </span>
                                    Press the button to reveal the family surprise!
                                </p>
                            </div>
                            <div class="card-content">
                                <div class="field is-grouped is-grouped-centered">
                                    <button class="button is-link" @click="getGender()">
                                        <span class="icon">
                                            <i class="fas fa-baby"></i>
                                        </span>
                                        <span>Find Out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box p-1 mt-6" v-if="isLoading">
                    <div class="card has-background-primary">
                        <div class="card-content">
                            <div class="content has-text-white has-text-centered">
                                <!-- show message when articles are loading -->
                                <div class="card has-background-primary">
                                    <header class="card-header ">
                                        <p class="card-header-title has-text-white is-size-4">
                                            Loading The Family Secret...
                                        </p>
                                    </header>
                                    <div class="card-content">
                                        <div class="content has-text-white">
                                            <progress class="progress is-primary" max="100">15%</progress>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box p-1 mt-6" v-if="isLoaded && theGender == 'male'">
                    <div class="card has-background-primary">
                        <header class="card-header">
                            <p class="card-header-title has-text-white is-centered is-size-4">
                                The Family Surprise
                            </p>
                        </header>
                        <div class="card-content is-centered">
                            <div class="content has-text-white is-centered has-text-centered">
                                <img class="has-text-centered" src="/assets/its_a_boy.jpg" alt="It's a boy!" width="450"
                                    height="450" />
                            </div>
                            <div class="card-content">
                                <div class="field is-grouped is-grouped-centered">
                                    <div class="columns">
                                        <div class="column">
                                            <span class="icon is-large">
                                                <i class="far fa-baseball-bat-ball"
                                                    style="color:steelblue; font-size: 3em;"></i>
                                            </span>
                                        </div>
                                        <div class="column">
                                            <span class="icon is-large">
                                                <i class="far fa-futbol" style="color:steelblue; font-size: 3em;"></i>
                                            </span>
                                        </div>
                                        <div class="column">
                                            <span class="icon is-large">
                                                <i class="far fa-teddy-bear"
                                                    style="color:steelblue; font-size: 3em;"></i>
                                            </span>
                                        </div>
                                        <div class="column">
                                            <span class="icon is-large">
                                                <i class="far fa-books" style="color:steelblue; font-size: 3em;"></i>
                                            </span>
                                        </div>
                                        <div class="column">
                                            <span class="icon is-large">
                                                <i class="far fa-train" style="color:steelblue; font-size: 3em;"></i>
                                            </span>
                                        </div>
                                        <div class="column">
                                            <span class="icon is-large">
                                                <i class="far fa-robot" style="color:steelblue; font-size: 3em;"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box p-1 mt-6" v-if="isLoaded && theGender == 'female'">
                    <div class="card has-background-primary">
                        <header class="card-header">
                            <p class="card-header-title has-text-white is-centered is-size-4">
                                The Family Surprise
                            </p>
                        </header>
                        <div class="card-content is-centered">
                            <div class="content has-text-white is-centered has-text-centered">
                                <img class="has-text-centered" src="/assets/its_a_girl.jpg" alt="It's a girl!"
                                    width="450" height="450" />
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="field is-grouped is-grouped-centered">
                                <div class="columns">
                                    <div class="column">
                                        <span class="icon is-large">
                                            <i class="far fa-baseball-bat-ball" style="color:pink; font-size: 3em;"></i>
                                        </span>
                                    </div>
                                    <div class="column">
                                        <span class="icon is-large">
                                            <i class="far fa-futbol" style="color:pink; font-size: 3em;"></i>
                                        </span>
                                    </div>
                                    <div class="column">
                                        <span class="icon is-large">
                                            <i class="far fa-teddy-bear" style="color:pink; font-size: 3em;"></i>
                                        </span>
                                    </div>
                                    <div class="column">
                                        <span class="icon is-large">
                                            <i class="far fa-books" style="color:pink; font-size: 3em;"></i>
                                        </span>
                                    </div>
                                    <div class="column">
                                        <span class="icon is-large">
                                            <i class="far fa-flask-vial" style="color:pink; font-size: 3em;"></i>
                                        </span>
                                    </div>
                                    <div class="column">
                                        <span class="icon is-large">
                                            <i class="far fa-music" style="color:pink; font-size: 3em;"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>