<!-- An app that helps users play Wordle -->

<script setup>
import AppNavBar from '../components/AppNavBar.vue'
import wordleService from '../service/WordleService.js'
import { ref, watch } from 'vue'

const wordleSrv = new wordleService()

function forceInput1(input_string) {
    if (input_string == '') {
        return '--'
    } else {
        return input_string.substring(1, 0)
    }
}


var greenLetters = ref(['none', 'none', 'none', 'none', 'none'])
// default null values for green letters
var greenLetters1 = ref('')
var tmpGrn1 = ref('')
var greenLetterButton1 = ref('--')

watch(greenLetters1, (newGreenLetter1, oldgreenLetter1) => {
    tmpGrn1.value = forceInput1(newGreenLetter1)
    if (tmpGrn1 !== '') {
        greenLetterButton1.value = tmpGrn1.value.toUpperCase()
        if (tmpGrn1.value !== '--') {
            greenLetters.value[0] = tmpGrn1.value.toLowerCase()
        } else {
            greenLetters.value[0] = 'none'
        }
    } else {
        greenLetterButton1.value = "--"
        greenLetters.value[0] = 'none'
    }
})

var greenLetters2 = ref('')
var tmpGrn2 = ref('')
var greenLetterButton2 = ref('--')

watch(greenLetters2, (newGreenLetter2, oldgreenLetter2) => {
    tmpGrn2.value = forceInput1(newGreenLetter2)
    if (tmpGrn2 !== '') {
        greenLetterButton2.value = tmpGrn2.value.toUpperCase()
        if (tmpGrn2.value !== '--') {
            greenLetters.value[1] = tmpGrn2.value.toLowerCase()
        } else {
            greenLetters.value[1] = 'none'
        }
    } else {
        greenLetterButton2.value = "--"
        greenLetters.value[1] = 'none'
    }
})

var greenLetters3 = ref('')
var tmpGrn3 = ref('')
var greenLetterButton3 = ref('--')

watch(greenLetters3, (newGreenLetter3, oldgreenLetter3) => {
    tmpGrn3.value = forceInput1(newGreenLetter3)
    if (tmpGrn3 !== '') {
        greenLetterButton3.value = tmpGrn3.value.toUpperCase()
        if (tmpGrn3.value !== '--') {
            greenLetters.value[2] = tmpGrn3.value.toLowerCase()
        } else {
            greenLetters.value[2] = 'none'
        }
    } else {
        greenLetterButton3.value = "--"
        greenLetters.value[2] = 'none'
    }
})

var greenLetters4 = ref('')
var tmpGrn4 = ref('')
var greenLetterButton4 = ref('--')

watch(greenLetters4, (newGreenLetter4, oldgreenLetter4) => {
    tmpGrn4.value = forceInput1(newGreenLetter4)
    if (tmpGrn4 !== '') {
        greenLetterButton4.value = tmpGrn4.value.toUpperCase()
        if (tmpGrn4.value !== '--') {
            greenLetters.value[3] = tmpGrn4.value.toLowerCase()
        } else {
            greenLetters.value[3] = 'none'
        }
    } else {
        greenLetterButton4.value = "--"
        greenLetters.value[3] = 'none'
    }
})

var greenLetters5 = ref('')
var tmpGrn5 = ref('')
var greenLetterButton5 = ref('--')

watch(greenLetters5, (newGreenLetter5, oldgreenLetter5) => {
    tmpGrn5.value = forceInput1(newGreenLetter5)
    if (tmpGrn5 !== '') {
        greenLetterButton5.value = tmpGrn5.value.toUpperCase()
        if (tmpGrn5.value !== '--') {
            greenLetters.value[4] = tmpGrn5.value.toLowerCase()
        } else {
            greenLetters.value[4] = 'none'
        }
    } else {
        greenLetterButton5.value = "--"
        greenLetters.value[4] = 'none'
    }
})

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

var yellowLetters = ref([['none'], ['none'], ['none'], ['none'], ['none']])
// default null values for yellow letters, can have multiple yellow letters in each position
var yellowLetters1 = ref('')
var tmpYel1 = ref('')
var tmpYel1_List = ref([])
var yellowLettersList1 = ref(['none'])
var yellowLetterButton1 = ref('--')

watch(yellowLetters1, (newYellowLetter1, oldYellowLetter1) => {
    if (newYellowLetter1 !== '') {
        // write each letter to a custom string of letters with commas
        tmpYel1.value = newYellowLetter1
        tmpYel1_List.value = []
        yellowLettersList1.value = []
        for (var i = 0; i < tmpYel1.value.length; i++) {
            // check if character is english alphabet only.
            yellowLettersList1.value.push(tmpYel1.value[i].toLowerCase())
            if (i > 0) {
                tmpYel1_List.value += ","
            }
            tmpYel1_List.value += tmpYel1.value[i].toUpperCase()
            yellowLetterButton1.value = tmpYel1_List.value
        }
        yellowLetters.value[0] = yellowLettersList1.value
    } else {
        yellowLetterButton1.value = "--"
        yellowLetters.value[0] = ['none']
    }
})



