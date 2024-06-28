const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D1o2S3r4S5+9064',
    database: 'contract_test'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID', connection.threadId);
});

app.post('/submit', (req, res) => {
    const contracts = req.body;
    console.log('Received contract data:', contracts); // Log received data

    const query = 'INSERT INTO contract (Date, ResourceName, VendorName, ClientName, EndClient, DocumentType, DocumentNo, DocumentDate, StartDate, EndDate, LaborHours, BillRate, PayRate, TotalCeilingValue, IncomingOutgoing, Status, TaxType, Comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(query, [
        contracts.date, contracts.resourceName, contracts.vendor, contracts.customer, contracts.endClient, contracts.documentType, contracts.documentNo, contracts.documentDate, contracts.startDate, contracts.endDate, contracts.laborHours, contracts.billRate, contracts.payRate, contracts.totalCeilingValue, contracts.incomingOutgoing, contracts.status, contracts.taxType, contracts.comments
    ], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).json({ error: 'Error inserting data', details: err.stack }); // Send JSON response
            return;
        }
        res.status(200).json({ message: 'Data inserted successfully' }); // Send JSON response
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
