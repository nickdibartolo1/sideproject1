import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(cors());

// app.get("/test", (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.json({ message: 'This is a test response' });
// });

app.get("/word", async (req, res) => {
    
    // const word = req.params.word;
    const url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=salad';
    // const url = `https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${word}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '171a179fffmshee0dd46533af305p1c57bbjsn26cb43cb20f8',
        'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
      }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

});


app.listen(port, () => {
    console.log(`Port is listening on port ${port}`)
})