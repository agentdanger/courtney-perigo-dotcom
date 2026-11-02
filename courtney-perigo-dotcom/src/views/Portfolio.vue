<!-- An app that helps users understand the optimal portfolio of U.S. stocks. -->

<script setup>
import optimalPortfolioService from '../service/PortfolioService.js'
import { computed, onMounted, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts';
import { baseChartOptions, chartTokens } from '../chartTheme.js'
import { theme } from '../theme.js'

const optimalPortfolioServ = new optimalPortfolioService()

// Register the ApexCharts component
const portfolio = ref([])
const isLoading = ref(true)
const error = ref(null)
var budget = ref(50000)
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
+ "and is purely academic, not financial advice.  The default budget is $50,000, but you can adjust it below."

var aboutModel = "The optimal portfolio model uses Scipy's optimize function to maximize the Sharpe Ratio "
+ "of a portfolio of low & no dividend yield U.S. stocks. The model uses historical stock data to calculate the optimal weights for each stock, "
+ "and suggests the portfolio that would've produced the maximum return given the volatility risk. "
+ "Covariance matrix estimation uses the Ledoit-Wolf shrinkage method for better stability. "
+ "More information about the underlying model can be found on its repo. "

var aboutBacktesting = "For backtesting, the model simulates how the optimal portfolio strategy would have performed over a historical period. "
+ "In the backtesting simulation, the optimal portfolio is rebalanced quarterly based on updated stock data at the time of the rebalance to reflect realistic investment adjustments. "
+ "The backtest results include metrics like annualized return, Sharpe ratio, and maximum drawdown (downside risk), "
+ "providing insights into the portfolio's risk-adjusted performance over time."

var modelLink = {
                name: 'Optimal Portfolio Model: GitHub',
                link: 'https://github.com/agentdanger/stock-portfolio-optimizer'
            }

// Sector palette from the design tokens; re-read on theme toggle.
const sectorPalette = computed(() => {
    theme.value
    const t = chartTokens()
    return {
        overrides: new Map([
            ['Technology', t.series[4]],
            ['Financials', t.series[0]],
            ['Healthcare', t.series[2]],
            ['Consumer Cyclical', t.series[1]],
            ['Consumer Defensive', t.series[3]],
            ['Communication Services', t.series[5]],
            ['Energy', t.accent],
            ['Industrials', t.muted],
            ['Real Estate', t.warning],
            ['Utilities', t.success],
            ['Basic Materials', t.danger],
            ['Unknown', t.border]
        ]),
        pool: [...t.series, t.accent, t.muted, t.success, t.warning, t.danger]
    }
})

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

// Raw optimizer output: every holding with a positive weight.
const rawMaxSharpeWeights = computed(() => {
    const weights = portfolio.value?.max_sharpe?.weights

    if (!Array.isArray(weights)) {
        return []
    }

    return weights.filter(weight => typeof weight?.weight === 'number' && weight.weight > 0)
})

// Minimum dollar allocation per holding. The optimizer works in weights and
// doesn't know the budget, so the floor is applied here: any holding that would
// receive less than this is dropped and its weight is spread proportionally
// across the survivors, repeated until every remaining holding clears the floor.
const MIN_ALLOCATION = 500

const investablePlan = computed(() => {
    const total = Number(budget.value)
    let kept = rawMaxSharpeWeights.value.map(stock => ({ ...stock }))
    const dropped = []

    if (!Number.isFinite(total) || total <= 0 || !kept.length) {
        return { holdings: kept, dropped }
    }

    // Loop: drop the smallest sub-floor holding, renormalize, repeat.
    // Dropping one at a time (not all at once) matters: renormalizing can lift
    // a borderline holding above the floor, so it shouldn't be pre-emptively cut.
    while (kept.length > 1) {
        const sum = kept.reduce((acc, stock) => acc + stock.weight, 0)
        kept = kept.map(stock => ({ ...stock, weight: stock.weight / sum }))
        const smallest = kept.reduce((min, stock) => (stock.weight < min.weight ? stock : min), kept[0])
        if (smallest.weight * total >= MIN_ALLOCATION) break
        dropped.push(smallest)
        kept = kept.filter(stock => stock !== smallest)
    }

    return { holdings: kept, dropped }
})

const maxSharpeWeights = computed(() => investablePlan.value.holdings)

const droppedHoldings = computed(() => investablePlan.value.dropped)

// Backtest data
// The API returns either a full backtest object, or null (with a reason in
// backtest_error). Older payloads returned {error: "..."} instead, so treat
// anything without the numeric metrics as "no backtest" rather than crashing.
const BACKTEST_METRIC_KEYS = [
    'portfolio_annualized_return',
    'benchmark_annualized_return',
    'outperformance',
    'portfolio_sharpe',
    'benchmark_sharpe',
    'portfolio_max_drawdown',
    'benchmark_max_drawdown'
]

const backtest = computed(() => {
    const raw = portfolio.value?.backtest
    if (!raw || typeof raw !== 'object') return null
    const complete = BACKTEST_METRIC_KEYS.every(key => typeof raw[key] === 'number' && Number.isFinite(raw[key]))
    return complete ? raw : null
})

const hasBacktest = computed(() => backtest.value !== null)

const backtestPeriod = computed(() => backtest.value?.period ?? null)

const backtestMetrics = computed(() => {
    if (!backtest.value) return null

    return {
        portfolioReturn: (backtest.value.portfolio_annualized_return * 100).toFixed(1),
        benchmarkReturn: (backtest.value.benchmark_annualized_return * 100).toFixed(1),
        outperformance: (backtest.value.outperformance * 100).toFixed(1),
        portfolioSharpe: backtest.value.portfolio_sharpe.toFixed(2),
        benchmarkSharpe: backtest.value.benchmark_sharpe.toFixed(2),
        portfolioMaxDrawdown: (backtest.value.portfolio_max_drawdown * 100).toFixed(1),
        benchmarkMaxDrawdown: (backtest.value.benchmark_max_drawdown * 100).toFixed(1)
    }
})

const backtestCategories = ref([])
const backtestSeries = ref([])

const backtestChartOptions = computed(() => {
    theme.value
    const b = baseChartOptions()
    const t = chartTokens()
    return {
        ...b,
        chart: {
            ...b.chart,
            type: 'area',
            height: 350
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
            ...b.legend,
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            fontSize: '12px',
            fontWeight: 600
        },
        xaxis: {
            ...b.xaxis,
            categories: backtestCategories.value,
            title: {
                text: 'Quarter',
                style: { fontSize: '12px', fontWeight: 600, color: t.muted }
            }
        },
        yaxis: {
            ...b.yaxis,
            title: {
                text: 'Portfolio Value ($)',
                style: { fontSize: '12px', fontWeight: 600, color: t.muted }
            },
            labels: {
                ...b.yaxis.labels,
                formatter: function(value) {
                    return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 })
                }
            }
        },
        colors: [t.series[0], t.series[1]],
        tooltip: {
            ...b.tooltip,
            y: {
                formatter: function(value) {
                    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
            }
        }
    }
})

