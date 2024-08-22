const crypto = require('crypto');

/**
 * Generates a signature for securing API requests.
 *
 * @param {string} partnerId The partner's unique identifier.
 * @param {string} partnerSecret The secret key for HMAC generation.
 * @param {string} httpMethod The HTTP method (GET, POST, etc.)
 * @param {string} unixEpoch The current Unix epoch time as a string.
 * @param {string} apiEndpoint The endpoint of the API to be called.
 * @param {Object|null} body The body of the request, if applicable.
 * @param {string} contentType The MIME type of the request's body.
 * @returns {string} The generated HMAC signature.
 */
function generateSignature(partnerId, partnerSecret, httpMethod, unixEpoch, apiEndpoint, body = null, contentType = '') {
  let bodyHash = '';
  if (body !== null && httpMethod !== 'GET') {
    try {
      bodyHash = crypto.createHash('md5').update(body).digest('hex');
    } catch (error) {
      throw new Error(`Error generating body hash: ${error.message}`);
    }
  }

  try {
    const stringToSign = `${httpMethod}\n${bodyHash}\n${contentType}\n` +
      `x-fivaldi-partner:${partnerId}\n` +
      `x-fivaldi-timestamp:${unixEpoch}\n${apiEndpoint}`;

    const signature = crypto.createHmac('sha256', partnerSecret).update(stringToSign).digest('base64');
    return signature;
  } catch (error) {
    throw new Error(`Error generating signature: ${error.message}`);
  }
}

module.exports = { generateSignature };