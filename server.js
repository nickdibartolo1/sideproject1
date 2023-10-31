const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get("/test", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'This is a test response' });
});


app.listen(port, () => {
    console.log(`Port is listening on port ${port}`)
})