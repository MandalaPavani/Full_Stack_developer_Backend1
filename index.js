const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Setup
const dbUri = 'mongodb://localhost:27017/websiteDB'; // Replace with your MongoDB connection string
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the hero banner and contact details schemas and models
const heroBannerSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const HeroBanner = mongoose.model('HeroBanner', heroBannerSchema);

const contactDetailsSchema = new mongoose.Schema({
  email: String,
  phone: String,
});

const ContactDetails = mongoose.model('ContactDetails', contactDetailsSchema);

// Routes
app.post('/api/login', async (req, res) => {
  const { adminId, password } = req.body;

  // Implement your authentication logic here (e.g., fetch admin details from the database)
  // For demonstration purposes, we'll use a hardcoded admin ID and password
  if (adminId === 'admin' && password === 'adminpassword') {
    const token = jwt.sign({ adminId }, 'secretkey', { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/heroBanner', async (req, res) => {
  // Implement logic to fetch hero banner content from the database
  const heroBanner = await HeroBanner.findOne();
  res.json(heroBanner);
});

app.put('/api/heroBanner', async (req, res) => {
  // Implement logic to update hero banner content in the database
  const { title, description } = req.body;
  await HeroBanner.updateOne({}, { title, description });
  res.json({ success: true, message: 'Hero banner content updated successfully' });
});

app.get('/api/contactDetails', async (req, res) => {
  // Implement logic to fetch contact details from the database
  const contactDetails = await ContactDetails.findOne();
  res.json(contactDetails);
});

app.put('/api/contactDetails', async (req, res) => {
  // Implement logic to update contact details in the database
  const { email, phone } = req.body;
  await ContactDetails.updateOne({}, { email, phone });
  res.json({ success: true, message: 'Contact details updated successfully' });
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
