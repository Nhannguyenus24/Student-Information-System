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
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Badge,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
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

// More realistic data for registered classes
const registeredClassesData = [
  {
    id: "CS302",
    subjectName: "Advanced Algorithms",
    credit: 3,
    class: "CS-A1",
    teacher: "Dr. Smith",
    ta: "John Davis",
    time: "Mon, Wed 10:00-11:30",
    note: "Required",
    status: "active",
    progress: 85,
  },
  {
    id: "MATH401",
    subjectName: "Linear Algebra",
    credit: 4,
    class: "M-B2",
    teacher: "Prof. Johnson",
    ta: "Sarah Wilson",
    time: "Tue, Thu 13:00-14:30",
    note: "Elective",
    status: "active",
    progress: 72,
  },
  {
    id: "ENG205",
    subjectName: "Technical Writing",
    credit: 2,
    class: "E-C3",
    teacher: "Dr. Williams",
    ta: "Michael Brown",
    time: "Fri 9:00-11:00",
    note: "Required",
    status: "active",
    progress: 60,
  },
  {
    id: "CS405",
    subjectName: "Machine Learning",
    credit: 3,
    class: "CS-D1",
    teacher: "Dr. Anderson",
    ta: "Emily White",
    time: "Mon, Wed 14:00-15:30",
    note: "Elective",
    status: "completed",
    progress: 100,
  },
  {
    id: "PHYS201",
    subjectName: "Physics for CS",
    credit: 3,
    class: "P-A2",
    teacher: "Prof. Roberts",
    ta: "David Miller",
    time: "Tue, Thu 10:00-11:30",
    note: "Required",
    status: "completed",
    progress: 100,
  },
];

// Assignments data
const assignmentsData = [
  {
    id: "A1-CS302",
    title: "Algorithm Analysis Report",
    course: "CS302 - Advanced Algorithms",
    dueDate: "2024-05-15T23:59:00",
    status: "pending",
    grade: null,
    maxGrade: 100,
    submitted: false,
    priority: "high",
  },
  {
    id: "A2-CS302",
    title: "Sorting Algorithms Implementation",
    course: "CS302 - Advanced Algorithms",
    dueDate: "2024-05-10T23:59:00",
    status: "submitted",
    grade: null,
    maxGrade: 100,
    submitted: true,
    submittedDate: "2024-05-09T14:30:00",
    priority: "medium",
  },
  {
    id: "A1-MATH401",
    title: "Matrix Operations Problem Set",
    course: "MATH401 - Linear Algebra",
    dueDate: "2024-05-20T23:59:00",
    status: "pending",
    grade: null,
    maxGrade: 50,
    submitted: false,
    priority: "medium",
  },
  {
    id: "A1-ENG205",
    title: "Technical Documentation Draft",
    course: "ENG205 - Technical Writing",
    dueDate: "2024-05-05T23:59:00",
    status: "graded",
    grade: 92,
    maxGrade: 100,
    submitted: true,
    submittedDate: "2024-05-04T18:45:00",
    priority: "low",
  },
  {
    id: "A2-MATH401",
    title: "Eigenvalues and Eigenvectors Quiz",
    course: "MATH401 - Linear Algebra",
    dueDate: "2024-04-30T23:59:00",
    status: "graded",
    grade: 85,
    maxGrade: 100,
    submitted: true,
    submittedDate: "2024-04-30T22:15:00",
    priority: "low",
  },
];

export default function StudentClassesAndAssignmentsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get tab from URL query parameter
  const getTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    return tabParam ? Number.parseInt(tabParam, 10) : 0;
  };

  const [value, setValue] = React.useState(getTabFromUrl());
  const [semester, setSemester] = React.useState("2");
  const [year, setYear] = React.useState("2024");
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [assignmentFilter, setAssignmentFilter] = React.useState("all");

  // Update URL when tab changes
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(
      `/student/classAndAssignment${newValue > 0 ? `?tab=${newValue}` : ""}`
    );
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleAssignmentFilterChange = (event) => {
    setAssignmentFilter(event.target.value);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter classes based on search term
  const filteredClasses = registeredClassesData.filter(
    (classItem) =>
      classItem.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter assignments based on filter and search term
  const filteredAssignments = assignmentsData.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase());

    if (assignmentFilter === "all") return matchesSearch;
    if (assignmentFilter === "pending")
      return assignment.status === "pending" && matchesSearch;
    if (assignmentFilter === "submitted")
      return assignment.status === "submitted" && matchesSearch;
    if (assignmentFilter === "graded")
      return assignment.status === "graded" && matchesSearch;

    return matchesSearch;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "info";
      case "pending":
        return "warning";
      case "submitted":
        return "primary";
      case "graded":
        return "success";
      default:
        return "default";
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if assignment is due soon (within 3 days)
  const isDueSoon = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  // Check if assignment is overdue
  const isOverdue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    return now > due && dueDate;
  };

  // Get time remaining text
  const getTimeRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;

    if (diffTime < 0) return "Overdue";

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
    } else {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} left`;
    }
  };

  // Count pending assignments
  const pendingAssignmentsCount = assignmentsData.filter(
    (a) => a.status === "pending"
  ).length;

  // Update tab when URL changes
  React.useEffect(() => {
    setValue(getTabFromUrl());
  }, [location.search]);

  return (
    <Page title="StudentClassesAndAssignmentsPage">
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
            Schedule
          </Typography>

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Current Semester
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    S{semester}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Academic Year: {year}-{Number.parseInt(year) + 1}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LibraryBooksIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Enrolled Classes
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {
                      registeredClassesData.filter((c) => c.status === "active")
                        .length
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Credits:{" "}
                    {registeredClassesData
                      .filter((c) => c.status === "active")
                      .reduce((sum, item) => sum + item.credit, 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Pending Assignments
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {pendingAssignmentsCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next Due:{" "}
                    {pendingAssignmentsCount > 0
                      ? formatDate(
                          assignmentsData
                            .filter((a) => a.status === "pending")
                            .sort(
                              (a, b) =>
                                new Date(a.dueDate) - new Date(b.dueDate)
                            )[0].dueDate
                        )
                      : "None"}
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
                  aria-label="classes and assignments tabs"
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
                  <Tab label="My Classes" {...a11yProps(0)} />
                  <Tab
                    label={
                      <Badge
                        badgeContent={pendingAssignmentsCount}
                        color="error"
                      >
                        Assignments
                      </Badge>
                    }
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>

              {/* My Classes Tab */}
              <TabPanel value={value} index={0}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
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
                        <MenuItem value="2022">2022-2023</MenuItem>
                        <MenuItem value="2023">2023-2024</MenuItem>
                        <MenuItem value="2024">2024-2025</MenuItem>
                      </Select>
                    </FormControl>

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
                        <MenuItem value="1">Semester 1</MenuItem>
                        <MenuItem value="2">Semester 2</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      placeholder="Search classes..."
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

                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    size="small"
                  >
                    Export Schedule
                  </Button>
                </Box>

                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ borderRadius: 2 }}
                >
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Subject Name</TableCell>
                        <TableCell align="center">Credits</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Teacher</TableCell>
                        <TableCell>Schedule</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Progress</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredClasses.map((row) => (
                        <StyledTableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell sx={{ fontWeight: "medium" }}>
                            {row.subjectName}
                          </TableCell>
                          <TableCell align="center">{row.credit}</TableCell>
                          <TableCell>{row.class}</TableCell>
                          <TableCell>{row.teacher}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <ScheduleIcon
                                fontSize="small"
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              {row.time}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                row.status === "active" ? "Active" : "Completed"
                              }
                              color={getStatusColor(row.status)}
                              size="small"
                              sx={{ fontWeight: "medium" }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ width: "100%", mr: 1 }}>
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: 8,
                                    backgroundColor: "#e0e0e0",
                                    borderRadius: 4,
                                    overflow: "hidden",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: `${row.progress}%`,
                                      height: "100%",
                                      backgroundColor:
                                        row.progress === 100
                                          ? "success.main"
                                          : "primary.main",
                                      borderRadius: 4,
                                    }}
                                  />
                                </Box>
                              </Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {row.progress}%
                              </Typography>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              {/* Assignments Tab */}
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
                    <FormControl sx={{ minWidth: 150 }} size="small">
                      <InputLabel id="assignment-filter-label">
                        Filter
                      </InputLabel>
                      <Select
                        labelId="assignment-filter-label"
                        id="assignment-filter"
                        value={assignmentFilter}
                        label="Filter"
                        onChange={handleAssignmentFilterChange}
                      >
                        <MenuItem value="all">All Assignments</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="submitted">Submitted</MenuItem>
                        <MenuItem value="graded">Graded</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      placeholder="Search assignments..."
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

                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    size="small"
                  >
                    More Filters
                  </Button>
                </Box>

                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ borderRadius: 2 }}
                >
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                        <TableCell>Assignment</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Grade</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAssignments.map((row) => (
                        <StyledTableRow key={row.id}>
                          <TableCell sx={{ fontWeight: "medium" }}>
                            {row.title}
                          </TableCell>
                          <TableCell>{row.course}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <AccessTimeIcon
                                fontSize="small"
                                sx={{
                                  mr: 1,
                                  color: isOverdue(row.dueDate)
                                    ? "error.main"
                                    : isDueSoon(row.dueDate)
                                    ? "warning.main"
                                    : "text.secondary",
                                }}
                              />
                              <Box>
                                <Typography variant="body2">
                                  {formatDate(row.dueDate)}
                                </Typography>
                                {row.status === "pending" && (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: isOverdue(row.dueDate)
                                        ? "error.main"
                                        : isDueSoon(row.dueDate)
                                        ? "warning.main"
                                        : "text.secondary",
                                      fontWeight:
                                        isOverdue(row.dueDate) ||
                                        isDueSoon(row.dueDate)
                                          ? "bold"
                                          : "normal",
                                    }}
                                  >
                                    {getTimeRemaining(row.dueDate)}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                row.status === "pending"
                                  ? "Pending"
                                  : row.status === "submitted"
                                  ? "Submitted"
                                  : "Graded"
                              }
                              color={getStatusColor(row.status)}
                              size="small"
                              sx={{ fontWeight: "medium" }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {row.grade !== null ? (
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: "bold",
                                  color:
                                    row.grade >= 80
                                      ? "success.main"
                                      : row.grade >= 60
                                      ? "warning.main"
                                      : "error.main",
                                }}
                              >
                                {row.grade}/{row.maxGrade}
                              </Typography>
                            ) : (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                --/{row.maxGrade}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={
                                row.priority === "high" ? (
                                  <PriorityHighIcon />
                                ) : null
                              }
                              label={
                                row.priority.charAt(0).toUpperCase() +
                                row.priority.slice(1)
                              }
                              color={getPriorityColor(row.priority)}
                              size="small"
                              variant="outlined"
                              sx={{ fontWeight: "medium" }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 1,
                              }}
                            >
                              <Tooltip title="View Details">
                                <IconButton size="small" color="primary">
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              {row.status === "pending" && (
                                <Tooltip title="Submit Assignment">
                                  <IconButton size="small" color="success">
                                    <CloudUploadIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}

                              {row.status !== "pending" && (
                                <Tooltip title="View Attachment">
                                  <IconButton size="small" color="info">
                                    <AttachFileIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Page>
  );
}