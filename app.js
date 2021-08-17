const express = require('express');

const expressRateLimiter = require('express-rate-limit');

const expressSlowDown = require('express-slow-down');

const app = express();

const PORT = 5000;

// For global rate limiting (on all routes)
/*
app.use(
  expressRateLimiter({
    windowMs: 5000,
    max: 5,
    message: {
      code: 429,
      message: "Too many requests",
    },
  })
);
*/

const registerLimiter = expressRateLimiter({
  windowMs: 30 * 1000,
  max: 10,
  message: {
    code: 429,
    message: 'Too many requests',
  },
});

// Express slow down , slows down the requests after each request
const speedLimiter = expressSlowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 500,
});

// For Specific rate limiting on routes
app.get('/', registerLimiter, speedLimiter, (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => console.log('Server Running'));
