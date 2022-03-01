import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const ToggleSwitch = styled(Switch)({
  "& .MuiSwitch-track": {
    backgroundColor: "#062542",
  },
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      color: "#ecb365",
      "& + .MuiSwitch-track": {
        backgroundColor: "#062542",
      },
    },
  },
});
