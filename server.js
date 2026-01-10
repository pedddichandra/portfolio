const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, Images) from the current directory
app.use(express.static(path.join(__dirname)));

// Main Route - Serves the Single Page Application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes (Example placeholder for future Contact Form logic)
app.post('/api/contact', (req, res) => {
    // Here you would handle sending emails or saving to a database
    console.log('Contact form data received:', req.body);
    res.json({ message: 'Message received successfully!', status: 'success' });
});

// Catch-all route for SPA (redirects unknown routes back to home)
// Catch-all route for SPA (redirects unknown routes back to home)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
