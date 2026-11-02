<!-- An app that helps users play Wordle -->

<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { baseChartOptions, chartTokens } from '../chartTheme.js'
import { theme } from '../theme.js'
import wordleService from '../service/WordleService.js'
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const wordleSrv = new wordleService()

function forceInput1(input_string) {
    if (input_string == '') {
        return '--'
    } else {
        return input_string.substring(1, 0)
    }
}


// json object to track the status of each letter in the wordle words
var wordleWords = ref({
    word1: {
        active: true,
        value1: '_',
        value2: '_',
        value3: '_',
        value4: '_',
        value5: '_',
        status1: 'inactive',
        status2: 'inactive',
        status3: 'inactive',
        status4: 'inactive',
        status5: 'inactive'
    },
    word2: {
        active: false,
        value1: '_',
        value2: '_',
        value3: '_',
        value4: '_',
        value5: '_',
        status1: 'inactive',
        status2: 'inactive',
        status3: 'inactive',
        status4: 'inactive',
        status5: 'inactive'
    },
    word3: {
        active: false,
        value1: '_',
        value2: '_',
        value3: '_',
        value4: '_',
        value5: '_',
        status1: 'inactive',
        status2: 'inactive',
        status3: 'inactive',
        status4: 'inactive',
        status5: 'inactive'
    },
    word4: {
        active: false,
        value1: '_',
        value2: '_',
        value3: '_',
        value4: '_',
        value5: '_',
        status1: 'inactive',
        status2: 'inactive',
        status3: 'inactive',
        status4: 'inactive',
        status5: 'inactive'
    },
    word5: {
        active: false,
        value1: '_',
        value2: '_',
        value3: '_',
        value4: '_',
        value5: '_',
        status1: 'inactive',
        status2: 'inactive',
        status3: 'inactive',
        status4: 'inactive',
        status5: 'inactive'
    }
})

function keyboardInput(letter) {
    if (wordleWords.value.word1.active && wordleWords.value.word1.value5 == '_') {
        // replace the first underscore with the letter
        if (wordleWords.value.word1.value1 == '_') {
            wordleWords.value.word1.value1 = letter.toUpperCase()
        } else if (wordleWords.value.word1.value2 == '_') {
            wordleWords.value.word1.value2 = letter.toUpperCase()
        } else if (wordleWords.value.word1.value3 == '_') {
            wordleWords.value.word1.value3 = letter.toUpperCase()
        } else if (wordleWords.value.word1.value4 == '_') {
            wordleWords.value.word1.value4 = letter.toUpperCase()
        } else if (wordleWords.value.word1.value5 == '_') {
            wordleWords.value.word1.value5 = letter.toUpperCase()
        }
    } else if (wordleWords.value.word2.active && wordleWords.value.word2.value5 == '_') {
        // replace the first underscore with the letter
        if (wordleWords.value.word2.value1 == '_') {
            wordleWords.value.word2.value1 = letter.toUpperCase()
        } else if (wordleWords.value.word2.value2 == '_') {
            wordleWords.value.word2.value2 = letter.toUpperCase()
        } else if (wordleWords.value.word2.value3 == '_') {
            wordleWords.value.word2.value3 = letter.toUpperCase()
        } else if (wordleWords.value.word2.value4 == '_') {
            wordleWords.value.word2.value4 = letter.toUpperCase()
        } else if (wordleWords.value.word2.value5 == '_') {
            wordleWords.value.word2.value5 = letter.toUpperCase()
        }
    } else if (wordleWords.value.word3.active && wordleWords.value.word3.value5 == '_') {
        // replace the first underscore with the letter
        if (wordleWords.value.word3.value1 == '_') {
            wordleWords.value.word3.value1 = letter.toUpperCase()
        } else if (wordleWords.value.word3.value2 == '_') {
            wordleWords.value.word3.value2 = letter.toUpperCase()
        } else if (wordleWords.value.word3.value3 == '_') {
            wordleWords.value.word3.value3 = letter.toUpperCase()
        } else if (wordleWords.value.word3.value4 == '_') {
            wordleWords.value.word3.value4 = letter.toUpperCase()
        } else if (wordleWords.value.word3.value5 == '_') {
            wordleWords.value.word3.value5 = letter.toUpperCase()
        }
    } else if (wordleWords.value.word4.active && wordleWords.value.word4.value5 == '_') {
        // replace the first underscore with the letter
        if (wordleWords.value.word4.value1 == '_') {
            wordleWords.value.word4.value1 = letter.toUpperCase()
        } else if (wordleWords.value.word4.value2 == '_') {
            wordleWords.value.word4.value2 = letter.toUpperCase()
        } else if (wordleWords.value.word4.value3 == '_') {
            wordleWords.value.word4.value3 = letter.toUpperCase()
        } else if (wordleWords.value.word4.value4 == '_') {
            wordleWords.value.word4.value4 = letter.toUpperCase()
        } else if (wordleWords.value.word4.value5 == '_') {
            wordleWords.value.word4.value5 = letter.toUpperCase()
        }
    } else if (wordleWords.value.word5.active && wordleWords.value.word5.value5 == '_') {
        // replace the first underscore with the letter
        if (wordleWords.value.word5.value1 == '_') {
            wordleWords.value.word5.value1 = letter.toUpperCase()
        } else if (wordleWords.value.word5.value2 == '_') {
            wordleWords.value.word5.value2 = letter.toUpperCase()
        } else if (wordleWords.value.word5.value3 == '_') {
            wordleWords.value.word5.value3 = letter.toUpperCase()
        } else if (wordleWords.value.word5.value4 == '_') {
            wordleWords.value.word5.value4 = letter.toUpperCase()
        } else if (wordleWords.value.word5.value5 == '_') {
            wordleWords.value.word5.value5 = letter.toUpperCase()
        }
    }
}

