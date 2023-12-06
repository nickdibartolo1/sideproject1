import { useState, useEffect, useRef } from "react";
import { fetchData } from "./utils/api";
import { shuffleArray } from "./utils/shuffle";
import Card from "./Card";
import FinishedModal from "./FinishedModal";
import { isMobile } from "react-device-detect";

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
  const [gameFinsihed, setGameFinished] = useState(false);
  const deslectRef = useRef();

  const cardDeselectOnOutsideClick = (e) => {
    if (deslectRef.current && !deslectRef.current.contains(e.target)) {
      setSelect(-1);
    }
  };

  useEffect(() => {
    // allows ability to deselect a selected card by clicking outside the card
    document.addEventListener("mousedown", cardDeselectOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", cardDeselectOnOutsideClick);
    };
  });

  //FETCH DATA FROM API THEN SET
  useEffect(() => {
    async function fetchDataAndInterleave() {
      try {
        const dataArr = await fetchData();
        const interleavedData = interleaveData(dataArr);

        const shuffledData = interleavedData.sort(() => Math.random() - 0.5); // Shuffle the data when fetched and set
        setCombinedData(shuffledData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataAndInterleave();
  }, []);

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

        if (select !== -1 && combinedData[id].id !== combinedData[select].id) {
          const updatedDataCopy = [...combinedData]; // Create a copy of the current data

          updatedDataCopy[id].stat = "wrong";
          updatedDataCopy[select].stat = "wrong";
          setCombinedData(updatedDataCopy);

          setTimeout(() => {
            const resetData = updatedDataCopy.map((card) => {
              if (card.stat === "wrong") {
                return { ...card, stat: "" }; // Reset only the cards marked as "wrong"
              }
              return card;
            });
            setCombinedData(resetData);
          }, 1500); // Adjust the timeout duration as needed

          setSelect(-1); // Reset selection for a new match attempt
        }
      }
    }
  }

  function check(id) {
    const updatedData = [...combinedData]; // create new set copy

    updatedData[id].stat = "correct"; // set stat to correct if card ids match
    updatedData[select].stat = "correct";

    console.log("DATA", updatedData[id].stat);

    updatedData[id].matched = true;
    updatedData[select].matched = true;

    setCombinedData(updatedData);

    const allMatched = updatedData.every((card) => card.matched);
    if (allMatched) {
      setGameFinished(true);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className={isMobile ? "mobile_container" : "container"}
        ref={deslectRef}
      >
        {combinedData.map((data, index) => (
          <Card
            isSelected={index === select}
            key={index}
            data={data}
            id={index}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      {gameFinsihed && <FinishedModal showModal={gameFinsihed}></FinishedModal>}
    </div>
  );
}

export default CardMatches;
