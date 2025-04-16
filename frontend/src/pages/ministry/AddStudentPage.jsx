"use client";
import React, { useState } from "react";
import Page from "../../components/Page";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Input,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { academicYears, majors } from "../mockdata/studentField";

export default function AddStudentPage() {
  //personal info
  const [photoPreview, setPhotoPreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  //academic info
  const [studentId, setStudentId] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [major, setMajor] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [enrollmentStatus, setEnrollmentStatus] = useState("active");

  //contact info
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = () => {
    // Basic validation
    if (!firstName.trim() || !lastName.trim()) {
      setSnackbarMessage("Please provide first and last name");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    if (!validateEmail(email)) {
      setSnackbarMessage("Please provide a valid email address");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    if (!studentId.trim()) {
      setSnackbarMessage("Please provide a student ID");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    // API CALLING LOGIC HERE
    console.log({ firstName });

    setSnackbarMessage("Student added successfully!");
    setSnackbarSeverity("success");
    setShowSnackbar(true);
    handleClearForm();
  };

  const handleClearForm = () => {
    setPhotoPreview(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDateOfBirth("");
    setGender("");
    setStudentId("");
    setEnrollmentDate("");
    setMajor("");
    setAcademicYear("");
    setEnrollmentStatus("active");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
  };

  return (
    <Page title="Add Student">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 1200,
          mx: "auto",
          mt: 4,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <PersonAddIcon sx={{ mr: 2, color: "primary.main", fontSize: 32 }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Add New Student
          </Typography>
        </Box>

        {/* Profile picture  */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={photoPreview}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.light",
              }}
            >
              {!photoPreview && <PersonAddIcon sx={{ fontSize: 60 }} />}
            </Avatar>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
              size="small"
            >
              Upload Photo
              <Input
                type="file"
                sx={{ display: "none" }}
                onChange={handlePhotoChange}
                accept="image/*"
              />
            </Button>
          </Box>
        </Box>

        {/* Personal Info  */}
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 500, color: "primary.main" }}
        >
          <ContactMailIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Personal Information
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="first-name"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="last-name"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              error={email && !validateEmail(email)}
              helperText={
                email && !validateEmail(email)
                  ? "Enter a valid email address"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="date-of-birth"
              label="Date of Birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender-select"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Academic info  */}
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 500, color: "primary.main" }}
        >
          <SchoolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Academic Information
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="student-id"
              label="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="enrollment-date"
              label="Enrollment Date"
              type="date"
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="major-label">Major</InputLabel>
              <Select
                labelId="major-label"
                id="major-select"
                value={major}
                label="Major"
                onChange={(e) => setMajor(e.target.value)}
              >
                {majors.map((majorOption) => (
                  <MenuItem key={majorOption} value={majorOption}>
                    {majorOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="academic-year-label">Academic Year</InputLabel>
              <Select
                labelId="academic-year-label"
                id="academic-year-select"
                value={academicYear}
                label="Academic Year"
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                {academicYears.map((yearOption) => (
                  <MenuItem key={yearOption} value={yearOption}>
                    {yearOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="enrollment-status-label">
                Enrollment Status
              </InputLabel>
              <Select
                labelId="enrollment-status-label"
                id="enrollment-status-select"
                value={enrollmentStatus}
                label="Enrollment Status"
                onChange={(e) => setEnrollmentStatus(e.target.value)}
              >
                <MenuItem value="active">
                  <Chip
                    size="small"
                    label="Active"
                    color="success"
                    sx={{ mr: 1 }}
                  />{" "}
                  Active
                </MenuItem>
                <MenuItem value="inactive">
                  <Chip
                    size="small"
                    label="Inactive"
                    color="error"
                    sx={{ mr: 1 }}
                  />{" "}
                  Inactive
                </MenuItem>
                <MenuItem value="suspended">
                  <Chip
                    size="small"
                    label="Suspended"
                    color="warning"
                    sx={{ mr: 1 }}
                  />{" "}
                  Suspended
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Contact Info */}
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 500, color: "primary.main" }}
        >
          <HomeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Contact Information
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              label="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="city"
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="state"
              label="State/Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="country"
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Submit */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearForm}
            startIcon={<ClearIcon />}
          >
            Clear Form
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            endIcon={<SaveIcon />}
            disabled={
              !firstName.trim() ||
              !lastName.trim() ||
              !validateEmail(email) ||
              !studentId.trim()
            }
          >
            Save Student
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Page>
  );
}
