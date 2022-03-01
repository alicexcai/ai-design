import { primaryAccentColor, secondaryAccentColor } from './colorPalette';

export const problemTextfieldStyle = {
  width: '100%',
  marginTop: '24px',
  '& .MuiInput-input': {
    color: primaryAccentColor,
    fontWeight: '500',
  },
  '& label': {
    fontWeight: '600',
    color: secondaryAccentColor,
  },
  '& label.Mui-focused': {
    color: primaryAccentColor,
  },
  '& .css-1480iag-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before':
    { borderBottom: `2px solid ${primaryAccentColor}` },
  '& .css-1480iag-MuiInputBase-root-MuiInput-root:before': {
    borderBottom: `2px solid ${secondaryAccentColor}`,
  },
  '& .css-1480iag-MuiInputBase-root-MuiInput-root:after': {
    borderBottom: `3px solid ${primaryAccentColor}`,
  },
  '& .css-1wt0ykv:hover:not(.Mui-disabled)::before': {
    borderBottom: `2px solid ${primaryAccentColor}`,
  },
  '& .css-1wt0ykv::before': {
    borderBottom: `2px solid ${secondaryAccentColor}`,
  },
  '& .css-1wt0ykv::after': {
    borderBottom: `3px solid ${primaryAccentColor}`,
  },
};
