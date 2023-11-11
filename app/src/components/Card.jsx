// import { useState, useEffect } from "react";
// import { SimpleGrid } from "@mantine/core";

// const Card = () => {
//   const [wordData, setWordData] = useState([]);

//   useEffect(() => {
//     async function fetchWordData() {
//       try {
//         const wordArr = [];
//         for (let i = 0; i < 6; i++) {
//           const response = await fetch("http://localhost:80/giveword");

//           if (!response.ok) {
//             throw new Error(`Request failed with status: ${response.status}`);
//           }

//           const worddata = await response.json();
//           // Ensure each word object has a nounDefinition property
//           wordArr.push({
//             entry: worddata.entry,
//             nounDefinition: worddata.meaning.noun.split('\n')[0].substring(6)
//           });
//         }
//         console.log(wordArr)
//         setWordData(wordArr);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchWordData();
//   }, []);

//   const stat = (
//     <SimpleGrid cols={3}>
//       {wordData.map((word, index) => (
//         <div key={index}>
//           <div>{word.entry}</div>
//           <div>{word.nounDefinition}</div>
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
// export default Card