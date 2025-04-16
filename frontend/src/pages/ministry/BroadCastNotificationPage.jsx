"use client";
import React, { useState } from "react";
import Page from "../../components/Page";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ClearIcon from "@mui/icons-material/Clear";

export default function BroadcastNotificationPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [charCount, setCharCount] = useState(0);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const maxCharCount = 500;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    setCharCount(text.length);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleClearForm = () => {
    setTitle("");
    setMessage("");
    setPriority("normal");
    setCharCount(0);
  };
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      default:
        return "info";
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setSnackbarMessage("Please provide a notification title");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    if (!message.trim()) {
      setSnackbarMessage("Please provide a notification message");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    // LOGIC SEND NOTIFICATION TO SERVER OR API
    console.log({
      title,
      message,
      priority,
    });

    setSnackbarMessage("Notification sent successfully!");
    setSnackbarSeverity("success");
    setShowSnackbar(true);
    handleClearForm();
  };

  return (
    <Page title="Broadcast Notifications">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 800,
          mx: "auto",
          mt: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <NotificationsActiveIcon
            sx={{ mr: 2, color: "primary.main", fontSize: 32 }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Broadcast Notifications
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              required
              fullWidth
              id="notification-title"
              label="Notification Title"
              value={title}
              onChange={handleTitleChange}
              variant="outlined"
              placeholder="Enter a clear and concise title"
              InputProps={{
                startAdornment: title && (
                  <IconButton
                    size="small"
                    onClick={() => setTitle("")}
                    sx={{ position: "absolute", right: 8 }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority-select"
                value={priority}
                label="Priority"
                onChange={handlePriorityChange}
              >
                <MenuItem value="normal">
                  <Chip
                    size="small"
                    label="Normal"
                    color="info"
                    sx={{ mr: 1 }}
                  />{" "}
                  Normal
                </MenuItem>
                <MenuItem value="medium">
                  <Chip
                    size="small"
                    label="Medium"
                    color="warning"
                    sx={{ mr: 1 }}
                  />{" "}
                  Medium
                </MenuItem>
                <MenuItem value="high">
                  <Chip
                    size="small"
                    label="High"
                    color="error"
                    sx={{ mr: 1 }}
                  />{" "}
                  High
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="notification-message"
              label="Notification Message"
              multiline
              rows={8}
              value={message}
              onChange={handleMessageChange}
              variant="outlined"
              placeholder="Enter the notification message here..."
              helperText={`${charCount}/${maxCharCount} characters`}
              error={charCount > maxCharCount}
              FormHelperTextProps={{
                sx: {
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: 0,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClearForm}
                startIcon={<ClearIcon />}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color={getPriorityColor()}
                onClick={handleSubmit}
                endIcon={<SendIcon />}
                disabled={
                  !title.trim() || !message.trim() || charCount > maxCharCount
                }
              >
                Send Notification
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Page>
  );
}
