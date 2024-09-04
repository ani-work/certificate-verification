const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'certificate_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

// New GET route for the root URL
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.sendFile(path.join(__dirname, '..', 'index.html'))
});

// API endpoint for verification
app.post('/verify', (req, res) => {
    const { certificate_code } = req.body;

    // Input validation
    if (!certificate_code || typeof certificate_code !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Invalid certificate code' });
    }

    // Query to check if the code exists and is valid
    db.query('SELECT intern_name, issue_date, is_valid FROM certificates WHERE certificate_code = ?', [certificate_code], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ status: 'error', message: 'Internal server error' });
        }

        if (results.length > 0) {
            const { intern_name, issue_date, is_valid } = results[0];
            if (is_valid) {
                res.json({
                    status: 'success',
                    message: 'The certificate is authentic',
                    intern_name,
                    issue_date
                });
            } else {
                res.json({ status: 'error', message: 'The certificate is no longer valid' });
            }
        } else {
            res.json({ status: 'error', message: 'Invalid certificate code' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});