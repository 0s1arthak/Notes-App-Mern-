const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const notesrequest = require('./routes/notes');
const authroutes = require('./routes/authroutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(notesrequest);
app.use(authroutes);

app.get('/', (req, res) => {
    res.send(`Server has started to run at port ${port}`);
});

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1); // Exit the application on database connection failure
    });
