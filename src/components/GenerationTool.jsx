import React, { useState, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import InfoIcon from "@mui/icons-material/Info";
import Select from "react-select";
import { API, graphqlOperation } from "aws-amplify";
import { createResponse as CreateResponse } from "../graphql/mutations";
import { useSelector, useDispatch } from "react-redux";
import { Slider, TextField } from "@mui/material";
import { GenerateButton } from "../constants/muiButtonStyles";
import { problemTextfieldStyle } from "../constants/muiTextfieldStyles";
import { disabled } from "../constants/customStyles";
import customStyles from "../constants/reactSelectCustomStyles";
import CloseIcon from "@mui/icons-material/Close";
import { Puff } from "react-loading-icons";
import {
  primaryAccentColor,
  secondaryAccentColor,
} from "../constants/colorPalette";
import {
  groupifyOptions,
  cognifyOptions,
  technifyOptions,
} from "../constants/supermindMoves";
import { createResponse } from "../actions";
import { v4 as uuidv4 } from "uuid";

import "../css/GenerationTool.css";

function GenerationTool(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const errorRef = useRef(null);

  // eslint-disable-next-line
  const [responses, updateResponses] = useLocalStorage("responses", []);
  const [temperature, updateTemperature] = useState(0.8);
  const [problem, updateProblem] = useState("");
  const [groupify, setGroupify] = useState({ value: "none", label: "None" });
  const [cognify, setCognify] = useState({ value: "none", label: "None" });
  const [technify, setTechnify] = useState({ value: "none", label: "None" });
  const [loading, updateLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onGenerate = async (e) => {
    e.preventDefault();

    if (problem.trim() === "") {
      setErrorMessage("You must input a problem before generating an idea!");
      errorRef.current.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }

    setErrorMessage("");
    updateLoading((prev) => !prev);
    document.body.style.cursor = "wait";
    let singleResponse = null;

    const requestBody = {
      body: {
        problem: problem.trim(),
        groupify: groupify.value,
        cognify: cognify.value,
        technify: technify.value,
        temperature: temperature,
      },
    };
    // console.log(requestBody);
    await API.post("API", "/completion", requestBody)
      .then((res) => {
        updateLoading((prev) => !prev);
        document.body.style.cursor = "default";
        const dateObj = new Date();
        const date = dateObj.toString();
        const id = uuidv4();
        const fullResponse = {
          id,
          problem,
          temperature,
          date,
          userId: user,
          response: res.trim(),
          saved: false,
          groupify: groupify.value,
          cognify: cognify.value,
          technify: technify.value,
          liked: false,
          disliked: false,
          memo: "",
        };
        singleResponse = fullResponse;

        updateResponses((prevArr) => [...prevArr, singleResponse]);
        dispatch(createResponse(singleResponse));
      })
      .catch((err) => console.log(err));

    try {
      // console.log(singleResponse);
      await API.graphql(
        graphqlOperation(CreateResponse, { input: singleResponse })
      );
    } catch (error) {
      console.log("errors", error);
    }
  };

  return (
    <div className="gentool" style={user ? null : disabled}>
      <div className="gentool-section">
        <div className="gentool-section-heading">
          <h2 className="gentool-title">
            Problem Statement
            <span style={{ color: primaryAccentColor }}> *</span>
          </h2>
          <InfoIcon />
        </div>
        <TextField
          id="standard-basic"
          label="I want to..."
          variant="standard"
          sx={problemTextfieldStyle}
          onChange={(e) => updateProblem(e.target.value)}
        />
      </div>
      <div className="gentool-section">
        <div className="gentool-section-heading">
          <h2 className="gentool-title">Superminds Moves</h2>
          <InfoIcon />
        </div>
        <div className="gentool-dropdown-group">
          <span className="gentool-dropdown-label">Groupify</span>
          <Select
            options={groupifyOptions}
            onChange={setGroupify}
            placeholder="select move"
            // isSearchable
            styles={customStyles}
            defaultValue={{ value: "none", label: "None" }}
          />
        </div>
        <div className="gentool-dropdown-group">
          <span className="gentool-dropdown-label">Cognify</span>
          <Select
            options={cognifyOptions}
            onChange={setCognify}
            placeholder="select move"
            // isSearchable
            styles={customStyles}
            defaultValue={{ value: "none", label: "None" }}
          />
        </div>
        <div className="gentool-dropdown-group">
          <span className="gentool-dropdown-label">Technify</span>
          <Select
            options={technifyOptions}
            onChange={setTechnify}
            placeholder="select move"
            // isSearchable
            styles={customStyles}
            defaultValue={{ value: "none", label: "None" }}
          />
        </div>
      </div>
      <div className="gentool-section">
        <div className="gentool-section-heading">
          <h2 className="gentool-title">Creativity</h2>
          <InfoIcon />
        </div>
        <div className="gentool-slider-group">
          <Slider
            aria-label="Small steps"
            step={0.01}
            min={0}
            max={1}
            defaultValue={0.8}
            onChange={(e) => updateTemperature(e.target.value)}
            valueLabelDisplay="auto"
            sx={{
              color: secondaryAccentColor,
              "& .MuiSlider-thumb": {
                backgroundColor: primaryAccentColor,
              },
            }}
          />
        </div>
      </div>
      <div className="gentool-section" style={loading ? disabled : null}>
        <GenerateButton variant="contained" onClick={onGenerate}>
          Generate
        </GenerateButton>
      </div>
      {loading && (
        <div className="gentool-section loading">
          <Puff stroke="#000000" strokeWidth={3} />
        </div>
      )}

      <div className="gentool-section error" ref={errorRef}>
        <span>{errorMessage}</span>
      </div>
      <div
        className="gentool-panel-icon close"
        onClick={() => props.updateShowTool((prev) => !prev)}
      >
        <CloseIcon />
      </div>
    </div>
  );
}

export default GenerationTool;
