// netlify/functions/update-signals.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const newData = JSON.parse(event.body); // expect an array
    const res = await fetch(
      `https://api.jsonbin.io/v3/b/${process.env.SIGNALS_BIN_ID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key':    process.env.JSONBIN_KEY,
        },
        body: JSON.stringify(newData),
      }
    );
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    return { statusCode: 200, body: JSON.stringify(json.record) };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