function updateBacktestChart() {
    if (!backtest.value?.quarterly_values?.length) return

    const quarters = backtest.value.quarterly_values.map(q => q.date)
    const portfolioValues = backtest.value.quarterly_values.map(q => q.portfolio)
    const benchmarkValues = backtest.value.quarterly_values.map(q => q.benchmark)

    backtestCategories.value = quarters
    backtestSeries.value = [
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
        const neutral = chartTokens().border
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

function resolveSectorColor(sector, assignedColors, availableColors, usedColors, overrides) {
    if (assignedColors.has(sector)) {
        return assignedColors.get(sector)
    }

    let color

    if (overrides.has(sector)) {
        color = overrides.get(sector)
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
    const { overrides, pool } = sectorPalette.value
    const overrideColors = new Set(overrides.values())
    const availableColors = pool.filter(color => !overrideColors.has(color))
    const assignedColors = new Map()
    const usedColors = new Set()

    return sectors.map(sector => ({
        ...sector,
        percentage: sector.percentage * normalizationFactor,
        color: resolveSectorColor(sector.sector, assignedColors, availableColors, usedColors, overrides)
    }))
})

const sectorChartSeries = computed(() =>
    sectorBreakdown.value.map(sector => Number(sector.percentage.toFixed(2)))
)

const sectorChartOptions = computed(() => {
    theme.value
    const b = baseChartOptions()
    const t = chartTokens()
    return {
        ...b,
        chart: {
            ...b.chart,
            type: 'donut'
        },
        labels: sectorBreakdown.value.map(sector => sector.sector),
        colors: sectorBreakdown.value.map(sector => sector.color),
        legend: {
            show: false
        },
        stroke: {
            colors: [t.surface],
            show: true,
            width: 2
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        name: {
                            color: t.muted,
                            fontSize: '14px',
                            fontWeight: 600
                        },
                        value: {
                            color: t.text,
                            fontSize: '18px',
                            formatter: value => `${Number(value).toFixed(1)}%`
                        },
                        total: {
                            show: true,
                            label: 'Holdings',
                            color: t.muted,
                            fontSize: '14px',
                            formatter: () => holdingsCount.value || 0
                        }
                    }
                }
            }
        },
        tooltip: {
            ...b.tooltip,
            y: {
                formatter: value => `${value.toFixed(1)}%`
            }
        }
    }
})

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

