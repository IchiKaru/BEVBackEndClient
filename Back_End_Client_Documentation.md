# Project BEV Documentation for ClientSide
Other Documentations will be released in the next update. For periodical update cycle cadence
(every Monday at 12:00nn GMT+8)

## What's inside the Documentation

1. Back-end (Server Side) Documentation

## Documentation Proper

### Back End Documentation

#### `vehicle-location-server.js` File
**Importing Dependencies:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
```

1. Importing Dependencies:
   - The code imports two Node.js modules: `express` for creating a web server and `mongoose` for interacting with a MongoDB database.

**Creating an Express Application:**
```javascript
const app = express();
const port = process.env.PORT || 3000;
```

2. Creating an Express Application:
   - An Express application is created and assigned to the variable `app`.
   - The `port` variable is set to the value of the environment variable `PORT` or 3000 if the environment variable is not defined.

**MongoDB Connection:**
```javascript
const uri = "mongodb+srv://ClientSide:SDpJGwDBlEJLTtKZ@rt-location.ahaubf7.mongodb.net/?retryWrites=true&w=majority";

(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();
```

3. MongoDB Connection:
   - The MongoDB database connection is established using the `mongoose.connect` method.
   - The connection URI is provided, and connection options such as `{ useNewUrlParser: true, useUnifiedTopology: true }` are specified.
   - An `async` function is used to ensure asynchronous connection setup.
   - The code logs a message upon successful connection and handles errors.

**Defining a Mongoose Schema:**
```javascript
const vehicleLocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

const VehicleLocation = mongoose.model('VehicleLocation', vehicleLocationSchema);
```

4. Defining a Mongoose Schema:
   - A Mongoose schema named `vehicleLocationSchema` is defined. It describes the structure of documents to be stored in the MongoDB collection.
   - The schema includes fields for `latitude`, `longitude`, and a `timestamp` with a default value of the current date and time.
   - A Mongoose model named `VehicleLocation` is created using the schema.

**Configuring Express Middleware:**
```javascript
app.use(express.json());
```

5. Configuring Express Middleware:
   - The `express.json()` middleware is used to parse JSON data in incoming requests. It allows the application to handle JSON request bodies.

**Defining API Endpoints:**
```javascript
app.get('/api/vehicle-locations', async (req, res) => {
  // ...
});

app.post('/api/update-location', async (req, res) => {
  // ...
});
```

6. Defining API Endpoints:
   - Two API endpoints are defined using Express:
     - `GET /api/vehicle-locations`: This endpoint retrieves vehicle location data from the MongoDB collection. It responds with the retrieved data or an error message if an error occurs.
     - `POST /api/update-location`: This endpoint receives latitude and longitude data in the request body, validates the data, saves it to the MongoDB collection, and responds with the saved data or an error message.

**Server Listening on Port:**
```javascript
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

7. Server Listening on Port:
   - The Express application starts listening on the specified `port`, and a message is logged to indicate that the server is running.
