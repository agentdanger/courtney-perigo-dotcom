export default class wordleService {
  async getWordleData(greenLetters, yellowLetters, blackLetters, doubleLetters, tripleLetters) {
    grnLettersSent = []
    yelLettersSent = []
    blkLettersSent = []
    dblLettersSent = []
    trpLettersSent = []
    
    for (let i = 0; i < greenLetters.length; i++) {
      if (greenLetters[i] === '') {
        grnLettersSent[i] = null;
      } else {
        grnLettersSent[i] = greenLetters[i].toLowerCase();
      }
    }

    for (let i = 0; i < yellowLetters.length; i++) {
      if (yellowLetters[i][0] === '') {
        yelLettersSent[i] = [null];
      } else {
        for (let j = 0; j < yellowLetters[i].length; j++) {
          yelLettersSent[i][j] = yellowLetters[i][j].toLowerCase();
        }
      }
    }

    for (let i = 0; i < blackLetters.length; i++) {
      if (blackLetters[i] === '') {
        blkLettersSent[i] = null;
      } else {
        blkLettersSent[i] = blackLetters[i].toLowerCase();
      }
    }

    for (let i = 0; i < doubleLetters.length; i++) {
      if (doubleLetters[i] === '') {
        dblLettersSent[i] = null;
      } else {
        dblLettersSent[i] = doubleLetters[i].toLowerCase();
      }
    }

    for (let i = 0; i < tripleLetters.length; i++) {
      if (tripleLetters[i] === '') {
        trpLettersSent[i] = null;
      } else {
        trpLettersSent[i] = tripleLetters[i].toLowerCase();
      }
    }

    const body = {
      green_letters: grnLettersSent,
      yellow_letters: yelLettersSent,
      black_letters: blkLettersSent,
      double_letters_cant_use: dblLettersSent,
      tripleLetters: trpLettersSent
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