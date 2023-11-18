export default class defaultNewsService {

    // formatDate(value) {
    //   return value.toLocaleDateString("en-US", {
    //     day: "2-digit",
    //     month: "2-digit",
    //     year: "numeric",
    //   });
    // }
  
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
        return d;
      } catch (error) {
        console.log(error)
        throw new Error('Error in getDefaultNews fetch.')
      }
  
    }
  }