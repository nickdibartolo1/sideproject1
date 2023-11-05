import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import words from './app/helpers/words.js'

const app = express();
const port = 3001;

app.use(cors());

app.get("/giveword", async (req, res) => {

  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  const url = `https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${randomWord}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '171a179fffmshee0dd46533af305p1c57bbjsn26cb43cb20f8',
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }

});


app.listen(port, () => {
  console.log(`Port is listening on port ${port}`)
})