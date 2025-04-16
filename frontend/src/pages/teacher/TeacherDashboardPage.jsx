"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid2,
} from "@mui/material";
import Page from "../../components/Page";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
const drawerWidth = 10;


// Sample data for the summary cards
const summaryData = {
  totalCredits: 120,
  completedCredits: 85,
  gpa: 3.75,
  totalCourses: 40,
  completedCourses: 28,
  currentSemester: "S1-2024-2025",
};

// Sample teacher data
const teacherProfile = {
  id: "TC12345",
  name: "Dr. Emily Rodriguez",
  dob: "January 15, 2000",
  gender: "Male",
  department: "Computer Science",
  email: "emily.rodriguez@university.edu",
  phone: "987-6543",
  address: "123 University Ave, College Town, CT 12345",
  faculty: "FIT",
  role: "teacher",
  cccd: "123455",
  academic: "PhD in Computer Science",
};

export default function Dashboard() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Page title="TeacherDashboardPage">
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
            marginLeft: isDrawerOpen ? `${drawerWidth}px` : 0,
            width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
            backgroundColor: "#f5f5f5",
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
            Teacher Dashboard
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
            {/* Teacher Profile Card */}
            <Grid2 item xs={12} sx={{ height: "100%", width: "100%" }}>
              <Card elevation={0} sx={{ borderRadius: 2, height: "100%" }}>
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
                      {teacherProfile.name}
                    </Typography>

                    <Chip
                      label={teacherProfile.name}
                      color="success"
                      sx={{ mt: 1, fontWeight: "medium" }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid2
                    container
                    spacing={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Left Column */}
                    <Grid2 item xs={12} md={6}>
                      {/* First set of list items */}
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <FingerprintIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Student ID"
                            secondary={teacherProfile.name}
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
                            secondary={teacherProfile.email}
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
                            secondary={teacherProfile.phone}
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
                            secondary={teacherProfile.dob}
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
                            secondary={teacherProfile.gender}
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
                            <HomeIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Address"
                            secondary={teacherProfile.address}
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
                    </Grid2>

                    {/* Right Column */}
                    <Grid2 item xs={12} md={6}>
                      {/* Second set of list items */}

                      <ListItem>
                        <ListItemIcon>
                          <PersonIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Role"
                          secondary={teacherProfile.role}
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
                          <ApartmentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Faculty"
                          secondary={teacherProfile.faculty}
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
                          primary="CCCD"
                          secondary={teacherProfile.cccd}
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
                          <HistoryEduIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Academic"
                          secondary={teacherProfile.academic}
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
                    </Grid2>
                  </Grid2>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 3,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Page>
  );
}