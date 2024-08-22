const https = require('https');
const { generateSignature } = require('./utils');

const partnerId = process.env.PARTNER_ID;
const partnerSecret = process.env.PARTNER_SECRET;
const unixEpoch = Math.floor(new Date().getTime() / 1000).toString();
const cuid = '1234' // Provide a cuid which the partner id has permissions for
const apiEndpoint = `/customer/api/companies/${cuid}/customers/createCustomer`;
const contentType = 'application/json';

// Read JSON data from body.json
const postData = JSON.stringify(require('./body.json'));

// Generate signature
const signature = generateSignature(partnerId, partnerSecret, 'POST', unixEpoch, apiEndpoint, postData, contentType);

// HTTPS request options for POST
const options = {
  hostname: 'api.fivaldi.net',
  port: 443,
  path: apiEndpoint,
  method: 'POST',
  headers: {
    'X-Fivaldi-Partner': partnerId,
    'X-Fivaldi-Timestamp': unixEpoch,
    'Authorization': `Fivaldi ${signature}`,
    'Content-Type': contentType,
    'Content-Length': Buffer.byteLength(postData)
  }
};

// Sending HTTPS POST request
const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

// Writing data to request body
req.write(postData);
req.end();