const express = require('express');
var path = require('path');
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

// If production NODE_ENV becomes production then build the production build in this location then fetch everything from that build and send it as a response here.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'timeless-app-frontend/build')));
    app.get('*',(req,res) =>
      {res.sendFile(path.resolve(__dirname, 'timeless-app-frontend', 'build', 'index.html'));
  });
}

// conect to the database
let db = 'mongodb+srv://Brendon:Password1@cluster0.piqrh.mongodb.net/Doctors_R_us?retryWrites=true&w=majority';
// 'mongodb+srv://Brendon:Adm1n1234@cluster0.piqrh.mongodb.net/Doctors_R_us?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://Brendon:Password1@cluster0.piqrh.mongodb.net/Doctors_R_us?retryWrites=true&w=majority',{
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

app.get("/", (req, res) => {
    res
        .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        .send("<html><head></head><body></body></html>");
})

// set directory to the static folder.
app.use(express.static(path.join(__dirname, 'build')));

// serve the files form the directory
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});