import { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";
// import Card from "./Card";

function CardMatches() {
  // const [data, setData] = useState([]);
  const [wordData, setWordData] = useState([]);
  // const [nounDefinition, setNounDefinition] = useState("");

  useEffect(() => {

    async function fetchWordData() {
      try {
        const wordArr = []
        for (let i = 0; i < 3; i++) {
          const response = await fetch("http://localhost:80/giveword");

          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }

          const worddata = await response.json();
          //Get response from API and set the state
          wordArr.push(worddata);
          console.log(worddata);

          //Data gives many definitions but we only want 1. Eliminate xcess definitions using .split() and set definition state
           const nounDefinition = worddata.meaning.noun.split('\n')[0].substring(6);
           console.log("NDEF", nounDefinition)
           wordArr[i].nounDefinition = nounDefinition;
        }

        setWordData(wordArr);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    }
    
    fetchWordData();
  }, []);


  const stat = 
      <SimpleGrid cols={3}>
        {wordData.map((word, index) => (
          <div key={index}>
            <div>{word.entry}</div>
            <div>{word.nounDefinition}</div>
  
          </div>
        ))}
      </SimpleGrid>
   

  return (
    <div className="container">
      {/* <SimpleGrid cols={3}>
          <>
            <div>{nounDefinition}</div>
            <div>2</div>
            <div>{data.entry}</div>
            <div>4</div>
            <div>6</div>
            <div>5</div>
            <div>5</div>
            <div>5</div>
            <div>5</div>
            <div>5</div>
            <div>2</div>
            <div>5</div>
          </>
      </SimpleGrid> */}
      {stat}
  </div>
  );
}

export default CardMatches;