function backspaceInput() {
    // replace the last letter with an underscore
    if (wordleWords.value.word5.active) {
        if (wordleWords.value.word5.value5 !== '_') {
            wordleWords.value.word5.value5 = '_'
            resetLetterStatus(5, 5)
        } else if (wordleWords.value.word5.value4 !== '_') {
            wordleWords.value.word5.value4 = '_'
            resetLetterStatus(5, 4)
        } else if (wordleWords.value.word5.value3 !== '_') {
            wordleWords.value.word5.value3 = '_'
            resetLetterStatus(5, 3)
        } else if (wordleWords.value.word5.value2 !== '_') {
            wordleWords.value.word5.value2 = '_'
            resetLetterStatus(5, 2)
        } else if (wordleWords.value.word5.value1 !== '_') {
            wordleWords.value.word5.value1 = '_'
            resetLetterStatus(5, 1)
        }
    } else if (wordleWords.value.word4.active) {
        if (wordleWords.value.word4.value5 !== '_') {
            wordleWords.value.word4.value5 = '_'
            resetLetterStatus(4, 5)
        } else if (wordleWords.value.word4.value4 !== '_') {
            wordleWords.value.word4.value4 = '_'
            resetLetterStatus(4, 4)
        } else if (wordleWords.value.word4.value3 !== '_') {
            wordleWords.value.word4.value3 = '_'
            resetLetterStatus(4, 3)
        } else if (wordleWords.value.word4.value2 !== '_') {
            wordleWords.value.word4.value2 = '_'
            resetLetterStatus(4, 2)
        } else if (wordleWords.value.word4.value1 !== '_') {
            wordleWords.value.word4.value1 = '_'
            resetLetterStatus(4, 1)
        }
    } else if (wordleWords.value.word3.active) {
        if (wordleWords.value.word3.value5 !== '_') {
            wordleWords.value.word3.value5 = '_'
            resetLetterStatus(3, 5)
        } else if (wordleWords.value.word3.value4 !== '_') {
            wordleWords.value.word3.value4 = '_'
            resetLetterStatus(3, 4)
        } else if (wordleWords.value.word3.value3 !== '_') {
            wordleWords.value.word3.value3 = '_'
            resetLetterStatus(3, 3)
        } else if (wordleWords.value.word3.value2 !== '_') {
            wordleWords.value.word3.value2 = '_'
            resetLetterStatus(3, 2)
        } else if (wordleWords.value.word3.value1 !== '_') {
            wordleWords.value.word3.value1 = '_'
            resetLetterStatus(3, 1)
        }
    } else if (wordleWords.value.word2.active) {
        if (wordleWords.value.word2.value5 !== '_') {
            wordleWords.value.word2.value5 = '_'
            resetLetterStatus(2, 5)
        } else if (wordleWords.value.word2.value4 !== '_') {
            wordleWords.value.word2.value4 = '_'
            resetLetterStatus(2, 4)
        } else if (wordleWords.value.word2.value3 !== '_') {
            wordleWords.value.word2.value3 = '_'
            resetLetterStatus(2, 3)
        } else if (wordleWords.value.word2.value2 !== '_') {
            wordleWords.value.word2.value2 = '_'
            resetLetterStatus(2, 2)
        } else if (wordleWords.value.word2.value1 !== '_') {
            wordleWords.value.word2.value1 = '_'
            resetLetterStatus(2, 1)
        }
    } else if (wordleWords.value.word1.active) {
        if (wordleWords.value.word1.value5 !== '_') {
            wordleWords.value.word1.value5 = '_'
            resetLetterStatus(1, 5)
        } else if (wordleWords.value.word1.value4 !== '_') {
            wordleWords.value.word1.value4 = '_'
            resetLetterStatus(1, 4)
        } else if (wordleWords.value.word1.value3 !== '_') {
            wordleWords.value.word1.value3 = '_'
            resetLetterStatus(1, 3)
        } else if (wordleWords.value.word1.value2 !== '_') {
            wordleWords.value.word1.value2 = '_'
            resetLetterStatus(1, 2)
        } else if (wordleWords.value.word1.value1 !== '_') {
            wordleWords.value.word1.value1 = '_'
            resetLetterStatus(1, 1)
        }
    }
}

