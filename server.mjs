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


app.get("/giveword", async (req, res) => {


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
      res.json(data);
    } else {

      res.status(response.status).send('Error fetching data');
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Port is listening on port ${port}`)
})


// app.get("/bb", async (req, res) => {
//   try {
//     const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes', {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       res.json(data); // Send the JSON response to the client
//     } else {
//       // Handle non-OK response (e.g., 404, 500, etc.)
//       res.status(response.status).send('Error fetching data');
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     res.status(500).send('Internal Server Error');
//   }
// });