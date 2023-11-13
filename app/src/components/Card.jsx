import { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";

function shuffleArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  console.log("SHUFFLEDARRAY", shuffledArray);
  return shuffledArray;
}

const Card = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataArr = [];

        for (let i = 0; i < 3; i++) {
          const response = await fetch("http://localhost:80/giveword");

          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }

          const apiData = await response.json();

          const pairId = `pair_${i}`;

          //push data object into established dataArr
          dataArr.push({
            id: pairId,
            entry: apiData.entry,
            nounDefinition: apiData.meaning.noun.split("\n")[0].substring(6),
          });
        }

        //shuffle pushed dataArr
        const shuffledData = shuffleArray(dataArr);

        // establish interleaveData array and put each entries and nounDefinitions based on their shared id
        const interleavedData = [];
        shuffledData.forEach(({ id, entry, nounDefinition }) => {
          interleavedData.push({ id, entry });
          interleavedData.push({ id, nounDefinition });
        });

        setCombinedData(interleavedData);
        console.log("INTER", interleavedData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <SimpleGrid cols={3}>
        {combinedData.map((data, index) => (
          <div key={index}>
            <div>{data.entry}</div>
            <div>{data.nounDefinition}</div>
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}
export default Card;