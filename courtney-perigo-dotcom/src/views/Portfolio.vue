<!-- An app that helps users understand the optimal portfolio of U.S. stocks. -->

<script setup>
import AppNavBar from '../components/AppNavBar.vue'
import optimalPortfolioService from '../service/PortfolioService.js'
import { computed, onMounted, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts';

const optimalPortfolioServ = new optimalPortfolioService()

// Register the ApexCharts component
const portfolio = ref([])
const isLoading = ref(true)
const error = ref(null)
var budget = ref(10000)
const latestRunDate = ref(null)
const formattedLatestRunDate = computed(() => {
    if (!latestRunDate.value) return null

    // Append a local-time “T00:00:00” so JS doesn’t assume UTC
    const parsedDate = new Date(`${latestRunDate.value}T00:00:00`)

    if (Number.isNaN(parsedDate.getTime())) {
        return latestRunDate.value
    }

    return parsedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
})

var aboutOptimalPortfolio = "This project uses optimal portfolio theory and Sharpe Ratio analysis " 
+ "to identify the best investment portfolio from low dividend yield U.S. stocks over the past decade. " 
+ "It showcases my data science skills in optimizing returns and analyzing complex datasets, " 
+ "and is purely academic, not financial advice.  The default budget is $10,000, but you can adjust it below."

var aboutModel = "The optimal portfolio model uses Scipy's optimize function to maximize the Sharpe Ratio "
+ "of a portfolio of low dividend yield U.S. stocks. The model uses historical stock data to calculate the optimal weights for each stock, " 
+ "and suggests the portfolio that would've produced the maximum return given the volatility risk. "
+ "More information about the underlying model can be found on its repo."

var modelLink = {
                name: 'Optimal Portfolio Model: GitHub',
                icon: 'fab fa-github',
                link: 'https://github.com/agentdanger/stock-portfolio-optimizer'
            }

const brandColors = {
    tangaroa: '#192532',
    irisBlue: '#09A2CD',
    teal: '#007D81',
    alice: '#F5F9FF',
    ochre: '#BE861F',
    hunterGreen: '#305434',
    tosca: '#704140',
    grey: '#808080',
    tuna: '#484E55'
}

const sectorColorOverrides = new Map([
    ['Technology', brandColors.irisBlue],
    ['Financials', brandColors.teal],
    ['Healthcare', brandColors.hunterGreen],
    ['Consumer Cyclical', brandColors.ochre],
    ['Consumer Defensive', brandColors.tosca],
    ['Communication Services', brandColors.tuna],
    ['Energy', brandColors.tangaroa],
    ['Industrials', brandColors.grey],
    ['Real Estate', brandColors.alice],
    ['Utilities', '#4AA7B5'],
    ['Basic Materials', '#2F5168'],
    ['Unknown', '#5A6B7A']
])

const sectorSynonyms = {
    'Financial Services': 'Financials',
    'Financial Service': 'Financials',
    'Health Care': 'Healthcare',
    'Consumer Staples': 'Consumer Defensive',
    'Consumer Discretionary': 'Consumer Cyclical',
    'Basic Materials': 'Basic Materials',
    'Materials': 'Basic Materials',
    'Unknown': 'Unknown'
}

const maxSharpeWeights = computed(() => {
    const weights = portfolio.value?.max_sharpe?.weights

    if (!Array.isArray(weights)) {
        return []
    }

    return weights.filter(weight => typeof weight?.weight === 'number' && weight.weight > 0)
})

// Backtest data
const backtest = computed(() => portfolio.value?.backtest ?? null)

const hasBacktest = computed(() => backtest.value !== null)

const backtestPeriod = computed(() => backtest.value?.period ?? null)

const backtestMetrics = computed(() => {
    if (!backtest.value) return null

    return {
        portfolioReturn: (backtest.value.portfolio_return * 100).toFixed(1),
        benchmarkReturn: (backtest.value.benchmark_return * 100).toFixed(1),
        outperformance: (backtest.value.outperformance * 100).toFixed(1),
        portfolioSharpe: backtest.value.portfolio_sharpe.toFixed(2),
        benchmarkSharpe: backtest.value.benchmark_sharpe.toFixed(2),
        portfolioMaxDrawdown: (backtest.value.portfolio_max_drawdown * 100).toFixed(1),
        benchmarkMaxDrawdown: (backtest.value.benchmark_max_drawdown * 100).toFixed(1)
    }
})

const backtestChartOptions = ref({
    chart: {
        type: 'area',
        height: 350,
        fontFamily: 'Play, sans-serif',
        background: 'transparent',
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100]
        }
    },
    legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        labels: {
            colors: '#F5F9FF'
        }
    },
    grid: {
        borderColor: 'rgba(245, 249, 255, 0.2)'
    },
    xaxis: {
        categories: [],
        title: {
            text: 'Quarter',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#F5F9FF'
            }
        },
        labels: {
            style: {
                colors: '#F5F9FF'
            }
        },
        axisBorder: {
            color: 'rgba(245, 249, 255, 0.2)'
        },
        axisTicks: {
            color: 'rgba(245, 249, 255, 0.2)'
        }
    },
    yaxis: {
        title: {
            text: 'Portfolio Value ($)',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#F5F9FF'
            }
        },
        labels: {
            formatter: function(value) {
                return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 })
            },
            style: {
                colors: '#F5F9FF'
            }
        }
    },
    colors: [brandColors.irisBlue, brandColors.ochre],
    tooltip: {
        theme: 'dark',
        y: {
            formatter: function(value) {
                return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
        }
    },
    title: {
        text: 'Backtest: Portfolio vs Benchmark Growth',
        align: 'center',
        style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#F5F9FF'
        }
    },
    series: []
})

