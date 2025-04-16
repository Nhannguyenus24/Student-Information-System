import { pxToRem, responsiveFontSizes } from '../utils/getFontValue';

// ----------------------------------------------------------------------

const FONT_PRIMARY = "'Poppins', 'Montserrat', 'sans-serif'"; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

const typography = {

  fontFamily: FONT_PRIMARY,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  fontWeightExtraBold: 700,

  h1: {
    fontWeight: 600,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    letterSpacing: 2,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    display: "block",
  },

  h2: {
    fontWeight: 600,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    display: "block",
  },

  h3: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: "1.8rem",
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    display: "block",
  },

  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: "1.5rem",
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    display: "block",
  },

  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: "1.2rem",
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    display: "block",
  },

  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: "1rem",
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    display: "block",
  },

  subtitle1: { 
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: "1rem",
    display: "block",
  },

  subtitle2: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: "1.4rem",
  },

  subtitlecard1: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: "1.2rem",
    display: "block"
  },

  subtitlecard2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: "1.2rem",
    display: "block",
  },

  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    display: "block",
  },

  body2: {
    lineHeight: 22 / 14,
    fontSize: "1.2rem",
    display: "block",
  },

  body3: {
    lineHeight: 22 / 14,
    fontSize: "1rem",
    display: "block",
  },

  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },

  notification: {
    lineHeight: 1.5,
    fontSize: "0.9rem",
  },

  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },

  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },

};

export default typography;