var yellowLetters2 = ref('')
var tmpYel2 = ref('')
var tmpYel2_List = ref([])
var yellowLettersList2 = ref(['none'])
var yellowLetterButton2 = ref('--')

watch(yellowLetters2, (newYellowLetter2, oldYellowLetter2) => {
    if (newYellowLetter2 !== '') {
        // write each letter to a custom string of letters with commas
        tmpYel2.value = newYellowLetter2
        tmpYel2_List.value = []
        yellowLettersList2.value = []
        for (var i = 0; i < tmpYel2.value.length; i++) {
            yellowLettersList2.value.push(tmpYel2.value[i].toLowerCase())
            if (i > 0) {
                tmpYel2_List.value += ","
            }
            tmpYel2_List.value += tmpYel2.value[i].toUpperCase()
            yellowLetterButton2.value = tmpYel2_List.value
        }
        yellowLetters.value[1] = yellowLettersList2.value
    } else {
        yellowLetterButton2.value = "--"
        yellowLetters.value[1] = ['none']
    }
})

var yellowLetters3 = ref('')
var tmpYel3 = ref('')
var tmpYel3_List = ref([])
var yellowLettersList3 = ref(['none'])
var yellowLetterButton3 = ref('--')

watch(yellowLetters3, (newYellowLetter3, oldYellowLetter3) => {
    if (newYellowLetter3 !== '') {
        // write each letter to a custom string of letters with commas
        tmpYel3.value = newYellowLetter3
        tmpYel3_List.value = []
        yellowLettersList3.value = []
        for (var i = 0; i < tmpYel3.value.length; i++) {
            yellowLettersList3.value.push(tmpYel3.value[i].toLowerCase())
            if (i > 0) {
                tmpYel3_List.value += ","
            }
            tmpYel3_List.value += tmpYel3.value[i].toUpperCase()
            yellowLetterButton3.value = tmpYel3_List.value
        }
        yellowLetters.value[2] = yellowLettersList3.value
    } else {
        yellowLetterButton3.value = "--"
        yellowLetters.value[2] = ['none']
    }
})

var yellowLetters4 = ref('')
var tmpYel4 = ref('')
var tmpYel4_List = ref([])
var yellowLettersList4 = ref(['none'])
var yellowLetterButton4 = ref('--')

watch(yellowLetters4, (newYellowLetter4, oldYellowLetter4) => {
    if (newYellowLetter4 !== '') {
        // write each letter to a custom string of letters with commas
        tmpYel4.value = newYellowLetter4
        tmpYel4_List.value = []
        yellowLettersList4.value = []
        for (var i = 0; i < tmpYel4.value.length; i++) {
            yellowLettersList4.value.push(tmpYel4.value[i].toLowerCase())
            if (i > 0) {
                tmpYel4_List.value += ","
            }
            tmpYel4_List.value += tmpYel4.value[i].toUpperCase()
            yellowLetterButton4.value = tmpYel4_List.value
        }
        yellowLetters.value[3] = yellowLettersList4.value
    } else {
        yellowLetterButton4.value = "--"
        yellowLetters.value[3] = ['none']
    }
})

var yellowLetters5 = ref('')
var tmpYel5 = ref('')
var tmpYel5_List = ref([])
var yellowLettersList5 = ref(['none'])
var yellowLetterButton5 = ref('--')

watch(yellowLetters5, (newYellowLetter5, oldYellowLetter5) => {
    if (newYellowLetter5 !== '') {
        // write each letter to a custom string of letters with commas
        tmpYel5.value = newYellowLetter5
        tmpYel5_List.value = []
        yellowLettersList5.value = []
        for (var i = 0; i < tmpYel5.value.length; i++) {
            yellowLettersList5.value.push(tmpYel5.value[i].toLowerCase())
            if (i > 0) {
                tmpYel5_List.value += ","
            }
            tmpYel5_List.value += tmpYel5.value[i].toUpperCase()
            yellowLetterButton5.value = tmpYel5_List.value
        }
        yellowLetters.value[4] = yellowLettersList5.value
    } else {
        yellowLetterButton5.value = "--"
        yellowLetters.value[4] = ['none']
    }
})

var blackLettersCantUse = ref('')
var blackLettersCantUseList = ref(['-'])
var blackLettersList = ref(['none'])

