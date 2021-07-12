const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 8080
require('dotenv').config();

const app = express();

const appointmentRoute = require('./Routes/appointments')
const authRoute = require('./Routes/auth')
const doctorsRoute = require('./Routes/doctors')

//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api', doctorsRoute)
app.use('/api', authRoute)
app.use('/api', appointmentRoute)

// conect to the database
mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// error handling when the database connection is unavailable
mongoose.connection.on('error', () => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// when connecting is made.
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});