function updateBacktestChart() {
    if (!backtest.value?.quarterly_values?.length) return

    const quarters = backtest.value.quarterly_values.map(q => q.date)
    const portfolioValues = backtest.value.quarterly_values.map(q => q.portfolio)
    const benchmarkValues = backtest.value.quarterly_values.map(q => q.benchmark)

    backtestChartOptions.value.xaxis.categories = quarters
    backtestChartOptions.value.series = [
        {
            name: 'Optimized Portfolio',
            data: portfolioValues
        },
        {
            name: 'Benchmark (S&P 500)',
            data: benchmarkValues
        }
    ]
}

function canonicalizeSector(rawSector) {
    if (!rawSector) {
        return 'Unknown'
    }

    const trimmed = rawSector.trim()
    return sectorSynonyms[trimmed] || trimmed
}

function fallbackColor(sector, usedColors = new Set()) {
    if (!sector || sector === 'Unknown') {
        const neutral = '#5A6B7A'
        if (!usedColors.has(neutral)) {
            return neutral
        }
    }

    let hash = 0
    for (let i = 0; i < sector.length; i += 1) {
        hash = sector.charCodeAt(i) + ((hash << 5) - hash)
        hash &= hash
    }

    let hue = Math.abs(hash) % 360
    let color = `hsl(${hue}, 55%, 55%)`
    let attempts = 0

    while (usedColors.has(color) && attempts < 10) {
        hue = (hue + 36) % 360
        color = `hsl(${hue}, 55%, 55%)`
        attempts += 1
    }

    return color
}

function resolveSectorColor(sector, assignedColors, availableColors, usedColors) {
    if (assignedColors.has(sector)) {
        return assignedColors.get(sector)
    }

    let color

    if (sectorColorOverrides.has(sector)) {
        color = sectorColorOverrides.get(sector)
    } else if (availableColors.length) {
        color = availableColors.shift()
    } else {
        color = fallbackColor(sector, usedColors)
    }

    assignedColors.set(sector, color)
    usedColors.add(color)

    return color
}

const sectorBreakdown = computed(() => {
    if (!maxSharpeWeights.value.length) {
        return []
    }

    const grouped = maxSharpeWeights.value.reduce((acc, stock) => {
        const sector = stockSector(stock)
        const total = acc[sector]?.weight ?? 0
        acc[sector] = {
            sector,
            weight: total + stock.weight
        }
        return acc
    }, {})

    const sectors = Object.values(grouped)
        .map(entry => ({
            sector: entry.sector,
            weight: entry.weight,
            percentage: entry.weight * 100
        }))
        .sort((a, b) => b.percentage - a.percentage)

    const totalPercentage = sectors.reduce((sum, sector) => sum + sector.percentage, 0)

    if (!totalPercentage) {
        return []
    }

    const normalizationFactor = 100 / totalPercentage
    const overrideColors = new Set(sectorColorOverrides.values())
    const availableColors = Object.values(brandColors).filter(color => !overrideColors.has(color))
    const assignedColors = new Map()
    const usedColors = new Set()

    return sectors.map(sector => ({
        ...sector,
        percentage: sector.percentage * normalizationFactor,
        color: resolveSectorColor(sector.sector, assignedColors, availableColors, usedColors)
    }))
})

const sectorChartSeries = computed(() =>
    sectorBreakdown.value.map(sector => Number(sector.percentage.toFixed(2)))
)

