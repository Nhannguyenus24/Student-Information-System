"use client";
import * as React from "react";
import Page from "../../components/Page";
import {
  Box,
  Typography,
  //Table,TableBody,TableCell, TableContainer, TableRow, TableHead, Paper,
} from "@mui/material";
import {CoursesListAndSearch} from "../../components/CourseList";
import classesData from "../mockdata/courseData";


export default function StudentCoursePage() {  
    return (
      <Page title="StudentCoursePage">
        <Box sx={{ display: "flex" }}>
          <Box
            component="main"
            sx={{
              p: 3,
              transition: (theme) =>
                theme.transitions.create(["margin", "width"], {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              marginLeft: 0,
              width: "100%",
              // marginLeft: isDrawerOpen ? `${drawerWidth}px` : 0,
              // width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Courses
            </Typography>
  
            <CoursesListAndSearch courses={classesData} />
          </Box>
        </Box>
      </Page>
    );
  }