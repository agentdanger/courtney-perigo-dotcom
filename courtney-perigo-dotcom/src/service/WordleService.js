export default class wordleService {
  async getWordleData(greenLetters, yellowLetters, blackLetters, doubleLetters, tripleLetters) {
    for (let i = 0; i < greenLetters.length; i++) {
      if (greenLetters[i] === null) {
        greenLetters[i] = 'none';
      } else {
        greenLetters[i] = greenLetters[i].toLowerCase();
      }
    }

    for (let i = 0; i < yellowLetters.length; i++) {
      for (let j = 0; j < yellowLetters[i].length; j++) {
        if (yellowLetters[i][j] === null) {
          yellowLetters[i][j] = 'none';
        } else {
          yellowLetters[i][j] = yellowLetters[i][j].toLowerCase();
        }
      }
    }

    for (let i = 0; i < blackLetters.length; i++) {
      for (let j = 0; j < blackLetters[i].length; j++) {
        if (blackLetters[i][j] === null) {
          blackLetters[i][j] = 'none';
        } else {
          blackLetters[i][j] = blackLetters[i][j].toLowerCase();
        }
      }
    }

    for (let i = 0; i < doubleLetters.length; i++) {
      if (doubleLetters[i] === null) {
        doubleLetters[i] = 'none';
      } else {
        doubleLetters[i] = doubleLetters[i].toLowerCase();
      }
    }

    for (let i = 0; i < tripleLetters.length; i++) {
      if (tripleLetters[i] === null) {
        tripleLetters[i] = 'none';
      } else {
        tripleLetters[i] = tripleLetters[i].toLowerCase();
      }
    }

    const body = {
      green_letters: greenLetters,
      yellow_letters: yellowLetters,
      black_letters: blackLetters,
      double_letters_cant_use: doubleLetters,
      tripleLetters: tripleLetters
    }
    
    const response = await fetch('https://nytimes-wordle.courtneyperigo.com/do-wordle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Error in getWordleData fetch.')
    }
    return await response.json();
  }
}