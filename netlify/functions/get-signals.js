// netlify/functions/get-signals.js
const fetch = require('node-fetch');

exports.handler = async () => {
  try {
    const res = await fetch(
      `https://api.jsonbin.io/v3/b/${process.env.SIGNALS_BIN_ID}/latest`,
      {
        method: 'GET',
        headers: {
          'X-Master-Key': process.env.JSONBIN_KEY,
        },
      }
    );
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { record } = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(record),
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
