const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connected');
});

app.use(cors({origin:'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routers/user.router');

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
