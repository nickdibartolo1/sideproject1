import { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";

function CardMatches() {
  const [data, setData] = useState([]);

  useEffect(() => {

    async function fetchWordData() {
      try {

        const response = await fetch("http://localhost:80/giveword");

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const worddata = await response.json();
        setData(worddata)
        console.log(worddata);
       
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
            <div>{data.meaning.noun}</div>
            <div>2</div>
            <div>{data.entry}</div>
            <div>4</div>
            <div>{data.entry}</div>
            <div>5</div>
            <div>{data.entry}</div>
            <div>5</div>
            <div>{data.entry}</div>
            <div>5</div>
            <div>{data.entry}</div>
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
