// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactForm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to handle form submission
app.post('/api/contact', (req, res) => {
  const contact = new Contact(req.body);
  contact.save((err) => {
    if (err) {
      res.status(500).send('Error saving contact information');
    } else {
      res.status(200).send('Contact information saved successfully');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
