import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Slider from "@mui/material/Slider";
import Select from "react-select";
import customStyles from "../constants/reactSelectCustomStyles";
import {
  groupifyOptions,
  cognifyOptions,
  technifyOptions,
} from "../constants/supermindMoves";
import { bookmarkedOptions, votesOptions } from "../constants/queryOptions";
import { SearchButton } from "../constants/muiButtonStyles";
import { ToggleSwitch } from "../constants/muiSwitchStyles";
import { useSelector } from "react-redux";
import {
  primaryAccentColor,
  secondaryAccentColor,
} from "../constants/colorPalette";

import "../css/Directory.css";

function DirectoryQuery(props) {
  const admin = useSelector((state) => state.admin);

  const [showFilterMenu, updateShowFilterMenu] = useState(false);
  const [groupifyFilter, setGroupifyFilter] = useState({
    value: null,
    label: "None",
  });
  const [cognifyFilter, setCognifyFilter] = useState({
    value: null,
    label: "None",
  });
  const [technifyFilter, setTechnifyFilter] = useState({
    value: null,
    label: "None",
  });
  const [bookmarkedFilter, setBookmarkedFilter] = useState({
    value: null,
    label: "None",
  });
  const [votesFilter, setVotesFilter] = useState({
    value: null,
    label: "None",
  });
  const [showAllUsersFilter, setShowAllUsersFilter] = useState(false);
  const [temperatureFilter, setTemperatureFilter] = useState([0, 1]);

  const handleSearch = () => {
    const filter = {
      groupifyFilter: groupifyFilter.value,
      cognifyFilter: cognifyFilter.value,
      technifyFilter: technifyFilter.value,
      bookmarkedFilter: bookmarkedFilter.value,
      votesFilter: votesFilter.value,
      temperatureFilter,
    };
    if (admin) {
      filter["showAllUsersFilter"] = showAllUsersFilter;
    }
    props.fetchResponses(filter);
  };

  return (
    <>
      <div
        className="directory-query-title"
        onClick={() => updateShowFilterMenu((prev) => !prev)}
      >
        <h1>Filters</h1>
        <div className="directory-query-expand">
          {showFilterMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
      </div>
      <div
        className="directoy-query-options-container"
        style={showFilterMenu ? null : { display: "none" }}
      >
        <div className="directory-query-options-group">
          <div className="directory-query-options">
            <span className="directory-query-label">Groupify</span>
            <Select
              options={groupifyOptions}
              onChange={setGroupifyFilter}
              placeholder="select options"
              styles={customStyles}
              defaultValue={{ value: "none", label: "None" }}
            />
          </div>
          <div className="directory-query-options">
            <span className="directory-query-label">Bookmarked</span>
            <Select
              options={bookmarkedOptions}
              onChange={setBookmarkedFilter}
              placeholder="select options"
              styles={customStyles}
              defaultValue={{ value: "none", label: "None" }}
            />
          </div>
        </div>
        <div className="directory-query-options-group">
          <div className="directory-query-options">
            <span className="directory-query-label">Cognify</span>
            <Select
              options={cognifyOptions}
              onChange={setCognifyFilter}
              placeholder="select options"
              styles={customStyles}
              defaultValue={{ value: "none", label: "None" }}
            />
          </div>
          <div className="directory-query-options">
            <span className="directory-query-label">Votes</span>
            <Select
              options={votesOptions}
              onChange={setVotesFilter}
              placeholder="select options"
              styles={customStyles}
              defaultValue={{ value: "none", label: "None" }}
            />
          </div>
        </div>
        <div className="directory-query-options-group">
          <div className="directory-query-options">
            <span className="directory-query-label">Technify</span>
            <Select
              options={technifyOptions}
              onChange={setTechnifyFilter}
              placeholder="select options"
              styles={customStyles}
              defaultValue={{ value: "none", label: "None" }}
            />
          </div>
          {admin && (
            <div className="directory-query-options">
              <span className="directory-query-label">View Other Users</span>
              <ToggleSwitch
                onChange={() => setShowAllUsersFilter((prev) => !prev)}
              />
            </div>
          )}
        </div>
        <div className="directory-query-options-group">
          <div className="directory-query-options">
            <span className="directory-query-label">Creativity</span>
            <Slider
              step={0.01}
              min={0}
              max={1}
              value={temperatureFilter}
              onChange={(e, newValue) => setTemperatureFilter(newValue)}
              valueLabelDisplay="auto"
              sx={{
                width: "175px",
                height: "6px",
                color: secondaryAccentColor,
                "& .MuiSlider-thumb": {
                  backgroundColor: primaryAccentColor,
                },
                "& .MuiSlider-track": {
                  backgroundColor: primaryAccentColor,
                },
              }}
            />
          </div>
        </div>
        <div className="directory-query-options-group last">
          <div className="directory-query-options">
            <SearchButton variant="contained" onClick={handleSearch}>
              Search
            </SearchButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default DirectoryQuery;