// Efficient frontier chart: series live in a ref (the highlight functions
// mutate point markers); options are a computed that follows the theme.
const frontierSeries = ref([])

const chartOptions = computed(() => {
    theme.value
    const b = baseChartOptions()
    const t = chartTokens()
    return {
        ...b,
        chart: {
            ...b.chart,
            type: 'scatter',
            height: 350,
            zoom: {
                enabled: false,
                type: 'xy'
            },
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
            ...b.legend,
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            fontSize: '12px',
            fontWeight: 600
        },
        xaxis: {
            ...b.xaxis,
            title: {
                text: 'Volatility (Standard Deviation)',
                style: { fontSize: '12px', fontWeight: 600, color: t.muted }
            },
            labels: {
                ...b.xaxis.labels,
                formatter: function(value) {
                    return value.toFixed(2);  // Format x-axis values to 2 decimal places
                }
            }
        },
        yaxis: {
            ...b.yaxis,
            title: {
                text: 'Expected Return',
                style: { fontSize: '12px', fontWeight: 600, color: t.muted }
            },
            labels: {
                ...b.yaxis.labels,
                formatter: function(value) {
                    return value.toFixed(2);  // Format y-axis values to 2 decimal places
                }
            }
        },
        colors: [t.series[1], t.series[0]],
        tooltip: {
            ...b.tooltip,
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
                const sharpeRatio = dataPoint.name === 'Max Sharpe Ratio'
                    ? portfolio.value['max_sharpe'].sharpe.toFixed(2)
                    : (dataPoint.y / dataPoint.x).toFixed(2); // Calculate Sharpe Ratio for other points

                // Construct the tooltip HTML
                return `
                    <div style="padding:10px; font-family:Inter, system-ui, sans-serif;">
                        <strong>${dataPoint.name}</strong><br>
                        Expected Return: ${(dataPoint.y * 100).toFixed(2)}%<br>
                        Volatility: ${(dataPoint.x * 100).toFixed(2)}%<br>
                        Sharpe Ratio: ${sharpeRatio}<br>
                    </div>
                `;
            }
        }
    }
});

// Sharpe ratio chart (not currently rendered; kept for parity)
const sharpeSeries = ref([])

