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
  Autocomplete,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import {
  subjects,
  degrees,
  designations,
  departments,
} from "../mockdata/teacherAddingField";

export default function AddTeacherPage() {
  // Personal Information
  const [photoPreview, setPhotoPreview] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  // Professional Details
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [employmentType, setEmploymentType] = useState("full-time");
  const [employmentStatus, setEmploymentStatus] = useState("active");
  const [salary, setSalary] = useState("");

  // Academic Information
  const [highestDegree, setHighestDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [teachingSubjects, setTeachingSubjects] = useState([]);

  // Contact Information
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

    if (!employeeId.trim()) {
      setSnackbarMessage("Please provide an employee ID");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }
    // API CALLING LOGIC HERE
    console.log("abcde");

    setSnackbarMessage("Teacher added successfully!");
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
    setEmployeeId("");
    setDepartment("");
    setDesignation("");
    setEmploymentType("full-time");
    setEmploymentStatus("active");
    setSalary("");
    setHighestDegree("");
    setUniversity("");
    setTeachingSubjects([]);
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
  };

  return (
    <Page title="Add Teacher">
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
          <WorkIcon sx={{ mr: 2, color: "primary.main", fontSize: 32 }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Add New Teacher
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
                <MenuItem value="non-binary">Non-binary</MenuItem>
                <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Professional Details  */}
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 500, color: "primary.main" }}
        >
          <WorkIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Professional Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="employee-id"
              label="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                id="department-select"
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((deptOption) => (
                  <MenuItem key={deptOption} value={deptOption}>
                    {deptOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="designation-label">Designation</InputLabel>
              <Select
                labelId="designation-label"
                id="designation-select"
                value={designation}
                label="Designation"
                onChange={(e) => setDesignation(e.target.value)}
              >
                {designations.map((desOption) => (
                  <MenuItem key={desOption} value={desOption}>
                    {desOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="employment-type-label">
                Employment Type
              </InputLabel>
              <Select
                labelId="employment-type-label"
                id="employment-type-select"
                value={employmentType}
                label="Employment Type"
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="visiting">Visiting</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="employment-status-label">Status</InputLabel>
              <Select
                labelId="employment-status-label"
                id="employment-status-select"
                value={employmentStatus}
                label="Status"
                onChange={(e) => setEmploymentStatus(e.target.value)}
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
                <MenuItem value="on-leave">
                  <Chip
                    size="small"
                    label="On Leave"
                    color="warning"
                    sx={{ mr: 1 }}
                  />{" "}
                  On Leave
                </MenuItem>
                <MenuItem value="terminated">
                  <Chip
                    size="small"
                    label="Terminated"
                    color="error"
                    sx={{ mr: 1 }}
                  />{" "}
                  Terminated
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="salary"
              label="Annual Salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
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
            <FormControl fullWidth>
              <InputLabel id="highest-degree-label">Highest Degree</InputLabel>
              <Select
                labelId="highest-degree-label"
                id="highest-degree-select"
                value={highestDegree}
                label="Highest Degree"
                onChange={(e) => setHighestDegree(e.target.value)}
              >
                {degrees.map((degreeOption) => (
                  <MenuItem key={degreeOption} value={degreeOption}>
                    {degreeOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="university"
              label="University/Institution"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="teaching-subjects"
              options={subjects}
              value={teachingSubjects}
              onChange={(e, newValue) => setTeachingSubjects(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Teaching Subjects"
                  placeholder="Select subjects"
                  variant="outlined"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))
              }
            />
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
              !employeeId.trim()
            }
          >
            Save Teacher
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