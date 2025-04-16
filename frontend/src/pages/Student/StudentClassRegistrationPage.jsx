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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  styled,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ScheduleIcon from "@mui/icons-material/Schedule";
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
    status: "confirmed",
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
    status: "confirmed",
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
    status: "pending",
  },
];

// More realistic data for available classes
const classesListData = [
  {
    id: "CS405",
    subjectName: "Machine Learning",
    credit: 3,
    class: "CS-D1",
    teacher: "Dr. Anderson",
    ta: "Emily White",
    time: "Mon, Wed 14:00-15:30",
    note: "Elective",
    availability: "available",
    seats: "15/30",
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
    availability: "limited",
    seats: "3/25",
  },
  {
    id: "STAT301",
    subjectName: "Statistics & Probability",
    credit: 4,
    class: "S-B1",
    teacher: "Dr. Thompson",
    ta: "Jessica Lee",
    time: "Wed, Fri 13:00-14:30",
    note: "Required",
    availability: "full",
    seats: "0/30",
  },
  {
    id: "CS410",
    subjectName: "Artificial Intelligence",
    credit: 3,
    class: "CS-A3",
    teacher: "Prof. Garcia",
    ta: "Robert Chen",
    time: "Mon, Thu 15:30-17:00",
    note: "Elective",
    availability: "available",
    seats: "20/35",
  },
  {
    id: "BUS202",
    subjectName: "Business for Engineers",
    credit: 2,
    class: "B-C2",
    teacher: "Dr. Martinez",
    ta: "Amanda Taylor",
    time: "Tue 9:00-11:00",
    note: "Elective",
    availability: "available",
    seats: "25/40",
  },
];

export default function StudentClassRegistrationPage() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [registeredClasses, setRegisteredClasses] = React.useState(
    registeredClassesData
  );
  const [classesList, setClassesList] = React.useState(classesListData);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [classToDelete, setClassToDelete] = React.useState(null);
  const [enrollDialogOpen, setEnrollDialogOpen] = React.useState(false);
  const [classToEnroll, setClassToEnroll] = React.useState(null);
  const [successAlert, setSuccessAlert] = React.useState("");

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleDeleteClick = (classItem) => {
    setClassToDelete(classItem);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (classToDelete) {
      setRegisteredClasses(
        registeredClasses.filter((item) => item.id !== classToDelete.id)
      );
      setSuccessAlert(
        `Successfully removed ${classToDelete.subjectName} from your schedule.`
      );
      setTimeout(() => setSuccessAlert(""), 3000);
    }
    setDeleteDialogOpen(false);
  };

  const handleEnrollClick = (classItem) => {
    setClassToEnroll(classItem);
    setEnrollDialogOpen(true);
  };

  const handleEnrollConfirm = () => {
    if (classToEnroll) {
      // Check if already registered
      if (!registeredClasses.some((c) => c.id === classToEnroll.id)) {
        setRegisteredClasses([
          ...registeredClasses,
          {
            ...classToEnroll,
            status: "pending",
          },
        ]);
        setSuccessAlert(
          `Successfully enrolled in ${classToEnroll.subjectName}.`
        );
        setTimeout(() => setSuccessAlert(""), 3000);
      }
    }
    setEnrollDialogOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClasses = classesList.filter(
    (classItem) =>
      classItem.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total credits
  const totalRegisteredCredits = registeredClasses.reduce(
    (sum, item) => sum + item.credit,
    0
  );
  const maxCredits = 18;

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  // Get availability color
  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "available":
        return "success";
      case "limited":
        return "warning";
      case "full":
        return "error";
      default:
        return "default";
    }
  };

  // Get availability text
  const getAvailabilityText = (availability) => {
    switch (availability) {
      case "available":
        return "Available";
      case "limited":
        return "Limited Seats";
      case "full":
        return "Full";
      default:
        return availability;
    }
  };

  return (
    <Page title="StudentClassRegistrationPage">
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
            Class Registration
          </Typography>

          {successAlert && (
            <Alert
              severity="success"
              sx={{ mb: 3 }}
              onClose={() => setSuccessAlert("")}
            >
              {successAlert}
            </Alert>
          )}

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EventIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Current Semester
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    S2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Academic Year: 2024-2025
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CreditCardIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Credit Status
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {totalRegisteredCredits}/{maxCredits}
                  </Typography>
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
                        width: `${
                          (totalRegisteredCredits / maxCredits) * 100
                        }%`,
                        height: "100%",
                        backgroundColor: "primary.main",
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LibraryBooksIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Registration Status
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    Open
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Closes on: May 15, 2024
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Registered Classes Section */}
          <Card elevation={0} sx={{ borderRadius: 2, mb: 4 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Registered Classes
                </Typography>
                <Chip
                  label={`${registeredClasses.length} Classes | ${totalRegisteredCredits} Credits`}
                  color="primary"
                  variant="outlined"
                />
              </Box>

              <Divider sx={{ mb: 3 }} />

              {registeredClasses.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    You haven't registered for any classes yet.
                  </Typography>
                </Box>
              ) : (
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
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {registeredClasses.map((row) => (
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
                                row.status === "confirmed"
                                  ? "Confirmed"
                                  : "Pending"
                              }
                              color={getStatusColor(row.status)}
                              size="small"
                              sx={{ fontWeight: "medium" }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Remove from schedule">
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleDeleteClick(row)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>

          {/* Available Classes Section */}
          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Available Classes
                </Typography>

                <TextField
                  placeholder="Search courses..."
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={{ width: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Advanced filters">
                          <IconButton size="small">
                            <FilterListIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Divider sx={{ mb: 3 }} />

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
                      <TableCell>Availability</TableCell>
                      <TableCell align="center">Actions</TableCell>
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
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Chip
                              label={getAvailabilityText(row.availability)}
                              color={getAvailabilityColor(row.availability)}
                              size="small"
                              sx={{ fontWeight: "medium", mr: 1 }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {row.seats}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip
                            title={
                              row.availability === "full"
                                ? "Class is full"
                                : "Enroll in this class"
                            }
                          >
                            <span>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={() => handleEnrollClick(row)}
                                disabled={
                                  row.availability === "full" ||
                                  registeredClasses.some((c) => c.id === row.id)
                                }
                              >
                                Enroll
                              </Button>
                            </span>
                          </Tooltip>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove{" "}
                <strong>{classToDelete?.subjectName}</strong> from your
                schedule?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={handleDeleteConfirm}
                color="error"
                variant="contained"
              >
                Remove
              </Button>
            </DialogActions>
          </Dialog>

          {/* Enroll Confirmation Dialog */}
          <Dialog
            open={enrollDialogOpen}
            onClose={() => setEnrollDialogOpen(false)}
          >
            <DialogTitle>Confirm Enrollment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to enroll in{" "}
                <strong>{classToEnroll?.subjectName}</strong>?
              </DialogContentText>
              {classToEnroll && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Course Details:
                  </Typography>
                  <Typography variant="body2">
                    <strong>Course Code:</strong> {classToEnroll.id}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Credits:</strong> {classToEnroll.credit}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Schedule:</strong> {classToEnroll.time}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Instructor:</strong> {classToEnroll.teacher}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEnrollDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={handleEnrollConfirm}
                color="primary"
                variant="contained"
              >
                Confirm Enrollment
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Page>
  );
}
