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

  function check(id) {
    if (combinedData[id].id === combinedData[select].id) {
      const updatedData = [...combinedData];

      updatedData[id].stat = "correct";
      updatedData[select].stat = "correct";

      updatedData[id].matched = true;
      updatedData[select].matched = true;

      setCombinedData(updatedData);
    } else {
      const updatedData = [...combinedData];
      updatedData[id].stat = "wrong";
      updatedData[select].stat = "wrong";
      setCombinedData(updatedData);

      setTimeout(() => {
        updatedData[id].stat = "";
        updatedData[select].stat = "";
        setCombinedData(updatedData);
      }, 1000);
    }
    setSelect(-1);
  }

  function handleCardClick(id) {
    if (select === id) {
      setSelect(-1); // Deselect the card if it's already selected
    } else {
      if (select !== -1 && combinedData[id].id === combinedData[select].id) {
        check(id);
      } else {
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
