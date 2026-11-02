import { theme } from './theme.js'

// Reads the design tokens from the document so charts match the current mode.
// Call inside a computed that references theme.value so it re-runs on toggle.
export function chartTokens() {
  const s = getComputedStyle(document.documentElement)
  const g = (n) => s.getPropertyValue(n).trim()
  return {
    text: g('--text'),
    muted: g('--muted'),
    border: g('--border'),
    surface: g('--surface'),
    accent: g('--accent'),
    success: g('--success'),
    warning: g('--warning'),
    danger: g('--danger'),
    series: [1, 2, 3, 4, 5, 6].map((i) => g(`--chart-${i}`))
  }
}

// Base apexcharts options for every Lab chart. Spread this first, then add
// the chart's own type-specific options on top.
export function baseChartOptions() {
  const t = chartTokens()
  const mode = theme.value
  return {
    chart: {
      background: 'transparent',
      foreColor: t.muted,
      fontFamily: 'Inter, system-ui, sans-serif',
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false }
    },
    colors: t.series,
    theme: { mode },
    tooltip: { theme: mode },
    grid: { borderColor: t.border, strokeDashArray: 0 },
    dataLabels: { enabled: false },
    xaxis: {
      axisBorder: { color: t.border },
      axisTicks: { color: t.border },
      labels: { style: { colors: t.muted } }
    },
    yaxis: {
      labels: { style: { colors: t.muted } }
    },
    legend: { labels: { colors: t.text } }
  }
}
