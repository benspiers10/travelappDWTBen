const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Temporary in-memory storage for trips.
const trips = [];

// Log every request that hits the server.
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// route test to make sure working
app.get('/', (req, res) => {
  console.log('Root route was accessed.');
  res.json({
    message: 'TravelBuddy server is running',
  });
});

// Receive and store a completed trip.
app.post('/trips', (req, res) => {
  console.log('Received trip data from app:');
  console.log(JSON.stringify(req.body, null, 2));

  const trip = {
    id: Date.now().toString(),
    ...req.body,
    receivedAt: new Date().toISOString(),
  };

  trips.push(trip);
  console.log(`Trip stored. Total trips in memory: ${trips.length}`);

  res.status(201).json({
    message: 'Trip received successfully',
    trip,
  });
});

// Return all trips.
app.get('/trips', (req, res) => {
  console.log(`Returning ${trips.length} stored trip(s).`);
  res.json(trips);
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});