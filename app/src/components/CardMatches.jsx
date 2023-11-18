import { useState, useEffect } from "react";
import { fetchData } from "./utils/api";
import { shuffleArray } from "./utils/shuffle";
import Card from "./Card";

function interleaveData(dataArr) {
  const shuffledData = shuffleArray(dataArr);
  console.log("SHUFFLEDARRAY", shuffledData);

  const interleavedData = [];
  shuffledData.forEach(({ id, noun, nounDefinition, stat }) => {
    interleavedData.push({ id, content: noun, stat });
    interleavedData.push({ id, content: nounDefinition, stat });
    console.log("ID", id)
    console.log("STAT", stat)
  });

  console.log("INTER", interleavedData);
  return interleavedData;
}

function CardMatches() {
  const [combinedData, setCombinedData] = useState([]);
  const [select, setSelect] = useState(-1);

  useEffect(() => {
    async function fetchDataAndInterleave() {
      try {
        const dataArr = await fetchData();
        const interleavedData = interleaveData(dataArr);

        setCombinedData(interleavedData);
        console.log("INTER", interleavedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndInterleave();
  }, []);

  const shuffle = combinedData.sort(() => Math.random() - 0.5)

  const check = (current) => {

    if (shuffle[current].id == shuffle[select].id) {
      shuffle[current].stat = "correct";
      shuffle[select].stat = "correct";
      setSelect(-1)
    } else {
      shuffle[current].stat == "wrong";
      shuffle[select].stat == "wrong";
      setCombinedData([...combinedData])

      setTimeout(() => {
        shuffle[current].stat == "";
        shuffle[select].stat == "";
        setCombinedData([...combinedData]);
        setSelect(-1);
      }, 1000)
    }
  };

  const handleClick = (id) => {
    if (select === -1) {
      shuffle[id].stat = "active"
      setCombinedData([...combinedData])
      setSelect(id);
    } else {
      check(id);
    }
  };

  return (
    <div className="container">
      {shuffle.map((data, index) => (
        <Card key={index} data={data} id={index}  handleClick={handleClick} />
      ))}
    </div>
  );
}

export default CardMatches;
