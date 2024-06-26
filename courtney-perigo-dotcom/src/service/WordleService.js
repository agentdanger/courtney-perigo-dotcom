export default class wordleService {
  async getWordleData(greenLetters, yellowLetters, blackLetters, doubleLetters, tripleLetters) {

    const body = {
      green_letters: greenLetters,
      yellow_letters: yellowLetters,
      black_letters: blackLetters,
      double_letters_cant_use: doubleLetters,
      triple_letters_cant_use: tripleLetters
    }

    const response = await fetch('https://nytimes-wordle.courtneyperigo.com/do-wordle/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Error in getWordleData fetch.')
    }
    return await response.json();
  }
}