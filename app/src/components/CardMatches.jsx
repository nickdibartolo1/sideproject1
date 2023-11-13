import { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";
import { fetchData } from "./utils/api";
import { shuffleArray } from "./utils/shuffle";

function interleaveData(dataArr) {
  const shuffledData = shuffleArray(dataArr);

  const interleavedData = [];
  shuffledData.forEach(({ id, entry, nounDefinition }) => {
    interleavedData.push({ id, entry });
    interleavedData.push({ id, nounDefinition });
  });

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndInterleave();
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

export default CardMatches;
// const finishedArray =[
//   {id: 'pair_2', nounDefinition: 'a spear with three prongs'},
//   {id: 'pair_1', nounDefinition: 'a leader engaged in civil administration'},
//   {id: 'pair_0', nounDefinition: 'a story about mythical or supernatural beings or events'},
//   {id: 'pair_0', entry: 'legend'},
//   {id: 'pair_2', entry: 'trident'},
//   {id: 'pair_1', entry: 'politician'},

// ]


