import { useState } from "react";
import { Box, Typography, Badge } from "@mui/material";

// Sample notification list with read/unread states
const notificationsData = [
  { id: 1, content: "New course available: React Basics", isRead: false },
  { id: 2, content: "Your tuition fee invoice is ready", isRead: true },
  { id: 3, content: "Class schedule updated", isRead: false },
  { id: 4, content: "Reminder: Assignment deadline tomorrow", isRead: true },
  { id: 5, content: "New course available: React Basics", isRead: false },
  { id: 6, content: "Your tuition fee invoice is ready", isRead: true },
  { id: 7, content: "Class schedule updated", isRead: false },
  { id: 8, content: "Reminder: Assignment deadline tomorrow", isRead: true },
];

export default function NotificationList() {
  const [notifications, setNotifications] = useState(notificationsData);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {notifications.map((notif) => (
        <Box
          key={notif.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5em",
            p: 2,
            cursor: "pointer",
            "&:hover": { bgcolor: "grey.200" }
          }}
        >
          {/* Badge Indicator */}
          <Badge
            variant="dot"
            sx={{
              "& .MuiBadge-dot": {
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: notif.isRead ? "gray" : "primary.main",
              },
            }}
          />

          {/* Notification Content */}
          <Typography 
            variant="notification"
            sx={{ flex: 1, fontWeight: notif.isRead ? "normal" : "bold" }}
          >
            {notif.content}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}