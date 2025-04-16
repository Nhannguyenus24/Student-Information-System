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
  Switch,
  FormControlLabel,
  Input,
  Autocomplete,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import ImageIcon from "@mui/icons-material/Image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function CourseAddingPage() {
  // Course basic info
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [credits, setCredits] = useState(3);
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  // Course schedule
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseCapacity, setCourseCapacity] = useState(30);
  const [courseDuration, setCourseDuration] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState("");

  // Course pricing and status
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [courseLevel, setCourseLevel] = useState("beginner");

  // Instructors
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // Form state
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 1000;

  // Mock data for demonstration
  const mockInstructors = [
    { id: 1, name: "Dr. Jane Smith", department: "Computer Science" },
    { id: 2, name: "Prof. John Davis", department: "Mathematics" },
    { id: 3, name: "Dr. Robert Johnson", department: "Engineering" },
    { id: 4, name: "Prof. Sarah Wilson", department: "Business" },
    { id: 5, name: "Dr. Michael Brown", department: "Physics" },
  ];

  const departments = [
    "Computer Science",
    "Mathematics",
    "Engineering",
    "Business",
    "Physics",
    "Chemistry",
    "Biology",
    "Arts",
    "Humanities",
    "Social Sciences",
  ];

  // Handlers
  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setCourseDescription(text);
    setCharCount(text.length);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstructorAdd = () => {
    if (
      selectedInstructor &&
      !instructors.some((i) => i.id === selectedInstructor.id)
    ) {
      setInstructors([...instructors, selectedInstructor]);
      setSelectedInstructor(null);
    }
  };

  const handleRemoveInstructor = (instructorId) => {
    setInstructors(
      instructors.filter((instructor) => instructor.id !== instructorId)
    );
  };

  const handleClearForm = () => {
    setCourseTitle("");
    setCourseCode("");
    setCourseDescription("");
    setDepartment("");
    setCredits(3);
    setCourseThumbnail(null);
    setThumbnailPreview("");
    setStartDate("");
    setEndDate("");
    setCourseCapacity(30);
    setCourseDuration("");
    setIsOnline(false);
    setLocation("");
    setPrice("");
    setIsActive(true);
    setCourseLevel("beginner");
    setInstructors([]);
    setSelectedInstructor(null);
    setCharCount(0);
  };

  const handleSubmit = () => {
    // Validate form
    if (!courseTitle.trim()) {
      setSnackbarMessage("Please provide a course title");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    if (!courseCode.trim()) {
      setSnackbarMessage("Please provide a course code");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    if (!department) {
      setSnackbarMessage("Please select a department");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    // Here you would actually save the course
    console.log({
      courseTitle,
      courseCode,
      courseDescription,
      department,
      credits,
      courseThumbnail,
      startDate,
      endDate,
      courseCapacity,
      courseDuration,
      isOnline,
      location,
      price,
      isActive,
      courseLevel,
      instructors,
    });

    setSnackbarMessage("Course added successfully!");
    setSnackbarSeverity("success");
    setShowSnackbar(true);
    handleClearForm();
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const getLevelColor = () => {
    switch (courseLevel) {
      case "advanced":
        return "error";
      case "intermediate":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <Page title="Add New Course">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 1200,
          mx: "auto",
          mt: 3,
          mb: 5,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <SchoolIcon sx={{ mr: 2, color: "primary.main", fontSize: 32 }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Add New Course
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Course Basic Information */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          Course Information
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="course-title"
              label="Course Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              variant="outlined"
              placeholder="Enter the course title"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              required
              fullWidth
              id="course-code"
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              variant="outlined"
              placeholder="e.g. CS101"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="credits-label">Credits</InputLabel>
              <Select
                labelId="credits-label"
                id="credits-select"
                value={credits}
                label="Credits"
                onChange={(e) => setCredits(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value} {value === 1 ? "Credit" : "Credits"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                id="department-select"
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="level-label">Course Level</InputLabel>
              <Select
                labelId="level-label"
                id="level-select"
                value={courseLevel}
                label="Course Level"
                onChange={(e) => setCourseLevel(e.target.value)}
              >
                <MenuItem value="beginner">
                  <Chip
                    size="small"
                    label="Beginner"
                    color="success"
                    sx={{ mr: 1 }}
                  />{" "}
                  Beginner
                </MenuItem>
                <MenuItem value="intermediate">
                  <Chip
                    size="small"
                    label="Intermediate"
                    color="warning"
                    sx={{ mr: 1 }}
                  />{" "}
                  Intermediate
                </MenuItem>
                <MenuItem value="advanced">
                  <Chip
                    size="small"
                    label="Advanced"
                    color="error"
                    sx={{ mr: 1 }}
                  />{" "}
                  Advanced
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="course-description"
              label="Course Description"
              multiline
              rows={6}
              value={courseDescription}
              onChange={handleDescriptionChange}
              variant="outlined"
              placeholder="Enter a detailed description of the course..."
              helperText={`${charCount}/${maxCharCount} characters`}
              error={charCount > maxCharCount}
              FormHelperTextProps={{
                sx: {
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: 0,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Course Thumbnail
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<ImageIcon />}
                  sx={{ mr: 2 }}
                >
                  Upload Image
                  <Input
                    type="file"
                    sx={{ display: "none" }}
                    onChange={handleThumbnailChange}
                    accept="image/*"
                  />
                </Button>
                {thumbnailPreview && (
                  <Box sx={{ ml: 2 }}>
                    <img
                      src={thumbnailPreview}
                      alt="Course thumbnail preview"
                      style={{
                        maxHeight: "100px",
                        maxWidth: "150px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                )}
                {!thumbnailPreview && (
                  <Typography variant="body2" color="textSecondary">
                    No image selected
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Course Schedule and Location */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          <CalendarMonthIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Schedule and Location
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="start-date"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="end-date"
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="course-capacity"
              label="Capacity"
              type="number"
              value={courseCapacity}
              onChange={(e) => setCourseCapacity(e.target.value)}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="course-duration"
              label="Duration (weeks)"
              type="number"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                  color="primary"
                />
              }
              label="Online Course"
              sx={{ mb: 1 }}
            />
            {!isOnline && (
              <TextField
                fullWidth
                id="location"
                label="Classroom Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
                placeholder="Building and Room Number"
              />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="course-price"
              label="Course Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: <AttachMoneyIcon color="action" />,
                inputProps: { min: 0 },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  color="primary"
                />
              }
              label={isActive ? "Course is Active" : "Course is Inactive"}
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Course Instructors */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          <PersonAddIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Course Instructors
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Autocomplete
              id="instructors-autocomplete"
              options={mockInstructors}
              getOptionLabel={(option) =>
                `${option.name} (${option.department})`
              }
              value={selectedInstructor}
              onChange={(e, newValue) => {
                setSelectedInstructor(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Instructor"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              onClick={handleInstructorAdd}
              startIcon={<PersonAddIcon />}
              disabled={!selectedInstructor}
              fullWidth
              sx={{ height: "56px" }}
            >
              Add Instructor
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 1 }}>
              {instructors.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No instructors added yet
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {instructors.map((instructor) => (
                    <Chip
                      key={instructor.id}
                      label={`${instructor.name} (${instructor.department})`}
                      onDelete={() => handleRemoveInstructor(instructor.id)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

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
            disabled={!courseTitle.trim() || !courseCode.trim() || !department}
          >
            Save Course
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
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