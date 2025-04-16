"use client";

import * as React from "react";
import Page from "../../components/Page";
import Header from "../../components/Header";
import classesData from "../mockdata/courseData";
import TeacherNavigationDrawer from "./TeacherNavigationDrawer";
import CourseCardsView from "../../components/CourseCardsView";
import {
  Box,
  Grid2,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Avatar,
  Rating,
  Chip,
  LinearProgress,
  Button,
  tableCellClasses,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const drawerWidth = 10;

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[100],
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Custom select component
export function CustomSelect({
  items = [],
  label = "Select",
  value,
  onChange,
  id = "custom-select",
  width = 120,
  required = false,
}) {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Box sx={{ minWidth: width }}>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        required={required}
      >
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          value={value || ""}
          label={label}
          autoWidth
          onChange={handleChange}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

// Review Summary component
function CourseReviewSummary({ course }) {
  const completionPercentage = (course.reviewsCompleted / course.totalReviews) * 100;

  return (
    <Box sx={{ mb: 4 }}>
      <Card elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {course.name} ({course.id})
          </Typography>
          <Grid2 container spacing={3}>
            <Grid2 item xs={12} md={8}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Review Completion
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={completionPercentage} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: completionPercentage >= 80 ? '#4caf50' : 
                                         completionPercentage >= 50 ? '#ff9800' : '#f44336'
                        }
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {completionPercentage.toFixed(0)}%
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {course.reviewsCompleted} of {course.totalReviews} reviews completed
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                <Chip 
                  icon={<DateRangeIcon fontSize="small" />} 
                  label={`Start: ${new Date(course.startDate).toLocaleDateString()}`}
                  size="small"
                  sx={{ bgcolor: '#f0f7ff' }}
                />
                <Chip 
                  icon={<DateRangeIcon fontSize="small" />} 
                  label={`Due: ${new Date(course.dueDate).toLocaleDateString()}`}
                  size="small"
                  sx={{ bgcolor: '#fff4e5' }}
                />
                <Chip 
                  icon={<AccessTimeIcon fontSize="small" />} 
                  label={course.schedule}
                  size="small"
                  sx={{ bgcolor: '#f0f7ff' }}
                />
              </Box>
            </Grid2>
            
            <Grid2 item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Average Rating
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                    {course.averageRating?.toFixed(1) || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    / 5.0
                  </Typography>
                </Box>
                <Rating 
                  value={course.averageRating || 0} 
                  precision={0.1} 
                  readOnly 
                  size="large"
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Based on {course.reviewsCompleted} student reviews
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function CourseReviewPage() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const [semester, setSemester] = React.useState("");
  const [year, setYear] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [helpfulCounts, setHelpfulCounts] = React.useState({});
  const [viewMode, setViewMode] = React.useState("grid"); // "grid" or "detail"

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setViewMode("detail");
  };

  const handleBackToGrid = () => {
    setViewMode("grid");
  };

  const handleHelpfulClick = (reviewId) => {
    setHelpfulCounts(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
  };

  return (
    <Page title="CourseReviewPage">
      <Box sx={{ display: "flex" }}>

        <Box
          component="main"
          sx={{
            p: 3,
            mt: 8,
            transition: (theme) =>
              theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            backgroundColor: "#f5f5f5",
            marginLeft: isDrawerOpen ? `${drawerWidth}px` : 0,
            width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
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
            Course Reviews
          </Typography>

          <Grid2
            container
            spacing={4}
            sx={{
              width: "100%",
              flexGrow: 1,
              maxWidth: "100%",
            }}
          >
            {/* Review Content Card */}
            <Grid2 item xs={12} sx={{ height: "100%", width: "100%" }}>
              <Card elevation={0} sx={{ borderRadius: 2, height: "100%" }}>
                <CardContent>
                  {/* Filter and Search Row */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    {/* Back button when in detail view */}
                    {viewMode === "detail" && (
                      <Box sx={{ mb: 1 }}>
                        <Button
                          startIcon={<ArrowBackIcon />}
                          onClick={handleBackToGrid}
                          sx={{ ml: -1 }}
                        >
                          Back to all courses
                        </Button>
                      </Box>
                    )}
                    
                    {/* Filter controls - both on the right */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <CustomSelect
                          items={["Semester 1", "Semester 2", "Semester 3"]}
                          label="Semester"
                          id="semester-select"
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}
                        />

                        <CustomSelect
                          items={["2020", "2021", "2022", "2023", "2024","2025"]}
                          label="Year"
                          id="year-select"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </Box>
                    </Box>

                    {/* Full width search bar */}
                    <Box
                      sx={{
                        width: "100%",
                        mt: 1,
                      }}
                    >
                      <TextField
                        placeholder="Search courses..."
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{
                          width: "100%",
                        }}
                        InputProps={{
                          endAdornment: <SearchIcon />,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <CourseCardsView 
                      courses={classesData}
                      searchTerm={searchTerm}
                      semester={semester}
                      year={year}
                      onSelectCourse={handleSelectCourse}
                    />
                  )}

                  {/* Detail View */}
                  {viewMode === "detail" && selectedCourse && (
                    <>
                      {/* Course summary section */}
                      <CourseReviewSummary course={selectedCourse} />
                      
                      {/* Reviews Table */}
                      {selectedCourse.reviews && selectedCourse.reviews.length > 0 ? (
                        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                          <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Student</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Rating</StyledTableCell>
                                <StyledTableCell>Comment</StyledTableCell>
                                <StyledTableCell align="center">Helpful</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedCourse.reviews.map((review, index) => (
                                <StyledTableRow key={index}>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <Avatar 
                                        sx={{ 
                                          bgcolor: 'primary.light', 
                                          width: 32, 
                                          height: 32, 
                                          mr: 1,
                                          fontSize: '0.8rem'
                                        }}
                                      >
                                        {review.studentName.split(' ').map(n => n[0]).join('')}
                                      </Avatar>
                                      <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                          {review.studentName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          {review.studentId}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    {new Date(review.date).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <Rating value={review.rating} precision={0.1} readOnly size="small" />
                                      <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                                        {review.rating.toFixed(1)}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell sx={{ maxWidth: 350 }}>
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                      }}
                                    >
                                      {review.comment}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Button 
                                      size="small"
                                      startIcon={<ThumbUpAltOutlinedIcon />}
                                      onClick={() => handleHelpfulClick(`${review.studentId}-${index}`)}
                                      sx={{ color: 'text.secondary' }}
                                    >
                                      {helpfulCounts[`${review.studentId}-${index}`] 
                                        ? helpfulCounts[`${review.studentId}-${index}`] + review.helpful 
                                        : review.helpful}
                                    </Button>
                                  </TableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                          <Typography variant="body1" color="text.secondary">
                            No reviews available for this course.
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Page>
  );
}