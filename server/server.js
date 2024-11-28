const express = require('express');
const app = express();
const connectToDb = require('./config/connectToDb');
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config()
const PORT = process.env.PORT

// Middleware to parse JSON data
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

// Connect to the database
connectToDb();

// Routing

app.get('/', (req, res) => {
    res.send('Hello World');
});

//middleware
app.use('/user', require("./routes/userRoute"))
app.use('/', require("./routes/noteRoute"))

// Set the port, defaulting to 3000 if not set
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
