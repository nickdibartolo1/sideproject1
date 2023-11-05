import { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";

function CardMatches() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWordData = async () => {
      try {
        const result = await fetch("http://localhost:3001/giveword", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const response = await result.json();
        console.log(result); 
        console.log(response); 
        setData(result);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWordData();
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index} style={{ backgroundColor: "gray" }}>
          <SimpleGrid cols={4} spacing="xl" verticalSpacing="lg">
            {item}
          </SimpleGrid>
        </div>
      ))}
      <div>CARDS SHOW</div>
    </div>
  );
}

export default CardMatches;
