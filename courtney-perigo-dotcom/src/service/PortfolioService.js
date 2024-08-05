export default class optimalPortfolioService {
    async getOptimalPortfolioData() {
        try {
            const response = await fetch('https://optimal-portfolio-dot-personal-website-35.uc.r.appspot.com/results')
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Await response.json() and store in a variable
            const data = await response.json()

            // Return the data
            return data
        } catch (error) {
            console.error('Failed to fetch optimal portfolio data:', error)
            throw error // Ensure the error is propagated
        }
    }
}