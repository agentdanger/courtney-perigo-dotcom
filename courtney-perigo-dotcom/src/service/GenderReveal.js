export default class genderService {
    async getGenderRevealData() {
        const response = await fetch('https://gender-reveal-dot-personal-website-35.uc.r.appspot.com/gender-reveal')
        const d = await response.json()
        return d;
    }
  }