function rotateLetterStatus(status) {
    if (status == 'inactive') {
        return 'yellow'
    } else if (status == 'yellow') {
        return 'green'
    } else if (status == 'green') {
        return 'inactive'
    }
}

function returnButtonFormat(status) {
    if (status == 'yellow') {
        return 'tile tile-yellow'
    } else if (status == 'green') {
        return 'tile tile-green'
    } else {
        return 'tile'
    }
}

function resetLetterStatus(wordPos, letterPos) {
    if (wordPos == 1) {
        if (letterPos == 1) {
            wordleWords.value.word1.status1 = 'inactive'
        } else if (letterPos == 2) {
            wordleWords.value.word1.status2 = 'inactive'
        } else if (letterPos == 3) {
            wordleWords.value.word1.status3 = 'inactive'
        } else if (letterPos == 4) {
            wordleWords.value.word1.status4 = 'inactive'
        } else if (letterPos == 5) {
            wordleWords.value.word1.status5 = 'inactive'
        }
    } else if (wordPos == 2) {
        if (letterPos == 1) {
            wordleWords.value.word2.status1 = 'inactive'
        } else if (letterPos == 2) {
            wordleWords.value.word2.status2 = 'inactive'
        } else if (letterPos == 3) {
            wordleWords.value.word2.status3 = 'inactive'
        } else if (letterPos == 4) {
            wordleWords.value.word2.status4 = 'inactive'
        } else if (letterPos == 5) {
            wordleWords.value.word2.status5 = 'inactive'
        }
    } else if (wordPos == 3) {
        if (letterPos == 1) {
            wordleWords.value.word3.status1 = 'inactive'
        } else if (letterPos == 2) {
            wordleWords.value.word3.status2 = 'inactive'
        } else if (letterPos == 3) {
            wordleWords.value.word3.status3 = 'inactive'
        } else if (letterPos == 4) {
            wordleWords.value.word3.status4 = 'inactive'
        } else if (letterPos == 5) {
            wordleWords.value.word3.status5 = 'inactive'
        }
    } else if (wordPos == 4) {
        if (letterPos == 1) {
            wordleWords.value.word4.status1 = 'inactive'
        } else if (letterPos == 2) {
            wordleWords.value.word4.status2 = 'inactive'
        } else if (letterPos == 3) {
            wordleWords.value.word4.status3 = 'inactive'
        } else if (letterPos == 4) {
            wordleWords.value.word4.status4 = 'inactive'
        } else if (letterPos == 5) {
            wordleWords.value.word4.status5 = 'inactive'
        }
    } else if (wordPos == 5) {
        if (letterPos == 1) {
            wordleWords.value.word5.status1 = 'inactive'
        } else if (letterPos == 2) {
            wordleWords.value.word5.status2 = 'inactive'
        } else if (letterPos == 3) {
            wordleWords.value.word5.status3 = 'inactive'
        } else if (letterPos == 4) {
            wordleWords.value.word5.status4 = 'inactive'
        } else if (letterPos == 5) {
            wordleWords.value.word5.status5 = 'inactive'
        }
    }
}

function changeLetterStatus(wordPos, letterPos) {
    if (wordPos == 1) {
        if (letterPos == 1) {
            wordleWords.value.word1.status1 = rotateLetterStatus(wordleWords.value.word1.status1)
        } else if (letterPos == 2) {
            wordleWords.value.word1.status2 = rotateLetterStatus(wordleWords.value.word1.status2)
        } else if (letterPos == 3) {
            wordleWords.value.word1.status3 = rotateLetterStatus(wordleWords.value.word1.status3)
        } else if (letterPos == 4) {
            wordleWords.value.word1.status4 = rotateLetterStatus(wordleWords.value.word1.status4)
        } else if (letterPos == 5) {
            wordleWords.value.word1.status5 = rotateLetterStatus(wordleWords.value.word1.status5)
        }
    } else if (wordPos == 2) {
        if (letterPos == 1) {
            wordleWords.value.word2.status1 = rotateLetterStatus(wordleWords.value.word2.status1)
        } else if (letterPos == 2) {
            wordleWords.value.word2.status2 = rotateLetterStatus(wordleWords.value.word2.status2)
        } else if (letterPos == 3) {
            wordleWords.value.word2.status3 = rotateLetterStatus(wordleWords.value.word2.status3)
        } else if (letterPos == 4) {
            wordleWords.value.word2.status4 = rotateLetterStatus(wordleWords.value.word2.status4)
        } else if (letterPos == 5) {
            wordleWords.value.word2.status5 = rotateLetterStatus(wordleWords.value.word2.status5)
        }
    } else if (wordPos == 3) {
        if (letterPos == 1) {
            wordleWords.value.word3.status1 = rotateLetterStatus(wordleWords.value.word3.status1)
        } else if (letterPos == 2) {
            wordleWords.value.word3.status2 = rotateLetterStatus(wordleWords.value.word3.status2)
        } else if (letterPos == 3) {
            wordleWords.value.word3.status3 = rotateLetterStatus(wordleWords.value.word3.status3)
        } else if (letterPos == 4) {
            wordleWords.value.word3.status4 = rotateLetterStatus(wordleWords.value.word3.status4)
        } else if (letterPos == 5) {
            wordleWords.value.word3.status5 = rotateLetterStatus(wordleWords.value.word3.status5)
        }
    } else if (wordPos == 4) {
        if (letterPos == 1) {
            wordleWords.value.word4.status1 = rotateLetterStatus(wordleWords.value.word4.status1)
        } else if (letterPos == 2) {
            wordleWords.value.word4.status2 = rotateLetterStatus(wordleWords.value.word4.status2)
        } else if (letterPos == 3) {
            wordleWords.value.word4.status3 = rotateLetterStatus(wordleWords.value.word4.status3)
        } else if (letterPos == 4) {
            wordleWords.value.word4.status4 = rotateLetterStatus(wordleWords.value.word4.status4)
        } else if (letterPos == 5) {
            wordleWords.value.word4.status5 = rotateLetterStatus(wordleWords.value.word4.status5)
        }
    } else if (wordPos == 5) {
        if (letterPos == 1) {
            wordleWords.value.word5.status1 = rotateLetterStatus(wordleWords.value.word5.status1)
        } else if (letterPos == 2) {
            wordleWords.value.word5.status2 = rotateLetterStatus(wordleWords.value.word5.status2)
        } else if (letterPos == 3) {
            wordleWords.value.word5.status3 = rotateLetterStatus(wordleWords.value.word5.status3)
        } else if (letterPos == 4) {
            wordleWords.value.word5.status4 = rotateLetterStatus(wordleWords.value.word5.status4)
        } else if (letterPos == 5) {
            wordleWords.value.word5.status5 = rotateLetterStatus(wordleWords.value.word5.status5)
        }
    }
}

