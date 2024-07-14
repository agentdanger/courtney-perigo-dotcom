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
    if (status == 'inactive') {
        return 'button is-black mr-1 ml-1 buttoncustom'
    } else if (status == 'yellow') {
        return 'button is-warning mr-1 ml-1 buttoncustom'
    } else if (status == 'green') {
        return 'button is-link mr-1 ml-1 buttoncustom'
    } else {
        return 'button is-black mr-1 ml-1 buttoncustom'
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
        // remove none from doubleLettersList
        doubleLettersList.value = doubleLettersList.value.filter(dblLetter => dblLetter !== 'none');
        // remove duplicates in tripleLettersList
        tripleLettersList.value = [...new Set(tripleLettersList.value)];
        // remove none from tripleLettersList
        tripleLettersList.value = tripleLettersList.value.filter(trpLetter => trpLetter !== 'none');
    }
    return greenLettersList, yellowLettersList1, yellowLettersList2, yellowLettersList3, yellowLettersList4, yellowLettersList5, blackLettersList, doubleLettersList, tripleLettersList
}

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
                                <p><span class="is-underlined has-text-weight-bold">Directions:</span>
                                <ol>
                                    <li>Enter your starting word from your Wordle using the keyboard below.</li>
                                    <li>Click the letters to change the color of your letters based on your
                                        Wordle game.</li>
                                    <li>Click "Enter" on the keyboard to submit your word, and get a list of the
                                        best words to play next.</li>
                                    <li>Continue adding words until you finish, and find your Wordle word.</li>
                                </ol>
                                <span class="is-underlined has-text-weight-bold">Note:</span>
                                <p>
                                    You'll see a list of the best words to play next. Playing the #1 word
                                    reveals the most
                                    information about the game using information theory / entropy.
                                </p>
                                </p>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="field is-grouped is-grouped-centered" v-if="wordleWords.word1.active">
                                <button :class="returnButtonFormat(wordleWords.word1.status1)"
                                    @click="changeLetterStatus(1, 1)">
                                    <span class="is-size-5">{{ wordleWords.word1.value1 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word1.status2)"
                                    @click="changeLetterStatus(1, 2)">
                                    <span class="is-size-5">{{ wordleWords.word1.value2 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word1.status3)"
                                    @click="changeLetterStatus(1, 3)">
                                    <span class="is-size-5">{{ wordleWords.word1.value3 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word1.status4)"
                                    @click="changeLetterStatus(1, 4)">
                                    <span class="is-size-5">{{ wordleWords.word1.value4 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word1.status5)"
                                    @click="changeLetterStatus(1, 5)">
                                    <span class="is-size-5">{{ wordleWords.word1.value5 }}</span>
                                </button>
                            </div>
                            <div class="field is-grouped is-grouped-centered" v-if="wordleWords.word2.active">
                                <button :class="returnButtonFormat(wordleWords.word2.status1)"
                                    @click="changeLetterStatus(2, 1)">
                                    <span class="is-size-5">{{ wordleWords.word2.value1 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word2.status2)"
                                    @click="changeLetterStatus(2, 2)">
                                    <span class="is-size-5">{{ wordleWords.word2.value2 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word2.status3)"
                                    @click="changeLetterStatus(2, 3)">
                                    <span class="is-size-5">{{ wordleWords.word2.value3 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word2.status4)"
                                    @click="changeLetterStatus(2, 4)">
                                    <span class="is-size-5">{{ wordleWords.word2.value4 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word2.status5)"
                                    @click="changeLetterStatus(2, 5)">
                                    <span class="is-size-5">{{ wordleWords.word2.value5 }}</span>
                                </button>
                            </div>
                            <div class="field is-grouped is-grouped-centered" v-if="wordleWords.word3.active">
                                <button :class="returnButtonFormat(wordleWords.word3.status1)"
                                    @click="changeLetterStatus(3, 1)">
                                    <span class="is-size-5">{{ wordleWords.word3.value1 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word3.status2)"
                                    @click="changeLetterStatus(3, 2)">
                                    <span class="is-size-5">{{ wordleWords.word3.value2 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word3.status3)"
                                    @click="changeLetterStatus(3, 3)">
                                    <span class="is-size-5">{{ wordleWords.word3.value3 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word3.status4)"
                                    @click="changeLetterStatus(3, 4)">
                                    <span class="is-size-5">{{ wordleWords.word3.value4 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word3.status5)"
                                    @click="changeLetterStatus(3, 5)">
                                    <span class="is-size-5">{{ wordleWords.word3.value5 }}</span>
                                </button>
                            </div>
                            <div class="field is-grouped is-grouped-centered" v-if="wordleWords.word4.active">
                                <button :class="returnButtonFormat(wordleWords.word4.status1)"
                                    @click="changeLetterStatus(4, 1)">
                                    <span class="is-size-5">{{ wordleWords.word4.value1 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word4.status2)"
                                    @click="changeLetterStatus(4, 2)">
                                    <span class="is-size-5">{{ wordleWords.word4.value2 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word4.status3)"
                                    @click="changeLetterStatus(4, 3)">
                                    <span class="is-size-5">{{ wordleWords.word4.value3 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word4.status4)"
                                    @click="changeLetterStatus(4, 4)">
                                    <span class="is-size-5">{{ wordleWords.word4.value4 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word4.status5)"
                                    @click="changeLetterStatus(4, 5)">
                                    <span class="is-size-5">{{ wordleWords.word4.value5 }}</span>
                                </button>
                            </div>
                            <div class="field is-grouped is-grouped-centered" v-if="wordleWords.word5.active">
                                <button :class="returnButtonFormat(wordleWords.word5.status1)"
                                    @click="changeLetterStatus(5, 1)">
                                    <span class="is-size-5">{{ wordleWords.word5.value1 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word5.status2)"
                                    @click="changeLetterStatus(5, 2)">
                                    <span class="is-size-5">{{ wordleWords.word5.value2 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word5.status3)"
                                    @click="changeLetterStatus(5, 3)">
                                    <span class="is-size-5">{{ wordleWords.word5.value3 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word5.status4)"
                                    @click="changeLetterStatus(5, 4)">
                                    <span class="is-size-5">{{ wordleWords.word5.value4 }}</span>
                                </button>
                                <button :class="returnButtonFormat(wordleWords.word5.status5)"
                                    @click="changeLetterStatus(5, 5)">
                                    <span class="is-size-5">{{ wordleWords.word5.value5 }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-content" v-if="warnWordle">
                            <!-- Add Warning Message if word has "_" -->
                            <div class="box p-1 mt-6">
                                <div class="card has-background-danger">
                                    <header class="card-header ">
                                        <p class="card-header-title has-text-white is-size-4">
                                            Warning: Please enter a valid word. Refresh the page to start over.
                                        </p>
                                    </header>
                                    <div class="card-content">
                                        <div class="content has-text-white">
                                            <p>
                                                Please fill in all the letters in the word before submitting.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <!-- Add a keyboard here -->
                            <div class="field is-grouped is-grouped-centered">
                                <div class="buttons are-small">
                                    <!--Add first row of qwerty keyboard here-->
                                    <button class="button is-black keyboard" @click="keyboardInput('q')">Q</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('w')">W</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('e')">E</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('r')">R</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('t')">T</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('y')">Y</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('u')">U</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('i')">I</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('o')">O</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('p')">P</button>
                                </div>
                            </div>
                            <div class="field is-grouped is-grouped-centered">
                                <div class="buttons are-small">
                                    <!--Add first row of qwerty keyboard here-->
                                    <button class="button is-black keyboard" @click="keyboardInput('a')">A</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('s')">S</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('d')">D</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('f')">F</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('g')">G</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('h')">H</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('j')">J</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('k')">K</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('l')">L</button>
                                </div>
                            </div>
                            <div class="field is-grouped is-grouped-centered">
                                <div class="buttons are-small">
                                    <!--Add first row of qwerty keyboard here-->
                                    <button class="button is-black actionbuttons" @click="enterWordle()">
                                        <span>Enter</span>
                                    </button>
                                    <button class="button is-black keyboard" @click="keyboardInput('z')">Z</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('x')">X</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('c')">C</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('v')">V</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('b')">B</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('n')">N</button>
                                    <button class="button is-black keyboard" @click="keyboardInput('m')">M</button>
                                    <!--Backspace icon fontawesome-->
                                    <button class="button is-black actionbuttons" @click="backspaceInput()">
                                        <span>Del</span>
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

<style scoped>
.buttoncustom {
    width: 50px;
}
.keyboard {
    width: 30px;
}
.actionbuttons {
    width: 50px;
}
</style>