const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const uri = "mongodb+srv://ClientSide:SDpJGwDBlEJLTtKZ@rt-location.ahaubf7.mongodb.net/?retryWrites=true&w=majority";

// Replace 'your-database-uri' with your actual MongoDB database URI
(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

// Define the schema for vehicle locations using Mongoose
const vehicleLocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

const VehicleLocation = mongoose.model('VehicleLocation', vehicleLocationSchema);

app.use(express.json());

// Retrieve vehicle location data
app.get('/api/vehicle-locations', async (req, res) => {
  try {
    const locations = await VehicleLocation.find().exec();
    res.json(locations);
  } catch (error) {
    console.error('Error retrieving vehicle locations:', error);
    res.status(500).json({ error: 'Failed to retrieve vehicle locations' });
  }
});

// Update vehicle location data
app.post('/api/update-location', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    res.status(400).json({ error: 'Invalid latitude or longitude values' });
    return;
  }

  try {
    const newLocation = new VehicleLocation({ latitude, longitude });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error updating vehicle location:', error);
    res.status(500).json({ error: 'Failed to update vehicle location' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
