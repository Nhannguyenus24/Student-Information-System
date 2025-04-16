"use client";

import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Divider,
  styled,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import GradeIcon from "@mui/icons-material/Grade";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/Page";

const drawerWidth = 10;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Sample data for the summary cards
const summaryData = {
  totalCredits: 120,
  completedCredits: 85,
  gpa: 3.75,
  totalCourses: 40,
  completedCourses: 28,
  currentSemester: "S1-2024-2025",
};

// Student profile data
const studentProfile = {
  id: "ST12345",
  name: "John Doe",
  dob: "January 15, 2000",
  gender: "Male",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 University Ave, College Town, CT 12345",
  program: "Bachelor of Science in Computer Science",
  enrollmentYear: "2022",
  expectedGraduation: "2026",
  status: "Active",
  advisor: "Dr. Sarah Johnson",
};

// Enhanced student scores data with more realistic values and status
const studentScores = [
  {
    semester: "S1-2023-2024",
    subjectId: "CS101",
    name: "Introduction to Programming",
    credit: 3,
    class: "CS-A1",
    midterm: 85,
    practice: 90,
    bonus: 5,
    final: 88,
    overall: "A",
    note: "Passed",
    status: "passed",
  },
  {
    semester: "S1-2023-2024",
    subjectId: "MATH201",
    name: "Calculus I",
    credit: 4,
    class: "M-B2",
    midterm: 75,
    practice: 80,
    bonus: 3,
    final: 78,
    overall: "B+",
    note: "Passed",
    status: "passed",
  },
  {
    semester: "S1-2023-2024",
    subjectId: "ENG102",
    name: "Academic English",
    credit: 2,
    class: "E-C3",
    midterm: 65,
    practice: 70,
    bonus: 2,
    final: 68,
    overall: "C+",
    note: "Passed",
    status: "passed",
  },
  {
    semester: "S2-2023-2024",
    subjectId: "CS201",
    name: "Data Structures",
    credit: 3,
    class: "CS-A2",
    midterm: 55,
    practice: 60,
    bonus: 0,
    final: 58,
    overall: "D",
    note: "Retake Required",
    status: "failed",
  },
  {
    semester: "S2-2023-2024",
    subjectId: "PHYS101",
    name: "Physics for Computer Science",
    credit: 3,
    class: "P-A1",
    midterm: 92,
    practice: 95,
    bonus: 5,
    final: 94,
    overall: "A+",
    note: "Excellent",
    status: "passed",
  },
];

