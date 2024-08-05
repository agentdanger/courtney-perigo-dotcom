<!-- An app that helps users understand the optimal portfolio of U.S. stocks. -->

<script setup>
import AppNavBar from '../components/AppNavBar.vue'
import optimalPortfolioService from '../service/PortfolioService.js'
import { onMounted, ref, watch } from 'vue'

const optimalPortfolioServ = new optimalPortfolioService()

// get portfolio on load
const portfolio = ref([])
const isLoading = ref(true)
var budget = ref(10000)

var aboutOptimalPortfolio = "This project uses optimal portfolio theory and Sharpe Ratio analysis " 
+ "to identify the best investment portfolio from U.S. stocks over the past decade. " 
+ "It showcases my data science skills in optimizing returns and analyzing complex datasets, " 
+ "and is purely academic, not financial advice."

var aboutModel = "The optimal portfolio model using Scipy's optimize function to maximize the Sharpe Ratio "
+ "of a portfolio of U.S. stocks. The model uses historical stock data to calculate the optimal weights for each stock, " 
+ "and suggests the portfolio that would've produced the maximum return given the volatility risk. "
+ "More information about the underlying model can be found on its repo."

var modelLink = {
                name: 'Optimal Portfolio Model: GitHub',
                icon: 'fab fa-github',
                link: 'https://github.com/agentdanger/stock-portfolio-optimizer'
            }

const error = ref(null)

function getPortfolio() {
    optimalPortfolioServ.getOptimalPortfolioData()
        .then(response => {
            portfolio.value = response
            error.value = null
        })
        .catch(e => {
            console.log(e)
            error.value = 'Failed to load portfolio data.'
        })
        .finally(() => {
            isLoading.value = false
        })
}

// function to calculate weight percentage add 1 decimal place and % sign
function weightPercentage(weight) {
    return (weight * 100).toFixed(1) + '%'
}

function updateBudget(newBudget) {
    budget.value = newBudget
}

// function to calculate the amount to spend on a stock rounded to 2 decimal places
function getStockSpendAmount(stock) {
    return (stock.weight * budget.value).toFixed(2)
}

// get shares to buy for each stock
function getSharesToBuy(stock) {
    var budgetStock = getStockSpendAmount(stock)
    return (budgetStock / stock.price).toFixed(2)
}

onMounted(() => {
    getPortfolio()
})
</script>

<template>
    <AppNavBar />
    <div class="hero is-fullheight is-primary">
        <div class="hero-body">
            <div class="container">
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Optimal Portfolio: Select U.S. Stocks (past decade-ish)
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                {{ aboutOptimalPortfolio }}
                            </div>
                        </div>
                    </div>
                </div>
                    <!-- show message when articles are loading -->
                <div class="box p-1 mt-6" v-if="isLoading">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Loading Optimal Portfolio...
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                <progress class="progress is-primary" max="100">15%</progress>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- show error message when articles fail to load -->
                <div class="box p-1 mt-6" v-if="error">
                    <div class="card has-background-danger">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                {{ error }}
                            </p>
                        </header>
                    </div>
                </div>
                <!-- show portfolio data -->
                <div class="box p-1 mt-6" v-if="isLoading === false && error === null">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                Optimal Portfolio
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                <div class="columns is-multiline is-centered">
                                    <div v-for="stock in portfolio['max_sharpe']['weights']">
                                        <div class="column" v-if="stock.weight > 0">
                                            <div class="card ">
                                                <header class="card-header">
                                                    <p class="card-header-title is-size-5">
                                                        Symbol: {{ stock.ticker }}
                                                    </p>
                                                </header>
                                                <div class="card-content">
                                                    <div class="content">
                                                        <p>Weight: {{ weightPercentage(stock.weight) }}</p>
                                                        <p>Budget: ${{ getStockSpendAmount(stock) }}</p>
                                                        <p>Shares to Hold: {{ getSharesToBuy(stock) }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="box p-1 mt-6">
                    <div class="card has-background-primary">
                        <header class="card-header ">
                            <p class="card-header-title has-text-white is-size-4">
                                About The Portfolio Optimizer
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                <p>{{ aboutModel }}</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="buttons is-centered ">
                                    <a :href="modelLink.link" target="_blank" rel="noopener noreferrer"
                                        class="button is-link">
                                        <span class="icon">
                                            <i :class="modelLink.icon"></i>
                                        </span>
                                        <span>{{ modelLink.name }}</span>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  -->

</template>