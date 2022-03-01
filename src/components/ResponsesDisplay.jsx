import React, { useState } from "react";
import Response from "./Response.jsx";
import { useSelector } from "react-redux";

import "../css/ResponsesDisplay.css";

function ResponsesDisplay() {
  //eslint-disable-next-line
  const responsesState = useSelector((state) => state.responses);
  const [responses, updateResponses] = useState([]);

  const localStorageResponses = localStorage.getItem("responses");

  React.useEffect(() => {
    console.log(responses);
  }, [responses]);

  React.useEffect(() => {
    const localStorageResponsesParsed = JSON.parse(localStorageResponses);
    if (localStorageResponsesParsed) {
      updateResponses(localStorageResponsesParsed);
    }
  }, [localStorageResponses]);

  return (
    <div className="responses">
      <div className="responses-title-container">
        <h1>Responses</h1>
      </div>
      {responses
        .slice(0)
        .reverse()
        .map((res, idx) => (
          <Response
            key={idx}
            index={idx}
            generatedOn={res.date}
            prompt={res.problem}
            response={res.response}
            id={res.id}
            userId={res.userId}
            liked={res.liked}
            disliked={res.disliked}
            saved={res.saved}
          />
        ))}
    </div>
  );
}

export default ResponsesDisplay;
