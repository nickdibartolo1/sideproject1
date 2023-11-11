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

function CardMatches() {
  const [wordData, setWordData] = useState([]);
  const [definitionData, setdefinitionData] = useState([]);

  useEffect(() => {
    async function fetchWordData() {
      try {
        const wordArr = [];
        const definitionArr = []

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
  }, []); // Empty dependency array to run only once on mount

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

  return <div className="container">{stat}</div>;
}

export default CardMatches;


// import { useState, useEffect } from "react";
// import { SimpleGrid } from "@mantine/core";

// function shuffleArray(array) {
//   // Create a copy of the array
//   const shuffledArray = [...array];

//   // Function to shuffle the copied array using Fisher-Yates algorithm
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }

//   return shuffledArray;
// }

// function CardMatches() {
//   const [wordData, setWordData] = useState([]);

//   useEffect(() => {
//     async function fetchWordData() {
//       try {
//         const words = [];
//         const definitions = [];

//         for (let i = 0; i < 2; i++) {
//           const response = await fetch("http://localhost:80/giveword");

//           if (!response.ok) {
//             throw new Error(`Request failed with status: ${response.status}`);
//           }

//           const worddata = await response.json();
//           // Ensure each word object has a nounDefinition property
//           words.push(worddata.entry);
//           definitions.push(worddata.meaning.noun.split('\n')[0].substring(6));
//         }

//         // Shuffle the arrays separately
//         const shuffledWords = shuffleArray(words);
//         const shuffledDefinitions = shuffleArray(definitions);

//         // Combine shuffled words and definitions into pairs
//         const wordPairs = shuffledWords.map((word, index) => ({
//           entry: word,
//           nounDefinition: shuffledDefinitions[index]
//         }));

//         // Set the state with the shuffled pairs
//         setWordData(wordPairs);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchWordData();
//   }, []); // Empty dependency array to run only once on mount

//   const stat = (
//     <SimpleGrid cols={3}>
//       {wordData.map((pair, index) => (
//         <div key={index}>
//           <div>{pair.entry}</div>
//           <div>{pair.nounDefinition}</div>
//         </div>
//       ))}
//     </SimpleGrid>
//   );

//   return (
//     <div className="container">
//       {stat}
//     </div>
//   );
// }

// export default CardMatches;





