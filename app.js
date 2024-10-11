const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();  // Load environment variables

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS
app.use(express.static('public'));

// Import routes
const recordRoutes = require('./routes/records');
app.use('/', recordRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