const sectorChartOptions = computed(() => ({
    chart: {
        type: 'donut',
        background: 'transparent'
    },
    labels: sectorBreakdown.value.map(sector => sector.sector),
    colors: sectorBreakdown.value.map(sector => sector.color),
    legend: {
        show: false
    },
    stroke: {
        colors: ['#F5F9FF'],
        show: false
    },
    dataLabels: {
        style: {
            fontSize: '12px',
            colors: ['#F5F9FF']
        }
    },
    plotOptions: {
        pie: {
            donut: {
                size: '65%',
                labels: {
                    show: true,
                    name: {
                        color: '#F5F9FF',
                        fontSize: '14px',
                        fontWeight: 600
                    },
                    value: {
                        color: '#F5F9FF',
                        fontSize: '18px',
                        formatter: value => `${Number(value).toFixed(1)}%`
                    },
                    total: {
                        show: true,
                        label: 'Holdings',
                        color: '#F5F9FF',
                        fontSize: '14px',
                        formatter: () => holdingsCount.value || 0
                    }
                }
            }
        }
    },
    tooltip: {
        y: {
            formatter: value => `${value.toFixed(1)}%`
        }
    }
}))

const largestHolding = computed(() => {
    if (!maxSharpeWeights.value.length) {
        return null
    }

    const holding = maxSharpeWeights.value.reduce((max, stock) => {
        if (!max || stock.weight > max.weight) {
            return stock
        }

        return max
    }, null)

    if (!holding) {
        return null
    }

    return {
        name: stockDisplayName(holding) || 'Unknown',
        ticker: holding.ticker,
        percentage: holding.weight * 100
    }
})

const holdingsCount = computed(() => maxSharpeWeights.value.length)

const annualReturnPct = computed(() => {
    const annualReturn = portfolio.value?.max_sharpe?.return

    if (typeof annualReturn !== 'number') {
        return null
    }

    return annualReturn * 100
})

function stockDisplayName(stock) {
    if (!stock || !stock.info) {
        return null
    }

    return stock.info.longName
        || stock.info.shortName
        || stock.info.displayName
        || null
}

function stockSector(stock) {
    if (!stock || !stock.info) {
        return 'Unknown'
    }

    return canonicalizeSector(
        stock.info.sector
        || stock.info.sectorDisp
        || null
    )
}

function stockWebsite(stock) {
    if (!stock || !stock.info) {
        return null
    }

    const website = stock.info.website || stock.info.irWebsite

    if (!website) {
        return null
    }

    return /^(http:\/\/|https:\/\/)/i.test(website) ? website : `https://${website}`
}

