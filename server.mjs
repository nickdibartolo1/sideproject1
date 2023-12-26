import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import words from './app/src/components/helpers/words.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;
const key = process.env.API_KEY

app.use(cors());

// NOTE: This API im using seems to return multiple results for a single query. I tested to see if it was the looping logic as 
// well as possible double calls in my code. The conclusion ive drawn, unfortunatly, is that is is just a strange behavior with the API. 


app.get("/giveword", async (req, res) => {
  const numberOfWords = 6; // Set the number of words to be returned

  const dataArr = [];
  for (let i = 0; i < numberOfWords; i++) {
    // console.log(`Iteration ${i}`)
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    try {
      const response = await fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${randomWord}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-RapidAPI-Key': `${key}`,
          'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const pairId = `pair_${i}`;

        dataArr.push({
          id: pairId,
          noun: data.entry,
          nounDefinition: data.meaning.noun.split("\n")[0].substring(6),
          stat: ""
        });
      } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send('Internal Server Error');
      return; // Exit the loop if an error occurs
    }
  }

  res.json(dataArr);
});


app.listen(port, () => {
  console.log(`Port is listening on port ${port}`)
})