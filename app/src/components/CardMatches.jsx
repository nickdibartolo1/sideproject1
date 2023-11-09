import { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";

function CardMatches() {
  const [data, setData] = useState([]);
  const [nounDefinition, setNounDefinition] = useState("");

  useEffect(() => {

    async function fetchWordData() {
      try {

        const response = await fetch("http://localhost:80/giveword");

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        //Get response from API and set the state
        const worddata = await response.json();
        setData(worddata)
        console.log(worddata);

       //Data gives many definitions but we only want 1. Eliminate xcess definitions using .split() and set definition state
        const nounDefinition = worddata.meaning.noun.split('\n')[0].substring(6);
        setNounDefinition(nounDefinition);
        console.log("NDEF", nounDefinition)
        
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    }
    
    fetchWordData();
  }, []);


  return (
    <div>
    {data ? (
      <SimpleGrid cols={3}>
        {data.meaning && data.meaning.noun && (
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
        )}
      </SimpleGrid>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default CardMatches;