function stockWebsiteDisplay(stock) {
    const website = stockWebsite(stock)

    if (!website) {
        return null
    }

    try {
        return new URL(website).hostname
    } catch (error) {
        return website.replace(/^(http:\/\/|https:\/\/)/i, '')
    }
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
            latestRunDate.value = response?.latest_run_date ?? null
            updateChartSeries() // Update chart data after loading portfolio
            updateSharpeChartSeries() // Update Sharpe ratio chart data after loading portfolio
            updateBacktestChart() // Update backtest chart data
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
                                <p
                                    v-if="formattedLatestRunDate"
                                    class="has-text-white is-italic mb-4"
                                >
                                    Latest run: {{ formattedLatestRunDate }}
                                </p>
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
                                <div
                                    class="box has-background-dark mb-5 portfolio-overview"
                                    v-if="sectorBreakdown.length || largestHolding || annualReturnPct !== null"
                                >
                                    <div class="portfolio-overview__grid columns is-variable is-5 is-multiline">
                                        <div
                                            class="portfolio-overview__summary column is-12-mobile is-12-tablet is-7-desktop"
                                        >
                                            <div class="portfolio-overview__heading">
                                                <p class="has-text-white has-text-weight-semibold is-size-5 mb-1">
                                                    Portfolio Value by Sector
                                                </p>
                                                <p class="has-text-white-ter is-size-7">
                                                    Normalized to 100% of the Max Sharpe portfolio
                                                </p>
                                            </div>
                                            <div class="portfolio-overview__metrics" v-if="largestHolding || annualReturnPct !== null || holdingsCount">
                                                <div class="portfolio-overview__metric" v-if="largestHolding">
                                                    <p class="metric-label has-text-white-ter is-uppercase is-size-7">Largest Holding</p>
                                                    <p class="metric-value has-text-white is-size-5">
                                                        {{ largestHolding.name }}
                                                        <span class="metric-value__ticker">({{ largestHolding.ticker }})</span>
                                                    </p>
                                                    <p class="metric-subtext has-text-white">{{ largestHolding.percentage.toFixed(1) }}%</p>
                                                </div>
                                                <div class="portfolio-overview__metric" v-if="annualReturnPct !== null">
                                                    <p class="metric-label has-text-white-ter is-uppercase is-size-7">Annualized Return</p>
                                                    <p class="metric-value has-text-white is-size-5">
                                                        {{ annualReturnPct.toFixed(2) }}%
                                                    </p>
                                                    <p class="metric-subtext has-text-white">Max Sharpe Portfolio</p>
                                                </div>
                                                <div class="portfolio-overview__metric" v-if="holdingsCount">
                                                    <p class="metric-label has-text-white-ter is-uppercase is-size-7">Holdings</p>
                                                    <p class="metric-value has-text-white is-size-5">
                                                        {{ holdingsCount }}
                                                    </p>
                                                    <p class="metric-subtext has-text-white">With non-zero allocation</p>
                                                </div>
                                            </div>
                                            <div v-if="sectorBreakdown.length" class="portfolio-overview__legend">
                                                <ul class="sector-legend">
                                                    <li
                                                        v-for="sector in sectorBreakdown"
                                                        :key="`${sector.sector}-legend`"
                                                        class="sector-legend__item"
                                                    >
                                                        <span
                                                            class="sector-legend__swatch"
                                                            :style="{ backgroundColor: sector.color }"
                                                        ></span>
                                                        <span class="sector-legend__label has-text-white is-size-7">
                                                            {{ sector.sector }}
                                                            <span class="sector-legend__percentage">
                                                                {{ sector.percentage.toFixed(1) }}%
                                                            </span>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <p v-else class="has-text-white">
                                                Sector information is unavailable for this portfolio.
                                            </p>
                                        </div>
                                        <div class="portfolio-overview__chart column is-12-mobile is-12-tablet is-5-desktop">
                                            <div
                                                v-if="sectorBreakdown.length"
                                                class="portfolio-overview__chart-card"
                                            >
                                                <VueApexCharts
                                                    type="donut"
                                                    :options="sectorChartOptions"
                                                    :series="sectorChartSeries"
                                                    height="260"
                                                />
                                            </div>
                                            <p v-else class="has-text-white">
                                                Add sector data to visualize the portfolio mix.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- Backtest Results Section -->
                                <div
                                    class="box has-background-dark mb-5 backtest-section"
                                    v-if="hasBacktest && backtestMetrics"
                                >
                                    <div class="backtest-section__header mb-4">
                                        <p class="has-text-white has-text-weight-semibold is-size-5 mb-1">
                                            Historical Backtest Performance
                                        </p>
                                        <p class="has-text-white-ter is-size-7" v-if="backtestPeriod">
                                            {{ backtestPeriod }} · Starting value: $100,000
                                        </p>
                                    </div>
                                    <div class="backtest-section__chart mb-5">
                                        <VueApexCharts
                                            type="area"
                                            :options="backtestChartOptions"
                                            :series="backtestChartOptions.series"
                                            height="350"
                                        />
                                    </div>
                                    <div class="backtest-section__metrics">
                                        <div class="columns is-multiline is-variable is-4">
                                            <div class="column is-12-mobile is-6-tablet is-4-desktop">
                                                <div class="backtest-metric">
                                                    <p class="metric-label has-text-white-ter is-uppercase is-size-7">Total Return</p>
                                                    <div class="backtest-metric__comparison">
                                                        <div class="backtest-metric__item">
                                                            <span class="backtest-metric__value has-text-white is-size-5">{{ backtestMetrics.portfolioReturn }}%</span>
                                                            <span class="backtest-metric__label has-text-white-ter is-size-7">Portfolio</span>
                                                        </div>
                                                        <span class="backtest-metric__separator has-text-white-ter">vs</span>
                                                        <div class="backtest-metric__item">
                                                            <span class="backtest-metric__value has-text-white is-size-5">{{ backtestMetrics.benchmarkReturn }}%</span>
                                                            <span class="backtest-metric__label has-text-white-ter is-size-7">Benchmark</span>
                                                        </div>
                                                    </div>
                                                    <p class="metric-subtext has-text-white-ter is-size-7 mt-1">
                                                        Outperformance: +{{ backtestMetrics.outperformance }}%
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="column is-12-mobile is-6-tablet is-4-desktop">
                                                <div class="backtest-metric">
                                                    <p class="metric-label has-text-white-ter is-uppercase is-size-7">Sharpe Ratio</p>
                                                    <div class="backtest-metric__comparison">
                                                        <div class="backtest-metric__item">
                                                            <span class="backtest-metric__value has-text-white is-size-5">{{ backtestMetrics.portfolioSharpe }}</span>
                                                            <span class="backtest-metric__label has-text-white-ter is-size-7">Portfolio</span>
                                                        </div>
                                                        <span class="backtest-metric__separator has-text-white-ter">vs</span>
                                                        <div class="backtest-metric__item">
                                                            <span class="backtest-metric__value has-text-white is-size-5">{{ backtestMetrics.benchmarkSharpe }}</span>
                                                            <span class="backtest-metric__label has-text-white-ter is-size-7">Benchmark</span>
                                                        </div>
                                                    </div>
                                                    <p class="metric-subtext has-text-white-ter is-size-7 mt-1">
                                                        Risk-adjusted return measure
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="column is-12-mobile is-6-tablet is-4-desktop">
                                                <div class="backtest-metric">
                                                    <p class="metric-label has-text-white-ter is-uppercase is-size-7">Max Drawdown</p>
                                                    <div class="backtest-metric__comparison">
                                                        <div class="backtest-metric__item">
                                                            <span class="backtest-metric__value has-text-white is-size-5">{{ backtestMetrics.portfolioMaxDrawdown }}%</span>
                                                            <span class="backtest-metric__label has-text-white-ter is-size-7">Portfolio</span>
                                                        </div>
                                                        <span class="backtest-metric__separator has-text-white-ter">vs</span>
                                                        <div class="backtest-metric__item">
                                                            <span class="backtest-metric__value has-text-white is-size-5">{{ backtestMetrics.benchmarkMaxDrawdown }}%</span>
                                                            <span class="backtest-metric__label has-text-white-ter is-size-7">Benchmark</span>
                                                        </div>
                                                    </div>
                                                    <p class="metric-subtext has-text-white-ter is-size-7 mt-1">
                                                        Largest peak-to-trough decline
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                                        <p v-if="stockDisplayName(stock)">Name: {{ stockDisplayName(stock) }}</p>
                                                        <p v-if="stockSector(stock)">Sector: {{ stockSector(stock) }}</p>
                                                        <p>Weight: {{ weightPercentage(stock.weight) }}</p>
                                                        <p>Budget: ${{ getStockSpendAmount(stock) }}</p>
                                                        <p>Shares to Hold: {{ getSharesToBuy(stock) }}</p>
                                                        <p v-if="stockWebsite(stock)">
                                                            Website:
                                                            <a
                                                                :href="stockWebsite(stock)"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {{ stockWebsiteDisplay(stock) }}
                                                            </a>
                                                        </p>
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

<style scoped>
.portfolio-overview {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.portfolio-overview__grid {
    align-items: stretch;
}

.portfolio-overview__summary {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.portfolio-overview__heading {
    margin-bottom: 0.5rem;
}

.portfolio-overview__metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
}

.portfolio-overview__metric {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    padding: 0.75rem 1rem;
}

.portfolio-overview__legend {
    margin-top: 0.5rem;
}

.sector-legend {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.75rem 1.5rem;
    padding: 0;
    margin: 0;
}

.sector-legend__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sector-legend__swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35);
}