function processWord(word, greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList) {
    // rotate through active wordleWords and create lists
    if (word.active) {
        var workingBlackLetters = ref([])
        var workingLetters = ref([])
        if (word.status1 == 'green') {
            greenLettersList.value[0] = word.value1.toLowerCase()
            workingLetters.value.push(word.value1.toLowerCase())
        } else if (word.status1 === 'yellow') {
            if (yellowLettersList1.value[0] === 'none') {
                yellowLettersList1.value[0] = word.value1.toLowerCase()
            } else {
                yellowLettersList1.value.push(word.value1.toLowerCase())
            }
            workingLetters.value.push(word.value1.toLowerCase())
        } else if (word.status1 === 'inactive') {
            workingBlackLetters.value.push(word.value1.toLowerCase())
        }
        if (word.status2 == 'green') {
            greenLettersList.value[1] = word.value2.toLowerCase()
            workingLetters.value.push(word.value2.toLowerCase())
        } else if (word.status2 === 'yellow') {
            if (yellowLettersList2.value[0] === 'none') {
                yellowLettersList2.value[0] = word.value2.toLowerCase()
            } else {
                yellowLettersList2.value.push(word.value2.toLowerCase())
            }
            workingLetters.value.push(word.value2.toLowerCase())
        } else if (word.status2 === 'inactive') {
            workingBlackLetters.value.push(word.value2.toLowerCase())
        }
        if (word.status3 == 'green') {
            greenLettersList.value[2] = word.value3.toLowerCase()
            workingLetters.value.push(word.value3.toLowerCase())
        } else if (word.status3 === 'yellow') {
            if (yellowLettersList3.value[0] === 'none') {
                yellowLettersList3.value[0] = word.value3.toLowerCase()
            } else {
                yellowLettersList3.value.push(word.value3.toLowerCase())
            }
            workingLetters.value.push(word.value3.toLowerCase())
        } else if (word.status3 === 'inactive') {
            workingBlackLetters.value.push(word.value3.toLowerCase())
        }
        if (word.status4 == 'green') {
            greenLettersList.value[3] = word.value4.toLowerCase()
            workingLetters.value.push(word.value4.toLowerCase())
        } else if (word.status4 === 'yellow') {
            if (yellowLettersList4.value[0] === 'none') {
                yellowLettersList4.value[0] = word.value4.toLowerCase()
            } else {
                yellowLettersList4.value.push(word.value4.toLowerCase())
            }
            workingLetters.value.push(word.value4.toLowerCase())
        } else if (word.status4 === 'inactive') {
            workingBlackLetters.value.push(word.value4.toLowerCase())
        }
        if (word.status5 == 'green') {
            greenLettersList.value[4] = word.value5.toLowerCase()
            workingLetters.value.push(word.value5.toLowerCase())
        } else if (word.status5 === 'yellow') {
            if (yellowLettersList5.value[0] === 'none') {
                yellowLettersList5.value[0] = word.value5.toLowerCase()
            } else {
                yellowLettersList5.value.push(word.value5.toLowerCase())
            }
            workingLetters.value.push(word.value5.toLowerCase())
        } else if (word.status5 === 'inactive') {
            workingBlackLetters.value.push(word.value5.toLowerCase())
        }
        // Check for black letters in working letters
        workingBlackLetters.value.forEach(blkLetter => {
            const count = workingLetters.value.filter(wrkLetter => wrkLetter === blkLetter).length;
            if (count === 2) {
                tripleLettersList.value.push(blkLetter);
            } else if (count === 1) {
                doubleLettersList.value.push(blkLetter);
            }
        });
        // Remove any workingBlackLetters that appear in doubleLettersList or tripleLettersList
        workingBlackLetters.value = workingBlackLetters.value.filter(blkLetter =>
            !doubleLettersList.value.includes(blkLetter) && !tripleLettersList.value.includes(blkLetter)
        );
        // Add remaining workingBlackLetters to blackLettersList
        workingBlackLetters.value.forEach(blkLetter => {
            blackLettersList.value.push(blkLetter);
        });
        // remove duplications in blackLettersList
        blackLettersList.value = [...new Set(blackLettersList.value)];
        // remove "none" from blackLettersList
        blackLettersList.value = blackLettersList.value.filter(blkLetter => blkLetter !== 'none');
        // remove duplicates in doubleLettersList
        doubleLettersList.value = [...new Set(doubleLettersList.value)];
        // remove none from doubleLettersList if doubleLettersList is longer than 1 entry
        if (doubleLettersList.value.length > 1) {
            doubleLettersList.value = doubleLettersList.value.filter(dblLetter => dblLetter !== 'none');
        }
        // remove duplicates in tripleLettersList
        tripleLettersList.value = [...new Set(tripleLettersList.value)];
        // remove none from tripleLettersList
        if (tripleLettersList.value.length > 1) {
            tripleLettersList.value = tripleLettersList.value.filter(trpLetter => trpLetter !== 'none');
        }
    }
    return greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList
}

