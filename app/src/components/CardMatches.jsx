import { useState, useEffect, useRef } from "react";
import { fetchData } from "./utils/api";
import { shuffleArray } from "./utils/shuffle";
import Card from "./Card";

function interleaveData(dataArr) {
  const shuffledData = shuffleArray(dataArr);
  // console.log("SHUFFLEDARRAY", shuffledData);

  const interleavedData = [];
  shuffledData.forEach(({ id, noun, nounDefinition, stat }) => {
    interleavedData.push({ id, content: noun, stat });
    interleavedData.push({ id, content: nounDefinition, stat });
    // console.log("ID", id);
    // console.log("STAT", stat);
  });

  // console.log("INTER", interleavedData);
  return interleavedData;
}

function CardMatches() {
  const [combinedData, setCombinedData] = useState([]);
  const [select, setSelect] = useState(-1);
  const deslectRef = useRef();

  //FETCH DATA FROM API THEN SET
  useEffect(() => {
    async function fetchDataAndInterleave() {
      try {
        const dataArr = await fetchData();
        const interleavedData = interleaveData(dataArr);

        // Shuffle the data when fetched and set
        const shuffledData = interleavedData.sort(() => Math.random() - 0.5);
        setCombinedData(shuffledData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndInterleave();
  }, []);

  //REF FOR DESELECTING A CARD - ABLES USER TO CLICK ANYWHERE TO DESELECT
  // useEffect(() => {
  //   const deselect = (e) => {
  //     if (!deselectRef.current.contains(e.target)) {
  //       setSelect(-1);
  //     }
  //   };

  //   document.body.addEventListener("click", deselect);

  //   return () => document.body.removeEventListener("click", deselect);
  // }, []);

  function handleCardClick(id) {
    if (combinedData[id].matched) {
      // If the card is already matched, do nothing
      return;
    }

    if (select === id) {
      setSelect(-1); // Deselect the card if it's already selected
    } else {
      if (select !== -1 && combinedData[id].id === combinedData[select].id) {
        check(id);
        setSelect(-1); // Deselect after a successful match
      } else if (!combinedData[id].matched) {
        const updatedData = [...combinedData];
        updatedData[id].stat = "active";
        if (select !== -1) {
          updatedData[select].stat = ""; // Clear the 'active' state from previous selection
        }
        setCombinedData(updatedData);
        setSelect(id);
      }
    }
  }

  function check(id) {
    const updatedData = [...combinedData];

    updatedData[id].stat = "correct";
    updatedData[select].stat = "correct";

    console.log("DATA", updatedData[id].stat);

    updatedData[id].matched = true;
    updatedData[select].matched = true;

    setCombinedData(updatedData);
  }

  return (
    <div className="container" ref={deslectRef}>
      {combinedData.map((data, index) => (
        <Card
          key={index}
          data={data}
          id={index}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default CardMatches;
