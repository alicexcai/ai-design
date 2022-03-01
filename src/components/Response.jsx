import React, { useState, useEffect } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { primaryAccentColor } from "../constants/colorPalette";
import Tooltip from "@mui/material/Tooltip";
import * as mutations from "../graphql/mutations";
import { API } from "aws-amplify";
import { useSelector } from "react-redux";
import { disabled } from "../constants/customStyles";
import { capitalize } from "../functions/capitalize";

import "../css/Response.css";

function Response({
  generatedOn,
  prompt,
  response,
  groupify,
  cognify,
  technify,
  temperature,
  saved,
  id,
  liked,
  disliked,
  userId,
  // memo,
}) {
  const user = useSelector((state) => state.user);

  const [bookmark, updateBookmark] = useState(saved);
  const [like, updateLike] = useState(liked);
  const [dislike, updateDislike] = useState(disliked);

  // useEffect(() => {
  //   console.log({
  //     bookmark,
  //     like,
  //     dislike,
  //   });
  // }, [bookmark, like, dislike]);

  useEffect(() => {
    // console.log(user);
    // console.log(userId);
    updateBookmark(saved);
    updateLike(liked);
    updateDislike(disliked);
  }, [saved, liked, disliked]);

  async function onLike() {
    if (user !== userId) return;
    if (dislike) {
      onDislike();
    }
    updateLike((prev) => !prev);
    const responseDetails = {
      id,
      liked: !like,
    };
    try {
      const result = await API.graphql({
        query: mutations.updateResponse,
        variables: {
          input: responseDetails,
        },
      });
      let responses = JSON.parse(localStorage.getItem("responses"));
      for (let response of responses) {
        if (response.id === id) {
          response.liked = !like;
        }
      }
      localStorage.setItem("responses", JSON.stringify(responses));
      console.log(result);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function onDislike() {
    if (user !== userId) return;
    if (like) {
      onLike();
    }
    updateDislike((prev) => !prev);
    const responseDetails = {
      id,
      disliked: !dislike,
    };
    try {
      const result = await API.graphql({
        query: mutations.updateResponse,
        variables: {
          input: responseDetails,
        },
      });
      let responses = JSON.parse(localStorage.getItem("responses"));
      for (let response of responses) {
        if (response.id === id) {
          response.disliked = !dislike;
        }
      }
      localStorage.setItem("responses", JSON.stringify(responses));
      console.log(result);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function onBookmark(e) {
    if (user !== userId) return;
    e.preventDefault();
    updateBookmark((prev) => !prev);
    console.log("clicked");
    const responseDetails = {
      id,
      saved: !bookmark,
    };
    try {
      const result = await API.graphql({
        query: mutations.updateResponse,
        variables: {
          input: responseDetails,
        },
      });
      let responses = JSON.parse(localStorage.getItem("responses"));
      for (let response of responses) {
        if (response.id === id) {
          response.saved = !bookmark;
        }
      }
      localStorage.setItem("responses", JSON.stringify(responses));
      console.log(result);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <div className="response">
      <div className="response-subcontainer first">
        <span className="response-label">Generated On: </span>
        <p className="response-text">
          {new Date(generatedOn).toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          }) +
            ", " +
            new Date(generatedOn)
              .toLocaleTimeString()
              .replace(/(.*)\D\d+/, "$1") +
            " " +
            new Date(generatedOn)
              .toLocaleTimeString("en-us", { timeZoneName: "short" })
              .split(" ")[2]}
        </p>
      </div>
      <div className="response-subcontainer">
        <span className="response-label">Prompt: </span>
        <p className="response-text">{prompt}</p>
      </div>
      {groupify && (
        <div className="response-subcontainer">
          <span className="response-label">Groupify: </span>
          <p className="response-text">{capitalize(groupify)}</p>
        </div>
      )}
      {cognify && (
        <div className="response-subcontainer">
          <span className="response-label">Cognify: </span>
          <p className="response-text">{capitalize(cognify)}</p>
        </div>
      )}
      {technify && (
        <div className="response-subcontainer">
          <span className="response-label">Technify: </span>
          <p className="response-text">{capitalize(technify)}</p>
        </div>
      )}
      {temperature && (
        <div className="response-subcontainer">
          <span className="response-label">Creativity: </span>
          <p className="response-text">{temperature}</p>
        </div>
      )}
      <div className="response-subcontainer last">
        <span className="response-label">Response: </span>
        <pre className="response-text">{response}</pre>
      </div>
      <div className="response-actions">
        <div
          className="response-icons thumbs-up"
          style={user === userId ? null : disabled}
        >
          <Tooltip title="Like" placement="top-end">
            <ThumbUpIcon
              style={{
                color: like ? primaryAccentColor : "#ffffff",
              }}
              onClick={onLike}
            />
          </Tooltip>
        </div>
        <div
          className="response-icons thumbs-down"
          style={user === userId ? null : disabled}
        >
          <Tooltip title="Dislike" placement="top-end">
            <ThumbDownIcon
              style={{
                color: dislike ? primaryAccentColor : "#ffffff",
              }}
              onClick={onDislike}
            />
          </Tooltip>
        </div>
        <div
          className="response-icons bookmark"
          style={user === userId ? null : disabled}
        >
          <Tooltip title="Bookmark" placement="top-end">
            <BookmarkIcon
              style={{
                color: bookmark ? primaryAccentColor : "#ffffff",
              }}
              onClick={onBookmark}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Response;
