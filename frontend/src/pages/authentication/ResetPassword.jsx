import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Page from "../../components/Page";
import { motion } from "framer-motion";

import { BackgroundCircles } from "../authentication/ForgotPassword";
import Logo from "../../assets/Logo.svg";
import {
  guestContainerLogin,
  guestContainerLoginBox,
  guestContainerLoginSection,
  guestContainerLoginSubsection,
  guestLoginSection,
  guestRoundBlueButton,
} from "../../assets/styles/guest";

// ----------------------------------------------------------------------
const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Reset password data:", data);
    // Logic to handle resetting password goes here
  };

  return (
    <Page title="Reset Password">
      <BackgroundCircles></BackgroundCircles>

      <Typography
        component="a"
        href="/home"
        sx={{
          position: "fixed",
          top: "0.25em",
          right: "0.75em",
          zIndex: 10,
          fontWeight: 600,
          color: "primary.main",
          fontSize: "3.5rem",
          textDecoration: "none",
        }}
      >
        &lt;
      </Typography>

      <Container {...guestContainerLogin}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          }}
          style={guestContainerLoginBox}
        >
          <Box sx={guestContainerLoginSection}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                gap: "0.3em",
              }}
            >
              <Typography variant="h4">Reset your</Typography>
              <Typography
                variant="h1"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Password.
              </Typography>
            </Box>
          </Box>

          <Box sx={guestContainerLoginSection}>

            <Box
              sx={{ ...guestContainerLoginSubsection, alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={Logo}
                  alt="InfoStudia"
                  sx={{ width: "100%", maxWidth: 50 }}
                />
                <Typography
                  variant="h4"
                  sx={{ color: "primary.main", fontWeight: 700 }}
                >
                  Reset Password
                </Typography>
              </Box>
              <Typography sx={guestLoginSection}>
                You have chosen to reset your password.
                <br />
                Make sure you remember your new password.
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} style={guestContainerLoginSubsection}>
                <TextField
                  placeholder="Enter new password"
                  {...register("newPassword")}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: { borderRadius: "2em", fontSize: "0.8rem" },
                  }}
                  label="New password"
                  type="password"
                  error={!!errors.newPassword} // Check if there is an error with the new password
                  helperText={errors.newPassword?.message} // Show error message if any
                  InputLabelProps={{
                    sx: {
                      fontSize: "0.8rem",
                      "&.Mui-focused": { color: "primary.main" },
                    },
                  }}
                />
                <TextField
                  placeholder="Re-enter new password"
                  {...register("confirmPassword")}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: { borderRadius: "2em", fontSize: "0.8rem" },
                  }}
                  label="Re-enter new password"
                  type="password"
                  error={!!errors.confirmPassword} // Check if there is an error with the confirm password
                  helperText={errors.confirmPassword?.message} // Show error message if any
                  InputLabelProps={{
                    sx: {
                      fontSize: "0.8rem",
                      "&.Mui-focused": { color: "primary.main" },
                    },
                  }}
                />

                <Button sx={guestRoundBlueButton} type="submit">
                  Reset password
                </Button>
            </form>

          </Box>

        </motion.div>

      </Container>

    </Page>
  );
}
