
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Proxy endpoint for the humanizer API
app.get('/api/humanize', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const response = await axios.get(`https://kaiz-apis.gleeze.com/api/humanizer?q=${encodeURIComponent(query)}`);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch from API' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
