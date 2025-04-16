import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import Logo from "../assets/Logo.svg"

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "primary.lighter",
        color: "primary.main",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
        px: "5em"
      }}
    >
      <Toolbar>
        <Box component="img" src={Logo} alt="Logo" sx={{ width: 40, mr: 2}}>
        </Box>
        <Typography sx={{ flexGrow: 1, fontWeight: 700, fontSize: "1.5rem" }}>
          InfoStudia
        </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {["Home", "About", "Contact", "Services"].map((text, index) => (
              <Typography
                key={index}
                component="a"
                href={`/${text.toLowerCase()}`}
                sx={{
                  textDecoration: "none",
                  color: "secondary.darker",
                  fontWeight: 400,
                  mx: 2,
                  fontSize: "1rem",
                  "&:hover": { color: "primary.main" },
                  "&:active": { color: "primary.dark" },
                }}
              >
                {text}
              </Typography>
          ))}
          <Button
            component="a"
            href="/auth/login"
            sx={{
              backgroundColor: "primary.main",
              color: "primary.lighter",
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              py: 1,
              borderRadius: "8px",
              mx: 1.5,
              fontSize: "1rem",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
              "&:hover": { backgroundColor: "primary.lighter", color: "primary.main" }
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}