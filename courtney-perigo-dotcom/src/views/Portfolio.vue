<!-- An app that helps users understand the optimal portfolio of U.S. stocks. -->

<script setup>
import AppNavBar from '../components/AppNavBar.vue'
import optimalPortfolioService from '../service/PortfolioService.js'
import { onMounted, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts';

const optimalPortfolioServ = new optimalPortfolioService()

// Register the ApexCharts component
const portfolio = ref([])
const isLoading = ref(true)
const error = ref(null)
var budget = ref(10000)

var aboutOptimalPortfolio = "This project uses optimal portfolio theory and Sharpe Ratio analysis " 
+ "to identify the best investment portfolio from U.S. stocks over the past decade. " 
+ "It showcases my data science skills in optimizing returns and analyzing complex datasets, " 
+ "and is purely academic, not financial advice.  The default budget is $10,000, but you can adjust it below."

var aboutModel = "The optimal portfolio model uses Scipy's optimize function to maximize the Sharpe Ratio "
+ "of a portfolio of U.S. stocks. The model uses historical stock data to calculate the optimal weights for each stock, " 
+ "and suggests the portfolio that would've produced the maximum return given the volatility risk. "
+ "More information about the underlying model can be found on its repo."

var modelLink = {
                name: 'Optimal Portfolio Model: GitHub',
                icon: 'fab fa-github',
                link: 'https://github.com/agentdanger/stock-portfolio-optimizer'
            }

// Initialize chart options
const chartOptions = ref({
  chart: {
    type: 'scatter',
    height: 350,
    zoom: {
      enabled: false,
      type: 'xy'
    },
    fontFamily: 'Play, sans-serif',
    events: {
      dataPointMouseEnter: function(event, chartContext, config) {
        highlightDataPoint(config.dataPointIndex);
      },
      dataPointMouseLeave: function(event, chartContext, config) {
        resetHighlight();
      }
    }
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    labels: {
      colors: '#F5F9FF', // Set the legend label color
    },
  },
  grid: {
    borderColor: '#F5F9FF', // Set the gridline color
  },
  xaxis: {
    title: {
      text: 'Volatility (Standard Deviation)',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#F5F9FF', // Set the x-axis title color
      },
    },
    labels: {
      formatter: function(value) {
        return value.toFixed(2);  // Format x-axis values to 2 decimal places
      },
      style: {
        colors: '#F5F9FF', // Set the x-axis label color
      }
    }
  },
  yaxis: {
    title: {
      text: 'Expected Return',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#F5F9FF', // Set the y-axis title color
      },
    },
    labels: {
      formatter: function(value) {
        return value.toFixed(2);  // Format y-axis values to 2 decimal places
      },
      style: {
        colors: '#F5F9FF', // Set the y-axis label color
      }
    },
  },
  series: [],
  title: {
    text: 'Efficient Frontier and Max Sharpe Ratio Portfolios',
    align: 'center',
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#F5F9FF', // Set the title color
    },
  },
  colors: ['#BE861F', '#09A2CD'],
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
      const sharpeRatio = dataPoint.name === 'Max Sharpe Ratio' 
          ? portfolio.value['max_sharpe'].sharpe.toFixed(2)
          : (dataPoint.y / dataPoint.x).toFixed(2); // Calculate Sharpe Ratio for other points

      // Construct the tooltip HTML
      return `
          <div style="padding:10px; font-family:Play, sans-serif;">
              <strong>${dataPoint.name}</strong><br>
              Expected Return: ${(dataPoint.y * 100).toFixed(2)}%<br>
              Volatility: ${(dataPoint.x * 100).toFixed(2)}%<br>
              Sharpe Ratio: ${sharpeRatio}<br>
          </div>
      `;
    }
  }
});

// Initialize Sharpe ratio chart options
const sharpeChartOptions = ref({
  chart: {
    type: 'scatter',
    height: 350,
    fontFamily: 'Play, sans-serif',
    events: {
      dataPointMouseEnter: function(event, chartContext, config) {
        highlightDataPoint(config.dataPointIndex);
      },
      dataPointMouseLeave: function(event, chartContext, config) {
        resetHighlight();
      }
    }
  },
  xaxis: {
    title: {
      text: 'Portfolio',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#F5F9FF', // Set the x-axis title color
      },
    },
    labels: {
      show: false
    }
  },
  yaxis: {
    title: {
      text: 'Sharpe Ratio',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#F5F9FF', // Set the y-axis title color
      },
    },
    labels: {
      formatter: function(value) {
        return value.toFixed(2);  // Format y-axis values to 2 decimal places
      },
      style: {
        colors: '#F5F9FF', // Set the y-axis label color
      }
    },
  },
  colors: ['#09A2CD', '#BE861F'],
  series: []
});


