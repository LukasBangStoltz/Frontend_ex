import facade from "./apiFacade.js";
import React, { useState, useEffect } from "react";
function CatFacts() {
  let factArray = [
    {
      text: "",
      createdAt: "",
    },
  ];

  const [dataFromServer, setDataFromServer] = useState(factArray);

console.log(dataFromServer)

  useEffect(() => {
    facade.fetchCatFacts().then((data) => setDataFromServer(data));
    
  }, []);

  const tableItem = dataFromServer.map((catFact) => (
    <tr key={catFact.text}>
      <td>{catFact.text}</td>
      <td>{catFact.createdAt}</td>
    </tr>
  ));
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Fact</th>
            <th>Date created</th>
          </tr>
        </thead>
        <tbody>{tableItem}</tbody>
      </table>
    </div>
  );
}

export default CatFacts;
