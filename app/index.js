const express = require('express');
const bodyParser = require('body-parser');
const historiaRoutes = require('./routes/historiaRoutes');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use('/api', historiaRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