var recommendedWords = ref([])
var bestOverall = ref([])
var bestAnswers = ref([])
var wordleStats = ref(null)

var isLoading = ref(false)
var isLoaded = ref(false)

function createWordle(greenLetters, yellowLetters, blackLettersList, doubleLettersList, tripleLettersList) {
    isLoading.value = true
    wordleSrv.getWordleData(greenLetters, yellowLetters, blackLettersList, doubleLettersList, tripleLettersList)
        .then(response => {
            if (Array.isArray(response)) {
                // legacy API shape: a flat list of {word, bits}
                recommendedWords.value = response
                bestOverall.value = response.slice(0, 3)
                bestAnswers.value = []
                wordleStats.value = null
            } else {
                // upgraded API shape: {recommendations, best_overall, best_answers, stats}
                recommendedWords.value = response.recommendations
                bestOverall.value = response.best_overall
                bestAnswers.value = response.best_answers
                wordleStats.value = response.stats
            }
            isLoading.value = false
            isLoaded.value = true
        })
}

// chart colors from the design tokens: series 5 (blue) marks a word that can be the
// answer, series 2 (ochre) a legal guess not on the answer list. Re-read on theme toggle.
const chartColors = computed(() => {
    theme.value
    const t = chartTokens()
    return { answer: t.series[4], other: t.series[1] }
})

// top 10 plays, charted as "extra bits left vs the best play" (zero baseline = best word)
var topWords = computed(() => recommendedWords.value.slice(0, 10))

var rankingSeries = computed(() => {
    if (!topWords.value.length) return []
    const bestBits = topWords.value[0].bits
    return [{
        name: 'Extra bits left vs best play',
        data: topWords.value.map(word => ({
            x: word.word.toUpperCase(),
            y: Number((word.bits - bestBits).toFixed(3)),
            fillColor: (wordleStats.value && !word.is_answer) ? chartColors.value.other : chartColors.value.answer
        }))
    }]
})

var rankingChartHeight = computed(() => 80 + topWords.value.length * 32)

var rankingOptions = computed(() => {
    theme.value
    const b = baseChartOptions()
    const t = chartTokens()
    return {
        ...b,
        chart: { ...b.chart, type: 'bar' },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '55%',
                borderRadius: 4,
                borderRadiusApplication: 'end'
            }
        },
        grid: {
            ...b.grid,
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: false } }
        },
        xaxis: {
            ...b.xaxis,
            title: { text: 'Extra bits left vs best play (shorter is better)', style: { fontWeight: 400, color: t.muted } },
            labels: { ...b.xaxis.labels, formatter: (val) => Number(val).toFixed(2) }
        },
        tooltip: {
            ...b.tooltip,
            custom: ({ dataPointIndex }) => {
                const word = topWords.value[dataPointIndex]
                if (!word) return ''
                const bestBits = topWords.value[0].bits
                const delta = (word.bits - bestBits).toFixed(2)
                const tag = wordleStats.value
                    ? (word.is_answer ? ' &middot; possible answer' : ' &middot; not on answer list')
                    : ''
                return '<div style="padding: 6px 10px; background: ' + t.surface + '; color: ' + t.text + '; border: 1px solid ' + t.border + ';">'
                    + '<strong>' + word.word.toUpperCase() + '</strong>' + tag + '<br/>'
                    + word.bits.toFixed(2) + ' bits left (+' + delta + ' vs best play)'
                    + '</div>'
            }
        }
    }
})

