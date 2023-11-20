export default class defaultNewsService {

    formatDate(value) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    async getCustomNews(query) {
      async function fetchWithTimeout(resource, options = {}) {
        const { timeout = 30000 } = options;
  
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(resource, {
          ...options,
          signal: controller.signal
        });
        clearTimeout(id);
        return response;
      }
      try {
        const response = await fetchWithTimeout(`https://getmachinanovanews-dot-personal-website-35.uc.r.appspot.com/get-custom-news/v1?query=${query}`)
        const d = await response.json()
        // remove items with a date not equal to a day in the past 2 weeks
        const today = this.formatDate(new Date())
        const twoWeeksAgo = this.formatDate(new Date(new Date().setDate(new Date().getDate() - 14)))

        const filtered = d.filter(item => this.formatDate(new Date(item.entry_published)) <= today && this.formatDate(new Date(item.entry_published)) >= twoWeeksAgo)

        // limit article summary to 100 words 
        filtered.forEach(item => {
          item.entry_summary = item.entry_summary.split(' ').slice(0, 75).join(' ')
        })
        // remove certain topics when they are in the title lowercase
        const topicsToRemove = ['homework help', 'sponsored content', 'paid content']
        const filtered2 = filtered.filter(item => !topicsToRemove.some(topic => item.entry_title.toLowerCase().includes(topic.toLowerCase())))
        // remove certain topics when they are in the summary lowercase
        const topicsToRemove2 = ['homework help', 'sponsored content', 'paid content']
        const filtered3 = filtered2.filter(item => !topicsToRemove2.some(topic => item.entry_summary.toLowerCase().includes(topic.toLowerCase())))
        return filtered3;
      } catch (error) {
        console.log(error)
        throw new Error('Error in getDefaultNews fetch.')
      }
  
    }
  
    async getDefaultNews() {
      async function fetchWithTimeout(resource, options = {}) {
        const { timeout = 30000 } = options;
  
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(resource, {
          ...options,
          signal: controller.signal
        });
        clearTimeout(id);
        return response;
      }
      try {
        const response = await fetchWithTimeout(`https://getmachinanovanews-dot-personal-website-35.uc.r.appspot.com/get-news/v1`)
        const d = await response.json()
        // remove items with a date not equal to today in constant format
        const today = this.formatDate(new Date())
        // turn string entry_published "Sat, 18 Nov 2023 09:46:04 GMT" into constant format
        // turn string entry_published "Thu, 19 Oct 2023 07:00:50 +0100" into constant format
        const filtered = d.filter(item => this.formatDate(new Date(item.entry_published)) === today)
        // limit article summary to 100 words 
        filtered.forEach(item => {
          item.entry_summary = item.entry_summary.split(' ').slice(0, 75).join(' ')
        })
        // remove certain topics when they are in the title lowercase
        const topicsToRemove = ['homework help', 'sponsored content', 'paid content']
        const filtered2 = filtered.filter(item => !topicsToRemove.some(topic => item.entry_title.toLowerCase().includes(topic.toLowerCase())))
        // remove certain topics when they are in the summary lowercase
        const topicsToRemove2 = ['homework help', 'sponsored content', 'paid content']
        const filtered3 = filtered2.filter(item => !topicsToRemove2.some(topic => item.entry_summary.toLowerCase().includes(topic.toLowerCase())))
        return filtered3;
      } catch (error) {
        console.log(error)
        throw new Error('Error in getDefaultNews fetch.')
      }
  
    }
  }