const sharpeChartOptions = computed(() => {
    theme.value
    const b = baseChartOptions()
    const t = chartTokens()
    return {
        ...b,
        chart: {
            ...b.chart,
            type: 'scatter',
            height: 350,
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
            ...b.xaxis,
            title: {
                text: 'Portfolio',
                style: { fontSize: '12px', fontWeight: 600, color: t.muted }
            },
            labels: {
                show: false
            }
        },
        yaxis: {
            ...b.yaxis,
            title: {
                text: 'Sharpe Ratio',
                style: { fontSize: '12px', fontWeight: 600, color: t.muted }
            },
            labels: {
                ...b.yaxis.labels,
                formatter: function(value) {
                    return value.toFixed(2);  // Format y-axis values to 2 decimal places
                }
            }
        },
        colors: [t.series[0], t.series[1]]
    }
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
  frontierSeries.value = [
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
  sharpeSeries.value = [
    {
      name: 'Sharpe Ratio',
      data: sharpeData
    }
  ];
}

// Function to highlight corresponding data point
function highlightDataPoint(index) {
  const t = chartTokens();

  // Reset markers
  resetHighlight();

  // Highlight the data point in the main chart
  frontierSeries.value.forEach((series, seriesIndex) => {
    if (series.data[index]) {
      series.data[index].marker = {
        size: 10,
        fillColor: t.text
      };
    }
  });

  // Highlight the data point in the Sharpe ratio chart
  sharpeSeries.value.forEach((series, seriesIndex) => {
    if (series.data[index]) {
      series.data[index].marker = {
        size: 10,
        fillColor: t.text
      };
    }
  });
}

// Function to reset highlight
function resetHighlight() {
  const t = chartTokens();
  const frontierColors = [t.series[1], t.series[0]];

  // Reset markers in the main chart
  frontierSeries.value.forEach((series, seriesIndex) => {
    series.data.forEach(point => {
      point.marker = {
        size: 6,
        fillColor: frontierColors[seriesIndex] || t.series[0]
      };
    });
  });

  // Reset markers in the Sharpe ratio chart
  sharpeSeries.value.forEach(series => {
    series.data.forEach(point => {
      point.marker = {
        size: 6,
        fillColor: t.series[0]
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
    <section class="section">
        <div class="container">
            <p class="eyebrow">Lab</p>
            <h1>Optimal portfolio</h1>
            <p class="lede">
                A Monte Carlo portfolio optimizer over low-dividend U.S. stocks, refreshed daily by the
                stock-portfolio-optimizer service on App Engine. It maximizes the Sharpe ratio, screens
                out broken price histories, backtests the strategy with quarterly rebalancing, and applies
                a $500 minimum allocation per holding. Academic only, not financial advice.
            </p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="card prose">
                <h3>Optimal Portfolio: Select U.S. Stocks (past decade-ish)</h3>
                <p>{{ aboutOptimalPortfolio }}</p>
                <p>{{ aboutBacktesting }}</p>
            </div>
        </div>
    </section>

    <!-- show message when data is loading -->
    <section class="section" v-if="isLoading">
        <div class="container">
            <div class="card">
                <h3>Loading Optimal Portfolio...</h3>
                <p>Fetching today's run from the optimizer service.</p>
                <div class="progress" role="progressbar" aria-label="Loading"><span></span></div>
            </div>
        </div>
    </section>

    <!-- show error message when data fails to load -->
    <section class="section" v-if="error">
        <div class="container">
            <div class="card notice notice-danger">
                <h3>{{ error }}</h3>
            </div>
        </div>
    </section>

    <!-- show portfolio data -->
    <template v-if="isLoading === false && error === null">
        <section class="section">
            <div class="container">
                <div class="section-head">
                    <h2>Today's Optimal Portfolio</h2>
                    <span v-if="formattedLatestRunDate" class="muted small">Latest run: {{ formattedLatestRunDate }}</span>
                </div>

                <div class="chart-frame">
                    <h3>Efficient Frontier and Max Sharpe Ratio Portfolios</h3>
                    <p class="chart-desc">Expected return against volatility for each target portfolio; the max Sharpe portfolio is the highlighted point.</p>
                    <VueApexCharts
                        type="scatter"
                        :options="chartOptions"
                        :series="frontierSeries"
                        height="350"
                        />
                    <p class="chart-source">Source: daily optimizer run; returns and volatility are annualized from historical prices.</p>
                </div>
            </div>
        </section>

        <section class="section" v-if="sectorBreakdown.length || largestHolding || annualReturnPct !== null">
            <div class="container">
                <div class="card">
                    <div class="overview-grid">
                        <div class="overview-summary">
                            <div>
                                <h3>Portfolio Value by Sector</h3>
                                <p class="small">Normalized to 100% of the Max Sharpe portfolio</p>
                            </div>
                            <div class="metrics" v-if="largestHolding || annualReturnPct !== null || holdingsCount">
                                <div class="metric" v-if="largestHolding">
                                    <p class="metric-label">Largest Holding</p>
                                    <p class="metric-value">
                                        {{ largestHolding.name }}
                                        <span class="metric-ticker">({{ largestHolding.ticker }})</span>
                                    </p>
                                    <p class="metric-subtext">{{ largestHolding.percentage.toFixed(1) }}%</p>
                                </div>
                                <div class="metric" v-if="annualReturnPct !== null">
                                    <p class="metric-label">Annualized Return</p>
                                    <p class="metric-value">{{ annualReturnPct.toFixed(2) }}%</p>
                                    <p class="metric-subtext">Max Sharpe Portfolio</p>
                                </div>
                                <div class="metric" v-if="holdingsCount">
                                    <p class="metric-label">Holdings</p>
                                    <p class="metric-value">{{ holdingsCount }}</p>
                                    <p class="metric-subtext">With non-zero allocation</p>
                                </div>
                            </div>
                            <ul v-if="sectorBreakdown.length" class="sector-legend">
                                <li
                                    v-for="sector in sectorBreakdown"
                                    :key="`${sector.sector}-legend`"
                                    class="sector-legend-item"
                                >
                                    <span
                                        class="sector-swatch"
                                        :style="{ backgroundColor: sector.color }"
                                    ></span>
                                    <span class="small">
                                        {{ sector.sector }}
                                        <span class="muted">{{ sector.percentage.toFixed(1) }}%</span>
                                    </span>
                                </li>
                            </ul>
                            <p v-else class="muted">
                                Sector information is unavailable for this portfolio.
                            </p>
                        </div>
                        <div class="overview-chart">
                            <div v-if="sectorBreakdown.length" class="overview-chart-inner">
                                <VueApexCharts
                                    type="donut"
                                    :options="sectorChartOptions"
                                    :series="sectorChartSeries"
                                    height="260"
                                />
                            </div>
                            <p v-else class="muted">
                                Add sector data to visualize the portfolio mix.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Backtest Results Section -->
        <section class="section" v-if="hasBacktest && backtestMetrics">
            <div class="container">
                <div class="chart-frame">
                    <h3>Historical Backtest Performance</h3>
                    <p class="chart-desc" v-if="backtestPeriod">{{ backtestPeriod }} · Starting value: $100,000</p>
                    <p class="chart-desc" v-else>Portfolio against the S&amp;P 500, rebalanced quarterly.</p>
                    <VueApexCharts
                        type="area"
                        :options="backtestChartOptions"
                        :series="backtestSeries"
                        height="350"
                    />
                    <div class="metrics metrics-backtest">
                        <div class="metric">
                            <p class="metric-label">Annualized Return</p>
                            <div class="compare">
                                <div class="compare-item">
                                    <span class="metric-value">{{ backtestMetrics.portfolioReturn }}%</span>
                                    <span class="compare-label">Portfolio</span>
                                </div>
                                <span class="compare-sep">vs</span>
                                <div class="compare-item">
                                    <span class="metric-value">{{ backtestMetrics.benchmarkReturn }}%</span>
                                    <span class="compare-label">Benchmark</span>
                                </div>
                            </div>
                            <p class="metric-subtext">Outperformance: +{{ backtestMetrics.outperformance }}%</p>
                        </div>
                        <div class="metric">
                            <p class="metric-label">Sharpe Ratio</p>
                            <div class="compare">
                                <div class="compare-item">
                                    <span class="metric-value">{{ backtestMetrics.portfolioSharpe }}</span>
                                    <span class="compare-label">Portfolio</span>
                                </div>
                                <span class="compare-sep">vs</span>
                                <div class="compare-item">
                                    <span class="metric-value">{{ backtestMetrics.benchmarkSharpe }}</span>
                                    <span class="compare-label">Benchmark</span>
                                </div>
                            </div>
                            <p class="metric-subtext">Risk-adjusted return measure</p>
                        </div>
                        <div class="metric">
                            <p class="metric-label">Max Drawdown</p>
                            <div class="compare">
                                <div class="compare-item">
                                    <span class="metric-value">{{ backtestMetrics.portfolioMaxDrawdown }}%</span>
                                    <span class="compare-label">Portfolio</span>
                                </div>
                                <span class="compare-sep">vs</span>
                                <div class="compare-item">
                                    <span class="metric-value">{{ backtestMetrics.benchmarkMaxDrawdown }}%</span>
                                    <span class="compare-label">Benchmark</span>
                                </div>
                            </div>
                            <p class="metric-subtext">Largest peak-to-trough decline</p>
                        </div>
                    </div>
                    <p class="chart-source">Source: quarterly rebalanced simulation from the optimizer service.</p>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="card">
                    <h3>Max Sharpe Ratio | Portfolio Weights</h3>
                    <div class="field">
                        <label class="field-label" for="budget">Budget</label>
                        <input id="budget" class="field-input" type="number" v-model="budget" @change="updateBudget($event.target.value)">
                        <p class="small muted">
                            Each holding gets at least ${{ MIN_ALLOCATION.toLocaleString() }}. Holdings the optimizer sized below that are dropped and their weight is spread across the rest.
                        </p>
                        <p class="small notice-text" v-if="droppedHoldings.length">
                            Dropped at this budget ({{ droppedHoldings.length }}):
                            {{ droppedHoldings.map(stock => stock.ticker).join(', ') }}
                        </p>
                    </div>
                    <div class="table-wrap">
                        <table class="holdings">
                            <thead>
                                <tr>
                                    <th>Symbol</th>
                                    <th>Name</th>
                                    <th>Sector</th>
                                    <th class="num">Weight</th>
                                    <th class="num">Budget</th>
                                    <th class="num">Shares to Hold</th>
                                    <th>Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="stock in maxSharpeWeights" :key="stock.ticker">
                                    <tr v-if="stock.weight > 0">
                                        <td><strong>{{ stock.ticker }}</strong></td>
                                        <td>{{ stockDisplayName(stock) || '' }}</td>
                                        <td>{{ stockSector(stock) }}</td>
                                        <td class="num">{{ weightPercentage(stock.weight) }}</td>
                                        <td class="num">${{ getStockSpendAmount(stock) }}</td>
                                        <td class="num">{{ getSharesToBuy(stock) }}</td>
                                        <td>
                                            <a
                                                v-if="stockWebsite(stock)"
                                                :href="stockWebsite(stock)"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {{ stockWebsiteDisplay(stock) }}
                                            </a>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </template>

    <section class="section">
        <div class="container">
            <div class="card prose">
                <h3>About The Portfolio Optimizer</h3>
                <p>{{ aboutModel }}</p>
                <p>
                    <a :href="modelLink.link" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                        {{ modelLink.name }}
                    </a>
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.card.prose {
    max-width: none;
}

.card.prose p {
    max-width: var(--measure);
}

/* Loading bar */
.progress {
    height: 4px;
    background: var(--border);
    border-radius: 999px;
    overflow: hidden;
}

.progress span {
    display: block;
    width: 30%;
    height: 100%;
    background: var(--accent);
    animation: slide 1.2s ease-in-out infinite;
}

@keyframes slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
}

/* Notices (status colors only here) */
.notice-danger {
    border-color: var(--danger);
}

.notice-danger h3 {
    color: var(--danger);
    margin: 0;
}

.notice-text {
    color: var(--warning);
}

/* Overview */
.overview-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--s-5);
    align-items: center;
}

@media (min-width: 900px) {
    .overview-grid {
        grid-template-columns: 1.4fr 1fr;
    }
}

.overview-summary {
    display: flex;
    flex-direction: column;
    gap: var(--s-4);
}

.overview-summary h3 {
    margin-bottom: var(--s-1);
}

.overview-chart {
    display: flex;
    justify-content: center;
    align-items: center;
}

.overview-chart-inner {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
}

/* Metrics */
.metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--s-3);
}

.metrics-backtest {
    margin-top: var(--s-4);
}

.metric {
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: var(--s-3) var(--s-4);
}

.metric p {
    margin: 0;
}

.metric-label {
    font-size: var(--fs-eyebrow);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    color: var(--muted);
}

.metric-value {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.2;
    margin-top: var(--s-1);
}

.metric-ticker {
    font-size: 0.85em;
    color: var(--muted);
}

.metric-subtext {
    font-size: var(--fs-small);
    color: var(--muted);
    margin-top: var(--s-1);
}

.compare {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-3);
    margin-top: var(--s-2);
}

.compare-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}

.compare-label {
    font-size: var(--fs-eyebrow);
    color: var(--muted);
    margin-top: 2px;
}

.compare-sep {
    font-size: var(--fs-eyebrow);
    color: var(--muted);
}

/* Sector legend */
.sector-legend {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--s-2) var(--s-5);
    padding: 0;
    margin: 0;
}

.sector-legend-item {
    display: flex;
    align-items: center;
    gap: var(--s-2);
}

.sector-swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    flex: 0 0 auto;
    box-shadow: 0 0 0 1px var(--border);
}

/* Form */
.field {
    margin-bottom: var(--s-4);
}

.field-label {
    display: block;
    font-size: var(--fs-small);
    font-weight: 600;
    margin-bottom: var(--s-1);
}

.field-input {
    width: 100%;
    max-width: 240px;
    font-family: var(--font-body);
    font-size: var(--fs-body);
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: var(--s-2) var(--s-3);
    margin-bottom: var(--s-2);
}

.field-input:focus {
    border-color: var(--accent);
    outline: none;
}

/* Holdings table */
.table-wrap {
    overflow-x: auto;
}

.holdings {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--fs-small);
    font-variant-numeric: tabular-nums;
}

.holdings th,
.holdings td {
    text-align: left;
    padding: var(--s-2) var(--s-3);
    border-bottom: 1px solid var(--border);
    vertical-align: top;
}

.holdings th {
    font-size: var(--fs-eyebrow);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    font-weight: 600;
}

.holdings .num {
    text-align: right;
    white-space: nowrap;
}
</style>
