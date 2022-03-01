import React, { useState, useEffect } from "react";
import * as queries from "../graphql/queries";
import { API } from "aws-amplify";
import { useSelector } from "react-redux";
import Response from "../components/Response";
import { Grid } from "react-loading-icons";
import DirectoryQuery from "../components/DirectoryQuery";
import { CSVLink } from "react-csv";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../css/Directory.css";

function Directory() {
  const userId = useSelector((state) => state.user);

  const [loading, updateLoading] = useState(false);
  const [responses, updateResponses] = useState([]);

  const headers = [
    { label: "Problem", key: "problem" },
    { label: "GPT-3 Output", key: "response" },
    { label: "Groupify", key: "groupify" },
    { label: "Cognify", key: "cognify" },
    { label: "Technify", key: "technify" },
    { label: "Temperature", key: "temperature" },
    { label: "Liked", key: "liked" },
    { label: "Disliked", key: "disliked" },
    { label: "Bookmarked", key: "saved" },
    { label: "Generated On", key: "date" },
  ];

  useEffect(() => {
    if (userId) {
      fetchResponses({
        groupifyFilter: null,
        cognifyFilter: null,
        technifyFilter: null,
        bookmarkedFilter: null,
        votesFilter: null,
      });
    }
    //eslint-disable-next-line
  }, [userId]);

  async function fetchResponses(query) {
    // console.log(query);
    updateResponses([]);
    updateLoading((prev) => !prev);

    let filter = {};

    if (query.groupifyFilter) {
      filter["groupify"] = { eq: query.groupifyFilter };
    }
    if (query.cognifyFilter) {
      filter["cognify"] = { eq: query.cognifyFilter };
    }
    if (query.technifyFilter) {
      filter["technify"] = { eq: query.technifyFilter };
    }
    if (query.bookmarkedFilter === true) {
      filter["saved"] = { eq: true };
    }
    if (query.bookmarkedFilter === false) {
      filter["saved"] = { eq: false };
    }
    if (query.votesFilter === true) {
      filter["liked"] = { eq: true };
    }
    if (query.votesFilter === false) {
      filter["disliked"] = { eq: true };
    }
    if (query.votesFilter === "neither") {
      filter["liked"] = { eq: false };
      filter["disliked"] = { eq: false };
    }
    if (!query.showAllUsersFilter) {
      filter["userId"] = { eq: userId };
    } else {
      filter["userId"] = { ne: userId };
    }
    if (query.temperatureFilter) {
      filter["temperature"] = {
        between: query.temperatureFilter,
      };
    }

    console.log(filter);

    var nextToken = null;

    try {
      var items = [];
      const responsesData = await API.graphql({
        query: queries.listResponses,
        variables: {
          filter: filter,
        },
      });
      // console.log(responsesData);
      items = responsesData.data.listResponses.items;
      if (responsesData.data.listResponses.nextToken) {
        nextToken = responsesData.data.listResponses.nextToken;
      }
      while (nextToken) {
        try {
          const responsesData = await API.graphql({
            query: queries.listResponses,
            variables: {
              filter: filter,
              nextToken,
            },
          });
          if (responsesData.data.listResponses.nextToken) {
            nextToken = responsesData.data.listResponses.nextToken;
          } else {
            nextToken = null;
          }
          for (let item of responsesData.data.listResponses.items) {
            items.push(item);
          }
        } catch (error) {
          console.log("error: ", error);
        }
      }
      updateResponses(
        items.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      updateLoading((prev) => !prev);
      console.log(items);
    } catch (error) {
      console.log("error", error);
      updateLoading((prev) => !prev);
    }
  }

  return (
    <>
      <div className="directory">
        {loading ? (
          <div className="loading-container">
            <Grid height="20px" width="20px" fill="#ecb365" />
          </div>
        ) : (
          <>
            <div className="directory-query-container">
              <DirectoryQuery fetchResponses={fetchResponses} />
            </div>
            <div className="directory-results-count-container">
              <span className="directory-results-count">
                Showing {responses.length} results.
              </span>
              <CSVLink
                data={responses}
                headers={headers}
                filename={"responses.csv"}
              >
                <span className="directory-results-download-csv hover-underline-animation">
                  Download CSV File
                </span>
              </CSVLink>
            </div>
          </>
        )}
        {responses.map((res, idx) => (
          <Response
            key={idx}
            generatedOn={res.date}
            prompt={res.problem}
            response={res.response}
            cognify={res.cognify}
            groupify={res.groupify}
            technify={res.technify}
            temperature={res.temperature}
            saved={res.saved}
            id={res.id}
            disliked={res.disliked}
            liked={res.liked}
            // memo={res.memo}
            userId={res.userId}
          />
        ))}
      </div>
    </>
  );
}

export default Directory;
