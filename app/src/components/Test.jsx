import { useEffect } from "react";

const Test = () => {
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


  return(
    <div>
        
    </div>
  );
};

export default Test;
