import { useState, useEffect, useMemo } from "react";
import { fetchData } from "./utils/api";
import { shuffleArray } from "./utils/shuffle";
import Card from "./Card";

function interleaveData(dataArr) {
  const shuffledData = shuffleArray(dataArr);
  console.log("SHUFFLEDARRAY", shuffledData);

  const interleavedData = [];
  shuffledData.forEach(({ id, entry, nounDefinition }) => {
    interleavedData.push({ id, content: entry });
    interleavedData.push({ id, content: nounDefinition });
  });


  console.log("INTER", interleavedData);
  return interleavedData;
}

function CardMatches() {
  const [combinedData, setCombinedData] = useState([]);


  useEffect(() => {
    async function fetchDataAndInterleave() {
      try {
        const dataArr = await fetchData();
        const interleavedData = interleaveData(dataArr);

        setCombinedData(interleavedData);
        console.log("INTER", interleavedData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndInterleave();
  }, []);

  const shuffledCombinedData = useMemo(() => {
    return shuffleArray(combinedData);
  }, [combinedData]);

  
  return (
    <div className="container">
      {shuffledCombinedData.map((data, index) => (
        <Card key={index} data={data} />
      ))}
    </div>
  );
}

export default CardMatches;



