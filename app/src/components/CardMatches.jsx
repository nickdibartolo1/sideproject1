import { useEffect } from 'react';
import { Card, Text } from '@mantine/core';

function CardMatches() {

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:3000/test", {
              method: "GET"
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);



  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      
        <Text fw={500}>Norway Fjord Adventures</Text>

    </Card>
  );
}

export default CardMatches;