// share of starting uncertainty already eliminated (needs the upgraded API)
var uncertaintyPct = computed(() => {
    if (!wordleStats.value || !wordleStats.value.starting_uncertainty_bits) return 0
    return Math.round(100 * (1 - wordleStats.value.uncertainty_bits / wordleStats.value.starting_uncertainty_bits))
})

function activateNextWord() {
    if (!wordleWords.value.word2.active) {
        wordleWords.value.word2.active = true
    } else if (!wordleWords.value.word3.active) {
        wordleWords.value.word3.active = true
    } else if (!wordleWords.value.word4.active) {
        wordleWords.value.word4.active = true
    } else if (!wordleWords.value.word5.active) {
        wordleWords.value.word5.active = true
    }
}

var warnWordle = ref(false)

function enterWordle() {
    // process the wordle words
    var greenLettersList = ref(['none', 'none', 'none', 'none', 'none'])
    var yellowLettersList1 = ref(['none'])
    var yellowLettersList2 = ref(['none'])
    var yellowLettersList3 = ref(['none'])
    var yellowLettersList4 = ref(['none'])
    var yellowLettersList5 = ref(['none'])
    var blackLettersList = ref(['none'])
    var doubleLettersList = ref(['none'])
    var tripleLettersList = ref(['none'])
    if (wordleWords.value.word1.active) {
        // check if the word has "_" in it
        const tmpList1 = [wordleWords.value.word1.value1, wordleWords.value.word1.value2, wordleWords.value.word1.value3, wordleWords.value.word1.value4, wordleWords.value.word1.value5]
        for (var i = 0; i < tmpList1.length; i++) {
            if (tmpList1[i] === '_') {
                warnWordle.value = true
                return
            } else {
                warnWordle.value = false
            }
        }
        greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList = processWord(wordleWords.value.word1, greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList)
    }
    if (wordleWords.value.word2.active) {
        // check if the word has "_" in it
        const tmpList2 = [wordleWords.value.word2.value1, wordleWords.value.word2.value2, wordleWords.value.word2.value3, wordleWords.value.word2.value4, wordleWords.value.word2.value5]
        for (var i = 0; i < tmpList2.length; i++) {
            if (tmpList2[i] === '_') {
                warnWordle.value = true
                return
            } else {
                warnWordle.value = false
            }
        }
        greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList = processWord(wordleWords.value.word2, greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList)
    }
    if (wordleWords.value.word3.active) {
        // check if the word has "_" in it
        const tmpList3 = [wordleWords.value.word3.value1, wordleWords.value.word3.value2, wordleWords.value.word3.value3, wordleWords.value.word3.value4, wordleWords.value.word3.value5]
        for (var i = 0; i < tmpList3.length; i++) {
            if (tmpList3[i] === '_') {
                warnWordle.value = true
                return
            } else {
                warnWordle.value = false
            }
        }
        greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList = processWord(wordleWords.value.word3, greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList)
    }
    if (wordleWords.value.word4.active) {
        // check if the word has "_" in it
        const tmpList4 = [wordleWords.value.word4.value1, wordleWords.value.word4.value2, wordleWords.value.word4.value3, wordleWords.value.word4.value4, wordleWords.value.word4.value5]
        for (var i = 0; i < tmpList4.length; i++) {
            if (tmpList4[i] === '_') {
                warnWordle.value = true
                return
            } else {
                warnWordle.value = false
            }
        }
        greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList = processWord(wordleWords.value.word4, greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList)
    }
    if (wordleWords.value.word5.active) {
        // check if the word has "_" in it
        const tmpList5 = [wordleWords.value.word5.value1, wordleWords.value.word5.value2, wordleWords.value.word5.value3, wordleWords.value.word5.value4, wordleWords.value.word5.value5]
        for (var i = 0; i < tmpList5.length; i++) {
            if (tmpList5[i] === '_') {
                warnWordle.value = true
                return
            } else {
                warnWordle.value = false
            }
        }
        greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList = processWord(wordleWords.value.word5, greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList)
    }
    if (warnWordle.value) {
        return
    }
    createWordle(greenLettersList.value, [yellowLettersList1.value, yellowLettersList2.value, yellowLettersList3.value, yellowLettersList4.value, yellowLettersList5.value], blackLettersList.value, doubleLettersList.value, tripleLettersList.value)
    activateNextWord()
}

var num = ref(0.0)

function forceDecimal2(number) {
    num = number.toFixed(2)
    return num
}

var wordleRecoList = ['Words']

function getWordleReco(wordleWord) {
    for (var i = 0; i < wordleWord.length; i++) {
        wordleRecoList.value.push(wordleWord[i])
    }
}

