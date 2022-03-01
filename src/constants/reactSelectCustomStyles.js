const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#062542" : "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: state.isFocused ? "#062542" : null,
  }),
  control: (provided, state) => ({
    ...provided,
    width: "175px",
    height: "36px",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#04293a",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#062542",
    fontWeight: "600",
  }),
};

export default customStyles;
