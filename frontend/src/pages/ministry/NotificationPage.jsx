"use client";
import Page from "../../components/Page";
import { Box, Typography, TextField } from "@mui/material";
import {NotificationList} from "../../components/NotificationList";
import notificationsData from "../mockdata/notificationData";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useState } from "react";

export default function NotificationPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Page title="NotificationPage">
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
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Notifications
          </Typography>

          {/* Full width search bar */}
          <Box
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
            <TextField
              placeholder="Search notification..."
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

          <NotificationList
            notifications={notificationsData}
            searchTerm={searchTerm}
          />
        </Box>
      </Box>
    </Page>
  );
}
