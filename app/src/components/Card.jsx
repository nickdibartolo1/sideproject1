import { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";

function shuffleArray(array) {
  // Create a copy of the array
  const shuffledArray = [...array];

  // Function to shuffle the copied array using Fisher-Yates algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  console.log("SHUFFLEDARRAY", shuffledArray);
  return shuffledArray;
}

const Card = () => {
  const [wordData, setWordData] = useState([]);
  const [definitionData, setdefinitionData] = useState([]);

  useEffect(() => {
    async function fetchWordData() {
      try {
        const wordArr = [];
        const definitionArr = [];

        for (let i = 0; i < 3; i++) {
          const response = await fetch("http://localhost:80/giveword");

          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }

          const apiData = await response.json();
          // Ensure each word object has a nounDefinition property
          wordArr.push({
            entry: apiData.entry,
          });

          definitionArr.push({
            nounDefinition: apiData.meaning.noun.split("\n")[0].substring(6)
          });
          
        }
        console.log("WORDARR", wordArr);
        console.log("DEFARR", definitionArr);
        // Shuffle the copied array before setting the state
        setWordData(shuffleArray(wordArr));
        setdefinitionData(shuffleArray(definitionArr))

        console.log("SET", setWordData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchWordData();
  }, []); 

  const stat = (
    <SimpleGrid cols={3}>
      {wordData.map((word, index) => (
        <div key={index}>
          <div>{word.entry}</div>
          <div>{definitionData[index].nounDefinition}</div>
        </div>
      ))}
    </SimpleGrid>
  );

  return (
    <div className="container">
      {stat}
    </div>
  );
}
export default Card;