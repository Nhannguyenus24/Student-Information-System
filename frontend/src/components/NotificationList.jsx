import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

function NotificationCard({ notification }) {
  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
        backgroundColor: notification.isRead ? "white" : "rgba(33, 150, 243, 0.05)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Notification title */}
          <Box>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold", fontSize: "1rem" }}
            >
              {notification.title}{" "}
              {notification.courseName && `- ${notification.courseName}`} -
              {notification.time.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              {notification.content}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{
                fontStyle: "italic"
              }}
            >
              {notification.isRead ? "Read" : "Unread"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function NotificationList({ notifications, searchTerm }) {
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = searchTerm
      ? (notification.title &&
          notification.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (notification.content &&
          notification.content
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (notification.courseName &&
          notification.courseName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (notification.courseId &&
          notification.courseId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
      : true;
    return matchesSearch;
  });

  return (
    <Box sx={{ mt: 2 }}>
      {filteredNotifications.length > 0 ? (
        <Grid container spacing={2}>
          {filteredNotifications.map((notification) => (
            <Grid item xs={12} key={notification.id}>
              <NotificationCard notification={notification} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No notifications found matching your criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export { NotificationCard, NotificationList };
