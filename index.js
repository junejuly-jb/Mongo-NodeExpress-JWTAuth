const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Import Routes
const authRoute = require('./routes/auth');

//dotenv
dotenv.config();

// connect DB
mongoose.connect(process.env.DB_CONNECT,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                },
                () => { console.log('connected to DB!') })

                
//Middlewares
app.use(express.json());


// Routes Middleware
app.use('/api', authRoute);


app.listen(3000, () => console.log('up and running!') )