watch(blackLettersCantUse, (newBlackLettersCantUse, oldBlackLettersCantUse) => {
    if (newBlackLettersCantUse !== '') {
        // append each letter to list
        blackLettersCantUseList.value = []
        blackLettersList.value = []
        for (var i = 0; i < newBlackLettersCantUse.length; i++) {
            blackLettersCantUseList.value.push(newBlackLettersCantUse[i].toUpperCase())
            blackLettersList.value.push(newBlackLettersCantUse[i].toLowerCase())
        }
    } else {
        blackLettersCantUseList.value = ['-']
        blackLettersList.value = ['none']
    }
})

var doubleLettersCantUse = ref('')
var doubleLettersCantUseList = ref(['-'])
var doubleLettersList = ref(['none'])

watch(doubleLettersCantUse, (newDoubleLettersCantUse, oldDoubleLettersCantUse) => {
    if (newDoubleLettersCantUse !== '') {
        // append each letter to list
        doubleLettersCantUseList.value = []
        doubleLettersList.value = []
        for (var i = 0; i < newDoubleLettersCantUse.length; i++) {
            doubleLettersCantUseList.value.push(newDoubleLettersCantUse[i].toUpperCase())
            doubleLettersList.value.push(newDoubleLettersCantUse[i].toLowerCase())
        }
    } else {
        doubleLettersCantUseList.value = ['-']
        doubleLettersList.value = ['none']
    }
})

var tripleLettersCantUse = ref('')
var tripleLettersCantUseList = ref(['-'])
var tripleLettersList = ref(['none'])

watch(tripleLettersCantUse, (newTripleLettersCantUse, oldTripleLettersCantUse) => {
    if (newTripleLettersCantUse !== '') {
        // append each letter to list
        tripleLettersCantUseList.value = []
        tripleLettersList.value = []
        for (var i = 0; i < newTripleLettersCantUse.length; i++) {
            tripleLettersCantUseList.value.push(newTripleLettersCantUse[i].toUpperCase())
            tripleLettersList.value.push(newTripleLettersCantUse[i].toLowerCase())
        }
    } else {
        tripleLettersCantUseList.value = ['-']
        tripleLettersList.value = ['none']
    }
})

var recommendedWords = ref([])

var isLoading = ref(false)
var isLoaded = ref(false)

