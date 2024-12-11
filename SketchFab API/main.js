const axios = require('axios');

// Define the URL for the Sketchfab API
const url = 'https://api.sketchfab.com/v3/search?type=models&q=Sports%20Car&archives_flavours=false';

// Set up the headers (same as in the fetch request)
const headers = {
  'accept': 'application/json',
  'accept-language': 'en-US,en;q=0.5',
  'priority': 'u=1, i',
  'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'sec-gpc': '1',
  'Referer': 'https://docs.sketchfab.com/',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// Make the GET request using axios
axios.get(url, { headers })
  .then(response => {
    // Handle the response from the API
    console.log('Data:', response.data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error.message);
  });
