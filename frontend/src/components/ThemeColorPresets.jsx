import PropTypes from 'prop-types';
import { useMemo } from 'react';
// @mui
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
// ----------------------------------------------------------------------

ThemeColorPresets.propTypes = {
  children: PropTypes.node,
};

export default function ThemeColorPresets({ children }) {
  const defaultTheme = useTheme();
  const { setColor } = useSettings();

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: setColor,
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`,
      },
    }),
    [setColor, defaultTheme]
  );

  const theme = createTheme(themeOptions);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
