import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

export default function Footer({}) {
  return (
    <Container maxWidth={false}
        sx={{
            width: "100%",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#407BFF",
            px: "5em", py: "2em",
            display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
    }}>
        <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "primary.lighter" }}>
            © 2025 InfoStudia. All Rights Reserved.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
            <Typography sx={{ color: "primary.lighter", fontSize: "0.8rem" }}>
                Privacy Policy
            </Typography>
            <Typography sx={{ color: "primary.lighter", fontSize: "0.8rem" }}>
                Terms of Service
            </Typography>
            <Typography sx={{ color: "primary.lighter", fontSize: "0.8rem" }}>
                LinkedIn
            </Typography>
            <Typography sx={{ color: "primary.lighter", fontSize: "0.8rem" }}>
                Twitter
            </Typography>
        </Box>
        <Typography sx={{ fontSize: "1rem", color: "primary.lighter", mt: 1 }}>
            v1.0.0
        </Typography>
    </Container>
  )
}