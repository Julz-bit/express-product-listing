require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const livereload = require('livereload');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectLivereload = require('connect-livereload');
const connectDB = require('./src/database/connection');
const productRoutes = require('./src/routes/products');


const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);

connectDB();


app.use(connectLivereload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})