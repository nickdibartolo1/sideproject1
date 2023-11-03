import { useState, useEffect } from "react";
import { SimpleGrid } from "@mantine/core";

function CardMatches() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/giveword").then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json();
    }).then((result) => {
      setData(result)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  return (
    <div>
      <SimpleGrid cols={4} spacing="xl" verticalSpacing="lg">
      {data.map((item, index) => (
          <div key={index} style={{ backgroundColor: "gray" }}>
            {item}
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default CardMatches;
