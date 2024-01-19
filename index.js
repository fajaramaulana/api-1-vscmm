const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const Router = require('./src/routes/apiv1');
const setupDatabase = require('./src/database/databaseSetup')

const app = express();
const PORT = process.env.PORT || 3000;


// Use the middleware for all routes or a specific route
app.use(express.json());

app.use(express.static('public'));

app.use(helmet({
  contentSecurityPolicy: false,
  dnsPrefetchControl: false, // Disable DNS prefetching
  frameguard: {action: 'deny'}, // Prevent embedding in frames
  ieNoOpen: true, // Set "X-Download-Options" to prevent Internet Explorer
  // from executing downloads in the site's context
  noSniff: true, // Prevent browsers from interpreting files as
  // something else than declared by the content type in the Content-Type header
  xssFilter: true, // Enable the XSS filter in most recent web browsers
  hidePoweredBy: true, // Remove the X-Powered-By header
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api/v1/', Router)

// // Middleware to handle not found routes
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Not found' })
// })

// // Middleware to handle errors
// app.use((err, req, res, next) => {
//   console.error(err)
//   res.status(500).json({ error: 'Internal server error', message: err.message, data: err })
// })

// // middleware to handle wrong method
// app.use((req, res, next) => {
//   res.status(405).json({ error: 'Method not allowed' })
// })

// Setup the database
setupDatabase()
  .then(() => {
    // Define additional setup tasks or middleware if needed

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to setup database:', err)
  })
