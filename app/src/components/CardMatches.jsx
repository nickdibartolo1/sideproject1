import { useEffect } from "react";
import { SimpleGrid } from "@mantine/core";

function CardMatches() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/word", {
          method: "GET",
          headers: {
            'X-RapidAPI-Key': '171a179fffmshee0dd46533af305p1c57bbjsn26cb43cb20f8',
            'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("HERES DATA:", data);
        console.log("HERES RES:", response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SimpleGrid cols={4} spacing="xl" verticalSpacing="lg">
        <div style={{ backgroundColor: "gray" }}>1</div>
        <div style={{ backgroundColor: "gray" }}>2</div>
        <div style={{ backgroundColor: "gray" }}>3</div>
        <div style={{ backgroundColor: "gray" }}>4</div>
        <div style={{ backgroundColor: "gray" }}>5</div>
        <div style={{ backgroundColor: "gray" }}>5</div>
        <div style={{ backgroundColor: "gray" }}>5</div>
        <div style={{ backgroundColor: "gray" }}>5</div>
        <div style={{ backgroundColor: "gray" }}>5</div>
        <div style={{ backgroundColor: "gray" }}>5</div>
        <div style={{ backgroundColor: "gray" }}>5</div>
        <div style={{ backgroundColor: "gray" }}>5</div>
      </SimpleGrid>
    </div>
  );
}

export default CardMatches;
