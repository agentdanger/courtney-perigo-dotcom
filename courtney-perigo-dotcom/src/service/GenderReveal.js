export default class genderService {
    async getGenderRevealData() {
      const response = await fetch('https://gender-reveal-dot-personal-website-35.uc.r.appspot.com/gender-reveal', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error in getGenderReveal fetch.')
      }
      return await response.json();
    }
  }