// Subject scores data
const subjectScoresData = [
  {
    subjectId: "CS101",
    name: "Introduction to Programming",
    assessments: [
      {
        name: "Quiz 1",
        score: 85,
        maxScore: 100,
        weight: 10,
        date: "2023-09-15",
      },
      {
        name: "Assignment 1",
        score: 92,
        maxScore: 100,
        weight: 15,
        date: "2023-09-25",
      },
      {
        name: "Midterm Exam",
        score: 88,
        maxScore: 100,
        weight: 30,
        date: "2023-10-20",
      },
      {
        name: "Project",
        score: 95,
        maxScore: 100,
        weight: 20,
        date: "2023-11-15",
      },
      {
        name: "Final Exam",
        score: 90,
        maxScore: 100,
        weight: 25,
        date: "2023-12-10",
      },
    ],
    finalGrade: "A",
    status: "passed",
  },
  {
    subjectId: "MATH201",
    name: "Calculus I",
    assessments: [
      {
        name: "Quiz 1",
        score: 75,
        maxScore: 100,
        weight: 10,
        date: "2023-09-18",
      },
      {
        name: "Quiz 2",
        score: 80,
        maxScore: 100,
        weight: 10,
        date: "2023-10-05",
      },
      {
        name: "Midterm Exam",
        score: 78,
        maxScore: 100,
        weight: 30,
        date: "2023-10-22",
      },
      {
        name: "Assignment",
        score: 85,
        maxScore: 100,
        weight: 20,
        date: "2023-11-10",
      },
      {
        name: "Final Exam",
        score: 82,
        maxScore: 100,
        weight: 30,
        date: "2023-12-12",
      },
    ],
    finalGrade: "B+",
    status: "passed",
  },
  {
    subjectId: "CS201",
    name: "Data Structures",
    assessments: [
      {
        name: "Quiz 1",
        score: 65,
        maxScore: 100,
        weight: 10,
        date: "2024-02-10",
      },
      {
        name: "Assignment 1",
        score: 70,
        maxScore: 100,
        weight: 15,
        date: "2024-02-25",
      },
      {
        name: "Midterm Exam",
        score: 55,
        maxScore: 100,
        weight: 30,
        date: "2024-03-15",
      },
      {
        name: "Project",
        score: 60,
        maxScore: 100,
        weight: 20,
        date: "2024-04-05",
      },
      {
        name: "Final Exam",
        score: 58,
        maxScore: 100,
        weight: 25,
        date: "2024-05-10",
      },
    ],
    finalGrade: "D",
    status: "failed",
  },
];

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get tab from URL query parameter
  const getTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    return tabParam ? Number.parseInt(tabParam, 10) : 0;
  };

  const [value, setValue] = React.useState(getTabFromUrl());
  const [semester, setSemester] = React.useState("");
  const [year, setYear] = React.useState("");
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState(
    subjectScoresData[0]?.subjectId || ""
  );

  // Update URL when tab changes
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/dashboard${newValue > 0 ? `?tab=${newValue}` : ""}`);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter scores based on search term
  const filteredScores = studentScores.filter(
    (score) =>
      score.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.subjectId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected subject data
  const selectedSubjectData = subjectScoresData.find(
    (subject) => subject.subjectId === selectedSubject
  );

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "passed":
        return "success";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  // Get grade color
  const getGradeColor = (grade) => {
    if (grade === "A+" || grade === "A") return "#4caf50";
    if (grade === "B+" || grade === "B") return "#2196f3";
    if (grade === "C+" || grade === "C") return "#ff9800";
    if (grade === "D+" || grade === "D") return "#f44336";
    return "#757575";
  };

  // Calculate weighted score
  const calculateWeightedScore = (assessment) => {
    return (assessment.score / assessment.maxScore) * assessment.weight;
  };

  // Calculate total weighted score for a subject
  const calculateTotalScore = (subject) => {
    return subject.assessments.reduce(
      (total, assessment) => total + calculateWeightedScore(assessment),
      0
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Update tab when URL changes
  React.useEffect(() => {
    setValue(getTabFromUrl());
  }, [location.search]);

  return (
    <Page title="StudentDashboardPage">
      <Box sx={{ display: "flex" }}>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            transition: (theme) =>
              theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            marginLeft: isDrawerOpen ? `${drawerWidth}px` : 0,
            width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
            backgroundColor: "#f5f5f5",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 4,
            }}
          >
            Student Dashboard
          </Typography>

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <GradeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      GPA Summary
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {summaryData.gpa}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Total Credits: {summaryData.totalCredits}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed: {summaryData.completedCredits}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <SchoolIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Course Progress
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {Math.round(
                      (summaryData.completedCourses /
                        summaryData.totalCourses) *
                        100
                    )}
                    %
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Total Courses: {summaryData.totalCourses}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed: {summaryData.completedCourses}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Current Semester
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    S1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Academic Year: 2024-2025
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="dashboard tabs"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "primary.main",
                      height: 3,
                    },
                    "& .Mui-selected": {
                      color: "primary.main",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <Tab label="Student Info" {...a11yProps(0)} />
                  <Tab label="Academic Results" {...a11yProps(1)} />
                  <Tab label="Subject Scores" {...a11yProps(2)} />
                </Tabs>
              </Box>

              {/* Student Info Tab */}
              <TabPanel value={value} index={0}>
                <Grid container spacing={4}>
                  {/* Student Profile Card */}
                  <Grid item xs={12} md={4}>
                    <Card
                      elevation={0}
                      sx={{ borderRadius: 2, height: "100%" }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 120,
                              height: 120,
                              mb: 2,
                              bgcolor: "primary.main",
                              fontSize: "2.5rem",
                            }}
                          >
                            JD
                          </Avatar>
                          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            {studentProfile.name}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {studentProfile.program}
                          </Typography>
                          <Chip
                            label={studentProfile.status}
                            color="success"
                            sx={{ mt: 1, fontWeight: "medium" }}
                          />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <FingerprintIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Student ID"
                              secondary={studentProfile.id}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              secondaryTypographyProps={{
                                variant: "body1",
                                fontWeight: "medium",
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <EmailIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Email"
                              secondary={studentProfile.email}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              secondaryTypographyProps={{
                                variant: "body1",
                                fontWeight: "medium",
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PhoneIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Phone"
                              secondary={studentProfile.phone}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              secondaryTypographyProps={{
                                variant: "body1",
                                fontWeight: "medium",
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <CalendarTodayIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Date of Birth"
                              secondary={studentProfile.dob}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              secondaryTypographyProps={{
                                variant: "body1",
                                fontWeight: "medium",
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PersonIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Gender"
                              secondary={studentProfile.gender}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              secondaryTypographyProps={{
                                variant: "body1",
                                fontWeight: "medium",
                              }}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Academic Info Card */}
                  <Grid item xs={12} md={8}>
                    <Card elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: 2,
                            color: "primary.main",
                          }}
                        >
                          Academic Information
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <List dense>
                              <ListItem>
                                <ListItemIcon>
                                  <SchoolIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Program"
                                  secondary={studentProfile.program}
                                  primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                  }}
                                  secondaryTypographyProps={{
                                    variant: "body1",
                                    fontWeight: "medium",
                                  }}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CalendarTodayIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Enrollment Year"
                                  secondary={studentProfile.enrollmentYear}
                                  primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                  }}
                                  secondaryTypographyProps={{
                                    variant: "body1",
                                    fontWeight: "medium",
                                  }}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <BadgeIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Academic Advisor"
                                  secondary={studentProfile.advisor}
                                  primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                  }}
                                  secondaryTypographyProps={{
                                    variant: "body1",
                                    fontWeight: "medium",
                                  }}
                                />
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <List dense>
                              <ListItem>
                                <ListItemIcon>
                                  <GradeIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Current GPA"
                                  secondary={summaryData.gpa}
                                  primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                  }}
                                  secondaryTypographyProps={{
                                    variant: "body1",
                                    fontWeight: "medium",
                                  }}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CalendarTodayIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Expected Graduation"
                                  secondary={studentProfile.expectedGraduation}
                                  primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                  }}
                                  secondaryTypographyProps={{
                                    variant: "body1",
                                    fontWeight: "medium",
                                  }}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <AssignmentIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary="Completed Credits"
                                  secondary={`${summaryData.completedCredits}/${summaryData.totalCredits}`}
                                  primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                  }}
                                  secondaryTypographyProps={{
                                    variant: "body1",
                                    fontWeight: "medium",
                                  }}
                                />
                              </ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    <Card elevation={0} sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: 2,
                            color: "primary.main",
                          }}
                        >
                          Contact Information
                        </Typography>

                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <HomeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Address"
                              secondary={studentProfile.address}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              secondaryTypographyProps={{
                                variant: "body1",
                                fontWeight: "medium",
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <EmailIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Email"
                              secondary={studentProfile.email}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              secondaryTypographyProps={{
                                variant: "body1",
                                fontWeight: "medium",
                              }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PhoneIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Phone"
                              secondary={studentProfile.phone}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "text.secondary",
                              }}
                              secondaryTypographyProps={{
                                variant: "body1",
                                fontWeight: "medium",
                              }}
                            />
                          </ListItem>
                        </List>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                          }}
                        >
                          <Button variant="outlined" size="small">
                            Update Contact Info
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Academic Results Tab */}
              <TabPanel value={value} index={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {/* choose year */}
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel id="year-select-label">
                        Academic Year
                      </InputLabel>
                      <Select
                        labelId="year-select-label"
                        id="year-select"
                        value={year}
                        label="Academic Year"
                        onChange={handleYearChange}
                      >
                        <MenuItem value={2022}>2022-2023</MenuItem>
                        <MenuItem value={2023}>2023-2024</MenuItem>
                        <MenuItem value={2024}>2024-2025</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Choose semester */}
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel id="semester-select-label">
                        Semester
                      </InputLabel>
                      <Select
                        labelId="semester-select-label"
                        id="semester-select"
                        value={semester}
                        label="Semester"
                        onChange={handleSemesterChange}
                      >
                        <MenuItem value={1}>Semester 1</MenuItem>
                        <MenuItem value={2}>Semester 2</MenuItem>
                      </Select>
                    </FormControl>


                    {/* Search */}
                    <TextField
                      placeholder="Search courses..."
                      size="small"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      sx={{ width: 200 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {/* Download Button */}
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    size="small"
                  >
                    Export PDF
                  </Button>
                </Box>

                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ borderRadius: 2 }}
                >
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="student scores table"
                  >
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                        <TableCell>Semester</TableCell>
                        <TableCell>Subject ID</TableCell>
                        <TableCell>Course Name</TableCell>
                        <TableCell align="center">Credits</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell align="center">Midterm</TableCell>
                        <TableCell align="center">Practice</TableCell>
                        <TableCell align="center">Bonus</TableCell>
                        <TableCell align="center">Final</TableCell>
                        <TableCell align="center">Grade</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredScores.map((row, index) => (
                        <StyledTableRow key={index}>
                          <TableCell>{row.semester}</TableCell>
                          <TableCell>{row.subjectId}</TableCell>
                          <TableCell sx={{ fontWeight: "medium" }}>
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.credit}</TableCell>
                          <TableCell>{row.class}</TableCell>
                          <TableCell align="center">{row.midterm}</TableCell>
                          <TableCell align="center">{row.practice}</TableCell>
                          <TableCell align="center">{row.bonus}</TableCell>
                          <TableCell align="center">{row.final}</TableCell>
                          <TableCell align="center">
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: getGradeColor(row.overall),
                              }}
                            >
                              {row.overall}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                row.status === "passed" ? "Passed" : "Failed"
                              }
                              color={getStatusColor(row.status)}
                              size="small"
                              sx={{ fontWeight: "medium" }}
                            />
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              {/* Subject Scores Tab */}
              <TabPanel value={value} index={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <FormControl sx={{ minWidth: 250 }} size="small">
                      <InputLabel id="subject-select-label">
                        Select Subject
                      </InputLabel>
                      <Select
                        labelId="subject-select-label"
                        id="subject-select"
                        value={selectedSubject}
                        label="Select Subject"
                        onChange={handleSubjectChange}
                      >
                        {subjectScoresData.map((subject) => (
                          <MenuItem
                            key={subject.subjectId}
                            value={subject.subjectId}
                          >
                            {subject.subjectId} - {subject.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    size="small"
                  >
                    View All Subjects
                  </Button>
                </Box>

                {selectedSubjectData && (
                  <>
                    <Card elevation={0} sx={{ borderRadius: 2, mb: 3, p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {selectedSubjectData.subjectId} -{" "}
                            {selectedSubjectData.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Final Grade:{" "}
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: "bold",
                                color: getGradeColor(
                                  selectedSubjectData.finalGrade
                                ),
                              }}
                            >
                              {selectedSubjectData.finalGrade}
                            </Typography>
                          </Typography>
                        </Box>
                        <Chip
                          label={
                            selectedSubjectData.status === "passed"
                              ? "Passed"
                              : "Failed"
                          }
                          color={getStatusColor(selectedSubjectData.status)}
                          sx={{ fontWeight: "medium" }}
                        />
                      </Box>

                      <Box sx={{ mt: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 2 }}
                        >
                          Overall Score:{" "}
                          {calculateTotalScore(selectedSubjectData).toFixed(2)}%
                        </Typography>
                        <Box
                          sx={{
                            width: "100%",
                            height: 10,
                            backgroundColor: "#e0e0e0",
                            borderRadius: 5,
                            overflow: "hidden",
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: `${calculateTotalScore(
                                selectedSubjectData
                              )}%`,
                              height: "100%",
                              backgroundColor:
                                calculateTotalScore(selectedSubjectData) >= 80
                                  ? "success.main"
                                  : calculateTotalScore(selectedSubjectData) >=
                                    60
                                  ? "warning.main"
                                  : "error.main",
                              borderRadius: 5,
                            }}
                          />
                        </Box>
                      </Box>
                    </Card>

                    <TableContainer
                      component={Paper}
                      elevation={0}
                      sx={{ borderRadius: 2 }}
                    >
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow
                            sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
                          >
                            <TableCell>Assessment</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Score</TableCell>
                            <TableCell align="center">Max Score</TableCell>
                            <TableCell align="center">Percentage</TableCell>
                            <TableCell align="center">Weight</TableCell>
                            <TableCell align="center">Weighted Score</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedSubjectData.assessments.map(
                            (assessment, index) => (
                              <StyledTableRow key={index}>
                                <TableCell sx={{ fontWeight: "medium" }}>
                                  {assessment.name}
                                </TableCell>
                                <TableCell>
                                  {formatDate(assessment.date)}
                                </TableCell>
                                <TableCell align="center">
                                  {assessment.score}
                                </TableCell>
                                <TableCell align="center">
                                  {assessment.maxScore}
                                </TableCell>
                                <TableCell align="center">
                                  <Typography
                                    sx={{
                                      fontWeight: "medium",
                                      color:
                                        (assessment.score /
                                          assessment.maxScore) *
                                          100 >=
                                        80
                                          ? "success.main"
                                          : (assessment.score /
                                              assessment.maxScore) *
                                              100 >=
                                            60
                                          ? "warning.main"
                                          : "error.main",
                                    }}
                                  >
                                    {(
                                      (assessment.score / assessment.maxScore) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </Typography>
                                </TableCell>
                                <TableCell align="center">
                                  {assessment.weight}%
                                </TableCell>
                                <TableCell align="center">
                                  <Typography sx={{ fontWeight: "bold" }}>
                                    {calculateWeightedScore(assessment).toFixed(
                                      2
                                    )}
                                  </Typography>
                                </TableCell>
                              </StyledTableRow>
                            )
                          )}
                          <TableRow
                            sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
                          >
                            <TableCell colSpan={5} />
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              {calculateTotalScore(selectedSubjectData).toFixed(
                                2
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </TabPanel>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Page>
  );
}