// Handle keyboard events
function handleKeydown(event) {
    const key = event.key.toLowerCase();
    if (key === 'enter') {
        event.preventDefault(); // Prevent the default behavior
        event.stopPropagation(); // Stop the event from propagating
        enterWordle();
    } else if (key === 'backspace') {
        backspaceInput();
    } else if (/^[a-z]$/.test(key)) {
        keyboardInput(key);
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    // show the pre-game dictionary stats before the first word is played;
    // ignore failures (the legacy API has no /wordle-stats/ endpoint)
    wordleSrv.getInitialStats()
        .then(stats => {
            if (!isLoaded.value) {
                wordleStats.value = stats
            }
        })
        .catch(() => {});
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
});

</script>

<template>
    <section class="section">
        <div class="container">
            <p class="eyebrow">Lab</p>
            <h1>Beating Wordle with entropy</h1>
            <p class="lede">
                An entropy-based Wordle solver. Enter what you have played, and the solver ranks every legal
                next guess by how much uncertainty it removes from the remaining answers. It runs over the
                public nytimes-games API, a Python service on App Engine; the same API is exposed to AI
                assistants through the open-source Wordle MCP server from the article
                "Your Analytics Microservices Have a New Customer."
            </p>
            <p class="small">
                <a href="https://github.com/agentdanger/nytimes-games" target="_blank" rel="noopener noreferrer">Solver and API source</a>
                ·
                <a href="https://github.com/agentdanger/wordle-mcp-server" target="_blank" rel="noopener noreferrer">Wordle MCP server</a>
            </p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="grid wordle-grid">
                <div class="card">
                    <h3>Directions</h3>
                    <ol class="directions">
                        <li>Enter your starting word from your Wordle using the keyboard.</li>
                        <li>Click the letters to change the color of your letters based on your Wordle game.</li>
                        <li>Click "Enter" on the keyboard to submit your word, and get a list of the best words to play next.</li>
                        <li>Continue adding words until you finish, and find your Wordle word.</li>
                    </ol>
                    <p>
                        <strong>Note:</strong>
                        You'll see a list of the best words to play next. Playing the #1 word reveals the most
                        information about the game using information theory / entropy.
                    </p>
                </div>

                <div class="card">
                    <h3>Your board</h3>
                    <div class="board">
                        <template v-for="w in 5" :key="w">
                            <div v-if="wordleWords['word' + w].active" class="board-row">
                                <button v-for="l in 5" :key="l" type="button"
                                    :class="returnButtonFormat(wordleWords['word' + w]['status' + l])"
                                    @click="changeLetterStatus(w, l)">
                                    {{ wordleWords['word' + w]['value' + l] }}
                                </button>
                            </div>
                        </template>
                    </div>
                    <p v-if="warnWordle" class="warn">
                        <strong>Warning: please enter a valid word.</strong>
                        Fill in all the letters in the word before submitting. Refresh the page to start over.
                    </p>
                    <div class="keyboard" aria-label="On-screen keyboard">
                        <div class="key-row">
                            <button v-for="k in 'qwertyuiop'" :key="k" type="button" class="key" @click="keyboardInput(k)">{{ k.toUpperCase() }}</button>
                        </div>
                        <div class="key-row">
                            <button v-for="k in 'asdfghjkl'" :key="k" type="button" class="key" @click="keyboardInput(k)">{{ k.toUpperCase() }}</button>
                        </div>
                        <div class="key-row">
                            <button type="button" class="key key-wide" @click="enterWordle()">Enter</button>
                            <button v-for="k in 'zxcvbnm'" :key="k" type="button" class="key" @click="keyboardInput(k)">{{ k.toUpperCase() }}</button>
                            <button type="button" class="key key-wide" @click="backspaceInput()">Del</button>
                        </div>
                    </div>
                    <p class="small muted keyboard-note">Your physical keyboard works too: letters, Enter, and Backspace.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section" v-if="isLoading || wordleStats || isLoaded">
        <div class="container">
            <div v-if="isLoading" class="card loading">
                <p class="muted">Loading recommendations...</p>
                <progress class="meter" max="100"></progress>
            </div>

            <!-- stats about the remaining words (needs the upgraded API);
                 shown pre-game too, seeded by the /wordle-stats/ endpoint -->
            <div v-if="wordleStats" class="stats">
                <div class="stat">
                    <p class="eyebrow">Words remaining</p>
                    <p class="stat-value">{{ wordleStats.remaining_words }}</p>
                </div>
                <div class="stat">
                    <p class="eyebrow">Possible answers</p>
                    <p class="stat-value">{{ wordleStats.remaining_answers }}</p>
                </div>
                <div class="stat">
                    <p class="eyebrow">Uncertainty (bits)</p>
                    <p class="stat-value">{{ forceDecimal2(wordleStats.uncertainty_bits) }}</p>
                </div>
                <div class="stat" v-if="wordleStats.best_bits !== undefined">
                    <p class="eyebrow">Best play (bits left)</p>
                    <p class="stat-value">{{ forceDecimal2(wordleStats.best_bits) }}</p>
                </div>
            </div>

            <!-- search progress meter (needs the upgraded API) -->
            <div v-if="wordleStats" class="progress-block">
                <p class="eyebrow">
                    Uncertainty eliminated: {{ uncertaintyPct }}%
                    ({{ forceDecimal2(wordleStats.starting_uncertainty_bits) }} bits at start,
                    {{ forceDecimal2(wordleStats.uncertainty_bits) }} bits now)
                </p>
                <progress class="meter" :value="uncertaintyPct" max="100"></progress>
            </div>

            <div v-if="isLoaded">
                <!-- best three words overall, and best three on the NYT answer list -->
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Best words</h3>
                        <p class="small">Remove the most uncertainty (any legal guess)</p>
                        <div class="reco-row" v-for="(word, i) in bestOverall" :key="word.word">
                            <span class="reco-word">
                                <span class="tag">{{ i + 1 }}</span>
                                <strong>{{ word.word.toUpperCase() }}</strong>
                                <span class="tag tag-answer" v-if="word.is_answer">possible answer</span>
                            </span>
                            <span class="small muted">{{ forceDecimal2(word.bits) }} bits left</span>
                        </div>
                    </div>
                    <div class="card" v-if="bestAnswers.length">
                        <h3>Best guesses</h3>
                        <p class="small">Best words that can be the answer</p>
                        <div class="reco-row" v-for="(word, i) in bestAnswers" :key="word.word">
                            <span class="reco-word">
                                <span class="tag">{{ i + 1 }}</span>
                                <strong>{{ word.word.toUpperCase() }}</strong>
                            </span>
                            <span class="small muted">{{ forceDecimal2(word.bits) }} bits left</span>
                        </div>
                    </div>
                </div>

                <!-- top plays, charted as extra bits left vs the best play -->
                <div class="chart-frame" v-if="topWords.length > 1">
                    <h3>Top {{ topWords.length }} plays</h3>
                    <p class="chart-desc">How much more uncertainty each play leaves vs the best word. Shorter is better.</p>
                    <p class="small legend" v-if="wordleStats">
                        <span class="swatch" :style="{ background: chartColors.answer }"></span> possible answer
                        <span class="swatch legend-gap" :style="{ background: chartColors.other }"></span> other legal word
                    </p>
                    <VueApexCharts type="bar" :height="rankingChartHeight" :options="rankingOptions" :series="rankingSeries" />
                    <p class="chart-source">Source: the nytimes-games solver API. Bits are Shannon entropy over the remaining answer list.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.wordle-grid {
    grid-template-columns: 1fr;
}