function createWordle(greenLetters, yellowLetters, blackLettersList, doubleLettersList, tripleLettersList) {
    isLoading.value = true
    wordleSrv.getWordleData(greenLetters, yellowLetters, blackLettersList, doubleLettersList, tripleLettersList)
        .then(response => {
            recommendedWords.value = response
            isLoading.value = false
            isLoaded.value = true
        })
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
                                Beating Wordle Using Entropy.
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content has-text-white">
                                <p><span class="is-underlined has-text-weight-bold">Directions:</span> Enter the green,
                                    yellow, and black letters from your Wordle game below. Enter letters only - no
                                    commas or spaces. If you have any letters you can't use more than once or twice,
                                    enter them in the appropriate
                                    fields, do not enter doubles and triples into the black letter list. Click the
                                    button to see the recommended words. You'll see a mix of common
                                    and uncommon words to help you zero in on the Wordle answer. Playing the #1 word
                                    reveals the most information about the game using information theory / entropy.</p>
                            </div>
                        </div>
                        <div class="card-content has-text-centered">
                            <!-- show the values in each text box as font awesome buttons in a nice layout -->
                            <div class="field is-grouped is-grouped-centered">
                                <button class="button is-link mr-2">
                                    <span class="is-size-5">{{ greenLetterButton1 }}</span>
                                </button>
                                <button class="button is-link mr-2">
                                    <span class="is-size-5">{{ greenLetterButton2 }}</span>
                                </button>
                                <button class="button is-link mr-2">
                                    <span class="is-size-5">{{ greenLetterButton3 }}</span>
                                </button>
                                <button class="button is-link mr-2">
                                    <span class="is-size-5">{{ greenLetterButton4 }}</span>
                                </button>
                                <button class="button is-link mr-2">
                                    <span class="is-size-5">{{ greenLetterButton5 }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-content has-text-centered">
                            <!-- show the values in each text box as font awesome buttons in a nice layout -->
                            <div class="field is-grouped is-grouped-centered">
                                <button class="button is-warning mr-2">
                                    <span class="is-size-5">{{ yellowLetterButton1 }}</span>
                                </button>
                                <button class="button is-warning mr-2">
                                    <span class="is-size-5">{{ yellowLetterButton2 }}</span>
                                </button>
                                <button class="button is-warning mr-2">
                                    <span class="is-size-5">{{ yellowLetterButton3 }}</span>
                                </button>
                                <button class="button is-warning mr-2">
                                    <span class="is-size-5">{{ yellowLetterButton4 }}</span>
                                </button>
                                <button class="button is-warning mr-2">
                                    <span class="is-size-5">{{ yellowLetterButton5 }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-content has-text-centered">
                            <!-- show the values in each text box as font awesome buttons in a nice layout -->
                            <div class="field is-grouped is-grouped-centered">
                                <!-- loop through black letters list and add a black button with the letter -->
                                <div v-for="letter in blackLettersCantUseList">
                                    <button class="button is-dark mr-2">
                                        <span class="is-size-5">{{ letter }}</span>
                                    </button>
                                </div>
                                <div v-for="letter in doubleLettersCantUseList">
                                    <button class="button is-black mr-2">
                                        <span class="is-size-5">{{ letter }}</span>
                                    </button>
                                </div>
                                <div v-for="letter in tripleLettersCantUseList">
                                    <button class="button is-light mr-2">
                                        <span class="is-size-5">{{ letter }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="columns is-vcentered">
                                <div class="column is-one-fifth has-text-white has-text-centered">
                                    Enter Green Letters:
                                </div>
                                <div class="column">
                                    <div class="columns">
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-link" type="text" placeholder="Green Pos-1"
                                                v-model="greenLetters1">
                                        </div>
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-link" type="text" placeholder="Green Pos-2"
                                                v-model="greenLetters2">
                                        </div>
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-link" type="text" placeholder="Green Pos-3"
                                                v-model="greenLetters3">
                                        </div>
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-link" type="text" placeholder="Green Pos-4"
                                                v-model="greenLetters4">
                                        </div>
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-link" type="text" placeholder="Green Pos-5"
                                                v-model="greenLetters5">
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-one-fifth">
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="columns is-vcentered">
                                <div class="column is-one-fifth has-text-white has-text-centered">
                                    Enter Yellow Letters:
                                </div>
                                <div class="column">
                                    <div class="columns">
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-warning-dark" type="text"
                                                placeholder="Yellow Pos-1" v-model="yellowLetters1">
                                        </div>
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-warning-dark" type="text"
                                                placeholder="Yellow Pos-2" v-model="yellowLetters2">
                                        </div>
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-warning-dark" type="text"
                                                placeholder="Yellow Pos-3" v-model="yellowLetters3">
                                        </div>
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-warning-dark" type="text"
                                                placeholder="Yellow Pos-4" v-model="yellowLetters4">
                                        </div>
                                        <div class="column is-one-fifth">
                                            <input class="input has-text-warning-dark" type="text"
                                                placeholder="Yellow Pos-5" v-model="yellowLetters5">
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-one-fifth">
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="columns is-vcentered">
                                <div class="column is-one-fifth has-text-white has-text-centered">
                                    Enter Unused Letters:
                                </div>
                                <div class="column">
                                    <div class="columns">
                                        <div class="column is-one-third">
                                            <input class="input" type="text" placeholder="Black Letters"
                                                v-model="blackLettersCantUse">
                                        </div>
                                        <div class="column is-one-third">
                                            <input class="input" type="text" placeholder="Double Letters"
                                                v-model="doubleLettersCantUse">
                                        </div>
                                        <div class="column is-one-third">
                                            <input class="input" type="text" placeholder="Triple Letters"
                                                v-model="tripleLettersCantUse">
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-one-fifth">
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="field is-grouped is-grouped-centered">
                                    <button class="button is-link"
                                        @click="createWordle(greenLetters, yellowLetters, blackLettersList, doubleLettersList, tripleLettersList)">
                                        <span class="icon">
                                            <i class="fas fa-search"></i>
                                        </span>
                                        <span>Find Words</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="content has-text-white has-text-centered">
                                <!-- show message when articles are loading -->
                                <div class="box p-1 mt-6" v-if="isLoading">
                                    <div class="card has-background-primary">
                                        <header class="card-header ">
                                            <p class="card-header-title has-text-white is-size-4">
                                                Loading Recommendations...
                                            </p>
                                        </header>
                                        <div class="card-content">
                                            <div class="content has-text-white">
                                                <progress class="progress is-primary" max="100">15%</progress>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="isLoaded">
                                    <div class="columns is-vcentered">
                                        <div class="column is-one-third">
                                        </div>
                                        <div class="column is-one-third">
                                            <ol type="1">
                                                <div v-for="word in recommendedWords">
                                                    <li class="is-size-4">
                                                        <span class="has-text-link">{{ word.word.toUpperCase() }}</span>
                                                        -- Bits Remaining: {{ forceDecimal2(word.bits) }}
                                                    </li>
                                                </div>
                                            </ol>
                                        </div>
                                        <div class="column is-one-third">
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

</template>