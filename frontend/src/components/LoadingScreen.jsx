import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "120px",
  gap: "40px", // Adjust spacing between icons
}));

// ----------------------------------------------------------------------

export default function LoadingScreen({ ...other }) {
  return (
    <>
      {!false && (
        <RootStyle {...other}>
          <IconWrapper>
            {/* Book icon animation */}
            <Box
              component={m.div}
              animate={{
                y: [0, -30, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                ease: "easeInOut",
                duration: 1.5,
                repeat: Infinity,
                delay: 0,
              }}
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: "50px",
              }}
            >
              <MenuBookIcon fontSize="inherit" />
            </Box>

            {/* Graduation cap animation */}
            <Box
              component={m.div}
              animate={{
                y: [0, -30, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                ease: "easeInOut",
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5,
              }}
              sx={{
                color: (theme) => theme.palette.secondary.main,
                fontSize: "50px",
              }}
            >
              <SchoolIcon fontSize="inherit" />
            </Box>

            {/* Light bulb animation */}
            <Box
              component={m.div}
              animate={{
                y: [0, -30, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                ease: "easeInOut",
                duration: 1.5,
                repeat: Infinity,
                delay: 1,
              }}
              sx={{
                color: (theme) => theme.palette.warning.main,
                fontSize: "50px",
              }}
            >
              <EmojiObjectsIcon fontSize="inherit" />
            </Box>
          </IconWrapper>

          {/* Loading text */}
          <Box
            component={m.div}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              ease: "linear",
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Typography variant="h4" color="primary.main">
              Loading Your Learning Space...
            </Typography>
          </Box>
        </RootStyle>
      )}
    </>
  );
}