import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Divider, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Page from "../../components/Page";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import dayjs from "dayjs";

// Fake data
const mockNotifications = {
  "1": {
    title: "Scheduled System Maintenance",
    sender: "IT Department",
    time: "2025-04-04T10:30:00",
    content:
      "We would like to inform you that the system will undergo scheduled maintenance at 11:00 PM on April 6, 2025. During this time, the system may be unavailable. We apologize for the inconvenience.",
  },
  "2": {
    title: "New Feature Update",
    sender: "System Administration",
    time: "2025-04-03T14:00:00",
    content:
      "The new version has been updated with various improvements in UI and performance. Please check the Updates section for more details.",
  },
};

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 900,
  margin: "auto",
}));

export default function DetailNotification() {
  const { id } = useParams();
  const notification = mockNotifications[id];

  if (!notification) {
    window.location.href = "/500";
  }

  return (
    <Page title="Notification Details">
      <Container>
        {/* Top Title */}
        <Typography variant="h3" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NotificationsActiveIcon color="primary" />
          Notification
        </Typography>

        {/* Centered Notification Block */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh", // center within the viewport height (minus header)
          }}
        >
          <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 600 }}>
            {/* Title */}
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {notification.title}
            </Typography>

            {/* Sender & time */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 16 }}>
                {notification.sender[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {notification.sender}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {dayjs(notification.time).format("HH:mm, DD/MM/YYYY")}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Content */}
            <Typography variant="body1" sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
              {notification.content}
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Page>
  );
}