@media (min-width: 900px) {
    .wordle-grid {
        grid-template-columns: 1fr 1.4fr;
    }
}

.directions {
    padding-left: 1.25em;
    margin: 0 0 var(--s-4);
    color: var(--muted);
}

.directions li + li {
    margin-top: var(--s-2);
}

/* Board */

.board {
    display: flex;
    flex-direction: column;
    gap: var(--s-2);
    margin-bottom: var(--s-4);
}

.board-row {
    display: flex;
    justify-content: center;
    gap: var(--s-2);
}

.tile {
    width: 50px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-body);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background var(--transition), border-color var(--transition);
}

.tile:hover {
    border-color: var(--accent);
}

.tile-yellow {
    background: var(--warning);
    border-color: var(--warning);
    color: var(--on-accent);
}

.tile-green {
    background: var(--success);
    border-color: var(--success);
    color: var(--on-accent);
}

.warn {
    color: var(--danger);
    font-size: var(--fs-small);
}

/* Keyboard */

.keyboard {
    display: flex;
    flex-direction: column;
    gap: var(--s-2);
}

.key-row {
    display: flex;
    justify-content: center;
    gap: var(--s-1);
}

.key {
    min-width: 30px;
    height: 38px;
    padding: 0 var(--s-2);
    font-family: var(--font-body);
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: border-color var(--transition), color var(--transition);
}

.key:hover {
    border-color: var(--accent);
    color: var(--accent);
}

.key-wide {
    min-width: 50px;
}

.keyboard-note {
    margin: var(--s-3) 0 0;
}

/* Results */

.loading {
    margin-bottom: var(--s-5);
}

.meter {
    width: 100%;
    height: 8px;
    accent-color: var(--accent);
}

.stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--s-4);
    margin-bottom: var(--s-5);
}

@media (min-width: 768px) {
    .stats {
        grid-template-columns: repeat(4, 1fr);
    }
}

.stat {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: var(--s-4);
}

.stat .eyebrow {
    margin-bottom: var(--s-1);
}

.stat-value {
    font-family: var(--font-heading);
    font-size: var(--fs-h2);
    line-height: 1.2;
    margin: 0;
}

.progress-block {
    margin-bottom: var(--s-5);
}

.reco-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-3);
    padding: var(--s-2) 0;
}

.reco-row + .reco-row {
    border-top: 1px solid var(--border);
}

.reco-word {
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    font-size: 1.125rem;
}

.tag-answer {
    color: var(--success);
    border-color: var(--success);
}

.chart-frame {
    margin-top: var(--s-5);
}

.legend {
    color: var(--muted);
    margin-bottom: var(--s-2);
}

.swatch {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    vertical-align: middle;
    margin-right: var(--s-1);
}

.legend-gap {
    margin-left: var(--s-3);
}
</style>
