const express = require("express");
var path = require("path");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
require("dotenv").config();

const app = express();

const appointmentRoute = require("./Routes/appointments");
const authRoute = require("./Routes/auth");
const doctorsRoute = require("./Routes/doctors");

//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api", doctorsRoute);
app.use("/api", authRoute);
app.use("/api", appointmentRoute);

// 'mongodb+srv://Brendon:Adm1n1234@cluster0.piqrh.mongodb.net/Doctors_R_us?retryWrites=true&w=majority'
mongoose.connect(process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

// error handling when the database connection is unavailable
mongoose.connection.on("error", () => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

// when connecting is made.
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// If production NODE_ENV becomes production then build the production build in this location then fetch everything from that build and send it as a response here.
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    express.static(path.join(__dirname, "\\client\\build"));
    res
      .set(
        "Content-Security-Policy",
        "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
      )
      .sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
