export default class stravaService {

    // formatDate(value) {
    //   return value.toLocaleDateString("en-US", {
    //     day: "2-digit",
    //     month: "2-digit",
    //     year: "numeric",
    //   });
    // }
  
    async getStravaData() {
      async function fetchWithTimeout(resource, options = {}) {
        const { timeout = 8000 } = options;
  
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
        const response = await fetchWithTimeout(`https://getstravaactivities-dot-personal-website-35.uc.r.appspot.com/strava`)
        const d = await response.json()
        d['fastest_time'] = 12.0
        d['fastest_time_string'] = '12.0'
        d['longest_run'] = 1.0
        d['longest_run_string'] = '1.0'
        d['total_miles'] = 0
        d['miles_list'] = []
        d['dates_list'] = []
        d['graph_data'] = []
        d['graph_data_pace'] = []
        for (const [key, value] of Object.entries(d.data)) {
          d.data[key]['x'] = d.data[key]['start_date_unix'];
          d.data[key]['y'] = d.data[key]['pace'].toFixed(2);
          d.data[key]['size'] = d.data[key]['miles'].toFixed(1);
          d.data[key]['name'] = d.data[key]['display_pace'];
          d.miles_list.push(d.data[key]['miles'])
          d.graph_data.push([d.data[key]['x']*1000, d.data[key]['miles']])
          d.graph_data_pace.push([d.data[key]['x']*1000, d.data[key]['pace']])
          d.data[key]['date'] = new Date(d.data[key]['start_date_unix']*1000).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
          var temp_date = new Date(d.data[key]['start_date_unix']*1000)
          d.dates_list.push(temp_date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }))
          d['total_miles'] += d.data[key]['miles']
          if (d.data[key]['pace'] < d['fastest_time']) {
            d['fastest_time'] = d.data[key]['pace'];
            d['fastest_time_string'] = d.data[key]['display_pace'];
          }
          if (d.data[key]['miles'] > d['longest_run']) {
            d['longest_run'] = d.data[key]['miles'];
            d['longest_run_string'] = String(d.data[key]['miles'].toFixed(1));
          }
        }
        d['total_miles'] = d['total_miles'].toFixed(1)
        return d;
      } catch (error) {
        console.log(error)
        throw new Error('Error in getStravaData fetch.')
      }
  
    }
  }