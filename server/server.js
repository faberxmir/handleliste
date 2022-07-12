const express = require('express');
const APIRoutes = require('./routes/api');
const APP = express();
const PORT = process.env.port || 3000;

APP.use('/api', APIRoutes);

APP.get('/', (req, res) => {
    res.end();
});

APP.get('/api', (req, res) => {
    res.json({"message" : "hello from server"});
})

APP.listen(PORT, _=> {
    console.log(`server started @ port: ${PORT}`);
});