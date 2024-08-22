const https = require('https');
const { generateSignature } = require('./utils');

const partnerId = process.env.PARTNER_ID;
const partnerSecret = process.env.PARTNER_SECRET;
const unixEpoch = Math.floor(new Date().getTime() / 1000).toString();
const apiEndpoint = '/customer/api/ping';

// Generate signature
const signature = generateSignature(partnerId, partnerSecret, 'GET', unixEpoch, apiEndpoint);

// HTTPS request options for GET
const options = {
  hostname: 'api.fivaldi.net',
  port: 443,
  path: apiEndpoint,
  method: 'GET',
  headers: {
    'X-Fivaldi-Partner': partnerId,
    'X-Fivaldi-Timestamp': unixEpoch,
    'Authorization': `Fivaldi ${signature}`
  }
};

// Sending HTTPS GET request
const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();