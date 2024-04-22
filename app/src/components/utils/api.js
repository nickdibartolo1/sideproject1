// export async function fetchData() {
//     const dataArr = [];
  
//     for (let i = 0; i < 3; i++) {
//       const response = await fetch("http://localhost:80/giveword");
  
//       if (!response.ok) {
//         throw new Error(`Request failed with status: ${response.status}`);
//       }
  
//       const apiData = await response.json();
//       console.log("DATA", apiData)
  
//       const pairId = `pair_${i}`;
  
//       dataArr.push({
//         id: pairId,
//         noun: apiData.entry,
//         nounDefinition: apiData.meaning.noun.split("\n")[0].substring(6),
//         stat: ""
//       });
//     }
  
//     return dataArr;
//   }