// Function to update main chart series
function updateChartSeries() {
  // Extract portfolio scenarios
  const max_sharpe = [
    {
      x: portfolio.value['max_sharpe'].sd,
      y: portfolio.value['max_sharpe'].return,
      name: 'Max Sharpe Ratio',
    },
  ];
  const target_data = Object.keys(portfolio.value).filter(key => key.startsWith('target_')).map(key => ({
      x: portfolio.value[key].sd,
      y: portfolio.value[key].return,
      name: key.replace('target_', 'Target '),
  }));

  // Set the series for the main chart
  chartOptions.value.series = [
    {
      name: 'Max Sharpe Ratio Portfolio',
      data: max_sharpe
    },
    {
      name: 'Efficient Frontier',
      data: target_data
    }
  ];
}

// Function to update Sharpe ratio chart series
function updateSharpeChartSeries() {
  const sharpeData = [
    {
      x: portfolio.value['max_sharpe'].sd,
      y: portfolio.value['max_sharpe'].sharpe, // Use Sharpe ratio as y-value
      name: 'Max Sharpe Ratio',
    },
    ...Object.keys(portfolio.value).filter(key => key.startsWith('target_')).map(key => ({
      x: portfolio.value[key].sd,
      y: portfolio.value[key].return / portfolio.value[key].sd, // Calculate Sharpe ratio
      name: key.replace('target_', 'Target ')
    }))
  ];

  // Update Sharpe ratio chart series
  sharpeChartOptions.value.series = [
    {
      name: 'Sharpe Ratio',
      data: sharpeData
    }
  ];
}

// Function to highlight corresponding data point
function highlightDataPoint(index) {
  const efficientChart = chartOptions.value;
  const sharpeChart = sharpeChartOptions.value;

  // Reset markers
  resetHighlight();

  // Highlight the data point in the main chart
  efficientChart.series.forEach((series, seriesIndex) => {
    if (series.data[index]) {
      series.data[index].marker = {
        size: 10,
        fillColor: '#FFFFFF'
      };
    }
  });

  // Highlight the data point in the Sharpe ratio chart
  sharpeChart.series.forEach((series, seriesIndex) => {
    if (series.data[index]) {
      series.data[index].marker = {
        size: 10,
        fillColor: '#FFFFFF'
      };
    }
  });
}

// Function to reset highlight
function resetHighlight() {
  const efficientChart = chartOptions.value;
  const sharpeChart = sharpeChartOptions.value;

  // Reset markers in the main chart
  efficientChart.series.forEach(series => {
    series.data.forEach(point => {
      point.marker = {
        size: 6,
        fillColor: series.color
      };
    });
  });

  // Reset markers in the Sharpe ratio chart
  sharpeChart.series.forEach(series => {
    series.data.forEach(point => {
      point.marker = {
        size: 6,
        fillColor: '#09A2CD'
      };
    });
  });
}

function getPortfolio() {
    optimalPortfolioServ.getOptimalPortfolioData()
        .then(response => {
            portfolio.value = response
            updateChartSeries() // Update chart data after loading portfolio
            updateSharpeChartSeries() // Update Sharpe ratio chart data after loading portfolio
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

function updateBudget(newBudget) {
    budget.value = newBudget
}

// function to calculate weight percentage add 1 decimal place and % sign
function weightPercentage(weight) {
    return (weight * 100).toFixed(1) + '%'
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
                                <!-- Add the ApexCharts scatter plot here -->
                                <div class="columns">
                                    <VueApexCharts
                                        type="scatter"
                                        :options="chartOptions"
                                        :series="chartOptions.series"
                                        height="350px" class="column"
                                        />
<!--                                     <VueApexCharts
                                        type="scatter"
                                        :options="sharpeChartOptions"
                                        :series="sharpeChartOptions.series"
                                        height="350px" class="column is-4"
                                        /> -->
                                </div>
                                <div class="field">
                                    <label class="label has-text-white">Max Sharpe Ratio | Portfolio Weights</label>
                                </div>
                                <div class="columns is-multiline is-centered">
                                    <div v-for="stock in portfolio['max_sharpe']['weights']" :key="stock.ticker">
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
                                <div class="field">
                                    <label class="label has-text-white">Budget</label>
                                    <div class="control">
                                        <input class="input" type="number" v-model="budget" @change="updateBudget($event.target.value)">
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