.sector-legend__percentage {
    margin-left: 0.35rem;
    color: rgba(255, 255, 255, 0.8);
}

.metric-label {
    letter-spacing: 0.05em;
}

.metric-value {
    font-weight: 600;
}

.metric-value__ticker {
    font-size: 0.85em;
    color: rgba(255, 255, 255, 0.75);
}

.metric-subtext {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.75);
}

.portfolio-overview__chart {
    display: flex;
    justify-content: center;
    align-items: center;
}

.portfolio-overview__chart-card {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
}

@media screen and (max-width: 768px) {
    .portfolio-overview__metrics {
        grid-template-columns: 1fr;
    }

    .portfolio-overview__summary {
        gap: 1rem;
    }
}

/* Backtest Section Styles */
.backtest-section {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.backtest-section__header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1rem;
}

.backtest-section__chart {
    margin: 0 -0.5rem;
}

.backtest-metric {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    padding: 1rem;
    height: 100%;
}

.backtest-metric__comparison {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: 0.5rem;
}

.backtest-metric__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}

.backtest-metric__value {
    font-weight: 600;
    line-height: 1.2;
}

.backtest-metric__label {
    margin-top: 0.125rem;
}

.backtest-metric__separator {
    font-size: 0.75rem;
    opacity: 0.6;
}

@media screen and (max-width: 768px) {
    .backtest-metric__comparison {
        flex-direction: row;
        gap: 0.5rem;
    }
}
</style>

