import React from 'react';
import { Box, Typography, Chip, Card, CardContent, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import {
  Grid2,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  //Table,TableBody,TableCell, TableContainer, TableRow, TableHead, Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// CourseCard component: display individual course information
const CourseCard = ({ course }) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Course ID and Name */}
          <Box>
            <Typography 
              variant="h6" 
              color="primary" 
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              {course.id} - {course.name.toUpperCase()}
            </Typography>
          </Box>
          
          {/*Course details*/}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            <Chip 
              icon={<AccessTimeIcon fontSize="small" />} 
              label={course.schedule} 
              size="small" 
              sx={{ bgcolor: '#f0f7ff', color: '#0057b7' }}
            />
            <Chip 
              icon={<MeetingRoomIcon fontSize="small" />} 
              label="Room" 
              size="small"
              sx={{ bgcolor: '#f5f5f5' }}
            />
            <Chip 
              icon={<PersonIcon fontSize="small" />} 
              label={course.TA} 
              size="small"
              sx={{ bgcolor: '#f5f5f5' }}
            />
            <Chip 
              icon={<PeopleIcon fontSize="small" />} 
              label={`${course.students} Students`} 
              size="small"
              sx={{ bgcolor: '#f5f5f5' }}
            />
            <Chip 
              icon={<ClassIcon fontSize="small" />} 
              label={`${course.credit} Credits`}
              size="small"
              sx={{ bgcolor: '#f5f5f5' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// CourseList component to display all courses
const CourseList = ({ courses, searchTerm, semester, year }) => {
  // Filter courses based on search term and filters
  const filteredCourses = courses.filter(course => {
    // Filter by search term (course name or ID)
    const matchesSearch = searchTerm ? 
      (course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       course.id.toLowerCase().includes(searchTerm.toLowerCase())) : 
      true;
    
    // Filter by semester and year (basic)
    const matchesSemester = semester ? course.semester.includes(semester) : true;
    const matchesYear = year ? course.semester.includes(year.toString()) : true;
    
    return matchesSearch && matchesSemester && matchesYear;
  });

  return (
    <Box sx={{ mt: 2 }}>
      {filteredCourses.length > 0 ? (
        <Grid container spacing={2}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No courses found matching your criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

function CoursesListAndSearch({ courses }) {
  //component for a course list + filter semester and search bar
  const [semester, setSemester] = React.useState("");
  const [year, setYear] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Grid2
      container
      spacing={4}
      sx={{
        width: "100%",
        flexGrow: 1,
        maxWidth: "100%",
      }}
    >
      {/* Course Content Card */}
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
              {/* Filter controls - both on the right */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {/* Both filters on the right */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <CustomSelect
                    items={["Semester 1", "Semester 2", "Semester 3"]}
                    label="Semester"
                    id="semester-select"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />

                  <CustomSelect
                    items={[2020, 2021, 2022, 2023, 2024, 2025]}
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
            {/* Course list */}
            <CourseList
              courses={courses || []}
              searchTerm={searchTerm}
              semester={semester}
              year={year}
            />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

// Custom select component
function CustomSelect({
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

export { CourseCard, CoursesListAndSearch,CourseList, CustomSelect };